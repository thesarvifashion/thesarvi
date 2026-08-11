/* ==========================================================================
   THE SARVI · FASHION - CORE JAVASCRIPT CONTROLLER
   Cart, WhatsApp Order Checkout, Contact Inquiry, Drawers & UI Logic
   ========================================================================== */

// Global Configuration
window.CONFIG = {
  WHATSAPP_NUMBER: "918769112281", // Client store WhatsApp number (+91 87691 12281)
  STORE_NAME: "THE SARVI · FASHION",
  CURRENCY: "₹",
  GOOGLE_SHEETS_URL:
    "https://script.google.com/macros/s/AKfycbwynFx5fhxNNADl5M41gJyGECuiitJuTAT9uHdJtiUMvF2nvWdXpjBeyowMy_2RI3Eu/exec", // Google Apps Script Web App URL (Paste URL here)
};

// State Management
let sarviCart = JSON.parse(localStorage.getItem("theSarviCart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  initHeaderSearch();
  initDrawers();
  initMobileNav();
  initHeroSlider();
  initTestimonialCarousel();
  initModals();
  renderBestSellers();
  updateBadgeCounts();
  renderCartItems();

  // Check sticky header on scroll
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header.site-header");
    if (header) {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
});

/* ==========================================================================
   1. SHOPPING CART LOGIC
   ========================================================================== */
function addToCart(productId, qty = 1) {
  if (typeof THE_SARVI_PRODUCTS === "undefined") return;
  const product = THE_SARVI_PRODUCTS.find((p) => p.id === productId);
  if (!product) return;

  const existingIndex = sarviCart.findIndex((item) => item.id === productId);
  if (existingIndex > -1) {
    sarviCart[existingIndex].qty += qty;
  } else {
    sarviCart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: qty,
    });
  }

  saveCart();
  updateBadgeCounts();
  renderCartItems();
  showToast(`Added "${product.name}" to Bag! 🛍️`);
  openCartDrawer();
}

function removeFromCart(productId) {
  sarviCart = sarviCart.filter((item) => item.id !== productId);
  saveCart();
  updateBadgeCounts();
  renderCartItems();
  showToast("Item removed from bag");
}

function updateCartQty(productId, delta) {
  const item = sarviCart.find((i) => i.id === productId);
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
  localStorage.setItem("theSarviCart", JSON.stringify(sarviCart));
}

function updateBadgeCounts() {
  const cartBadge = document.getElementById("cartBadge");
  const totalCartQty = sarviCart.reduce((sum, item) => sum + item.qty, 0);

  if (cartBadge) {
    cartBadge.textContent = totalCartQty;
    cartBadge.classList.add("pulse");
    setTimeout(() => cartBadge.classList.remove("pulse"), 300);
  }
}

function renderCartItems() {
  const container = document.getElementById("cartDrawerBody");
  const subtotalEl = document.getElementById("cartSubtotal");
  const headCountEl = document.getElementById("cartCountHead");
  const checkoutTotalEl = document.getElementById("checkoutTotalPayable");

  const totalQty = sarviCart.reduce((sum, item) => sum + item.qty, 0);
  if (headCountEl) headCountEl.textContent = totalQty;

  if (!container) return;

  if (sarviCart.length === 0) {
    container.innerHTML = `
            <div class="drawer-empty">
                Your shopping bag is currently empty.<br><br>
                <a href="shop.html" onclick="closeDrawers()" class="btn btn-outline" style="font-size:0.75rem;">Start Shopping</a>
            </div>
        `;
    if (subtotalEl) subtotalEl.textContent = `${window.CONFIG.CURRENCY}0`;
    if (checkoutTotalEl)
      checkoutTotalEl.textContent = `${window.CONFIG.CURRENCY}0`;
    return;
  }

  let html = "";
  let total = 0;

  sarviCart.forEach((item) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;
    html += `
            <div class="drawer-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="drawer-item-info">
                    <h5>${item.name}</h5>
                    <div class="price">${window.CONFIG.CURRENCY}${item.price.toLocaleString()}</div>
                    <div class="drawer-qty">
                        <button type="button" onclick="updateCartQty('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button type="button" onclick="updateCartQty('${item.id}', 1)">+</button>
                    </div>
                    <button type="button" class="drawer-remove" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
            </div>
        `;
  });

  container.innerHTML = html;
  if (subtotalEl)
    subtotalEl.textContent = `${window.CONFIG.CURRENCY}${total.toLocaleString()}`;
  if (checkoutTotalEl)
    checkoutTotalEl.textContent = `${window.CONFIG.CURRENCY}${total.toLocaleString()}`;
}

