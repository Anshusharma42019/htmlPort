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

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            if (response.ok) {
                showToast('Message has been submitted successfully!', 'success');
                contactForm.reset();
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                showToast('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Error sending message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Toast notification
function showToast(message, type) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
