// ============================= style-switcher.js =============================

/* ======================= Style Switcher Toggle =======================*/
const styleSwitcherToggle = document.querySelector('.style-switcher-toggler'); // Fixed class name
const styleSwitcher = document.querySelector('.style-switcher');

// Toggle style switcher panel visibility
if (styleSwitcherToggle && styleSwitcher) {
    styleSwitcherToggle.addEventListener('click', () => {
        styleSwitcher.classList.toggle('open');
    });

    // Hide style switcher on scroll
    let scrollTimer = null;
    window.addEventListener('scroll', () => {
        // Clear existing timer
        if (scrollTimer) {
            clearTimeout(scrollTimer);
        }
        
        // Set timer to hide switcher after scroll stops
        scrollTimer = setTimeout(() => {
            if (styleSwitcher.classList.contains('open')) {
                styleSwitcher.classList.remove('open');
            }
        }, 150);
    });

    // Close style switcher when clicking outside
    document.addEventListener('click', (e) => {
        if (!styleSwitcher.contains(e.target) && !styleSwitcherToggle.contains(e.target)) {
            styleSwitcher.classList.remove('open');
        }
    });

    // Keyboard accessibility - close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && styleSwitcher.classList.contains('open')) {
            styleSwitcher.classList.remove('open');
            styleSwitcherToggle.focus();
        }
    });
}

/* ======================= Theme Colors =======================*/
// Function to set active style (referenced in HTML onclick)
function setActiveStyle(colorName) {
    const alternateStyles = document.querySelectorAll('.alternate-style');
    
    alternateStyles.forEach(style => {
        if (colorName === style.getAttribute('title')) {
            style.removeAttribute('disabled');
        } else {
            style.setAttribute('disabled', 'true');
        }
    });
}

// Color switcher functionality
const colorSwitchers = document.querySelectorAll('.colors span');
colorSwitchers.forEach(color => {
    color.addEventListener('click', function() {
        // Remove active class from all colors
        colorSwitchers.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked color
        this.classList.add('active');
        
        // Get the color class name
        const colorClass = this.classList[0]; // Gets 'color-1', 'color-2', etc.
        setActiveStyle(colorClass);
        
        // Save preference
        localStorage.setItem('selectedColor', colorClass);
    });
});

// Load saved color preference
window.addEventListener('load', () => {
    const savedColor = localStorage.getItem('selectedColor') || 'color-1';
    setActiveStyle(savedColor);
    
    // Set active class on the saved color
    const savedColorElement = document.querySelector(`.${savedColor}`);
    if (savedColorElement) {
        colorSwitchers.forEach(c => c.classList.remove('active'));
        savedColorElement.classList.add('active');
    }
});

/*--================theme Light and Dark mode================--*/
const dayNight = document.querySelector('.day-night');

if (dayNight) {
    dayNight.addEventListener('click', () => {
        dayNight.querySelector('i').classList.toggle('fa-sun');
        dayNight.querySelector('i').classList.toggle('fa-moon');
        document.body.classList.toggle('dark');
        
        // Save theme preference
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // Load saved theme
    window.addEventListener('load', () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark');
            dayNight.querySelector('i').classList.add('fa-sun');
            dayNight.querySelector('i').classList.remove('fa-moon');
        }
    });
}