document.addEventListener('DOMContentLoaded', function() {
    // ========== Mobile Navigation ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // ========== Sticky Navigation ==========
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });

    // ========== Smooth Scrolling ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== Testimonial Slider ==========
    const initTestimonialSlider = () => {
        const slider = document.querySelector('.testimonial-slider');
        if (!slider) return;

        let isDown = false;
        let startX;
        let scrollLeft;
        
        const handleStart = (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        };
        
        const handleEnd = () => {
            isDown = false;
            slider.classList.remove('active');
        };
        
        const handleMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        };
        
        // Mouse events
        slider.addEventListener('mousedown', handleStart);
        slider.addEventListener('mouseleave', handleEnd);
        slider.addEventListener('mouseup', handleEnd);
        slider.addEventListener('mousemove', handleMove);
        
        // Touch events
        slider.addEventListener('touchstart', handleStart);
        slider.addEventListener('touchend', handleEnd);
        slider.addEventListener('touchmove', handleMove);
    };
    initTestimonialSlider();

    // ========== Form Handling ==========
    const handleFormSubmit = (form, successMessage) => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            try {
                // Simulate API call (replace with actual fetch to your PHP backend)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                showToast(successMessage, 'success');
                this.reset();
            } catch (error) {
                showToast('An error occurred. Please try again.', 'error');
            } finally {
                // Reset button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    };

    // Initialize all forms
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        handleFormSubmit(contactForm, 'Thank you for your message! We will get back to you soon.');
    }

    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!validateEmail(emailInput.value)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate subscription
            showToast('Thank you for subscribing to our newsletter!', 'success');
            emailInput.value = '';
        });
    }

    // Email validation helper
    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    // ========== Toast Notifications ==========
    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : '<i class="fas fa-exclamation-circle"></i>'}
            </div>
            <div class="toast-message">${message}</div>
            <button class="toast-close"><i class="fas fa-times"></i></button>
        `;
        
        document.body.appendChild(toast);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 300);
        });
    };

    // ========== Scroll Animations ==========
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.service-card, .value-card, .team-member, .info-card, ' +
            '.post-card, .case-card, .service-section, .featured-content'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in-up');
            }
        });
    };

    // Initial check on page load
    animateOnScroll();
    
    // Check on scroll with throttle
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            animateOnScroll();
        }, 66); // ~15fps
    });

    // ========== Back to Top Button ==========
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        backToTopBtn.classList.toggle('show', window.scrollY > 300);
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========== Interactive Elements ==========
    // Add hover effects to all buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // ========== Current Year in Footer ==========
    const yearElement = document.querySelector('.current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ========== Additional CSS for JS components ==========
const addDynamicStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Toast Notifications */
        .toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            gap: 15px;
            z-index: 9999;
            transform: translateY(30px);
            opacity: 0;
            animation: toastIn 0.3s ease forwards;
            max-width: 350px;
            box-shadow: var(--shadow-lg);
        }
        
        .toast.success {
            background-color: #10b981;
            color: white;
        }
        
        .toast.error {
            background-color: #ef4444;
            color: white;
        }
        
        .toast-icon {
            font-size: 1.5rem;
        }
        
        .toast-message {
            flex: 1;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            padding: 0;
            font-size: 1rem;
            opacity: 0.8;
            transition: var(--transition);
        }
        
        .toast-close:hover {
            opacity: 1;
        }
        
        .fade-out {
            animation: toastOut 0.3s ease forwards;
        }
        
        @keyframes toastIn {
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @keyframes toastOut {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(30px);
                opacity: 0;
            }
        }
        
        /* Back to Top Button */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: var(--primary);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.25rem;
            box-shadow: var(--shadow);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: var(--transition);
            z-index: 99;
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .back-to-top:hover {
            background-color: var(--primary-dark);
            transform: translateY(-5px);
        }
        
        /* No scroll when mobile menu is open */
        .no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
};

// Add dynamic styles when DOM is loaded
document.addEventListener('DOMContentLoaded', addDynamicStyles);