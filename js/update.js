// DOM manipulation utilities
const DOMUtils = {
    // Toggles an element's visibility with a slide animation
    slideToggle: function(element, duration = 300) {
        if (!element) return;

        if (element.style.display === 'none' || !element.style.display) {
            element.style.display = 'block';
            let height = element.offsetHeight;
            element.style.overflow = 'hidden';
            element.style.height = 0;
            element.style.transitionProperty = 'height';
            element.style.transitionDuration = `${duration}ms`;
            element.offsetHeight; // Force reflow
            element.style.height = height + 'px';
            
            setTimeout(() => {
                element.style.removeProperty('overflow');
                element.style.removeProperty('height');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
            }, duration);
        } else {
            element.style.overflow = 'hidden';
            element.style.height = element.offsetHeight + 'px';
            element.offsetHeight; // Force reflow
            element.style.transitionProperty = 'height';
            element.style.transitionDuration = `${duration}ms`;
            element.style.height = 0;
            
            setTimeout(() => {
                element.style.display = 'none';
                element.style.removeProperty('overflow');
                element.style.removeProperty('height');
                element.style.removeProperty('transition-duration');
                element.style.removeProperty('transition-property');
            }, duration);
        }
    },

    // Handles click outside of an element
    handleClickOutside: function(element, callback) {
        document.addEventListener('click', (event) => {
            if (!element.contains(event.target)) {
                callback();
            }
        });
    }
};

// Initialize catalog dropdown menu
function initCatalogDropdown() {
    // Get the catalog button and create the dropdown menu
    const catalogButton = document.querySelector('button.flex.items-center.space-x-2.py-3');
    if (!catalogButton) return;

    // Create and append the dropdown menu
    const dropdownMenu = document.createElement('div');
    dropdownMenu.className = 'absolute left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 mt-1';
    dropdownMenu.style.display = 'none';
    dropdownMenu.innerHTML = `
        <div class="container mx-auto px-4 py-4">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <a href="./catalog.html" class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-accent">
                    <div class="text-primary group-hover:text-primary/80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path><path d="M8 2v20"></path><path d="M16 2v20"></path></svg>
                    </div>
                    <div>
                        <h4 class="font-medium">Сумки</h4>
                        <p class="text-sm text-muted-foreground">Жіночі та чоловічі сумки</p>
                    </div>
                </a>
                <a href="./catalog.html" class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-accent">
                    <div class="text-primary group-hover:text-primary/80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </div>
                    <div>
                        <h4 class="font-medium">Рюкзаки</h4>
                        <p class="text-sm text-muted-foreground">Міські та туристичні рюкзаки</p>
                    </div>
                </a>
                <a href="./catalog.html" class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-accent">
                    <div class="text-primary group-hover:text-primary/80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M2 6h20v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z"></path><path d="M2 6V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v2"></path><path d="M12 12h.01"></path></svg>
                    </div>
                    <div>
                        <h4 class="font-medium">Гаманці</h4>
                        <p class="text-sm text-muted-foreground">Гаманці та портмоне</p>
                    </div>
                </a>
                <a href="./catalog.html" class="group flex items-center space-x-3 p-3 rounded-lg hover:bg-accent">
                    <div class="text-primary group-hover:text-primary/80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"></path></svg>
                    </div>
                    <div>
                        <h4 class="font-medium">Аксесуари</h4>
                        <p class="text-sm text-muted-foreground">Ремені та інші аксесуари</p>
                    </div>
                </a>
            </div>
        </div>
    `;

    // Append the dropdown to the navigation container
    const navContainer = catalogButton.closest('nav');
    if (navContainer) {
        navContainer.appendChild(dropdownMenu);
    }

    let isDropdownVisible = false;

    // Toggle dropdown on button click
    catalogButton.addEventListener('click', (event) => {
        event.stopPropagation();
        isDropdownVisible = !isDropdownVisible;
        DOMUtils.slideToggle(dropdownMenu);
        
        // Update button styles
        const chevron = catalogButton.querySelector('img[alt="Chevron Down"]');
        if (chevron) {
            chevron.style.transform = isDropdownVisible ? 'rotate(180deg)' : 'rotate(0deg)';
            chevron.style.transition = 'transform 0.3s ease';
        }
    });

    // Close dropdown when clicking outside
    DOMUtils.handleClickOutside(navContainer, () => {
        if (isDropdownVisible) {
            isDropdownVisible = false;
            DOMUtils.slideToggle(dropdownMenu);
            
            // Reset chevron rotation
            const chevron = catalogButton.querySelector('img[alt="Chevron Down"]');
            if (chevron) {
                chevron.style.transform = 'rotate(0deg)';
            }
        }
    });
}

