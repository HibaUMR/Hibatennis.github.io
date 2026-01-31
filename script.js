// ===========================
// NAVIGATION
// ===========================

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// ACTIVE LINK HIGHLIGHTING
// ===========================

function highlightActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navHeight = document.querySelector('.navbar').offsetHeight;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================

function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.rule-card, .slam-card, .icon-card');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('reveal', 'active');
        }
    });
}

// Add reveal class to elements on initial load
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.rule-card, .slam-card, .icon-card');
    cards.forEach(card => {
        card.classList.add('reveal');
    });
});

// ===========================
// PARALLAX EFFECT FOR HERO
// ===========================

function parallaxHero() {
    const hero = document.querySelector('.hero-section');
    if (!hero) return;
    
    const scrolled = window.scrollY;
    const parallaxSpeed = 0.5;
    
    hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
}

// ===========================
// IMAGE LAZY LOADING EFFECT
// ===========================

function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===========================
// SCROLL TO TOP ON LOGO CLICK
// ===========================

const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===========================
// COUNTER ANIMATION FOR STATS
// ===========================

function animateCounters() {
    const badges = document.querySelectorAll('.icon-badge');
    
    badges.forEach(badge => {
        const target = parseInt(badge.textContent);
        if (isNaN(target)) return;
        
        let count = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            count += increment;
            if (count >= target) {
                badge.textContent = target + ' Grand Slams';
                clearInterval(counter);
            } else {
                badge.textContent = Math.floor(count) + ' Grand Slams';
            }
        }, stepTime);
    });
}

// Trigger counter animation when icons section is visible
let countersAnimated = false;
function checkCountersVisibility() {
    const iconsSection = document.querySelector('.icons-section');
    if (!iconsSection) return;
    
    const rect = iconsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isVisible && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
    }
}

// ===========================
// CARD TILT EFFECT (Optional Enhancement)
// ===========================

function addCardTiltEffect() {
    const cards = document.querySelectorAll('.rule-card, .slam-card, .icon-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ===========================
// TYPING EFFECT FOR HERO SUBTITLE
// ===========================

function typeWriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    subtitle.style.opacity = '1';
    
    let i = 0;
    const speed = 80;
    
    function type() {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    setTimeout(type, 1000);
}

// ===========================
// SCROLL PROGRESS INDICATOR
// ===========================

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #fbbf24, #3b82f6);
        z-index: 9999;
        width: 0%;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// ===========================
// EVENT LISTENERS
// ===========================

window.addEventListener('scroll', () => {
    highlightActiveSection();
    handleNavbarScroll();
    revealOnScroll();
    parallaxHero();
    checkCountersVisibility();
});

// ===========================
// INITIALIZATION
// ===========================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    highlightActiveSection();
    handleNavbarScroll();
    revealOnScroll();
    lazyLoadImages();
    typeWriterEffect();
    createScrollProgress();
    addCardTiltEffect();
    
    // Add smooth scroll behavior to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Prevent default behavior on logo
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.cursor = 'pointer';
    }
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================

// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Use debounced scroll handler
window.addEventListener('scroll', debounce(() => {
    highlightActiveSection();
    handleNavbarScroll();
    revealOnScroll();
    checkCountersVisibility();
}, 10));

// ===========================
// EASTER EGG: TENNIS BALL CURSOR
// ===========================

function createTennisBallCursor() {
    // Only on desktop
    if (window.innerWidth < 768) return;
    
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #d4ff00, #8bc34a);
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
}

// Uncomment to enable tennis ball cursor
// createTennisBallCursor();