// Navigation Tab Switching
let currentSectionIndex = 0;
const sectionOrder = ['home', 'what-is', 'origins', 'characteristics', 'timeline', 'impact'];

function switchToSection(sectionId, direction = 'right') {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.content-section');
    const targetElement = document.getElementById(sectionId);
    
    if (!targetElement) return;
    
    // Find and update active tab
    navTabs.forEach(tab => {
        if (tab.getAttribute('data-section') === sectionId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // Add exit animation to current section
    const currentSection = document.querySelector('.content-section.active');
    if (currentSection) {
        currentSection.classList.add(direction === 'right' ? 'slide-out-left' : 'slide-out-right');
        currentSection.classList.remove('active');
    }
    
    // Add enter animation to target section
    setTimeout(() => {
        targetElement.classList.add('active', direction === 'right' ? 'slide-in-right' : 'slide-in-left');
        
        // Clean up animation classes after animation completes
        setTimeout(() => {
            sections.forEach(section => {
                section.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slide-in-right');
            });
        }, 450);
    }, 50);
    
    // Update current index
    currentSectionIndex = sectionOrder.indexOf(sectionId);
}

function initNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = tab.getAttribute('data-section');
            const currentIndex = currentSectionIndex;
            const targetIndex = sectionOrder.indexOf(targetSection);
            const direction = targetIndex > currentIndex ? 'right' : 'left';
            
            switchToSection(targetSection, direction);
        });
    });
}

// Arrow key navigation
function initArrowKeyNavigation() {
    document.addEventListener('keydown', (e) => {
        // Right arrow or D key
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            e.preventDefault();
            const nextIndex = (currentSectionIndex + 1) % sectionOrder.length;
            switchToSection(sectionOrder[nextIndex], 'right');
        }
        // Left arrow or A key
        else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            e.preventDefault();
            const prevIndex = (currentSectionIndex - 1 + sectionOrder.length) % sectionOrder.length;
            switchToSection(sectionOrder[prevIndex], 'left');
        }
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Create observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class with a slight delay for staggered effect
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 100);
            
            // Optional: Unobserve after animation to prevent re-triggering
            // observer.unobserve(entry.target);
        } else {
            // Optional: Remove visible class when scrolling back up for repeat animations
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all info boxes
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navigation
    initNavigation();
    // Initialize arrow key navigation
    initArrowKeyNavigation();
    const infoBoxes = document.querySelectorAll('.info-box');
    
    infoBoxes.forEach((box, index) => {
        // Add staggered delay based on index
        box.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(box);
    });
    
    // Add parallax effect to background orbs
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
    });
    
    function animateOrbs() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;
        
        const orbs = document.querySelectorAll('.orb');
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = currentX * speed;
            const y = currentY * speed;
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
        
        requestAnimationFrame(animateOrbs);
    }
    
    animateOrbs();
    
    // Smooth scroll for better animation experience
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
    
    // Add glass reflection effect on hover
    const boxes = document.querySelectorAll('.box-content');
    boxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            box.style.transform = `
                translateY(-8px) 
                rotateY(${percentX * 3}deg) 
                rotateX(${-percentY * 3}deg)
            `;
        });
        
        box.addEventListener('mouseleave', () => {
            box.style.transform = 'translateY(0) rotateY(0) rotateX(0)';
        });
    });
    
    // Add 3D effect to glass spheres
    const spheres = document.querySelectorAll('.glass-sphere');
    spheres.forEach(sphere => {
        sphere.addEventListener('mousemove', (e) => {
            const rect = sphere.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const percentX = (x - centerX) / centerX;
            const percentY = (y - centerY) / centerY;
            
            sphere.style.transform = `
                translateY(-50%) 
                translateX(-50%)
                rotateY(${percentX * 10}deg) 
                rotateX(${-percentY * 10}deg)
                scale(1.05)
            `;
        });
        
        sphere.addEventListener('mouseleave', () => {
            sphere.style.transform = 'translateY(-50%) translateX(-50%) rotateY(0) rotateX(0) scale(1)';
        });
    });
    
    // Add sparkle effect on characteristic boxes
    const characteristics = document.querySelectorAll('.characteristic');
    characteristics.forEach(char => {
        char.addEventListener('mouseenter', function() {
            createSparkle(this);
        });
    });
    
    function createSparkle(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: white;
            border-radius: 50%;
            pointer-events: none;
            animation: sparkleFloat 1s ease-out forwards;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
    
    // Add sparkle animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleFloat {
            0% {
                opacity: 0;
                transform: translateY(0) scale(0);
            }
            50% {
                opacity: 1;
                transform: translateY(-20px) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-40px) scale(0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Smooth reveal of hero content
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 100);
    
    // Initialize hero content hidden
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization: Throttle scroll events
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // Add any scroll-based animations here
            ticking = false;
        });
        ticking = true;
    }
});