// Banner slider functionality
function initBannerSlider() {
    // Use a more specific selector that avoids square brackets
    const slider = document.querySelector('div[style*="--computed-header-height"] .min-h-screen .relative');
    if (!slider) return;

    const slides = [
        {
            image: "https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/25/00/25/25.1400x0.webp",
            alt: "Чоловічі сумки"
        },
        {
            image: "https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/25/00/25/25.1400x0.webp",
            alt: "Жіночі сумки"
        },
        {
            image: "https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/25/00/25/25.1400x0.webp",
            alt: "Рюкзаки"
        }
    ];

    let currentSlide = 0;
    let autoplayInterval;

    const sliderContent = slider.querySelector('.relative.h-full');
    const dotsContainer = slider.querySelector('.absolute.bottom-6');
    const dots = dotsContainer.querySelectorAll('button');

    // Update dots
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.className = `w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`;
        });
    }

    // Update slide
    function updateSlide(index, direction = 'next') {
        const oldSlide = currentSlide;
        currentSlide = index;

        // Create temporary div for transition
        const temp = document.createElement('div');
        temp.className = 'absolute inset-0 transition-all duration-1000';
        temp.innerHTML = `
            <div class="absolute inset-0">
                <picture>
                    <source media="(min-width: 768px)" srcset="${slides[currentSlide].image}">
                    <img src="${slides[currentSlide].image}" alt="${slides[currentSlide].alt}" class="w-full h-full object-cover" sizes="(min-width: 768px) 1440px, 430px">
                </picture>
                <div class="absolute inset-0 bg-black/20"></div>
            </div>
        `;

        // Set initial transform
        temp.style.transform = `translateX(${direction === 'next' ? '100%' : '-100%'})`;
        sliderContent.appendChild(temp);

        // Force reflow
        temp.offsetHeight;

        // Animate both old and new slides
        temp.style.transform = 'translateX(0)';
        sliderContent.querySelector('.relative.h-full').style.transform = `translateX(${direction === 'next' ? '-100%' : '100%'})`;

        // Cleanup after transition
        setTimeout(() => {
            sliderContent.querySelector('.relative.h-full').remove();
            temp.className = 'relative h-full bg-gradient-to-r from-blue-900 to-blue-700 transition-all duration-1000';
            updateDots();
        }, 1000);
    }

    // Next slide
    function nextSlide() {
        const newIndex = (currentSlide + 1) % slides.length;
        updateSlide(newIndex, 'next');
    }

    // Previous slide
    function prevSlide() {
        const newIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(newIndex, 'prev');
    }

    // Click handlers for navigation buttons
    const prevButton = slider.querySelector('button:first-of-type');
    const nextButton = slider.querySelector('button:last-of-type');

    prevButton.addEventListener('click', () => {
        clearInterval(autoplayInterval);
        prevSlide();
        startAutoplay();
    });

    nextButton.addEventListener('click', () => {
        clearInterval(autoplayInterval);
        nextSlide();
        startAutoplay();
    });

    // Click handlers for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (index === currentSlide) return;
            clearInterval(autoplayInterval);
            updateSlide(index, index > currentSlide ? 'next' : 'prev');
            startAutoplay();
        });
    });

    // Start autoplay
    function startAutoplay() {
        clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    // Start autoplay on load
    startAutoplay();

    // Pause autoplay when user hovers over the slider
    slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    slider.addEventListener('mouseleave', startAutoplay);
}

