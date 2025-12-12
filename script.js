// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (window.scrollY > 50) {
        navbar.style.background = isDark ? 
            'rgba(26, 26, 26, 0.98)' : 'rgba(248, 248, 248, 0.98)';
    } else {
        navbar.style.background = isDark ? 
            'rgba(26, 26, 26, 0.95)' : 'rgba(248, 248, 248, 0.95)';
    }
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const body = document.body;

function toggleMobileMenu() {
    const isActive = hamburger.classList.contains('active');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (!isActive) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
}

function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    body.style.overflow = '';
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Enhanced animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for child elements
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('visible');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all animation elements
const animationClasses = ['.fade-in', '.slide-in-left', '.slide-in-right', '.scale-in', '.bounce-in', '.rotate-in'];
animationClasses.forEach(className => {
    document.querySelectorAll(className).forEach(el => {
        observer.observe(el);
    });
});

// Enhanced counter animation with easing
function animateCounter(element, target) {
    let current = 0;
    const duration = 2000; // 2 seconds
    const startTime = performance.now();
    
    function easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
    }
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        
        current = Math.floor(easedProgress * target);
        element.textContent = current;
        
        // Add visual feedback
        element.style.transform = `scale(${1 + (easedProgress * 0.1)})`;
        element.style.color = `hsl(${45 + (easedProgress * 15)}, 100%, 50%)`;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.style.transform = 'scale(1)';
            element.style.color = 'var(--primary-yellow)';
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Start counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
});

const statsCard = document.querySelector('.stats-card');
if (statsCard) {
    statsObserver.observe(statsCard);
}

// Theme toggle
const themeToggles = document.querySelectorAll('.theme-toggle');

function toggleTheme() {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggles.forEach(toggle => toggle.textContent = '☀️');
        localStorage.setItem('theme', 'light');
        updateNavbarBackground('light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggles.forEach(toggle => toggle.textContent = '🌙');
        localStorage.setItem('theme', 'dark');
        updateNavbarBackground('dark');
    }
}

function updateNavbarBackground(theme) {
    const navbar = document.querySelector('.navbar');
    if (theme === 'dark') {
        navbar.style.background = window.scrollY > 50 ? 
            'rgba(26, 26, 26, 0.98)' : 'rgba(26, 26, 26, 0.95)';
    } else {
        navbar.style.background = window.scrollY > 50 ? 
            'rgba(248, 248, 248, 0.98)' : 'rgba(248, 248, 248, 0.95)';
    }
}

themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    themeToggles.forEach(toggle => toggle.textContent = '🌙');
}

// Project image click handler
function showProjectLinks(project) {
    const projects = {
        ecommerce: {
            github: 'https://github.com/anshusharma/ecommerce-platform',
            demo: 'ecommerce-demo.html'
        },
        banking: {
            github: 'https://github.com/anshusharma/banking-app',
            demo: 'banking-demo.html'
        },
        dashboard: {
            github: 'https://github.com/anshusharma/cloud-dashboard',
            demo: 'dashboard-demo.html'
        }
    };
    
    const projectData = projects[project];
    if (projectData) {
        const choice = confirm('Choose:\nOK = View Live Demo\nCancel = View GitHub Code');
        if (choice) {
            window.open(projectData.demo, '_blank');
        } else {
            window.open(projectData.github, '_blank');
        }
    }
}

// Add interactive animations
document.addEventListener('DOMContentLoaded', () => {
    // Add floating animation to feature icons
    const featureIcons = document.querySelectorAll('.feature-icon');
    featureIcons.forEach((icon, index) => {
        setTimeout(() => {
            icon.classList.add('float');
        }, index * 200);
    });
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.classList.add('pulse');
        });
        btn.addEventListener('mouseleave', () => {
            btn.classList.remove('pulse');
        });
    });
    

    
    // Add gradient animation to role text
    const roleText = document.querySelector('.role-text');
    if (roleText) {
        roleText.classList.add('animated-gradient');
    }
    
    // Add glow effect to availability card
    const availabilityCard = document.querySelector('.availability-card');
    if (availabilityCard) {
        availabilityCard.classList.add('glow');
    }
    
    // Smooth scroll with animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add bounce animation to target section
                target.style.animation = 'bounce-in 0.6s ease';
                setTimeout(() => {
                    target.style.animation = '';
                }, 600);
            }
        });
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const statsCard = document.querySelector('.stats-card');
        
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        if (statsCard) {
            statsCard.style.transform = `translateY(${scrolled * -0.05}px)`;
        }
    });
    
    // Add mouse follow effect
    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;
    const speed = 0.1;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        ballX += (mouseX - ballX) * speed;
        ballY += (mouseY - ballY) * speed;
        
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.left = ballX + 'px';
            cursor.style.top = ballY + 'px';
        }
        
        requestAnimationFrame(animate);
    }
    
    // Create custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: var(--primary-yellow);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.7;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    // Show custom cursor on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';
        animate();
        
        // Hide default cursor on interactive elements
        document.querySelectorAll('a, button, .btn, .project-card, .stat-box').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = '#ff6b35';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--primary-yellow)';
            });
        });
    }
});