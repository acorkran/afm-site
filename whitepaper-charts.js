// Whitepaper Interactive Charts using Chart.js

// Chart.js default configuration
Chart.defaults.font.family = "'Inter', sans-serif";
Chart.defaults.font.size = 14;
Chart.defaults.color = '#64748b';

// Colors from styles
const colors = {
    primary: '#2563eb',
    primaryLight: '#3b82f6',
    secondary: '#10b981',
    accent: '#f59e0b',
    dark: '#0f172a',
    gray: '#64748b',
    grayLight: '#cbd5e1',
};

// 1. Target Metrics Chart (3 Years)
const targetMetricsCtx = document.getElementById('targetMetricsChart');
if (targetMetricsCtx) {
    new Chart(targetMetricsCtx, {
        type: 'bar',
        data: {
            labels: ['Operators', 'Active Users', 'Coverage (sq km)', 'Countries'],
            datasets: [{
                label: 'Target (3 Years)',
                data: [350, 10000, 500, 10],
                backgroundColor: [
                    colors.primary,
                    colors.secondary,
                    colors.accent,
                    colors.primaryLight
                ],
                borderColor: colors.dark,
                borderWidth: 0,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: '3-Year Target Metrics',
                    font: {
                        size: 18,
                        weight: 'bold'
                    },
                    color: colors.dark
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            if (value >= 1000) return (value/1000) + 'K';
                            return value;
                        }
                    }
                }
            }
        }
    });
}

// 2. Presale Token Emission Schedule Chart
const emissionScheduleCtx = document.getElementById('emissionScheduleChart');
if (emissionScheduleCtx) {
    new Chart(emissionScheduleCtx, {
        type: 'line',
        data: {
            labels: Array.from({length: 25}, (_, i) => `M${i}`),
            datasets: [
                {
                    label: 'Early Bird (50% bonus, 24mo)',
                    data: Array.from({length: 25}, (_, i) => {
                        if (i === 0) return 0;
                        if (i <= 24) return (1500 / 24) * i; // $15 DC over 24 months for $10 tier
                        return 1500;
                    }),
                    borderColor: colors.accent,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Mid Presale (32% bonus, 18mo)',
                    data: Array.from({length: 25}, (_, i) => {
                        if (i === 0) return 0;
                        if (i <= 18) return (1320 / 18) * i; // $13.20 DC over 18 months
                        return 1320;
                    }),
                    borderColor: colors.primary,
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Late Presale (15% bonus, 12mo)',
                    data: Array.from({length: 25}, (_, i) => {
                        if (i === 0) return 0;
                        if (i <= 12) return (1150 / 12) * i; // $11.50 DC over 12 months
                        return 1150;
                    }),
                    borderColor: colors.secondary,
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'DC Emission Schedule by Stage (Starter Tier Example: $10)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: colors.dark
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + (context.parsed.y / 100).toFixed(2) + ' DC';
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Months from Network Launch'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Cumulative DC Value (cents)'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + (value / 100).toFixed(2);
                        }
                    }
                }
            }
        }
    });
}

// 3. Operator Economics Chart
const operatorEconomicsCtx = document.getElementById('operatorEconomicsChart');
if (operatorEconomicsCtx) {
    new Chart(operatorEconomicsCtx, {
        type: 'bar',
        data: {
            labels: ['Month 1-12', 'Month 13-24', 'Month 25-36'],
            datasets: [
                {
                    label: 'Operator Revenue (40% share)',
                    data: [80, 135, 135],
                    backgroundColor: colors.secondary,
                    borderRadius: 8
                },
                {
                    label: 'Operating Costs',
                    data: [-65, -65, -65],
                    backgroundColor: '#ef4444',
                    borderRadius: 8
                },
                {
                    label: 'Net Profit',
                    data: [15, 70, 70],
                    backgroundColor: colors.primary,
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Operator Monthly Economics (Tier 1 Hotspot)',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: colors.dark
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'USD per Month'
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

// 4. Governance Roadmap Timeline Chart
const governanceRoadmapCtx = document.getElementById('governanceRoadmapChart');
if (governanceRoadmapCtx) {
    new Chart(governanceRoadmapCtx, {
        type: 'line',
        data: {
            labels: ['Month 0', 'Month 6', 'Month 12', 'Month 18', 'Month 24', 'Month 36'],
            datasets: [
                {
                    label: 'Decentralization Progress',
                    data: [10, 25, 45, 70, 85, 100],
                    borderColor: colors.primary,
                    backgroundColor: 'rgba(37, 99, 235, 0.2)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: 2.5,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Progressive Decentralization Timeline',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: colors.dark
                },
                annotation: {
                    annotations: {
                        phase1: {
                            type: 'label',
                            xValue: 3,
                            yValue: 20,
                            content: ['Phase 1:', 'Foundation'],
                            font: {
                                size: 11
                            }
                        },
                        phase2: {
                            type: 'label',
                            xValue: 9,
                            yValue: 60,
                            content: ['Phase 2:', 'Progressive'],
                            font: {
                                size: 11
                            }
                        },
                        phase3: {
                            type: 'label',
                            xValue: 21,
                            yValue: 90,
                            content: ['Phase 3:', 'Full Cooperative'],
                            font: {
                                size: 11
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                    title: {
                        display: true,
                        text: 'Decentralization %'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Timeline'
                    }
                }
            }
        }
    });
}

// Smooth scroll for TOC links
document.querySelectorAll('.toc-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 140; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });

            // Update active link
            document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        }
    });
});

// Highlight active section in TOC on scroll
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const sections = document.querySelectorAll('.whitepaper-section');
            const scrollPos = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionId = section.getAttribute('id');

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    document.querySelectorAll('.toc-link').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + sectionId) {
                            link.classList.add('active');
                        }
                    });
                }
            });

            ticking = false;
        });

        ticking = true;
    }
});

console.log('%cAFM Whitepaper v0.4.1', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cBuilding community-owned internet for Africa 🌍', 'color: #10b981; font-size: 14px;');
