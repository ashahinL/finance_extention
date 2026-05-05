// HSBC Egypt USD/EGP Monitor Extension Demo
class ExtensionDemo {
    constructor() {
        this.extensionIcon = document.getElementById('extensionIcon');
        this.extensionPopup = document.getElementById('extensionPopup');
        this.refreshBtn = document.getElementById('refreshBtn');
        this.visitBtn = document.getElementById('visitBtn');
        this.buyRateElement = document.getElementById('buyRate');
        this.sellRateElement = document.getElementById('sellRate');
        this.lastUpdatedElement = document.getElementById('lastUpdated');
        this.iconBadge = document.getElementById('iconBadge');
        this.statusDot = document.getElementById('statusDot');
        this.statusText = document.getElementById('statusText');

        this.isPopupVisible = false;
        this.currentRates = {
            buyRate: 48.13,
            sellRate: 48.23
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateLastUpdated();
        this.startAutoUpdate();
        
        // Ensure popup starts hidden
        this.extensionPopup.classList.add('hidden');
        this.extensionPopup.classList.remove('visible');
    }

    bindEvents() {
        // Toggle popup when extension icon is clicked
        this.extensionIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Extension icon clicked!'); // Debug log
            this.togglePopup();
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.extensionPopup.contains(e.target) && !this.extensionIcon.contains(e.target)) {
                this.hidePopup();
            }
        });

        // Refresh button functionality
        if (this.refreshBtn) {
            this.refreshBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Refresh button clicked!'); // Debug log
                this.refreshRates();
            });
        }

        // Visit Ta3weem button
        if (this.visitBtn) {
            this.visitBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('Visit Ta3weem button clicked!'); // Debug log
                window.open('https://ta3weem.com/old/', '_blank');
            });
        }

        // Prevent popup from closing when clicking inside it
        this.extensionPopup.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Keyboard accessibility
        this.extensionIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.togglePopup();
            }
        });

        // Make extension icon focusable
        this.extensionIcon.setAttribute('tabindex', '0');
        this.extensionIcon.setAttribute('role', 'button');
        this.extensionIcon.setAttribute('aria-label', 'Open HSBC rate monitor');
    }

    togglePopup() {
        console.log('Toggling popup. Current state:', this.isPopupVisible); // Debug log
        if (this.isPopupVisible) {
            this.hidePopup();
        } else {
            this.showPopup();
        }
    }

    showPopup() {
        console.log('Showing popup'); // Debug log
        this.extensionPopup.classList.remove('hidden');
        this.extensionPopup.classList.add('visible');
        this.isPopupVisible = true;
        
        // Reset transform and opacity
        this.extensionPopup.style.transform = 'translateY(-10px) scale(0.95)';
        this.extensionPopup.style.opacity = '0';
        
        // Force reflow
        this.extensionPopup.offsetHeight;
        
        // Animate in
        requestAnimationFrame(() => {
            this.extensionPopup.style.transition = 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
            this.extensionPopup.style.transform = 'translateY(0) scale(1)';
            this.extensionPopup.style.opacity = '1';
        });

        // Add visual feedback to extension icon
        this.extensionIcon.style.transform = 'scale(1.1)';
        this.extensionIcon.style.boxShadow = '0 0 0 2px rgba(255, 255, 255, 0.5)';
    }

    hidePopup() {
        console.log('Hiding popup'); // Debug log
        this.extensionPopup.style.transition = 'all 0.2s ease-out';
        this.extensionPopup.style.transform = 'translateY(-10px) scale(0.95)';
        this.extensionPopup.style.opacity = '0';
        
        setTimeout(() => {
            this.extensionPopup.classList.add('hidden');
            this.extensionPopup.classList.remove('visible');
            this.isPopupVisible = false;
        }, 200);

        // Remove visual feedback from extension icon
        this.extensionIcon.style.transform = 'scale(1)';
        this.extensionIcon.style.boxShadow = 'none';
    }

    async refreshRates() {
        console.log('Refreshing rates'); // Debug log
        
        // Add loading state
        this.refreshBtn.classList.add('refreshing');
        this.extensionPopup.classList.add('loading');
        this.statusDot.style.background = '#fbbf24'; // Yellow for loading
        this.statusText.textContent = 'Updating...';

        try {
            // Simulate API call delay
            await this.simulateRateUpdate();
            
            // Update UI with new rates
            this.updateRatesDisplay();
            this.updateLastUpdated();
            
            // Success state
            this.statusDot.style.background = '#4ade80'; // Green for success
            this.statusText.textContent = 'Connected';
            
            // Show brief success feedback
            this.showSuccessAnimation();
            
        } catch (error) {
            console.error('Error refreshing rates:', error);
            // Error state
            this.statusDot.style.background = '#ef4444'; // Red for error
            this.statusText.textContent = 'Error';
            
            setTimeout(() => {
                this.statusDot.style.background = '#4ade80';
                this.statusText.textContent = 'Connected';
            }, 3000);
        } finally {
            // Remove loading state
            setTimeout(() => {
                this.refreshBtn.classList.remove('refreshing');
                this.extensionPopup.classList.remove('loading');
            }, 1200);
        }
    }

    async simulateRateUpdate() {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Generate slightly different rates to simulate real updates
                const buyVariation = (Math.random() - 0.5) * 0.15;
                const sellVariation = (Math.random() - 0.5) * 0.15;
                
                this.currentRates.buyRate = Math.max(47.80, Math.min(48.50, this.currentRates.buyRate + buyVariation));
                this.currentRates.sellRate = Math.max(47.90, Math.min(48.60, this.currentRates.sellRate + sellVariation));
                
                // Ensure sell rate is always higher than buy rate
                if (this.currentRates.sellRate <= this.currentRates.buyRate) {
                    this.currentRates.sellRate = this.currentRates.buyRate + 0.08;
                }
                
                console.log('New rates:', this.currentRates); // Debug log
                resolve();
            }, 1500);
        });
    }

    updateRatesDisplay() {
        const formattedBuyRate = this.currentRates.buyRate.toFixed(2);
        const formattedSellRate = this.currentRates.sellRate.toFixed(2);
        
        console.log('Updating display with rates:', formattedBuyRate, formattedSellRate); // Debug log
        
        // Animate rate changes
        this.animateRateChange(this.buyRateElement, formattedBuyRate);
        this.animateRateChange(this.sellRateElement, formattedSellRate);
        
        // Update badge
        this.iconBadge.textContent = formattedBuyRate;
        
        // Update table in the mockup
        const buyRateCell = document.querySelector('.ta3weem-mockup .buy-rate');
        const sellRateCell = document.querySelector('.ta3weem-mockup .sell-rate');
        
        if (buyRateCell) {
            this.animateRateChange(buyRateCell, `${formattedBuyRate} EGP`);
        }
        if (sellRateCell) {
            this.animateRateChange(sellRateCell, `${formattedSellRate} EGP`);
        }
    }

    animateRateChange(element, newValue) {
        if (!element) return;
        
        // Fade out
        element.style.transition = 'opacity 0.25s ease-out';
        element.style.opacity = '0.5';
        
        setTimeout(() => {
            element.textContent = newValue;
            // Fade back in with highlight
            element.style.opacity = '1';
            element.style.backgroundColor = 'rgba(34, 197, 94, 0.25)';
            element.style.transition = 'all 0.4s ease-out';
            
            // Remove highlight
            setTimeout(() => {
                element.style.backgroundColor = 'transparent';
            }, 1200);
        }, 250);
    }

    updateLastUpdated() {
        const now = new Date();
        const timeString = now.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
        
        if (this.lastUpdatedElement) {
            this.lastUpdatedElement.textContent = `Last updated: ${timeString}`;
        }
    }

    showSuccessAnimation() {
        // Brief success animation for the popup
        this.extensionPopup.style.transform = 'scale(1.05)';
        setTimeout(() => {
            this.extensionPopup.style.transform = 'scale(1)';
        }, 300);
        
        // Success animation for extension icon
        this.extensionIcon.style.transform = 'scale(1.15)';
        setTimeout(() => {
            this.extensionIcon.style.transform = this.isPopupVisible ? 'scale(1.1)' : 'scale(1)';
        }, 300);
    }

    startAutoUpdate() {
        // Simulate automatic updates every 5 minutes (shortened to 45 seconds for demo)
        setInterval(() => {
            if (Math.random() > 0.6) { // 40% chance of auto-update for demo
                this.simulateAutoUpdate();
            }
        }, 45000);
    }

    async simulateAutoUpdate() {
        // Only auto-update if popup is not visible to avoid interruption
        if (!this.isPopupVisible) {
            console.log('Auto-updating rates'); // Debug log
            await this.simulateRateUpdate();
            this.updateRatesDisplay();
            this.updateLastUpdated();
            
            // Show subtle notification
            this.showAutoUpdateNotification();
        }
    }

    showAutoUpdateNotification() {
        // Create and show a subtle notification
        const notification = document.createElement('div');
        notification.className = 'auto-update-notification';
        notification.textContent = '🔄 Rates updated';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--color-success) 0%, var(--color-teal-600) 100%);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Feature cards animation
