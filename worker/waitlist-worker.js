/**
 * AFM Waitlist Worker
 * Cloudflare Worker to handle waitlist signups with Turnstile protection
 * + Telegram notifications with visual activity chart
 *
 * Required KV Namespace binding: AFM_WAITLIST
 */

const TURNSTILE_SECRET_KEY = '0x4AAAAAACEjBUjtrOE9nbI5qr-fTawm-fY';

// Telegram config
const TELEGRAM_BOT_TOKEN = '8393334125:AAF4slB8m4WvR1ALdxuJe1iK_S3E-B7ayS4';
const TELEGRAM_CHAT_IDS = ['1836540625', '755215223']; // ACorkran, bunt789

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://afm.sh',
  'https://www.afm.sh',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
];

// CORS headers helper
function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

// Verify Turnstile token
async function verifyTurnstile(token, ip) {
  const formData = new FormData();
  formData.append('secret', TURNSTILE_SECRET_KEY);
  formData.append('response', token);
  formData.append('remoteip', ip);

  const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: formData,
  });

  const outcome = await result.json();
  return outcome.success;
}

// Generate a unique ID for the signup
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Get date key for daily tracking (YYYY-MM-DD)
function getDateKey(date = new Date()) {
  return date.toISOString().split('T')[0];
}

// Get hour key for hourly tracking (YYYY-MM-DD-HH)
function getHourKey(date = new Date()) {
  return `${date.toISOString().split('T')[0]}-${date.getUTCHours().toString().padStart(2, '0')}`;
}

// Update daily/hourly counters
async function updateActivityCounters(env) {
  const now = new Date();
  const dateKey = getDateKey(now);
  const hourKey = getHourKey(now);

  // Update daily count
  const dailyCount = parseInt(await env.AFM_WAITLIST.get(`daily:${dateKey}`) || '0', 10);
  await env.AFM_WAITLIST.put(`daily:${dateKey}`, (dailyCount + 1).toString(), { expirationTtl: 60 * 60 * 24 * 30 }); // 30 days

  // Update hourly count
  const hourlyCount = parseInt(await env.AFM_WAITLIST.get(`hourly:${hourKey}`) || '0', 10);
  await env.AFM_WAITLIST.put(`hourly:${hourKey}`, (hourlyCount + 1).toString(), { expirationTtl: 60 * 60 * 24 * 7 }); // 7 days

  return { dailyCount: dailyCount + 1, hourlyCount: hourlyCount + 1 };
}

// Get activity data for last 7 days
async function getWeeklyActivity(env) {
  const days = [];
  const now = new Date();

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dateKey = getDateKey(date);
    const count = parseInt(await env.AFM_WAITLIST.get(`daily:${dateKey}`) || '0', 10);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    days.push({ date: dateKey, dayName, count });
  }

  return days;
}

// Generate visual bar chart for Telegram
function generateActivityChart(weeklyData, todayCount) {
  const maxCount = Math.max(...weeklyData.map(d => d.count), 1);
  const barChars = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

  let chart = '📊 <b>Last 7 Days Activity</b>\n\n';

  weeklyData.forEach((day, index) => {
    const barIndex = Math.floor((day.count / maxCount) * (barChars.length - 1));
    const bar = barChars[barIndex].repeat(8);
    const isToday = index === weeklyData.length - 1;
    const label = isToday ? 'Today' : day.dayName;
    const countStr = day.count.toString().padStart(3, ' ');
    chart += `${label.padEnd(5)} ${bar} ${countStr}\n`;
  });

  return chart;
}

