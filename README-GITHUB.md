# AFM - Africans First Mesh

**Presale Waitlist Website**

[![Live Preview](https://img.shields.io/badge/demo-live-success)](https://acorkran.github.io/afm-site)
[![License](https://img.shields.io/badge/license-CC--BY--SA--4.0-blue)](LICENSE)

> Internet access as a human right, owned by the communities it serves.

## 🌍 About AFM

AFM (Africans First Mesh) is a community-owned WiFi network bringing affordable internet to underserved communities across Africa. Built on Algorand blockchain with cooperative governance.

**Mission:** Deploy 500+ solar-powered hotspots across 10 countries, connecting 100,000+ people by 2027.

## 🚀 Quick Start

### View Locally
```bash
# Clone the repo
git clone https://github.com/acorkran/afm-site.git
cd afm-site

# Serve locally (Python)
python -m http.server 8000

# Or with Node.js
npx http-server

# Open http://localhost:8000
```

### Deploy to Production

**Vercel (Recommended):**
```bash
npm i -g vercel
vercel
```

**Netlify:**
- Drag the folder to https://app.netlify.com/drop

**GitHub Pages:**
- Enable in repo Settings → Pages → Source: main branch

See [WEBSITE-README.md](WEBSITE-README.md) for complete deployment guide.

## 📁 Project Structure

```
afm-site/
├── index.html              # Main landing page
├── styles.css              # Responsive styling
├── script.js               # Interactive functionality
├── AFM-Whitepaper-v0.4.1.md # Full whitepaper
├── WEBSITE-README.md       # Deployment guide
└── README.md               # This file
```

## ✨ Features

### Marketing
- 🎯 **Conversion-optimized** - Multiple CTAs, urgency messaging
- 📱 **Fully Responsive** - Mobile, tablet, desktop
- ⚡ **Fast Loading** - ~60KB total, no heavy dependencies
- 🎨 **Modern Design** - Clean, professional, engaging

### Presale
- 🔥 **3 Stages** - Early Bird (50% bonus), Mid (32%), Late (15%)
- 💎 **7 Tiers** - $10 to $600 entry points
- 📊 **Interactive** - Stage selector, tier comparison
- 🎁 **Operator Path** - FREE financing for Heavy+ Early Bird (30 spots)

### Technical
- ✅ **Form Validation** - Email, required fields
- 📈 **Analytics** - Built-in page view, CTA tracking
- 💾 **LocalStorage** - Works without backend (for MVP)
- 🔌 **Backend-Ready** - Easy integration with Airtable/Supabase

## 🎨 Key Sections

1. **Hero** - Value proposition, stats, Early Bird urgency
2. **Presale Tiers** - Interactive stage selector
3. **Operator Opportunity** - Economics breakdown, FREE financing
4. **How It Works** - 4-step process
5. **Mission** - Vision, impact goals
6. **Technology** - Algorand, burn-mint, solar, governance
7. **Team** - Founders (Andrew + Ifeanyi)
8. **FAQ** - Common questions
9. **Waitlist Form** - Email capture with validation

## 🔧 Configuration

### Connect Backend

Edit `script.js` line ~100 to replace `simulateApiCall`:

**Airtable:**
```javascript
async function submitToAirtable(data) {
    const response = await fetch('https://api.airtable.com/v0/BASE_ID/Waitlist', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fields: data })
    });
    return response.json();
}
```

**FormSpree (No-code):**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

See [WEBSITE-README.md](WEBSITE-README.md) for more backend options.

### Add Analytics

**Google Analytics** (add to `<head>`):
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

**Plausible** (privacy-friendly):
```html
<script defer data-domain="afm.sh" src="https://plausible.io/js/script.js"></script>
```

## 📊 Analytics (Built-in)

Open browser console on live site:

```javascript
// View conversion stats
printAnalytics()

// Export waitlist data
exportWaitlistData()
```

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3 (Grid/Flexbox), Vanilla JavaScript
- **Fonts:** Google Fonts (Inter)
- **Hosting:** Static (works on any host)
- **Blockchain:** Algorand (mentioned in content)

## 📄 Whitepaper

Full technical documentation available:
- **[AFM-Whitepaper-v0.4.1.md](AFM-Whitepaper-v0.4.1.md)** (100+ pages)
- Covers: Tokenomics, governance, operator financing, roadmap

## 🤝 Contributing

We welcome contributions!

1. Fork the repo
2. Create feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add improvement'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open Pull Request

## 📝 License

This work is licensed under [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)

You are free to:
- **Share** - Copy and redistribute
- **Adapt** - Remix, transform, and build upon

Under the following terms:
- **Attribution** - Give appropriate credit
- **ShareAlike** - Distribute under same license

## 🔗 Links

- **Website:** http://www.afm.sh (coming soon)
- **GitHub:** https://github.com/acorkran/afm-site
- **Discord:** Coming soon
- **Telegram:** Coming soon

## 👥 Team

**Andrew** - Co-Founder, Technical Lead
Smart contract architecture and tokenomics design

**Ifeanyi** - Co-Founder, Nigeria Operations Lead
On-ground operations, community building

## 📞 Contact

- **Email:** TBD
- **GitHub Issues:** For bugs and feature requests
- **Discord:** Coming soon

---

**Built with ❤️ for Africa**

*Connecting 100,000+ people by 2027*