class FeatureAnimation {
    constructor() {
        this.observeFeatureCards();
    }

    observeFeatureCards() {
        const featureCards = document.querySelectorAll('.feature-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1
        });

        featureCards.forEach((card) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
            observer.observe(card);
        });
    }
}

// Installation steps animation
class InstallationAnimation {
    constructor() {
        this.animateSteps();
    }

    animateSteps() {
        const steps = document.querySelectorAll('.step');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.2
        });

        steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
            step.style.transition = 'all 0.6s ease-out';
            observer.observe(step);
        });
    }
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading states to download buttons
function initDownloadButtons() {
    const downloadButtons = document.querySelectorAll('.download-buttons .btn');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't prevent default for actual download links
            const originalText = this.textContent;
            const originalBg = this.style.backgroundColor;
            
            this.textContent = '⬇️ Downloading...';
            this.style.opacity = '0.8';
            this.style.backgroundColor = 'var(--color-success)';
            this.style.color = 'white';
            
            setTimeout(() => {
                this.textContent = '✅ Downloaded!';
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                    this.style.backgroundColor = originalBg;
                    this.style.color = '';
                }, 1500);
            }, 800);
        });
    });
}

// Add interactive demo highlights
function initInteractiveHighlights() {
    // Highlight the extension icon periodically to draw attention
    setInterval(() => {
        const extensionIcon = document.getElementById('extensionIcon');
        if (extensionIcon && !document.getElementById('extensionPopup').classList.contains('visible')) {
            extensionIcon.style.animation = 'pulse-highlight 2s ease-in-out';
            setTimeout(() => {
                extensionIcon.style.animation = '';
            }, 2000);
        }
    }, 15000); // Every 15 seconds

    // Add pulse-highlight animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse-highlight {
            0%, 100% { 
                transform: scale(1); 
                box-shadow: none;
            }
            50% { 
                transform: scale(1.1); 
                box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.4);
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing extension demo'); // Debug log
    
    // Initialize main extension demo
    const demo = new ExtensionDemo();
    
    // Initialize animations
    new FeatureAnimation();
    new InstallationAnimation();
    
    // Initialize other features
    initSmoothScrolling();
    initDownloadButtons();
    initInteractiveHighlights();
    
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const popup = document.getElementById('extensionPopup');
            if (popup && !popup.classList.contains('hidden')) {
                demo.hidePopup();
            }
        }
    });
    
    // Add focus management
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    // Ensure all interactive elements have proper focus states
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--color-primary)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
            element.style.outlineOffset = '';
        });
    });

    // Add helpful instruction overlay
    setTimeout(() => {
        showInstructionOverlay();
    }, 2000);
});

// Show instruction overlay to guide users
function showInstructionOverlay() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-teal-800) 100%);
        color: white;
        padding: 20px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10001;
        text-align: center;
        max-width: 300px;
        opacity: 0;
        transition: all 0.3s ease-out;
    `;
    
    overlay.innerHTML = `
        <h3 style="margin: 0 0 8px 0; font-size: 16px;">👆 Try the Extension!</h3>
        <p style="margin: 0 0 16px 0; font-size: 14px; opacity: 0.9;">
            Click the extension icon in the browser toolbar above to see the popup in action.
        </p>
        <button id="gotItBtn" style="
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 13px;
            font-weight: 500;
        ">Got it!</button>
    `;

    document.body.appendChild(overlay);
    
    // Animate in
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
    });

    // Close button functionality
    overlay.querySelector('#gotItBtn').addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    });

    // Auto-close after 8 seconds
    setTimeout(() => {
        if (document.body.contains(overlay)) {
            overlay.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(overlay)) {
                    document.body.removeChild(overlay);
                }
            }, 300);
        }
    }, 8000);
}

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`🚀 Extension demo loaded in ${loadTime}ms`);
        }, 0);
    });
}