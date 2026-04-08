/**
 * Splash Screen Logic
 * Transitions from Blank -> With Logo -> (Redirect or Hide)
 */

function runSplashScreen(targetUrl = null) {
    const splashContainer = document.getElementById('splash-container');
    const splashWithLogo = document.getElementById('splash-with-logo');
    const splashBlank = document.getElementById('splash-blank');

    if (!splashContainer) return;

    // Initial delay for the "Blank" screen
    setTimeout(() => {
        // Show the screen with logo
        if (splashWithLogo) {
            splashWithLogo.classList.add('active');
        }
    }, 600); // 600ms of blank screen before logo starts animating in
    
    // Final action: redirect or hide after the logo has been shown long enough
    setTimeout(() => {
        // Add a fade out to the container
        splashContainer.classList.add('fade-out');
        
        setTimeout(() => {
            if (targetUrl) {
                window.location.href = targetUrl;
            } else {
                // If no redirect, set the container to display none to remove it from layout
                splashContainer.style.display = 'none';
                document.body.classList.remove('splash-body');
                document.body.style.overflow = '';
            }
        }, 800); // Offset with the fade-out duration
    }, 4000); // Total splash time approx 4 seconds
}

// Auto-run if we are on the splash.html page
if (window.location.pathname.includes('splash.html')) {
    document.addEventListener('DOMContentLoaded', () => runSplashScreen('index.html'));
}
