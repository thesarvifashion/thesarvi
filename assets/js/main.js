/* ==========================================================================
   THE SARVI · FASHION - CORE JAVASCRIPT CONTROLLER
   Cart, Wishlist, WhatsApp Order Checkout, Google Sheets Sync & UI Logic
   ========================================================================== */

// Global Configuration
window.CONFIG = {
    WHATSAPP_NUMBER: "919876543210", // Client store WhatsApp number
    STORE_NAME: "THE SARVI · FASHION",
    CURRENCY: "₹",
    GOOGLE_SHEET_WEBHOOK_URL: "" // Can be set by client when they share Google Apps Script URL
};

// State Management
let sarviCart = JSON.parse(localStorage.getItem('theSarviCart')) || [];
let sarviWishlist = JSON.parse(localStorage.getItem('theSarviWishlist')) || [];

document.addEventListener('DOMContentLoaded', () => {
    initHeaderSearch();
    initDrawers();
    initMobileNav();
    initHeroSlider();
    initTestimonialCarousel();
    initModals();
    renderBestSellers();
    updateBadgeCounts();
    renderCartItems();
    renderWishlistItems();

    // Check sticky header on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header.site-header');
        if (header) {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
});

/* ==========================================================================
   1. SHOPPING CART & WISHLIST LOGIC
   ========================================================================== */
function addToCart(productId, qty = 1) {
    const product = THE_SARVI_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = sarviCart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
        sarviCart[existingIndex].qty += qty;
    } else {
        sarviCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            qty: qty
        });
    }

    saveCart();
    updateBadgeCounts();
    renderCartItems();
    showToast(`Added "${product.name}" to Cart! 🛍️`);
    openCartDrawer();
}

function removeFromCart(productId) {
    sarviCart = sarviCart.filter(item => item.id !== productId);
    saveCart();
    updateBadgeCounts();
    renderCartItems();
    showToast("Item removed from cart");
}

function updateCartQty(productId, delta) {
    const item = sarviCart.find(i => i.id === productId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCart();
        updateBadgeCounts();
        renderCartItems();
    }
}

function saveCart() {
    localStorage.setItem('theSarviCart', JSON.stringify(sarviCart));
}

function toggleWishlist(productId, btnElement = null) {
    const product = THE_SARVI_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const index = sarviWishlist.findIndex(item => item.id === productId);
    if (index > -1) {
        sarviWishlist.splice(index, 1);
        if (btnElement) btnElement.classList.remove('is-active');
        showToast(`Removed from Wishlist`);
    } else {
        sarviWishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
        });
        if (btnElement) btnElement.classList.add('is-active');
        showToast(`Added "${product.name}" to Wishlist! ❤️`);
    }

    localStorage.setItem('theSarviWishlist', JSON.stringify(sarviWishlist));
    updateBadgeCounts();
    renderWishlistItems();
}

function updateBadgeCounts() {
    const cartBadge = document.getElementById('cartBadge');
    const wishBadge = document.getElementById('wishBadge');

    const totalCartQty = sarviCart.reduce((sum, item) => sum + item.qty, 0);
    if (cartBadge) {
        cartBadge.textContent = totalCartQty;
        cartBadge.classList.add('pulse');
        setTimeout(() => cartBadge.classList.remove('pulse'), 300);
    }

    if (wishBadge) {
        wishBadge.textContent = sarviWishlist.length;
        wishBadge.classList.add('pulse');
        setTimeout(() => wishBadge.classList.remove('pulse'), 300);
    }
}

