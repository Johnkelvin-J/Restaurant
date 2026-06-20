// GLOBAL STATE & VARIABLES
let cart = [];
let currentSlideIndex = 0;
let slideInterval;
const SLIDE_DURATION = 5000; // 5 seconds

// DOM ELEMENTS
document.addEventListener('DOMContentLoaded', () => {
    // Initialize functions
    initHeaderScroll();
    initMobileNav();
    initHeroSlider();
    initScrollReveal();
    initCoffeeBrewer();
    initMenuFilters();
    initCartDrawer();
});

// 1. HEADER SCROLL & ACTIVE NAV LINK HIGHLIGHT
function initHeaderScroll() {
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header shrink
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Section Indicator
        let currentSec = 'home';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 100;
            const secHeight = sec.clientHeight;
            if (window.scrollY >= secTop && window.scrollY < secTop + secHeight) {
                currentSec = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-sec') === currentSec) {
                link.classList.add('active');
            }
        });
    });
}

// 2. MOBILE NAVBAR NAVIGATION TOGGLE
function initMobileNav() {
    const menuToggle = document.getElementById('menu-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });
}

// 3. HERO SLIDER CAROUSEL
function initHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');

    if (slides.length === 0) return;

    function showSlide(index) {
        // Wrap-around logic
        if (index >= slides.length) currentSlideIndex = 0;
        else if (index < 0) currentSlideIndex = slides.length - 1;
        else currentSlideIndex = index;

        // Update active class on slides
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlideIndex].classList.add('active');

        // Update active class on indicator dots
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentSlideIndex].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
        showSlide(currentSlideIndex - 1);
    }

    // Reset slide interval helper
    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, SLIDE_DURATION);
    }

    // Event Listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetSlideTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetSlideTimer();
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'), 10);
            showSlide(index);
            resetSlideTimer();
        });
    });

    // Start auto slide
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
}

// 4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Trigger only once
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(el => revealObserver.observe(el));
    } else {
        // Fallback for older browsers
        reveals.forEach(el => el.classList.add('active'));
    }
}

// 5. MYLAPORE FILTER KAAPI BREWING INTERACTION
function initCoffeeBrewer() {
    const brewBtn = document.getElementById('brew-coffee-btn');
    const coffeeStage = document.getElementById('coffee-stage');
    const liquid = document.getElementById('coffee-liquid');
    const froth = document.getElementById('coffee-froth');
    const steamContainer = document.getElementById('steam-container');

    let isBrewed = false;

    brewBtn.addEventListener('click', () => {
        if (!isBrewed) {
            // Start Brewing Process
            isBrewed = true;
            brewBtn.disabled = true;
            brewBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Brewing Mylapore Decoction...';
            coffeeStage.classList.add('brewing');

            // Set timers for stage animation steps
            // Liquid rises over 3.5s
            setTimeout(() => {
                brewBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Coffee Ready! Drink & Reset';
                brewBtn.disabled = false;
                brewBtn.style.backgroundColor = 'var(--primary)';
            }, 3600);
        } else {
            // Reset Cup
            isBrewed = false;
            coffeeStage.classList.remove('brewing');
            // Remove styles
            liquid.style.height = '0%';
            froth.style.opacity = '0';
            
            brewBtn.innerHTML = '<i class="fa-solid fa-mug-hot"></i> Brew Fresh Coffee';
            brewBtn.style.backgroundColor = 'var(--accent)';
        }
    });
}

// 6. MENU SEARCH & CATEGORY FILTERING
function initMenuFilters() {
    const tabs = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('menu-search-input');
    const menuCards = document.querySelectorAll('.menu-list-item');

    function filterMenu() {
        const query = searchInput.value.toLowerCase().trim();
        const activeTab = document.querySelector('.tab-btn.active');
        const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';

        menuCards.forEach(card => {
            const cardName = card.getAttribute('data-name');
            const cardCategory = card.getAttribute('data-category');
            
            const matchesSearch = cardName.includes(query);
            const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);

            if (matchesSearch && matchesCategory) {
                card.classList.remove('hidden');
                // Re-trigger animation briefly
                setTimeout(() => card.classList.add('active'), 50);
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Tab buttons trigger
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            filterMenu();
        });
    });

    // Search input trigger
    searchInput.addEventListener('input', filterMenu);
}

