// Profile Page JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Smooth scrolling for internal links (if any)
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

    // 2. External link tracking and analytics
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.opacity = '0.7';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 150);

            // Track external link clicks (uncomment if you have analytics)
            /*
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'external_link',
                    'event_label': this.href,
                    'value': 1
                });
            }
            */
        });
    });

    // 3. Email copy to clipboard functionality
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.href.replace('mailto:', '');
            
            // Try to copy to clipboard
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(email).then(() => {
                    showNotification('Email copied to clipboard!');
                }).catch(() => {
                    // Fallback: open email client
                    window.location.href = this.href;
                });
            } else {
                // Fallback: open email client
                window.location.href = this.href;
            }
        });
    }

    // 4. Add hover effects to links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 5. Add loading animation for profile image
    const profileImage = document.querySelector('.profile-image img');
    if (profileImage) {
        profileImage.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });
        
        // Set initial opacity
        profileImage.style.opacity = '0';
    }

    // 6. Add scroll-based animations (optional)
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

    // Observe sections for scroll animations
    document.querySelectorAll('.profile-section, .experience-section, .contact-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

});

// Helper function to show notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #1a202c;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add some CSS for better interactions
const style = document.createElement('style');
style.textContent = `
    a {
        transition: all 0.2s ease;
    }
    
    a:hover {
        text-decoration: underline;
    }
    
    .profile-image img {
        transition: transform 0.2s ease;
    }
    
    .profile-image:hover img {
        transform: scale(1.05);
    }
    
    .experience-item:hover,
    .contact-item:hover {
        background-color: rgba(49, 130, 206, 0.05);
        border-radius: 4px;
        padding: 4px 8px;
        margin: -4px -8px;
        transition: all 0.2s ease;
    }
`;
document.head.appendChild(style);