function renderCartItems() {
    const container = document.getElementById('cartDrawerBody');
    const totalEl = document.getElementById('cartTotalAmount');
    if (!container) return;

    if (sarviCart.length === 0) {
        container.innerHTML = `<div class="drawer-empty">Your shopping bag is currently empty.<br><br><a href="#bestsellers" onclick="closeDrawers()" class="btn btn-outline" style="font-size:0.75rem;">Start Shopping</a></div>`;
        if (totalEl) totalEl.textContent = `${window.CONFIG.CURRENCY}0`;
        return;
    }

    let html = '';
    let total = 0;

    sarviCart.forEach(item => {
        const itemTotal = item.price * item.qty;
        total += itemTotal;
        html += `
            <div class="drawer-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="drawer-item-info">
                    <h5>${item.name}</h5>
                    <div class="price">${window.CONFIG.CURRENCY}${item.price.toLocaleString()}</div>
                    <div class="drawer-qty">
                        <button onclick="updateCartQty('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button onclick="updateCartQty('${item.id}', 1)">+</button>
                    </div>
                    <button class="drawer-remove" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    if (totalEl) totalEl.textContent = `${window.CONFIG.CURRENCY}${total.toLocaleString()}`;
}

function renderWishlistItems() {
    const container = document.getElementById('wishlistDrawerBody');
    if (!container) return;

    if (sarviWishlist.length === 0) {
        container.innerHTML = `<div class="drawer-empty">Your wishlist is empty.<br>Click the heart icon on products to save them here!</div>`;
        return;
    }

    let html = '';
    sarviWishlist.forEach(item => {
        html += `
            <div class="drawer-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="drawer-item-info">
                    <h5>${item.name}</h5>
                    <div class="price">${window.CONFIG.CURRENCY}${item.price.toLocaleString()}</div>
                    <button class="btn btn-fill" style="padding:6px 14px; font-size:0.7rem; margin-top:8px;" onclick="addToCart('${item.id}'); toggleWishlist('${item.id}')">Move to Cart</button>
                    <button class="drawer-remove" onclick="toggleWishlist('${item.id}')">Remove</button>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

/* ==========================================================================
   2. SLIDE-OVER DRAWERS & MODALS
   ========================================================================== */
function initDrawers() {
    const overlay = document.getElementById('drawerOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeDrawers);
    }
}

function openCartDrawer() {
    const overlay = document.getElementById('drawerOverlay');
    const drawer = document.getElementById('cartDrawer');
    if (overlay && drawer) {
        overlay.classList.add('is-open');
        drawer.classList.add('is-open');
    }
}

function openWishlistDrawer() {
    const overlay = document.getElementById('drawerOverlay');
    const drawer = document.getElementById('wishlistDrawer');
    if (overlay && drawer) {
        overlay.classList.add('is-open');
        drawer.classList.add('is-open');
    }
}

function closeDrawers() {
    const overlay = document.getElementById('drawerOverlay');
    const cartDrawer = document.getElementById('cartDrawer');
    const wishDrawer = document.getElementById('wishlistDrawer');
    if (overlay) overlay.classList.remove('is-open');
    if (cartDrawer) cartDrawer.classList.remove('is-open');
    if (wishDrawer) wishDrawer.classList.remove('is-open');
}

/* ==========================================================================
   3. DUAL ORDER CHECKOUT (WHATSAPP + GOOGLE SHEETS)
   ========================================================================== */
function proceedToWhatsAppCheckout() {
    if (sarviCart.length === 0) {
        showToast("Your cart is empty! Please add items first.");
        return;
    }

    // Check if we are on checkout page or opening modal
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        closeDrawers();
        modal.classList.add('is-open');
        renderCheckoutSummary();
    } else {
        window.location.href = "checkout.html";
    }
}

function renderCheckoutSummary() {
    const container = document.getElementById('modalOrderSummary');
    if (!container) return;

    let total = 0;
    let html = '<ul style="margin-bottom:14px;">';
    sarviCart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        html += `<li style="display:flex; justify-content:space-between; font-size:0.9rem; margin-bottom:6px;">
            <span><b>${item.qty}x</b> ${item.name}</span>
            <span>${window.CONFIG.CURRENCY}${subtotal.toLocaleString()}</span>
        </li>`;
    });
    html += '</ul>';
    html += `<div style="border-top:1px solid var(--line); padding-top:10px; display:flex; justify-content:space-between; font-size:1.1rem; color:var(--maroon-deep); font-weight:600;">
        <span>Total Payable:</span>
        <span>${window.CONFIG.CURRENCY}${total.toLocaleString()}</span>
    </div>`;

    container.innerHTML = html;
}

