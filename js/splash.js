/**
 * Splash Screen Logic
 * Transitions from Blank -> With Logo -> index.html
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initial delay for the "Blank" screen
    // It's already showing the blank screen by default (as per CSS .active classes)
    
    setTimeout(() => {
        // Show the screen with logo
        const splashWithLogo = document.getElementById('splash-with-logo');
        if (splashWithLogo) {
            splashWithLogo.classList.add('active');
        }
        
        // Optionally, we can remove the blank screen, but since the logo one is absolute, it will layer over nicely
        // Let's just keep it for consistency or fade it out if needed.
    }, 600); // 600ms of blank screen before logo starts animating in
    
    // Final redirect to index.html after the logo has been shown long enough
    setTimeout(() => {
        // Add a fade out to the entire body for a smooth transition to the next page
        document.body.style.transition = 'opacity 0.8s ease';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    }, 4200); // Total splash time approx 4.2 seconds
});