// Product image slider functionality
function initProductSlider() {
    const slider = document.querySelector('.space-y-4');
    if (!slider) return;

    // Find all required elements
    const mainImage = slider.querySelector('.relative.aspect-square img');
    const thumbnails = Array.from(slider.querySelectorAll('.flex.space-x-2 button'));
    const prevButton = slider.querySelector('button:first-of-type');
    const nextButton = slider.querySelector('button:last-of-type');
    const zoomHint = slider.querySelector('.absolute.top-2.right-2');
    const slideCounter = slider.querySelector('.absolute.bottom-2.right-2');

    let currentSlide = 0;
    const totalSlides = thumbnails.length;
    
    // Initialize with default image urls from thumbnails
    const slides = thumbnails.map(thumb => ({
        image: thumb.querySelector('img').src,
        alt: thumb.querySelector('img').alt
    }));

    // Update slide counter
    function updateCounter() {
        if (slideCounter) {
            slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
        }
    }

    // Update main image
    function updateMainImage(index) {
        mainImage.src = slides[index].image;
        mainImage.alt = slides[index].alt;
        
        // Update thumbnails
        thumbnails.forEach((thumb, i) => {
            thumb.className = `flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                i === index ? 'border-primary' : 'border-gray-200 hover:border-gray-300'
            }`;
        });

        updateCounter();
    }

    // Event listeners for navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateMainImage(currentSlide);
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlide = (currentSlide + 1) % totalSlides;
            updateMainImage(currentSlide);
        });
    }

    // Event listeners for thumbnails
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            currentSlide = index;
            updateMainImage(currentSlide);
        });
    });

    // Mouse move zoom effect
    const imageContainer = slider.querySelector('.relative.aspect-square');
    let isZooming = false;

    if (imageContainer) {
        imageContainer.addEventListener('mouseenter', () => {
            mainImage.style.transition = 'none';
            isZooming = true;
        });

        imageContainer.addEventListener('mouseleave', () => {
            mainImage.style.transition = 'transform 0.2s ease';
            mainImage.style.transform = 'scale(1)';
            mainImage.style.transformOrigin = '0% 0%';
            isZooming = false;
        });

        imageContainer.addEventListener('mousemove', (e) => {
            if (!isZooming) return;

            const rect = imageContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            mainImage.style.transform = 'scale(1.5)';
            mainImage.style.transformOrigin = `${x}% ${y}%`;
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!imageContainer.contains(document.activeElement)) return;

            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateMainImage(currentSlide);
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateMainImage(currentSlide);
            }
        });
    }

    // Initialize counter
    updateCounter();
}

// Cart functionality
class Cart {
    constructor() {
        this.items = this.loadCart();
        this.bindEvents();
        this.updateUI();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
        this.updateUI();
    }