function submitWhatsAppOrder(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('custName')?.value.trim() || 'Customer';
    const phone = document.getElementById('custPhone')?.value.trim() || 'Not provided';
    const address = document.getElementById('custAddress')?.value.trim() || 'Direct Pickup/Inquiry';
    const payment = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Direct WhatsApp';
    const notes = document.getElementById('custNotes')?.value.trim() || 'None';

    if (sarviCart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }

    let total = 0;
    let itemsText = '';
    sarviCart.forEach((item, idx) => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        itemsText += `${idx + 1}. *${item.name}* (Qty: ${item.qty}) - ₹${subtotal.toLocaleString()}\n`;
    });

    // 1. Prepare Google Sheets JSON Data
    const orderData = {
        orderId: "TS-" + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toLocaleString(),
        customerName: name,
        customerPhone: phone,
        customerAddress: address,
        paymentMethod: payment,
        orderNotes: notes,
        itemsCount: sarviCart.reduce((sum, i) => sum + i.qty, 0),
        totalAmount: total,
        itemsList: sarviCart.map(i => `${i.name} (${i.qty})`).join(", ")
    };

    // Send to Google Sheets Webhook if configured
    if (window.CONFIG.GOOGLE_SHEET_WEBHOOK_URL) {
        fetch(window.CONFIG.GOOGLE_SHEET_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        }).catch(err => console.log('Google Sheets Sync Note:', err));
    }

    // 2. Format WhatsApp Message
    const waText = `🛍️ *NEW ORDER - ${window.CONFIG.STORE_NAME}* ✦\n` +
                   `==============================\n` +
                   `*Order ID:* ${orderData.orderId}\n` +
                   `------------------------------\n` +
                   `*👤 Customer Details:*\n` +
                   `• Name: ${name}\n` +
                   `• Phone: ${phone}\n` +
                   `• Delivery Address: ${address}\n` +
                   `• Payment Method: *${payment}*\n` +
                   (notes !== 'None' ? `• Notes: ${notes}\n` : '') +
                   `------------------------------\n` +
                   `*📦 Order Items:*\n` +
                   itemsText +
                   `------------------------------\n` +
                   `*💰 Total Payable:* *₹${total.toLocaleString()}*\n` +
                   `==============================\n` +
                   `_Please confirm my order details and share delivery updates! Thank you._ ✨`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://api.whatsapp.com/send?phone=${window.CONFIG.WHATSAPP_NUMBER}&text=${encodedText}`;

    showToast("Opening WhatsApp with your order details! 🚀");
    setTimeout(() => {
        window.open(waUrl, '_blank');
        sarviCart = [];
        saveCart();
        updateBadgeCounts();
        renderCartItems();
        closeModals();
    }, 800);
}

/* ==========================================================================
   4. LIVE SEARCH & FILTERING
   ========================================================================== */
function initHeaderSearch() {
    const searchInput = document.getElementById('headerSearchInput');
    const dropdown = document.getElementById('searchDropdown');

    if (!searchInput || !dropdown) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 1) {
            dropdown.classList.remove('is-active');
            return;
        }

        const filtered = THE_SARVI_PRODUCTS.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            dropdown.innerHTML = `<div style="padding:14px; text-align:center; color:var(--ink-soft); font-size:0.88rem;">No jewelry matches "${query}". Try "Necklace" or "Crystal"</div>`;
            dropdown.classList.add('is-active');
            return;
        }

        let html = '';
        filtered.slice(0, 5).forEach(p => {
            html += `
                <a href="product-detail.html?id=${p.id}" class="search-item">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="search-item-info">
                        <h6>${p.name}</h6>
                        <span>${window.CONFIG.CURRENCY}${p.price.toLocaleString()}</span>
                    </div>
                </a>
            `;
        });

        dropdown.innerHTML = html;
        dropdown.classList.add('is-active');
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.remove('is-active');
        }
    });
}

/* ==========================================================================
   5. HERO SLIDER CONTROLLER
   ========================================================================== */
let currentSlide = 0;
let slideInterval;

function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots button');
    if (slides.length === 0) return;

    function goToSlide(idx) {
        slides[currentSlide].classList.remove('is-active');
        if (dots[currentSlide]) dots[currentSlide].classList.remove('is-active');

        currentSlide = (idx + slides.length) % slides.length;

        slides[currentSlide].classList.add('is-active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('is-active');
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetSlideInterval();
        });
    });

    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');

    if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetSlideInterval(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetSlideInterval(); });

    function resetSlideInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }

    resetSlideInterval();
}

/* ==========================================================================
   6. TESTIMONIALS CAROUSEL
   ========================================================================== */
const TESTIMONIALS_DATA = [
    {
        quote: "Amazing quality and premium packaging. Absolutely in love with The Sarvi Jewellery! Will definitely order again for my anniversary.",
        author: "- Priya Sharma",
        location: "Mumbai"
    },
    {
        quote: "Beautiful designs and great customer service. The wine crystal earrings matched my evening gown perfectly. 10/10 recommended!",
        author: "- Neha Verma",
        location: "New Delhi"
    },
    {
        quote: "The jewellery is just wow! Exactly like the pictures on the website. Fast delivery and the crystal shine is magnificent.",
        author: "- Sanya Kapoor",
        location: "Bangalore"
    },
    {
        quote: "Gifted the Korean crystal bracelet to my sister and she was overwhelmed with joy. The maroon gift box is pure luxury.",
        author: "- Ananya Mehta",
        location: "Pune"
    }
];