// 7. ORDER BASKET / SHOPPING CART OPERATIONS
function initCartDrawer() {
    const cartToggle = document.getElementById('cart-toggle-btn');
    const cartClose = document.getElementById('cart-close-btn');
    const cartBackdrop = document.getElementById('cart-backdrop');
    const cartDrawer = document.getElementById('cart-drawer');

    function toggleCart() {
        cartDrawer.classList.toggle('active');
        cartBackdrop.classList.toggle('active');
    }

    cartToggle.addEventListener('click', toggleCart);
    cartClose.addEventListener('click', toggleCart);
    cartBackdrop.addEventListener('click', toggleCart);
}

// Cart operational functions
window.addToCart = function(id, name, price) {
    // Check if item already in cart
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // Add micro-animation checkmark to card plus button if clicked
    const card = document.querySelector(`[data-item-id="${id}"]`);
    if (card) {
        const addBtn = card.querySelector('.add-to-cart-btn-list');
        if (addBtn) {
            addBtn.classList.add('added');
            addBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                addBtn.classList.remove('added');
                addBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
            }, 1500);
        }
    }

    updateCartUI();
    // Open drawer automatically when first item added
    const cartDrawer = document.getElementById('cart-drawer');
    if (!cartDrawer.classList.contains('active')) {
        document.getElementById('cart-toggle-btn').click();
    }
};

function updateQty(id, delta) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateCartUI() {
    const badge = document.getElementById('cart-badge-count');
    const container = document.getElementById('cart-items-container');
    const emptyMsg = document.getElementById('cart-empty-msg');
    const subtotalText = document.getElementById('cart-subtotal');
    const taxText = document.getElementById('cart-tax');
    const totalText = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Total quantities count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;

    // Clear dynamic items (keep empty message template reference)
    const cartItems = container.querySelectorAll('.cart-item');
    cartItems.forEach(el => el.remove());

    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        subtotalText.textContent = '₹0';
        taxText.textContent = '₹0';
        totalText.textContent = '₹0';
        checkoutBtn.disabled = true;
        return;
    }

    emptyMsg.style.display = 'none';
    checkoutBtn.disabled = false;

    let subtotal = 0;
    
    // Render dynamic item cards
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} each</div>
            </div>
            <div class="cart-item-qty">
                <button class="qty-btn" onclick="updateQty('${item.id}', -1)" aria-label="Decrease quantity"><i class="fa-solid fa-minus"></i></button>
                <span class="qty-val">${item.quantity}</span>
                <button class="qty-btn" onclick="updateQty('${item.id}', 1)" aria-label="Increase quantity"><i class="fa-solid fa-plus"></i></button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart('${item.id}')" aria-label="Remove item"><i class="fa-solid fa-trash-can"></i></button>
        `;
        container.appendChild(itemEl);
    });

    const tax = Math.round(subtotal * 0.05); // 5% GST
    const total = subtotal + tax;

    subtotalText.textContent = `₹${subtotal}`;
    taxText.textContent = `₹${tax}`;
    totalText.textContent = `₹${total}`;
}

// 8. ORDER & FEEDBACK SUCCESS MODAL POPUPS
window.checkoutOrder = function() {
    // Close Cart drawer
    document.getElementById('cart-close-btn').click();
    showSuccessModal('order');
};

window.showSuccessModal = function(type) {
    const backdrop = document.getElementById('success-modal-backdrop');
    const title = document.getElementById('success-modal-title');
    const desc = document.getElementById('success-modal-desc');
    const icon = document.getElementById('success-modal-icon');

    if (type === 'order') {
        icon.innerHTML = '<i class="fa-solid fa-check"></i>';
        icon.style.backgroundColor = 'var(--accent-light)';
        icon.style.color = 'var(--accent)';
        title.textContent = 'Order Placed!';
        desc.textContent = `Vanakkan! Your order of delicious South Indian delights has been sent to our Mylapore kitchen. Preparing fresh ghee dosas and hot coffee for you. Delivered in 20-30 minutes!`;
        
        // Reset Cart
        cart = [];
        updateCartUI();
    } else if (type === 'feedback') {
        icon.innerHTML = '<i class="fa-solid fa-envelope-circle-check"></i>';
        icon.style.backgroundColor = '#EBF5FB';
        icon.style.color = '#2980B9';
        title.textContent = 'Message Sent!';
        desc.textContent = 'Thank you for reaching out to Namma Chennai Kitchen. Our team will read your feedback or query and get back to you shortly.';
        
        // Reset Form
        document.getElementById('restaurant-contact-form').reset();
    }

    backdrop.classList.add('active');
};

window.closeSuccessModal = function() {
    document.getElementById('success-modal-backdrop').classList.remove('active');
};

// Bind functions to helper global clicks
window.updateQty = updateQty;
window.removeFromCart = removeFromCart;
