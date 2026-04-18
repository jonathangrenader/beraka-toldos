document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Cierra el menú al hacer clic en un enlace (para móviles)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });

    // --- POPUP MODAL FUNCTIONALITY ---
    const popupModal = document.getElementById('popupModal');
    const popupClose = document.getElementById('popupClose');
    let autoCloseTimer;

    // Function to show popup
    function showPopup() {
        popupModal.style.display = 'flex';
        // Trigger animation after a brief delay
        setTimeout(() => {
            popupModal.classList.add('active');
        }, 10);
        
        // Auto-close after 10 seconds
        autoCloseTimer = setTimeout(() => {
            closePopup();
        }, 10000);
    }

    // Function to close popup
    function closePopup() {
        popupModal.classList.remove('active');
        // Clear auto-close timer
        if (autoCloseTimer) {
            clearTimeout(autoCloseTimer);
        }
        // Hide after animation completes
        setTimeout(() => {
            popupModal.style.display = 'none';
        }, 300);
    }

    // Function to check if popup should be shown
    function shouldShowPopup() {
        const lastShown = localStorage.getItem('berakaPopupLastShown');
        const now = new Date().getTime();
        
        // If never shown or more than 24 hours have passed
        if (!lastShown || (now - parseInt(lastShown)) > 24 * 60 * 60 * 1000) {
            // Store current time
            localStorage.setItem('berakaPopupLastShown', now.toString());
            return true;
        }
        return false;
    }

    // Show popup after 2 seconds if conditions are met
    if (shouldShowPopup()) {
        setTimeout(() => {
            showPopup();
        }, 2000);
    }

    // Close popup when clicking X button
    popupClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closePopup();
    });

    // Close popup when clicking overlay
    popupModal.addEventListener('click', (e) => {
        if (e.target === popupModal) {
            closePopup();
        }
    });

    // Prevent closing when clicking on popup content
    popupModal.querySelector('.popup-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });
});