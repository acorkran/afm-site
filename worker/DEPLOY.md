# AFM Waitlist Worker - Deployment Guide

## Prerequisites
- Cloudflare account (free tier is fine)
- Node.js installed locally (for wrangler CLI)

## Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
```

## Step 2: Login to Cloudflare

```bash
wrangler login
```

This will open a browser window to authenticate.

## Step 3: Create KV Namespace

```bash
cd /home/ubuntu/afm-site/worker
wrangler kv:namespace create "AFM_WAITLIST"
```

This will output something like:
```
{ binding = "AFM_WAITLIST", id = "abc123xyz..." }
```

**Copy the `id` value** and update `wrangler.toml`:

```toml
kv_namespaces = [
  { binding = "AFM_WAITLIST", id = "YOUR_ID_HERE" }
]
```

## Step 4: Set Admin Key (Optional but Recommended)

Generate a secure admin key:
```bash
openssl rand -hex 32
```

Update `wrangler.toml`:
```toml
[vars]
ADMIN_KEY = "your-generated-key-here"
```

## Step 5: Deploy the Worker

```bash
wrangler deploy
```

This will output your Worker URL, something like:
```
https://afm-waitlist.YOUR_SUBDOMAIN.workers.dev
```

## Step 6: Update the Frontend

Edit `/home/ubuntu/afm-site/script.js` and update line 2:

```javascript
const WAITLIST_API_URL = 'https://afm-waitlist.YOUR_SUBDOMAIN.workers.dev/api/waitlist';
```

Replace `YOUR_SUBDOMAIN` with your actual Cloudflare Workers subdomain.

## Step 7: Rebuild and Deploy AFM Site

```bash
cd /home/ubuntu/afm-site
sudo docker compose build
sudo docker compose up -d
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/waitlist` | POST | Submit waitlist signup |
| `/api/waitlist` | GET | Get signup count (public) |
| `/api/waitlist/all` | GET | Get all signups (requires auth) |
| `/api/waitlist/export` | GET | Download CSV export (requires auth) |
| `/health` | GET | Health check |

## Admin API Usage

To fetch all signups:
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_KEY" \
  https://afm-waitlist.YOUR_SUBDOMAIN.workers.dev/api/waitlist/all
```

To download CSV:
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_KEY" \
  https://afm-waitlist.YOUR_SUBDOMAIN.workers.dev/api/waitlist/export \
  -o waitlist.csv
```

## Troubleshooting

### CORS Errors
If you get CORS errors, make sure your domain is in the `ALLOWED_ORIGINS` array in `waitlist-worker.js`.

### Turnstile Verification Fails
- Make sure the site key in `index.html` matches your Turnstile widget
- Make sure the secret key in `waitlist-worker.js` is correct
- Check that your domain is added to the Turnstile widget settings

### KV Not Working
Make sure you've created the KV namespace and added the correct ID to `wrangler.toml`.

## Costs (Free Tier Limits)

- **Workers**: 100,000 requests/day
- **KV Reads**: 100,000/day
- **KV Writes**: 1,000/day
- **KV Storage**: 1GB

This is more than enough for a waitlist!