// Send Telegram notification to all configured chat IDs
async function sendTelegramNotification(signup, totalCount, weeklyActivity) {
  const interestMap = {
    'presale': 'Joining the presale',
    'operator': 'Becoming an operator',
    'both': 'Both presale and operating',
    'community': 'Following the project'
  };

  const tierMap = {
    'starter': 'Starter ($10)',
    'light': 'Light ($100)',
    'medium': 'Medium ($200-300)',
    'heavy': 'Heavy+ ($600)'
  };

  const chart = generateActivityChart(weeklyActivity, weeklyActivity[6]?.count || 0);

  const message = `📝 <b>New AFM Waitlist Signup!</b>

<b>Email:</b> ${escapeHtml(signup.email)}
${signup.name ? `<b>Name:</b> ${escapeHtml(signup.name)}` : ''}
${signup.telegram ? `<b>Telegram:</b> @${escapeHtml(signup.telegram.replace('@', ''))}` : ''}
<b>Interest:</b> ${interestMap[signup.interest] || signup.interest}
${signup.tier ? `<b>Tier:</b> ${tierMap[signup.tier] || signup.tier}` : ''}
${signup.country ? `<b>Country:</b> ${escapeHtml(signup.country)}` : ''}
${signup.region ? `<b>Region:</b> ${escapeHtml(signup.region)}` : ''}

━━━━━━━━━━━━━━━━━━
<b>Total Signups: ${totalCount}</b>
━━━━━━━━━━━━━━━━━━

${chart}`;

  // Send to all configured chat IDs
  const sendPromises = TELEGRAM_CHAT_IDS.map(async (chatId) => {
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML'
        })
      });

      const result = await response.json();
      if (!result.ok) {
        console.error(`Telegram error for ${chatId}:`, result);
      }
      return result.ok;
    } catch (error) {
      console.error(`Telegram notification failed for ${chatId}:`, error);
      return false;
    }
  });

  const results = await Promise.all(sendPromises);
  return results.every(r => r);
}

