// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add click handlers for all buttons
    initializeButtonHandlers();
    
    // Add hero CTA buttons
    addHeroCTAButtons();
    
    // Add interactive elements
    addInteractiveElements();

    // Header background change on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(30, 58, 138, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #1e3a8a, #3b82f6)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .product-content, .collaboration-content, .about-content');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Pricing card hover effects
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('featured')) {
                this.style.transform = 'scale(1.05)';
            } else {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        const btn = card.querySelector('.btn-outline');
        
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceTitle = card.querySelector('.service-title').textContent;
            
            // Create modal or redirect to service page
            showServiceModal(serviceTitle);
        });
    });

    // Button click animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Mobile menu functionality
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('active');
        }
    };

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (mobileMenu && mobileToggle && !mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Form handling (if forms are added later)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            console.log('Form submitted');
        });
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        statsObserver.observe(stat);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroIllustration = document.querySelector('.hero-illustration');
        
        if (heroIllustration) {
            heroIllustration.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Testimonial carousel (if multiple testimonials)
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length > 3) {
        // Implement carousel functionality
        setInterval(() => {
            testimonials.forEach((testimonial, index) => {
                testimonial.style.display = index >= currentTestimonial && index < currentTestimonial + 3 ? 'block' : 'none';
            });
            
            currentTestimonial = (currentTestimonial + 1) % (testimonials.length - 2);
        }, 5000);
    }
});

// Service modal function
function showServiceModal(serviceTitle) {
    const modal = document.createElement('div');
    modal.className = 'service-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${serviceTitle}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Learn more about our ${serviceTitle.toLowerCase()} services. Contact us for a detailed consultation.</p>
                <div class="modal-actions">
                    <button class="btn btn-primary">Contact Us</button>
                    <button class="btn btn-outline modal-close-btn">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeModal = () => {
        modal.remove();
    };
    
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-close-btn').addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Counter animation function
function animateCounter(element) {
    const originalText = element.textContent;
    
    // Don't animate 24/7 - it should remain static
    if (originalText.includes('24/7')) {
        return; // Skip animation for 24/7 support
    }
    
    const target = parseInt(originalText.replace(/\D/g, ''));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (originalText.includes('+')) {
            element.textContent = Math.floor(current) + '+';
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Add CSS for modal and ripple effect
const additionalStyles = `
    .service-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .modal-content {
        background: white;
        border-radius: 16px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #6b7280;
    }
    
    .modal-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1.5rem;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mobile-menu-btn {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(30, 58, 138, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 1rem;
            display: none;
        }
        
        .nav-menu.show {
            display: flex;
        }
    }
`;

// Initialize all button handlers
function initializeButtonHandlers() {
    // Service card buttons - Get Started buttons
    const getStartedButtons = document.querySelectorAll('.btn[onclick*="window.open"]');
    getStartedButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://studio-eight-weld.vercel.app/', '_blank');
        });
    });

    // Contact buttons
    const contactButtons = document.querySelectorAll('.btn[onclick*="scrollToContact"], .btn:contains("Contact")');
    contactButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
        });
    });

    // StudiQ platform button (in products section)
    const studiQButton = document.querySelector('#products .btn-primary');
    if (studiQButton) {
        studiQButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://studio--learnflow-ai-co3xd.us-central1.hosted.app', '_blank');
        });
    }

    // Social media links
    const socialLinks = document.querySelectorAll('a[href*="instagram"], a[href*="twitter"], a[href*="linkedin"], a[href*="whatsapp"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('href');
            window.open(url, '_blank');
        });
    });

    // Footer links
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                scrollToSection(href);
            } else if (href.includes('.html')) {
                window.location.href = href;
            }
        });
    });

    // Logo click to scroll to top
    const logo = document.querySelector('.logo-text');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        logo.style.cursor = 'pointer';
    }

    // Add click handlers to all section titles for smooth scrolling
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.addEventListener('click', function() {
            const section = this.closest('section');
            if (section && section.id) {
                scrollToSection('#' + section.id);
            }
        });
        title.style.cursor = 'pointer';
    });
}

// Add hero CTA buttons
function addHeroCTAButtons() {
    const heroSection = document.querySelector('.hero');
    if (heroSection && !heroSection.querySelector('.hero-actions')) {
        const heroText = heroSection.querySelector('.hero-text');
        const heroActions = document.createElement('div');
        heroActions.className = 'hero-actions';
        heroActions.innerHTML = `
            <button class="btn btn-primary btn-large" onclick="scrollToSection('#services')">
                Explore Services <i class="fas fa-arrow-right"></i>
            </button>
            <button class="btn btn-outline btn-large" onclick="scrollToSection('#products')">
                View Products <i class="fas fa-play"></i>
            </button>
        `;
        heroText.appendChild(heroActions);
    }
}

// Add interactive elements
function addInteractiveElements() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.service-card, .contact-item, .feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });
    });

    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Create ripple effect
            createRippleEffect(this, e);
        });
    });

    // Add scroll animations
    addScrollAnimations();
}

// Create ripple effect for buttons
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .contact-item, .product-content, .collaboration-content, .about-content, .feature-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Scroll to specific section
function scrollToSection(sectionId) {
    const section = document.querySelector(sectionId);
    if (section) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = section.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Scroll to contact function
function scrollToContact() {
    scrollToSection('#contact');
}

// Open Elara Tech Labs platform function
function openElaraTechLabs() {
    window.open('https://studio-eight-weld.vercel.app/', '_blank');
}

// Open StudiQ platform function
function openStudiQ() {
    window.open('https://studio--learnflow-ai-co3xd.us-central1.hosted.app', '_blank');
}

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