let testIdx = 0;
function initTestimonialCarousel() {
    const prevBtn = document.getElementById('testPrev');
    const nextBtn = document.getElementById('testNext');
    if (!prevBtn || !nextBtn) return;

    prevBtn.addEventListener('click', () => {
        testIdx = (testIdx - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
        renderTestimonialSlide();
    });

    nextBtn.addEventListener('click', () => {
        testIdx = (testIdx + 1) % TESTIMONIALS_DATA.length;
        renderTestimonialSlide();
    });
}

function renderTestimonialSlide() {
    const cards = document.querySelectorAll('.test-card');
    if (cards.length === 0) return;

    cards.forEach((card, idx) => {
        const dataItem = TESTIMONIALS_DATA[(testIdx + idx) % TESTIMONIALS_DATA.length];
        const pEl = card.querySelector('p');
        const spanEl = card.querySelector('span');
        if (pEl) {
            pEl.style.opacity = 0;
            setTimeout(() => {
                pEl.textContent = `"${dataItem.quote}"`;
                pEl.style.opacity = 1;
            }, 150);
        }
        if (spanEl) {
            spanEl.textContent = `${dataItem.author}`;
        }
    });
}

/* ==========================================================================
   7. RENDER BEST SELLERS ON HOMEPAGE
   ========================================================================== */
function renderBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    if (!grid) return;

    const bestSellers = THE_SARVI_PRODUCTS.filter(p => p.bestSeller).slice(0, 4);
    let html = '';

    bestSellers.forEach(p => {
        const isWished = sarviWishlist.some(w => w.id === p.id);
        html += `
            <div class="prod-card">
                ${p.badge ? `<span class="prod-tag">${p.badge}</span>` : ''}
                <div class="prod-wish ${isWished ? 'is-active' : ''}" onclick="toggleWishlist('${p.id}', this)" title="Add to Wishlist">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
                </div>
                <a href="product-detail.html?id=${p.id}" class="prod-img">
                    <img src="${p.image}" alt="${p.name}">
                </a>
                <div class="prod-body">
                    <a href="product-detail.html?id=${p.id}">
                        <h4>${p.name}</h4>
                    </a>
                    <div class="prod-price">
                        <span class="now">${window.CONFIG.CURRENCY}${p.price.toLocaleString()}</span>
                        ${p.oldPrice ? `<span class="was">${window.CONFIG.CURRENCY}${p.oldPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <button class="prod-cta" onclick="addToCart('${p.id}')">Add To Cart</button>
                </div>
            </div>
        `;
    });

    grid.innerHTML = html;
}

/* ==========================================================================
   8. MODALS, MOBILE NAV & TOAST NOTIFICATION
   ========================================================================== */
function initModals() {
    const closeBtns = document.querySelectorAll('.modal-close');
    closeBtns.forEach(btn => btn.addEventListener('click', closeModals));

    const modalOverlay = document.getElementById('checkoutModal');
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModals();
        });
    }
}

function closeModals() {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('is-open'));
}

function openUPIScanModal() {
    const modal = document.getElementById('upiScanModal');
    const totalEl = document.getElementById('upiModalAmount');
    if (modal && totalEl) {
        const total = sarviCart.reduce((sum, i) => sum + (i.price * i.qty), 0);
        totalEl.textContent = `Payable: ₹${total.toLocaleString()}`;
        modal.classList.add('is-open');
    }
}

function initMobileNav() {
    const burger = document.getElementById('burgerBtn');
    const drawer = document.getElementById('mobileNavDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('mobileNavClose');

    if (burger) {
        burger.addEventListener('click', openMobileNav);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeMobileNav);
    }
}

function openMobileNav() {
    const overlay = document.getElementById('drawerOverlay');
    const drawer = document.getElementById('mobileNavDrawer');
    if (overlay && drawer) {
        overlay.classList.add('is-open');
        drawer.classList.add('is-open');
    }
}

function closeMobileNav() {
    const overlay = document.getElementById('drawerOverlay');
    const drawer = document.getElementById('mobileNavDrawer');
    if (drawer) drawer.classList.remove('is-open');
    if (overlay && !document.getElementById('cartDrawer')?.classList.contains('is-open') && !document.getElementById('wishlistDrawer')?.classList.contains('is-open')) {
        overlay.classList.remove('is-open');
    }
}

// Ensure overlay click also closes mobile nav
const originalCloseDrawers = closeDrawers;
closeDrawers = function() {
    originalCloseDrawers();
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (mobileDrawer) mobileDrawer.classList.remove('is-open');
};

function showToast(message) {
    let toast = document.getElementById('sarviToast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'sarviToast';
        toast.style.cssText = `
            position: fixed; bottom: 100px; right: 28px; z-index: 9999;
            background: var(--maroon-deep); color: #fff; padding: 14px 24px;
            border-radius: 4px; font-size: 0.88rem; font-family: 'Jost', sans-serif;
            box-shadow: 0 10px 30px rgba(0,0,0,0.25); border-left: 4px solid var(--gold);
            opacity: 0; transform: translateY(20px); transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            pointer-events: none;
        `;
        document.body.appendChild(toast);
    }

    toast.innerHTML = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
    }, 3200);
}