// Escape HTML for Telegram
function escapeHtml(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Handle waitlist signup
async function handleSignup(request, env) {
  const corsHeaders = getCorsHeaders(request);

  try {
    const data = await request.json();

    // Validate required fields (name is now optional)
    if (!data.email || !data.interest) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing required fields (email, interest)'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Validate Turnstile token
    if (!data.turnstileToken) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Missing Turnstile verification'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const clientIP = request.headers.get('CF-Connecting-IP') || '';
    const isHuman = await verifyTurnstile(data.turnstileToken, clientIP);

    if (!isHuman) {
      return new Response(JSON.stringify({
        success: false,
        error: 'Turnstile verification failed. Please try again.'
      }), {
        status: 403,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Check for duplicate email
    const existingEntry = await env.AFM_WAITLIST.get(`email:${data.email.toLowerCase()}`);
    if (existingEntry) {
      return new Response(JSON.stringify({
        success: false,
        error: 'This email is already on the waitlist!'
      }), {
        status: 409,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Get geolocation from Cloudflare (auto-detect if not provided)
    const cfData = request.cf || {};
    const detectedCountry = cfData.country || null;
    const detectedCity = cfData.city || null;
    const detectedRegion = cfData.region || null;

    // Create signup record
    const signupId = generateId();
    const signup = {
      id: signupId,
      name: data.name?.trim() || null,
      email: data.email.toLowerCase().trim(),
      telegram: data.telegram?.trim() || null,
      interest: data.interest,
      tier: data.tier || null,
      // Use user-provided location, or fall back to Cloudflare detection
      country: data.country?.trim() || detectedCountry || null,
      region: data.region?.trim() || (detectedCity ? `${detectedCity}${detectedRegion ? ', ' + detectedRegion : ''}` : null),
      // Store detected location separately for reference
      detectedLocation: {
        country: detectedCountry,
        city: detectedCity,
        region: detectedRegion,
      },
      timestamp: new Date().toISOString(),
      ip: clientIP,
      userAgent: request.headers.get('User-Agent') || null,
    };

    // Store in KV (with email index for deduplication)
    await env.AFM_WAITLIST.put(`signup:${signupId}`, JSON.stringify(signup));
    await env.AFM_WAITLIST.put(`email:${signup.email}`, signupId);

    // Update counter
    const countStr = await env.AFM_WAITLIST.get('stats:count') || '0';
    const newCount = parseInt(countStr, 10) + 1;
    await env.AFM_WAITLIST.put('stats:count', newCount.toString());

    // Update activity counters
    await updateActivityCounters(env);

    // Get weekly activity for chart
    const weeklyActivity = await getWeeklyActivity(env);

    // Send Telegram notification (don't await - fire and forget)
    sendTelegramNotification(signup, newCount, weeklyActivity);

    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully joined the waitlist!',
      position: newCount
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Signup error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

// Get waitlist stats (public)
async function getStats(request, env) {
  const corsHeaders = getCorsHeaders(request);

  const count = await env.AFM_WAITLIST.get('stats:count') || '0';

  return new Response(JSON.stringify({
    count: parseInt(count, 10)
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Get all signups (admin only - add auth in production)
async function getAllSignups(request, env) {
  const corsHeaders = getCorsHeaders(request);

  // Simple auth check - in production, use proper authentication
  const authHeader = request.headers.get('Authorization');
  const adminKey = env.ADMIN_KEY || 'afm-admin-2024'; // Set this in Worker env vars

  if (authHeader !== `Bearer ${adminKey}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const signups = [];
  let cursor = null;

  // List all signup keys
  do {
    const list = await env.AFM_WAITLIST.list({
      prefix: 'signup:',
      cursor,
      limit: 100
    });

    for (const key of list.keys) {
      const data = await env.AFM_WAITLIST.get(key.name);
      if (data) {
        signups.push(JSON.parse(data));
      }
    }

    cursor = list.cursor;
  } while (cursor);

  // Sort by timestamp descending
  signups.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return new Response(JSON.stringify({
    count: signups.length,
    signups
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Export signups as CSV (admin only)
async function exportCSV(request, env) {
  const corsHeaders = getCorsHeaders(request);

  const authHeader = request.headers.get('Authorization');
  const adminKey = env.ADMIN_KEY || 'afm-admin-2024';

  if (authHeader !== `Bearer ${adminKey}`) {
    return new Response('Unauthorized', { status: 401, headers: corsHeaders });
  }

  const signups = [];
  let cursor = null;

  do {
    const list = await env.AFM_WAITLIST.list({ prefix: 'signup:', cursor, limit: 100 });
    for (const key of list.keys) {
      const data = await env.AFM_WAITLIST.get(key.name);
      if (data) signups.push(JSON.parse(data));
    }
    cursor = list.cursor;
  } while (cursor);

  signups.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Build CSV
  const headers = ['id', 'name', 'email', 'telegram', 'interest', 'tier', 'country', 'region', 'timestamp'];
  const csv = [
    headers.join(','),
    ...signups.map(s => headers.map(h => `"${(s[h] || '').toString().replace(/"/g, '""')}"`).join(','))
  ].join('\n');

  return new Response(csv, {
    status: 200,
    headers: {
      ...corsHeaders,
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="afm-waitlist-${new Date().toISOString().split('T')[0]}.csv"`
    }
  });
}

// Get activity stats (admin only)
async function getActivityStats(request, env) {
  const corsHeaders = getCorsHeaders(request);

  const authHeader = request.headers.get('Authorization');
  const adminKey = env.ADMIN_KEY || 'afm-admin-2024';

  if (authHeader !== `Bearer ${adminKey}`) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const weeklyActivity = await getWeeklyActivity(env);
  const totalCount = parseInt(await env.AFM_WAITLIST.get('stats:count') || '0', 10);

  return new Response(JSON.stringify({
    total: totalCount,
    weekly: weeklyActivity
  }), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}

// Main request handler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const corsHeaders = getCorsHeaders(request);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    // Route requests
    if (url.pathname === '/api/waitlist' || url.pathname === '/api/waitlist/') {
      if (request.method === 'POST') {
        return handleSignup(request, env);
      }
      if (request.method === 'GET') {
        return getStats(request, env);
      }
    }

    if (url.pathname === '/api/waitlist/all' && request.method === 'GET') {
      return getAllSignups(request, env);
    }

    if (url.pathname === '/api/waitlist/export' && request.method === 'GET') {
      return exportCSV(request, env);
    }

    if (url.pathname === '/api/waitlist/activity' && request.method === 'GET') {
      return getActivityStats(request, env);
    }

    // Health check
    if (url.pathname === '/health' || url.pathname === '/') {
      return new Response(JSON.stringify({ status: 'ok', service: 'afm-waitlist' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  },
};