/* ==========================================================================
   2. SLIDE-OVER DRAWERS & OVERLAYS
   ========================================================================== */
function getOverlayElement() {
  return (
    document.getElementById("overlay") ||
    document.getElementById("drawerOverlay") ||
    document.querySelector(".overlay") ||
    document.querySelector(".drawer-overlay")
  );
}

function initDrawers() {
  const overlay = getOverlayElement();
  if (overlay) {
    overlay.addEventListener("click", closeDrawers);
  }
}

function openCartDrawer() {
  const overlay = getOverlayElement();
  const drawer = document.getElementById("cartDrawer");
  if (overlay) overlay.classList.add("is-open");
  if (drawer) drawer.classList.add("is-open");
}

function closeDrawers() {
  const overlay = getOverlayElement();
  const cartDrawer = document.getElementById("cartDrawer");
  const mobileNav =
    document.getElementById("mobileNav") ||
    document.getElementById("mobileNavDrawer");
  if (overlay) overlay.classList.remove("is-open");
  if (cartDrawer) cartDrawer.classList.remove("is-open");
  if (mobileNav) mobileNav.classList.remove("is-open");
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNav() {
  const burger = document.getElementById("burgerBtn");
  const closeBtn = document.getElementById("mobileNavClose");

  if (burger) burger.addEventListener("click", openMobileNav);
  if (closeBtn) closeBtn.addEventListener("click", closeMobileNav);
}

function openMobileNav() {
  const overlay = getOverlayElement();
  const nav =
    document.getElementById("mobileNav") ||
    document.getElementById("mobileNavDrawer");
  if (overlay) overlay.classList.add("is-open");
  if (nav) nav.classList.add("is-open");
}

function closeMobileNav() {
  closeDrawers();
}

/* ==========================================================================
   4. MODALS & CHECKOUT HANDLERS
   ========================================================================== */
function initModals() {
  const closeBtns = document.querySelectorAll(".modal-close");
  closeBtns.forEach((btn) => btn.addEventListener("click", closeModals));

  const checkoutModal = document.getElementById("checkoutModal");
  if (checkoutModal) {
    checkoutModal.addEventListener("click", (e) => {
      if (e.target === checkoutModal) closeModals();
    });
  }
}

function openCheckoutModal() {
  if (sarviCart.length === 0) {
    showToast("Your shopping bag is empty!");
    return;
  }
  closeDrawers();

  const total = sarviCart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const checkoutTotalEl = document.getElementById("checkoutTotalPayable");
  if (checkoutTotalEl)
    checkoutTotalEl.textContent = `${window.CONFIG.CURRENCY}${total.toLocaleString()}`;

  const modal = document.getElementById("checkoutModal");
  if (modal) modal.classList.add("is-open");
}

function closeModals() {
  document
    .querySelectorAll(".modal")
    .forEach((m) => m.classList.remove("is-open"));
}

function togglePaymentNotice(value) {
  const notice = document.getElementById("qrNotice");
  if (notice) {
    notice.style.display = value === "QR" || value === "UPI" ? "block" : "none";
  }
}

function handleCheckout(event) {
  submitOrderToSheet(event);
}

function submitWhatsAppOrder(event) {
  submitOrderToSheet(event);
}

function submitOrderToSheet(event) {
  if (event) event.preventDefault();

  const name = document.getElementById("custName")?.value.trim() || "Customer";
  const phone =
    document.getElementById("custPhone")?.value.trim() || "Not provided";
  const address =
    document.getElementById("custAddress")?.value.trim() || "Direct Pickup";
  const payment = document.getElementById("custPayment")?.value || "COD";
  const submitBtn = document.getElementById("checkoutSubmitBtn");

  if (sarviCart.length === 0) {
    showToast("Your bag is empty!");
    return;
  }

  let total = 0;
  let itemsCleanList = [];
  sarviCart.forEach((item) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    itemsCleanList.push(
      `${item.name} x${item.qty} (₹${subtotal.toLocaleString()})`,
    );
  });

  const orderId = "TS-" + Math.floor(100000 + Math.random() * 900000);
  const timeStamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  // Animated Loading Button State
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="btn-spinner"></span> PROCESSING ORDER...`;
  }

  // Send order payload to Google Sheets Web App
  const orderPayload = {
    action: "order",
    timestamp: timeStamp,
    orderId: "#" + orderId,
    name: name,
    phone: phone,
    address: address,
    payment: payment,
    items: itemsCleanList.join(" | "),
    total: `₹${total.toLocaleString()}`,
  };

  if (
    window.CONFIG.GOOGLE_SHEETS_URL &&
    window.CONFIG.GOOGLE_SHEETS_URL.startsWith("http")
  ) {
    try {
      fetch(window.CONFIG.GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(orderPayload),
      }).catch((err) => console.log("Google Sheets order sync error:", err));
    } catch (e) {
      console.log("Google Sheets submission error:", e);
    }
  }

  setTimeout(() => {
    // Restore button state
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `PLACE ORDER VIA WHATSAPP &rarr;`;
    }

    // Clear Cart & Form Inputs
    sarviCart = [];
    saveCart();
    updateBadgeCounts();
    renderCartItems();
    closeModals();

    const form = document.getElementById("checkoutForm");
    if (form) form.reset();

    // Show Animated Success Modal
    showSuccessModal({
      title: "Order Placed Successfully! 🎉",
      badgeText: "ORDER RECORDED IN GOOGLE SHEET",
      message: `Thank you <strong>${name}</strong>! Your order reference is <strong>#${orderId}</strong>.<br>Total Payable: <strong style="color:var(--maroon-deep);">₹${total.toLocaleString()} (${payment})</strong>.<br>Our store executive will review and process your order shortly!`,
      buttonText: "CONTINUE SHOPPING",
    });
  }, 1200);
}

