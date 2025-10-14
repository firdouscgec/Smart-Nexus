document.addEventListener('DOMContentLoaded', () => {
    const sliderContainers = document.querySelectorAll('.slider-container');
    
    sliderContainers.forEach(container => {
        const slider = container.querySelector('.projects-slider, .websites-slider');
        const prevBtn = container.querySelector('.prev-btn');
        const nextBtn = container.querySelector('.next-btn');

        if (!slider || !prevBtn || !nextBtn) {
            console.warn('Slider elements missing:', container);
            return;
        }

        // Dynamically calculate card width
        const firstCard = slider.querySelector('.project-card');
        if (!firstCard) return;
        const cardWidth = firstCard.offsetWidth + parseInt(getComputedStyle(firstCard).marginRight);

        let scrollAmount = 0;

        nextBtn.addEventListener('click', () => {
            scrollAmount += cardWidth;
            // Prevent overscrolling
            if (scrollAmount > slider.scrollWidth - slider.clientWidth) {
                scrollAmount = slider.scrollWidth - slider.clientWidth;
            }
            slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            scrollAmount -= cardWidth;
            if (scrollAmount < 0) scrollAmount = 0;
            slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
        });

        // Touch support
        let touchStartX = 0;
        slider.addEventListener('touchstart', e => {
            touchStartX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', e => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) nextBtn.click();
                else prevBtn.click();
            }
        });
    });
});
