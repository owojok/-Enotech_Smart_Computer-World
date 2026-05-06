/**
 * Modular Modal Logic
 * Handles opening, closing, and event bindings for the product details modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    if (!modal) return; // Exit if modal doesn't exist on page

    const closeBtn = modal.querySelector('.js-modal-close');
    const overlay = modal.querySelector('.js-modal-overlay');
    const triggerButtons = document.querySelectorAll('[data-modal-target="productModal"]');

    // Function to open modal
    const openModal = (e) => {
        if (e) e.preventDefault();
        
        // In a real app, we would fetch product data here based on e.currentTarget.dataset.productId
        // and populate the modal DOM elements before showing it.
        
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    // Function to close modal
    const closeModal = () => {
        modal.classList.remove('is-active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Bind Open Events
    triggerButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    // Bind Close Events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('is-active')) {
            closeModal();
        }
    });
});
