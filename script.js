document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // PRELOADER
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 300); // Small delay for smooth transition
        });
        
        // Fallback in case load event already fired or is delayed
        setTimeout(() => {
            if (!preloader.classList.contains('fade-out')) {
                preloader.classList.add('fade-out');
            }
        }, 2000);
    }

    // ==========================================================================
    // MOBILE NAVIGATION NAVIGATION TOGGLE
    // ==========================================================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // STICKY HEADER & BACK-TO-TOP BUTTON ON SCROLL
    // ==========================================================================
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Sticky Header Shrink
        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        // Back To Top Visibility
        if (backToTopBtn) {
            if (scrollY > 500) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
                backToTopBtn.style.transform = 'translateY(0)';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
                backToTopBtn.style.transform = 'translateY(10px)';
            }
        }
    });

    if (backToTopBtn) {
        // Smooth scroll to top
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================================================
    // SCROLL SPY (ACTIVE LINK ON SCROLL)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    
    function scrollSpy() {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset for sticky navbar
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active');
                } else {
                    correspondingLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', scrollSpy);

    // ==========================================================================
    // HERO TYPING EFFECT
    // ==========================================================================
    const typingTextElement = document.getElementById('typing-text');
    const roles = ["Software Developer", "IT Student", "Web Developer", "Problem Solver"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        if (!typingTextElement) return;

        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove character
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            // Add character
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }

        // Handle states
        if (!isDeleting && charIndex === currentRole.length) {
            // Role complete. Pause before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next role
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500; // Brief pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);

    // ==========================================================================
    // CONTACT FORM VALIDATION & SIMULATION
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Gather input values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation check
            if (!name || !email || !subject || !message) {
                showStatus('Please fill in all fields.', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showStatus('Please enter a valid email address.', 'error');
                return;
            }

            // Disable submit button during simulation
            if (submitBtn) {
                submitBtn.disabled = true;
                const btnText = submitBtn.querySelector('span');
                if (btnText) btnText.textContent = 'Sending...';
            }
            
            showStatus('Sending message...', 'info');
            
            // Simulate API request delay
            setTimeout(() => {
                // Mock successful submission
                showStatus(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
                contactForm.reset();
                
                // Re-enable submit button
                if (submitBtn) {
                    submitBtn.disabled = false;
                    const btnText = submitBtn.querySelector('span');
                    if (btnText) btnText.textContent = 'Send Message';
                }
            }, 1500);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function showStatus(msg, type) {
        if (!formStatus) return;
        
        formStatus.style.display = 'block';
        formStatus.textContent = msg;
        formStatus.className = 'form-status'; // Reset class
        
        if (type === 'success') {
            formStatus.classList.add('success');
        } else if (type === 'error') {
            formStatus.classList.add('error');
        } else {
            // General notification / sending status
            formStatus.style.backgroundColor = 'rgba(79, 172, 254, 0.1)';
            formStatus.style.border = '1px solid var(--accent-primary)';
            formStatus.style.color = 'var(--text-primary)';
        }
    }
});
