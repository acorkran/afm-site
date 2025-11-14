# AFM Website - Deployment Guide

This directory contains the complete AFM presale waitlist website, ready for deployment.

## Files

- **index.html** - Main landing page with all sections
- **styles.css** - Complete styling (responsive, modern design)
- **script.js** - Interactive functionality and form handling
- **AFM-Whitepaper-v0.4.1.md** - Whitepaper available for download

## Features

### Marketing & Conversion
- ✅ Hero section with clear value proposition
- ✅ Early Bird urgency messaging (50% bonus, limited spots)
- ✅ Tiered presale showcase (3 stages × 4 tiers)
- ✅ Operator opportunity section (FREE financing path)
- ✅ Mission/vision storytelling
- ✅ Technology trust indicators
- ✅ Team section (Andrew + Ifeanyi)
- ✅ FAQ section
- ✅ Multiple CTAs throughout
- ✅ Sticky CTA bar on scroll

### Technical
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Modern CSS Grid/Flexbox layout
- ✅ Smooth animations and transitions
- ✅ Form validation
- ✅ Local storage for waitlist data (until backend connected)
- ✅ Analytics tracking (page views, CTA clicks)
- ✅ Accessible (semantic HTML, ARIA labels)
- ✅ Fast loading (no external dependencies except Google Fonts)

## Deployment Options

### Option 1: Static Hosting (Recommended for MVP)

**Vercel** (Free, easy):
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from afrimesh directory)
vercel

# Custom domain
vercel --prod
```

**Netlify** (Free, drag-and-drop):
1. Go to https://app.netlify.com/drop
2. Drag the entire `afrimesh` folder
3. Done! Your site is live

**GitHub Pages** (Free, integrated):
```bash
# In afrimesh directory
git add .
git commit -m "Add presale website"
git push origin main

# Enable GitHub Pages in repo settings → Pages → Source: main branch
```

### Option 2: Traditional Web Host
Upload via FTP:
- Upload `index.html`, `styles.css`, `script.js`, `AFM-Whitepaper-v0.4.1.md`
- Set `index.html` as default document
- Done!

### Option 3: Local Testing
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# Open http://localhost:8000
```

## Connecting a Backend (Future)

The website currently stores waitlist signups in `localStorage`. To connect a backend:

### 1. Update Form Submission (script.js)

Replace the `simulateApiCall` function around line 100:

```javascript
async function submitToBackend(data) {
    const response = await fetch('https://your-api.com/waitlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        throw new Error('Submission failed');
    }

    return response.json();
}
```

### 2. Backend Options

**Simple (Email-based):**
- Use FormSpree: https://formspree.io
- Or EmailJS: https://www.emailjs.com
- No code needed, just configure

**Database (Recommended):**
- **Airtable** (easiest): Use as database + API
- **Google Sheets** (free): Via Google Apps Script
- **Supabase** (powerful): PostgreSQL + instant API
- **Firebase** (Google): Firestore + Auth

**Custom API:**
- Build with Node.js + Express + MongoDB
- Or use serverless (Vercel/Netlify Functions)

### 3. Example: Airtable Integration

```javascript
// In script.js, replace simulateApiCall with:
async function submitToAirtable(data) {
    const response = await fetch('https://api.airtable.com/v0/YOUR_BASE_ID/Waitlist', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: data
        })
    });

    return response.json();
}
```

## Analytics Integration

### Google Analytics
Add to `<head>` in index.html:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Plausible (Privacy-friendly)
```html
<script defer data-domain="afm.sh" src="https://plausible.io/js/script.js"></script>
```

## Custom Domain Setup

1. **Purchase domain** (afm.sh or similar)
   - Namecheap, Google Domains, Cloudflare

2. **Configure DNS** (example for Vercel):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**: Auto-provisioned by most hosts

## Email Setup (Contact/Notifications)

**Option 1: EmailJS** (No backend)
- Sign up at https://www.emailjs.com
- Create email template
- Add to script.js:

```javascript
emailjs.send('service_id', 'template_id', {
    name: formData.name,
    email: formData.email,
    interest: formData.interest
});
```

**Option 2: SendGrid/Mailgun** (Backend required)
- Professional transactional emails
- Use with serverless functions

## Testing Checklist

Before launch:
- [ ] Test form submission on all devices
- [ ] Verify whitepaper download works
- [ ] Check all CTA links point to #waitlist
- [ ] Test on mobile (iPhone, Android)
- [ ] Validate HTML (https://validator.w3.org)
- [ ] Check page speed (https://pagespeed.web.dev)
- [ ] Test on slow connection (3G simulation)
- [ ] Proofread all copy
- [ ] Verify email/social links work
- [ ] Set up error monitoring (Sentry)

## Performance Optimization

Current site is ~50KB total (very fast). To optimize further:

1. **Minify CSS/JS**:
   ```bash
   npm install -g minify
   minify styles.css > styles.min.css
   minify script.js > script.min.js
   ```

2. **Add CDN** (Cloudflare free tier)

3. **Compress images** (if you add any)

4. **Enable Gzip** (automatic on most hosts)

## Security

- ✅ No sensitive data in localStorage
- ✅ Form validation (client + server)
- ✅ HTTPS enforced (via host)
- ⚠️ Add CAPTCHA if bot signups become issue (hCaptcha/reCAPTCHA)

## Monitoring

**Admin Tools** (already built-in):
Open browser console on live site and run:

```javascript
// View analytics summary
printAnalytics()

// Export waitlist data (while using localStorage)
exportWaitlistData()
```

## Troubleshooting

**Form not submitting:**
- Check browser console for errors
- Verify localStorage isn't disabled
- Test in incognito mode

**Styles not loading:**
- Verify file paths are correct
- Check CSS syntax (W3C validator)
- Clear browser cache

**Mobile layout broken:**
- Test viewport meta tag is present
- Check media queries in styles.css
- Use Chrome DevTools device emulation

## Next Steps

1. **Launch MVP**: Deploy to Vercel/Netlify today
2. **Add backend**: Integrate Airtable or FormSpree (1 hour)
3. **Set up domain**: Configure afm.sh DNS (1 hour)
4. **Add analytics**: Google Analytics or Plausible (30 min)
5. **Email automation**: Welcome email for waitlist signups
6. **A/B testing**: Test different CTA copy, headlines
7. **SEO**: Meta tags, sitemap, robots.txt
8. **Social sharing**: Open Graph tags, Twitter cards

## Support

Questions? Found a bug?
- Open issue on GitHub
- Email: [TBD]
- Discord: [TBD]

---

**Built with ❤️ for Africa**
Version: 1.0.0
Last updated: January 2025
