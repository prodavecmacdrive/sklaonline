// Product Image Slider
document.addEventListener('DOMContentLoaded', function() {
    // Initialize slider
    let currentSlide = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    const mainImage = document.querySelector('.product-main-image');
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const prevButton = document.querySelector('.slide-prev');
    const nextButton = document.querySelector('.slide-next');
    const slideCounter = document.querySelector('.slide-counter');
    const imageContainer = document.querySelector('.product-image-container');
    const totalSlides = thumbnails.length;

    // Touch events for swiping
    imageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, false);

    imageContainer.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Prevent scrolling while swiping
    }, false);

    imageContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    }, false);

    // Handle swipe direction
    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - previous slide
                updateSlide((currentSlide - 1 + totalSlides) % totalSlides);
            } else {
                // Swipe left - next slide
                updateSlide((currentSlide + 1) % totalSlides);
            }
        }
    }

    // Update slide content and styling
    function updateSlide(index) {
        currentSlide = index;
        const newSrc = thumbnails[index].querySelector('img').src;
        
        // Add slide transition effect
        mainImage.style.opacity = '0';
        mainImage.style.transform = 'translateX(20px)';
        
        setTimeout(() => {
            mainImage.src = newSrc;
            mainImage.style.opacity = '1';
            mainImage.style.transform = 'translateX(0)';
        }, 300);

        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

        // Update thumbnail borders
        thumbnails.forEach((thumb, i) => {
            if (i === currentSlide) {
                thumb.classList.remove('border-gray-200');
                thumb.classList.add('border-primary');
            } else {
                thumb.classList.remove('border-primary');
                thumb.classList.add('border-gray-200');
            }
        });
    }

    // Add click handlers for thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => updateSlide(index));
    });

    // Add click handlers for prev/next buttons
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(currentSlide);
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide(currentSlide);
    });

    // Initialize first slide
    updateSlide(0);

    // Add zoom functionality
    imageContainer.addEventListener('mousemove', (e) => {
        if (!imageContainer.classList.contains('cursor-zoom-in')) return;
        
        const rect = imageContainer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        mainImage.style.transformOrigin = `${x * 100}% ${y * 100}%`;
        mainImage.style.transform = 'scale(1.5)';
    });

    imageContainer.addEventListener('mouseleave', () => {
        mainImage.style.transform = 'scale(1)';
    });
});

// Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabTriggers = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    function switchTab(oldTab, newTab) {
        // Update tab button states
        newTab.setAttribute('aria-selected', 'true');
        newTab.classList.add('data-[state=active]:bg-background', 'data-[state=active]:text-foreground', 'data-[state=active]:shadow-sm');
        oldTab.setAttribute('aria-selected', 'false');
        oldTab.classList.remove('data-[state=active]:bg-background', 'data-[state=active]:text-foreground', 'data-[state=active]:shadow-sm');
        
        // Get panel elements
        const newPanelId = newTab.getAttribute('aria-controls');
        const oldPanelId = oldTab.getAttribute('aria-controls');
        const newPanel = document.getElementById(newPanelId);
        const oldPanel = document.getElementById(oldPanelId);

        // Update panel visibility with transition
        if (newPanel && oldPanel) {
            oldPanel.style.opacity = '0';
            oldPanel.setAttribute('data-state', 'inactive');
            oldPanel.hidden = true;

            newPanel.hidden = false;
            newPanel.setAttribute('data-state', 'active');
            requestAnimationFrame(() => {
                newPanel.style.opacity = '1';
            });
        }
    }

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const oldTab = document.querySelector('[aria-selected="true"]');
            if (e.currentTarget !== oldTab) {
                switchTab(oldTab, e.currentTarget);
            }
        });
    });
});