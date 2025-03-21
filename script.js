document.addEventListener('DOMContentLoaded', function() {
    // Create floating particles
    createParticles();
    
    // Initialize animations
    initAnimations();
});

// Create floating particles in the background
function createParticles() {
    const particlesContainer = document.querySelector('.floating-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 2px and 6px
        const size = Math.random() * 4 + 2;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random opacity between 0.1 and 0.5
        const opacity = Math.random() * 0.4 + 0.1;
        
        // Random animation duration between 20s and 60s
        const duration = Math.random() * 40 + 20;
        
        // Random delay
        const delay = Math.random() * 10;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background-color: rgba(255, 255, 255, ${opacity});
            border-radius: 50%;
            top: ${posY}%;
            left: ${posX}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite alternate;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add the float animation to the stylesheet
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
            }
        }
    `;
    document.head.appendChild(styleSheet);
}

// Initialize animations for elements
function initAnimations() {
    // Animate detail items to appear one by one
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 500 + (index * 300));
    });
}