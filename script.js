// AFM Waitlist API endpoint
const WAITLIST_API_URL = 'https://afm-waitlist.transhumancoin.workers.dev/api/waitlist';

// Disclaimer banner dismiss functionality
const dismissBannerBtn = document.getElementById('dismiss-banner');
const disclaimerBanner = document.getElementById('disclaimer-banner');

if (dismissBannerBtn && disclaimerBanner) {
    // Check if banner was previously dismissed
    if (localStorage.getItem('afm-banner-dismissed') === 'true') {
        disclaimerBanner.classList.add('dismissed');
        document.body.classList.add('banner-dismissed');
    }

    dismissBannerBtn.addEventListener('click', () => {
        disclaimerBanner.classList.add('dismissed');
        document.body.classList.add('banner-dismissed');
        localStorage.setItem('afm-banner-dismissed', 'true');
    });
}

// Turnstile token storage
let turnstileToken = null;

// Turnstile callbacks (called by the widget)
window.onTurnstileSuccess = function(token) {
    turnstileToken = token;
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Join the Waitlist';
    }
};

window.onTurnstileExpired = function() {
    turnstileToken = null;
    const submitBtn = document.getElementById('submit-btn');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Please verify you\'re human';
    }
};

// Tier data for all stages
const tierData = {
    early: {
        starter: { price: '$10', reward: '$15', period: '24 months', cap: '0.5 GB/month' },
        light: { price: '$100', reward: '$150', period: '24 months', cap: '5 GB/month' },
        medium: { price: '$200', reward: '$300', period: '24 months', cap: '10 GB/month' },
        heavy: { price: '$600', reward: '$900', period: '24 months', cap: '30 GB/month' }
    },
    mid: {
        starter: { price: '$10', reward: '$13.20', period: '18 months', cap: '0.5 GB/month' },
        light: { price: '$100', reward: '$132', period: '18 months', cap: '5 GB/month' },
        medium: { price: '$200', reward: '$264', period: '18 months', cap: '10 GB/month' },
        heavy: { price: '$600', reward: '$792', period: '18 months', cap: '30 GB/month' }
    },
    late: {
        starter: { price: '$10', reward: '$11.50', period: '12 months', cap: '0.5 GB/month' },
        light: { price: '$100', reward: '$115', period: '12 months', cap: '5 GB/month' },
        medium: { price: '$200', reward: '$230', period: '12 months', cap: '10 GB/month' },
        heavy: { price: '$600', reward: '$690', period: '12 months', cap: '30 GB/month' }
    }
};

// Sticky CTA functionality
let lastScrollTop = 0;
const stickyCta = document.getElementById('sticky-cta');
const heroSection = document.querySelector('.hero');

function handleStickyCtaScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = heroSection.offsetHeight;

    // Show sticky CTA when scrolled past hero and scrolling down
    if (scrollTop > heroHeight && scrollTop > lastScrollTop) {
        stickyCta.classList.add('visible');
    } else {
        stickyCta.classList.remove('visible');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

// Throttle scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(() => {
        handleStickyCtaScroll();
    });
});

// Note: Stage tabs removed - presale is time-gated, not user-selected
// Current stage is shown in the banner and updates automatically based on date

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Form submission
const waitlistForm = document.getElementById('waitlist-form');
const formSuccess = document.getElementById('form-success');

waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = document.getElementById('submit-btn');
    const originalBtnText = submitBtn.textContent;

    // Check Turnstile token
    if (!turnstileToken) {
        alert('Please complete the verification checkbox first.');
        return;
    }

    // Get form data (country/region auto-detected by Cloudflare)
    const formData = {
        email: document.getElementById('email').value,
        name: document.getElementById('name').value || null,
        telegram: document.getElementById('telegram').value,
        interest: document.getElementById('interest').value,
        tier: document.getElementById('tier').value,
        turnstileToken: turnstileToken
    };

    try {
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';

        // Submit to Worker API
        const response = await fetch(WAITLIST_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (result.success) {
            // Show success message
            waitlistForm.style.display = 'none';
            formSuccess.style.display = 'block';

            // Update success message with position if available
            if (result.position) {
                const successMsg = formSuccess.querySelector('p');
                if (successMsg) {
                    successMsg.innerHTML = `You're #${result.position} on the list! We'll email you as soon as the presale opens.`;
                }
            }

            console.log('Waitlist signup successful:', result);
        } else {
            // Show error message
            alert(result.error || 'Something went wrong. Please try again.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;

            // Reset Turnstile on error
            if (typeof turnstile !== 'undefined') {
                turnstile.reset();
            }
            turnstileToken = null;
        }

    } catch (error) {
        console.error('Form submission error:', error);
        alert('Network error. Please check your connection and try again.');
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;

        // Reset Turnstile on error
        if (typeof turnstile !== 'undefined') {
            turnstile.reset();
        }
        turnstileToken = null;
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add intersection observer for animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.tier-card, .step-card, .tech-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Email validation helper
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add real-time email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('blur', () => {
    if (emailInput.value && !isValidEmail(emailInput.value)) {
        emailInput.style.borderColor = '#ef4444';
    } else {
        emailInput.style.borderColor = '';
    }
});

// Export waitlist data function (for admin use)
window.exportWaitlistData = function() {
    const data = localStorage.getItem('afm-waitlist');
    if (data) {
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `afm-waitlist-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    } else {
        console.log('No waitlist data found');
    }
};

// Console message for developers
console.log('%cAFM - Africans First Mesh', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cBuilding community-owned internet for Africa 🌍', 'color: #10b981; font-size: 14px;');
console.log('%cInterested in contributing? Check out our GitHub (coming soon)', 'color: #64748b; font-size: 12px;');

// Add simple analytics (page view tracking)
function trackPageView() {
    const pageData = {
        url: window.location.href,
        timestamp: new Date().toISOString(),
        referrer: document.referrer,
        userAgent: navigator.userAgent
    };

    // Store locally for now
    const views = JSON.parse(localStorage.getItem('afm-page-views') || '[]');
    views.push(pageData);
    localStorage.setItem('afm-page-views', JSON.stringify(views));

    // TODO: Send to analytics service when available
    console.log('Page view tracked:', pageData);
}

trackPageView();

// Track CTA clicks
document.querySelectorAll('a[href="#waitlist"]').forEach(btn => {
    btn.addEventListener('click', () => {
        const ctaData = {
            buttonText: btn.textContent.trim(),
            location: btn.closest('section')?.className || 'unknown',
            timestamp: new Date().toISOString()
        };

        const clicks = JSON.parse(localStorage.getItem('afm-cta-clicks') || '[]');
        clicks.push(ctaData);
        localStorage.setItem('afm-cta-clicks', JSON.stringify(clicks));

        console.log('CTA clicked:', ctaData);
    });
});

// Print analytics summary (for admin)
window.printAnalytics = function() {
    const waitlist = JSON.parse(localStorage.getItem('afm-waitlist') || '[]');
    const pageViews = JSON.parse(localStorage.getItem('afm-page-views') || '[]');
    const ctaClicks = JSON.parse(localStorage.getItem('afm-cta-clicks') || '[]');

    console.log('=== AFM Analytics Summary ===');
    console.log(`Waitlist Signups: ${waitlist.length}`);
    console.log(`Page Views: ${pageViews.length}`);
    console.log(`CTA Clicks: ${ctaClicks.length}`);
    console.log(`Conversion Rate: ${waitlist.length > 0 && pageViews.length > 0 ? ((waitlist.length / pageViews.length) * 100).toFixed(2) : 0}%`);

    if (waitlist.length > 0) {
        console.log('\n=== Interest Breakdown ===');
        const interests = {};
        waitlist.forEach(entry => {
            interests[entry.interest] = (interests[entry.interest] || 0) + 1;
        });
        console.table(interests);

        console.log('\n=== Tier Interest ===');
        const tiers = {};
        waitlist.forEach(entry => {
            if (entry.tier) {
                tiers[entry.tier] = (tiers[entry.tier] || 0) + 1;
            }
        });
        console.table(tiers);
    }

    console.log('\nUse exportWaitlistData() to download full dataset');
};
