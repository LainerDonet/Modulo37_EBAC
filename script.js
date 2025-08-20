 // Smooth scrolling para enlaces internos
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

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(0, 0, 0, 0.98)';
            } else {
                header.style.background = 'rgba(0, 0, 0, 0.95)';
            }
        });

        // Watch animation
        const watchImage = document.getElementById('watchImage');
        let rotation = 0;
        
        watchImage.addEventListener('click', () => {
            rotation += 360;
            watchImage.style.transform = `rotate(${rotation}deg)`;
            watchImage.style.transition = 'transform 1s ease';
        });

        // Update watch time
        function updateWatchTime() {
            const now = new Date();
            const hours = now.getHours() % 12;
            const minutes = now.getMinutes();
            
            const hourAngle = (hours * 30) + (minutes * 0.5);
            const minuteAngle = minutes * 6;
            
            const hourHand = document.querySelector('.hour-hand');
            const minuteHand = document.querySelector('.minute-hand');
            
            if (hourHand && minuteHand) {
                hourHand.style.transform = `rotate(${hourAngle}deg)`;
                minuteHand.style.transform = `rotate(${minuteAngle}deg)`;
            }
        }

        // Update time every minute
        updateWatchTime();
        setInterval(updateWatchTime, 60000);

        // Form validation and submission
        const contactForm = document.getElementById('contactForm');
        const loading = document.getElementById('loading');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Email validation function
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Phone validation function
        function isValidPhone(phone) {
            const re = /^[\d\s\-\+\(\)]{10,}$/;
            return !phone || re.test(phone);
        }

        // Real-time validation
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        function showFieldError(field, message) {
            field.style.borderColor = '#dc3545';
            field.style.boxShadow = '0 0 10px rgba(220, 53, 69, 0.3)';
            
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.style.color = '#dc3545';
            errorDiv.style.fontSize = '0.9rem';
            errorDiv.style.marginTop = '0.5rem';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }

        function clearFieldError(field) {
            field.style.borderColor = '#555';
            field.style.boxShadow = 'none';
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }

        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length < 2) {
                showFieldError(this, 'El nombre debe tener al menos 2 caracteres');
            } else {
                clearFieldError(this);
            }
        });

        emailInput.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                showFieldError(this, 'Por favor ingresa un email válido');
            } else {
                clearFieldError(this);
            }
        });

        phoneInput.addEventListener('blur', function() {
            if (this.value && !isValidPhone(this.value)) {
                showFieldError(this, 'Por favor ingresa un teléfono válido');
            } else {
                clearFieldError(this);
            }
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const phone = formData.get('phone').trim();
            const interest = formData.get('interest');
            const message = formData.get('message').trim();
            
            // Validation
            let hasErrors = false;
            
            if (name.length < 2) {
                showFieldError(nameInput, 'El nombre debe tener al menos 2 caracteres');
                hasErrors = true;
            }
            
            if (!email) {
                showFieldError(emailInput, 'El email es requerido');
                hasErrors = true;
            } else if (!isValidEmail(email)) {
                showFieldError(emailInput, 'Por favor ingresa un email válido');
                hasErrors = true;
            }
            
            if (phone && !isValidPhone(phone)) {
                showFieldError(phoneInput, 'Por favor ingresa un teléfono válido');
                hasErrors = true;
            }
            
            if (hasErrors) {
                errorMessage.textContent = 'Por favor corrige los errores en el formulario';
                errorMessage.style.display = 'block';
                return;
            }
            
            // Show loading
            loading.style.display = 'flex';
            
            // Simulate form submission
            setTimeout(() => {
                loading.style.display = 'none';
                
                // Simulate success (90% success rate)
                if (Math.random() > 0.1) {
                    successMessage.style.display = 'block';
                    contactForm.reset();
                    
                    // Track conversion event (simulate analytics)
                    console.log('Conversion Event: Lead Generated', {
                        name: name,
                        email: email,
                        interest: interest,
                        timestamp: new Date().toISOString()
                    });
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'center'
                    });
                } else {
                    errorMessage.style.display = 'block';
                }
            }, 2000);
        });

        // Intersection Observer for animations
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

        // Animate elements on scroll
        document.querySelectorAll('.feature-card, .testimonial-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });

        // Hero button interaction
        const heroBtn = document.getElementById('heroBtn');
        heroBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });

        heroBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Mobile menu functionality (for future implementation)
        const createMobileMenu = () => {
            if (window.innerWidth <= 768) {
                const nav = document.querySelector('.nav-links');
                if (nav) {
                    nav.style.display = 'none';
                    
                    // Add mobile menu button
                    const menuButton = document.createElement('button');
                    menuButton.innerHTML = '☰';
                    menuButton.style.cssText = `
                        background: none;
                        border: none;
                        color: white;
                        font-size: 1.5rem;
                        cursor: pointer;
                        display: block;
                    `;
                    
                    menuButton.addEventListener('click', () => {
                        if (nav.style.display === 'none') {
                            nav.style.display = 'flex';
                            nav.style.position = 'absolute';
                            nav.style.top = '100%';
                            nav.style.left = '0';
                            nav.style.width = '100%';
                            nav.style.backgroundColor = 'rgba(0,0,0,0.95)';
                            nav.style.flexDirection = 'column';
                            nav.style.padding = '2rem';
                            menuButton.innerHTML = '✕';
                        } else {
                            nav.style.display = 'none';
                            menuButton.innerHTML = '☰';
                        }
                    });
                    
                    document.querySelector('.nav-container').appendChild(menuButton);
                }
            }
        };

        // Initialize mobile menu on load and resize
        window.addEventListener('load', createMobileMenu);
        window.addEventListener('resize', createMobileMenu);

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const speed = scrolled * 0.5;
                hero.style.transform = `translateY(${speed}px)`;
            }
        });

        // Dynamic pricing display (simulate different models)
        const models = {
            submariner: {
                name: 'Submariner Date',
                price: '$9,150 USD',
                ref: 'Ref. 126610LN'
            },
            datejust: {
                name: 'Datejust 31',
                price: '$6,300 USD',
                ref: 'Ref. 278274'
            },
            daytona: {
                name: 'Cosmograph Daytona',
                price: '$14,800 USD',
                ref: 'Ref. 116500LN'
            },
            gmt: {
                name: 'GMT-Master II',
                price: '$10,700 USD',
                ref: 'Ref. 126710BLNR'
            }
        };

        // Update product info based on selection
        const interestSelect = document.getElementById('interest');
        interestSelect.addEventListener('change', function() {
            const selectedModel = models[this.value];
            if (selectedModel) {
                // Create or update price display
                let priceDisplay = document.querySelector('.price-display');
                if (!priceDisplay) {
                    priceDisplay = document.createElement('div');
                    priceDisplay.className = 'price-display';
                    priceDisplay.style.cssText = `
                        background: linear-gradient(45deg, #d4af37, #f4d03f);
                        color: black;
                        padding: 1rem;
                        border-radius: 8px;
                        margin-top: 1rem;
                        text-align: center;
                        font-weight: 600;
                    `;
                    this.parentNode.appendChild(priceDisplay);
                }
                priceDisplay.innerHTML = `
                    <div style="font-size: 1.1rem;">${selectedModel.name}</div>
                    <div style="font-size: 1.3rem; margin: 0.5rem 0;">${selectedModel.price}</div>
                    <div style="font-size: 0.9rem; opacity: 0.8;">${selectedModel.ref}</div>
                `;
            }
        });

        // Add loading states to buttons
        document.querySelectorAll('.cta-primary').forEach(btn => {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#contact') {
                    // Add pulse animation
                    this.style.animation = 'pulse 0.3s ease';
                    setTimeout(() => {
                        this.style.animation = '';
                    }, 300);
                }
            });
        });

        // Add CSS for pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Performance optimization: Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
        }

        // Add countdown timer for special offers (optional feature)
        const createCountdown = (endDate) => {
            const countdown = document.createElement('div');
            countdown.style.cssText = `
                background: linear-gradient(45deg, #d4af37, #f4d03f);
                color: black;
                padding: 1rem;
                text-align: center;
                font-weight: 600;
                position: fixed;
                bottom: 20px;
                right: 20px;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                z-index: 1000;
                display: none;
            `;
            
            const updateCountdown = () => {
                const now = new Date().getTime();
                const distance = endDate - now;
                
                if (distance > 0) {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    
                    countdown.innerHTML = `
                        <div style="font-size: 0.9rem;">Oferta Especial</div>
                        <div>${days}d ${hours}h ${minutes}m</div>
                    `;
                    countdown.style.display = 'block';
                } else {
                    countdown.style.display = 'none';
                }
            };
            
            setInterval(updateCountdown, 60000);
            updateCountdown();
            
            document.body.appendChild(countdown);
        };

        // Activate countdown for special promotions
        // createCountdown(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)); // 7 days from now

        // Analytics tracking (simulate)
        const trackEvent = (eventName, properties = {}) => {
            console.log(`Analytics Event: ${eventName}`, {
                ...properties,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
        };

        // Track page views and interactions
        trackEvent('Page View', { page: 'Rolex Marketing Landing' });

        // Track scroll depth
        let maxScrollDepth = 0;
        window.addEventListener('scroll', () => {
            const scrollDepth = Math.round((window.scrollY + window.innerHeight) / document.body.scrollHeight * 100);
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                if (scrollDepth >= 25 && scrollDepth < 50) {
                    trackEvent('Scroll Depth', { depth: '25%' });
                } else if (scrollDepth >= 50 && scrollDepth < 75) {
                    trackEvent('Scroll Depth', { depth: '50%' });
                } else if (scrollDepth >= 75 && scrollDepth < 100) {
                    trackEvent('Scroll Depth', { depth: '75%' });
                } else if (scrollDepth >= 100) {
                    trackEvent('Scroll Depth', { depth: '100%' });
                }
            }
        });

        // Track CTA clicks
        document.querySelectorAll('.cta-primary').forEach(btn => {
            btn.addEventListener('click', () => {
                trackEvent('CTA Click', { 
                    text: btn.textContent.trim(),
                    location: btn.closest('section')?.id || 'unknown'
                });
            });
        });

        console.log('🕐 Rolex Marketing Page loaded successfully');
        console.log('⚡ All interactive features enabled');
        console.log('📊 Analytics tracking active');