    // Add item to cart
    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity || 1;
        } else {
            this.items.push({
                ...item,
                quantity: item.quantity || 1
            });
        }
        this.saveCart();
        this.animateCartIcon();
    }

    // Remove item from cart
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
    }

    // Update item quantity
    updateQuantity(itemId, quantity) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.quantity = Math.max(1, quantity); // Ensure quantity is at least 1
            this.saveCart();
        }
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
    }

    // Calculate totals
    calculateTotals() {
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);
        return { total, itemCount };
    }

    // Animate cart icon
    animateCartIcon() {
        const cartIcon = document.getElementById('cart-icon');
        if (cartIcon) {
            cartIcon.classList.remove('animate-cart-bump');
            void cartIcon.offsetWidth; // Force reflow
            cartIcon.classList.add('animate-cart-bump');
        }
    }

    // Update UI elements
    updateUI() {
        // Update cart counter
        const { itemCount, total } = this.calculateTotals();
        const cartCounter = document.querySelector('#cart-icon span.bg-primary');
        if (cartCounter) {
            cartCounter.textContent = itemCount;
        }

        // Update cart page if we're on it
        const cartPage = document.querySelector('.container .max-w-4xl');
        if (cartPage) {
            this.updateCartPage(itemCount, total);
        }
    }

    // Update cart page UI
    updateCartPage(itemCount, total) {
        // Update header
        const header = document.querySelector('.max-w-4xl h1');
        if (header) {
            header.textContent = `Кошик (${itemCount})`;
        }

        // Update items list
        const itemsList = document.querySelector('.lg\\:col-span-2');
        if (itemsList) {
            if (this.items.length === 0) {
                itemsList.innerHTML = `
                    <div class="bg-white rounded-lg p-8 text-center">
                        <p class="text-gray-600 mb-4">Ваш кошик порожній</p>
                        <a href="./catalog.html">
                            <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                                Перейти до каталогу
                            </button>
                        </a>
                    </div>
                `;
            } else {
                itemsList.innerHTML = this.items.map(item => this.createItemHTML(item)).join('');
            }
        }

        // Update summary
        const summary = document.querySelector('.bg-white.rounded-lg.p-6.h-fit');
        if (summary) {
            const itemsTotal = document.querySelector('.space-y-2 .flex.justify-between span:last-child');
            const finalTotal = document.querySelector('.font-semibold.text-lg span:last-child');
            
            if (itemsTotal && finalTotal) {
                itemsTotal.textContent = `${total.toLocaleString()} грн`;
                finalTotal.textContent = `${total.toLocaleString()} грн`;
            }
        }
    }

    // Create HTML for cart item
    createItemHTML(item) {
        return `
            <div class="bg-white rounded-lg p-0 flex h-32" data-item-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="w-32 h-32 object-cover rounded-l-lg flex-shrink-0">
                <div class="flex-1 p-4 flex flex-col justify-between">
                    <div class="flex justify-between items-start">
                        <div class="flex-1 pr-4">
                            <h3 class="font-semibold text-lg leading-tight">${item.name}</h3>
                            <p class="text-sm text-muted-foreground mt-1">${item.brand}</p>
                        </div>
                        <div class="text-right flex-shrink-0">
                            <p class="font-medium text-primary text-lg">${item.price.toLocaleString()} грн</p>
                            <p class="font-semibold text-sm text-gray-600">Всього: ${(item.price * item.quantity).toLocaleString()} грн</p>
                        </div>
                    </div>
                    <div class="flex justify-end items-end">
                        <div class="flex items-center space-x-3">
                            <div class="flex items-center space-x-2">
                                <button class="quantity-btn minus inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                    <img src="../img/icons/icon-minus.svg" alt="Minus">
                                </button>
                                <span class="w-8 text-center font-medium">${item.quantity}</span>
                                <button class="quantity-btn plus inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
                                    <img src="../img/icons/icon-plus.svg" alt="Plus">
                                </button>
                            </div>
                            <button class="remove-item inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent h-9 rounded-md px-3 text-red-500 hover:text-red-700">
                                <img src="../img/icons/icon-trash2.svg" alt="Trash">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Bind event handlers
    bindEvents() {
        // Event delegation for cart page
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // Find the closest cart item container
            const cartItem = target.closest('[data-item-id]');
            if (!cartItem) return;

            const itemId = cartItem.dataset.itemId;

            // Handle quantity buttons
            if (target.closest('.quantity-btn.minus')) {
                const item = this.items.find(i => i.id === itemId);
                if (item && item.quantity > 1) {
                    this.updateQuantity(itemId, item.quantity - 1);
                }
            }
            else if (target.closest('.quantity-btn.plus')) {
                const item = this.items.find(i => i.id === itemId);
                if (item) {
                    this.updateQuantity(itemId, item.quantity + 1);
                }
            }
            // Handle remove button
            else if (target.closest('.remove-item')) {
                this.removeItem(itemId);
            }
        });

        // Handle clear cart button
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => {
            if (btn.textContent && btn.textContent.trim() === "Очистити кошик") {
                btn.addEventListener('click', () => this.clearCart());
            }
        });

        // Handle add to cart buttons
        document.addEventListener('click', (e) => {
            let addToCartBtn = null;
            if (e.target.tagName === 'BUTTON' && e.target.textContent && e.target.textContent.includes('До кошика')) {
                addToCartBtn = e.target;
            } else if (e.target.closest) {
                const btn = e.target.closest('button');
                if (btn && btn.textContent && btn.textContent.includes('До кошика')) {
                    addToCartBtn = btn;
                }
            }
            if (addToCartBtn) {
                const productCard = addToCartBtn.closest('.group');
                if (productCard) {
                    const item = {
                        id: productCard.querySelector('a').href.split('/').pop(),
                        name: productCard.querySelector('h3').textContent.trim(),
                        brand: productCard.querySelector('.text-xs').textContent.trim(),
                        price: parseFloat(productCard.querySelector('.text-lg').textContent.replace(/[^\d]/g, '')),
                        image: productCard.querySelector('img').src,
                        quantity: 1
                    };
                    this.addItem(item);
                }
            }
        });
    }
}

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCatalogDropdown();
    initBannerSlider();
    initProductSlider();
    new Cart(); // Initialize cart functionality
});