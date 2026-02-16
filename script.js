// Scroll to Top Button
(function initScrollToTop() {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.setAttribute('aria-label', 'Scroll back to top');
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
    document.body.appendChild(btn);

    function toggleVisibility() {
        if (window.pageYOffset > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && navToggle) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Contact Form Submission - sends to FormSubmit.co (helpdesk@maxproinfotech.com)
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        
        // Disable button and show loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        if (formError) formError.classList.remove('show');
        
        try {
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Add subject for email
            data._subject = `Contact Form: ${data.firstName} ${data.lastName} from ${data.company}`;
            data._replyto = data.email;
            
            const response = await fetch('https://formsubmit.co/ajax/helpdesk@maxproinfotech.com', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok && (result.success === true || result.success === 'true')) {
                contactForm.style.display = 'none';
                formSuccess.classList.add('show');
                formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                contactForm.reset();
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (err) {
            console.error('Form submission error:', err);
            if (formError) {
                formError.textContent = 'Something went wrong. Please try again or email us directly at helpdesk@maxproinfotech.com';
                formError.classList.add('show');
            }
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Intersection Observer for fade-in animations
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
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.solution-card, .feature-card, .product-card-large, .service-detail');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active navigation link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 9;
}

// Add real-time validation to form inputs
if (contactForm) {
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            if (!validateEmail(emailInput.value)) {
                emailInput.style.borderColor = '#EF4444';
            } else {
                emailInput.style.borderColor = '#10B981';
            }
        });
    }
    
    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            if (!validatePhone(phoneInput.value)) {
                phoneInput.style.borderColor = '#EF4444';
            } else {
                phoneInput.style.borderColor = '#10B981';
            }
        });
    }
}

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.form && this.form.checkValidity()) {
            this.textContent = 'Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                this.textContent = 'Send Message';
                this.disabled = false;
            }, 2000);
        }
    });
});

// Stats counter animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observe stat numbers and animate when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const target = entry.target;
            const originalText = target.textContent.trim();
            // Extract numeric part and suffix (e.g. "100+" → 100, "+" | "1M+" → 1, "M+")
            const match = originalText.match(/^(\d+)(.*)$/);
            const endValue = match ? parseInt(match[1], 10) : parseInt(originalText) || 0;
            target.dataset.suffix = match ? match[2] : '';
            target.dataset.animated = 'true';
            animateValue(target, 0, endValue, 2000);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card h3, .stat-item h3, .product-stat strong').forEach(stat => {
    statObserver.observe(stat);
});

// Add hover effects to cards
document.querySelectorAll('.solution-card, .feature-card, .product-card-large').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Hero floating lines background – WebGL shader-based animated lines
(function initFloatingLines() {
    const container = document.getElementById('heroFloatingLinesContainer');
    if (!container || typeof window.initFloatingLines !== 'function') return;

    window.initFloatingLines(container, {
        enabledWaves: ['top', 'middle', 'bottom'],
        lineCount: 5,
        lineDistance: 5,
        bendRadius: 5,
        bendStrength: -0.5,
        interactive: true,
        parallax: true,
        animationSpeed: 1,
        parallaxStrength: 0.2,
        mixBlendMode: 'screen',
        linesGradient: ['#47caf5', '#00d4ff', '#2F4BC0'] // cyan–blue to match brand
    });
})();

// Console welcome message
console.log('%c🚀 Maxpro Infotech Limited', 'color: #0066CC; font-size: 24px; font-weight: bold;');
console.log('%cDriving Digital Transformation Across Africa', 'color: #64748B; font-size: 14px;');
console.log('%cVisit us at: https://maxproinfotech.com', 'color: #0066CC; font-size: 12px;');