/* ==========================================================================
   5. CONTACT FORM GOOGLE SHEETS SUBMISSION
   ========================================================================== */
function sendContactWhatsApp(event) {
  sendContactFormToSheet(event);
}

function sendContactFormToSheet(event) {
  if (event) event.preventDefault();

  const nameEl = document.getElementById("conName");
  const phoneEl = document.getElementById("conPhone");
  const topicEl = document.getElementById("conTopic");
  const msgEl = document.getElementById("conMsg");
  const submitBtn = document.getElementById("contactSubmitBtn");

  const name = nameEl?.value.trim() || "Customer";
  const phone = phoneEl?.value.trim() || "Not provided";
  const topic = topicEl?.value || "General Inquiry";
  const msg = msgEl?.value.trim() || "";

  if (!name || !msg) {
    showToast("Please fill in your name and message.");
    return;
  }

  const timeStamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  // Animated Loading Button State
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="btn-spinner"></span> SUBMITTING INQUIRY...`;
  }

  const contactPayload = {
    action: "contact",
    timestamp: timeStamp,
    name: name,
    phone: phone,
    topic: topic,
    message: msg,
  };

  if (
    window.CONFIG.GOOGLE_SHEETS_URL &&
    window.CONFIG.GOOGLE_SHEETS_URL.startsWith("http")
  ) {
    try {
      fetch(window.CONFIG.GOOGLE_SHEETS_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify(contactPayload),
      }).catch((err) => console.log("Google Sheets contact sync error:", err));
    } catch (e) {
      console.log("Google Sheets contact submission error:", e);
    }
  }

  setTimeout(() => {
    // Restore button state
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `SUBMIT FORM`;
    }

    // Reset Inputs
    if (nameEl) nameEl.value = "";
    if (phoneEl) phoneEl.value = "";
    if (msgEl) msgEl.value = "";

    // Show Animated Success Modal
    showSuccessModal({
      title: "Inquiry Received! ✨",
      badgeText: "SAVED TO GOOGLE SHEET",
      message: `Thank you <strong>${name}</strong>! Your inquiry regarding <em>"${topic}"</em> has been logged in our Google Sheet database.<br>Our customer desk will contact you soon on <strong>${phone}</strong>.`,
      buttonText: "BACK TO HOME",
    });
  }, 1200);
}

/* ==========================================================================
   DYNAMIC ANIMATED SUCCESS MODAL OVERLAY
   ========================================================================== */
function showSuccessModal({ title, badgeText, message, buttonText }) {
  let successModal = document.getElementById("sarviSuccessModal");
  if (!successModal) {
    successModal = document.createElement("div");
    successModal.id = "sarviSuccessModal";
    successModal.className = "modal is-active";
    successModal.style.zIndex = "9999";
    document.body.appendChild(successModal);
  }

  successModal.innerHTML = `
        <div class="overlay is-active" style="opacity:1; pointer-events:auto;" onclick="closeSuccessModal()"></div>
        <div class="success-modal-card" style="position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); z-index:10000;">
            <div class="success-check-circle">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <span class="eyebrow" style="color:var(--maroon-deep); letter-spacing:0.1em; font-size:0.75rem; font-weight:700;">${badgeText}</span>
            <h3 style="font-size:1.6rem; margin:8px 0 12px; color:var(--ink);">${title}</h3>
            <p style="font-size:0.9rem; color:var(--ink-soft); line-height:1.6; margin-bottom:24px;">${message}</p>
            <button class="btn btn-fill" style="width:100%; padding:13px;" onclick="closeSuccessModal()">${buttonText || "OK, GOT IT"}</button>
        </div>
    `;

  successModal.classList.add("is-active");
}

function closeSuccessModal() {
  const successModal = document.getElementById("sarviSuccessModal");
  if (successModal) {
    successModal.classList.remove("is-active");
    setTimeout(() => successModal.remove(), 250);
  }
}

/* ==========================================================================
   6. LIVE HEADER SEARCH
   ========================================================================== */
function initHeaderSearch() {
  const searchInput = document.getElementById("headerSearchInput");
  const dropdown = document.getElementById("searchDropdown");

  if (!searchInput || !dropdown) return;

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query.length < 1) {
      dropdown.classList.remove("is-active");
      return;
    }

    if (typeof THE_SARVI_PRODUCTS === "undefined") return;

    const filtered = THE_SARVI_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query),
    );

    if (filtered.length === 0) {
      dropdown.innerHTML = `<div style="padding:14px; text-align:center; color:var(--ink-soft); font-size:0.88rem;">No jewellery matches "${query}". Try "Necklace" or "Crystal"</div>`;
      dropdown.classList.add("is-active");
      return;
    }

    let html = "";
    filtered.slice(0, 5).forEach((p) => {
      html += `
                <a href="shop.html?category=${p.category}" class="search-item">
                    <img src="${p.image}" alt="${p.name}">
                    <div class="search-item-info">
                        <h6>${p.name}</h6>
                        <span>${window.CONFIG.CURRENCY}${p.price.toLocaleString()}</span>
                    </div>
                </a>
            `;
    });

    dropdown.innerHTML = html;
    dropdown.classList.add("is-active");
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove("is-active");
    }
  });
}

/* ==========================================================================
   7. HERO SLIDER CONTROLLER
   ========================================================================== */
let currentSlide = 0;
let slideInterval;

function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dots button");
  if (slides.length === 0) return;

  function goToSlide(idx) {
    slides[currentSlide].classList.remove("is-active");
    if (dots[currentSlide]) dots[currentSlide].classList.remove("is-active");

    currentSlide = (idx + slides.length) % slides.length;

    slides[currentSlide].classList.add("is-active");
    if (dots[currentSlide]) dots[currentSlide].classList.add("is-active");
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      goToSlide(idx);
      resetSlideInterval();
    });
  });

  const prevBtn = document.getElementById("heroPrev");
  const nextBtn = document.getElementById("heroNext");

  if (prevBtn)
    prevBtn.addEventListener("click", () => {
      goToSlide(currentSlide - 1);
      resetSlideInterval();
    });
  if (nextBtn)
    nextBtn.addEventListener("click", () => {
      goToSlide(currentSlide + 1);
      resetSlideInterval();
    });

  function resetSlideInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
  }

  resetSlideInterval();
}

/* ==========================================================================
   8. TESTIMONIALS CAROUSEL
   ========================================================================== */
const TESTIMONIALS_DATA = [
  {
    quote:
      "Amazing quality and premium packaging. Absolutely in love with The Sarvi Jewellery! Will definitely order again for my anniversary.",
    author: "- Priya Sharma",
    location: "Mumbai",
  },
  {
    quote:
      "Beautiful designs and great customer service. The wine crystal earrings matched my evening gown perfectly. 10/10 recommended!",
    author: "- Neha Verma",
    location: "New Delhi",
  },
  {
    quote:
      "The jewellery is just wow! Exactly like the pictures on the website. Fast delivery and the crystal shine is magnificent.",
    author: "- Sanya Kapoor",
    location: "Bangalore",
  },
  {
    quote:
      "Gifted the Korean crystal bracelet to my sister and she was overwhelmed with joy. The maroon gift box is pure luxury.",
    author: "- Ananya Mehta",
    location: "Pune",
  },
];

let testIdx = 0;
function initTestimonialCarousel() {
  const prevBtn = document.getElementById("testPrev");
  const nextBtn = document.getElementById("testNext");
  if (!prevBtn || !nextBtn) return;

  prevBtn.addEventListener("click", () => {
    testIdx =
      (testIdx - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
    renderTestimonialSlide();
  });

  nextBtn.addEventListener("click", () => {
    testIdx = (testIdx + 1) % TESTIMONIALS_DATA.length;
    renderTestimonialSlide();
  });
}

function renderTestimonialSlide() {
  const cards = document.querySelectorAll(".test-card");
  if (cards.length === 0) return;

  cards.forEach((card, idx) => {
    const dataItem =
      TESTIMONIALS_DATA[(testIdx + idx) % TESTIMONIALS_DATA.length];
    const pEl = card.querySelector("p");
    const spanEl = card.querySelector("span");
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
   9. RENDER BEST SELLERS ON HOMEPAGE
   ========================================================================== */
function renderBestSellers() {
  const grid = document.getElementById("bestSellersGrid");
  if (!grid) return;
  if (typeof THE_SARVI_PRODUCTS === "undefined") return;

  const bestSellers = THE_SARVI_PRODUCTS.filter((p) => p.bestSeller).slice(
    0,
    4,
  );
  let html = "";

  bestSellers.forEach((p) => {
    html += `
            <div class="prod-card">
                ${p.badge ? `<span class="prod-tag">${p.badge}</span>` : ""}
                <a href="shop.html?category=${p.category}" class="prod-img">
                    <img src="${p.image}" alt="${p.name}">
                </a>
                <div class="prod-body">
                    <a href="shop.html?category=${p.category}">
                        <h4>${p.name}</h4>
                    </a>
                    <div class="prod-price">
                        <span class="now">${window.CONFIG.CURRENCY}${p.price.toLocaleString()}</span>
                        ${p.oldPrice ? `<span class="was">${window.CONFIG.CURRENCY}${p.oldPrice.toLocaleString()}</span>` : ""}
                    </div>
                    <button class="prod-cta" onclick="addToCart('${p.id}')">Add To Bag</button>
                </div>
            </div>
        `;
  });

  grid.innerHTML = html;
}

/* ==========================================================================
   10. TOAST NOTIFICATION SYSTEM
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById("sarviToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "sarviToast";
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
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
  }, 3200);
}
