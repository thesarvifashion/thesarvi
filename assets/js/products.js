/* ==========================================================================
   THE SARVI · FASHION - PRODUCTS DATABASE (28 PRODUCTS)
   ========================================================================== */

const THE_SARVI_PRODUCTS = [
    {
        id: "TS-001",
        name: "Royal Twist Bracelet",
        category: "bracelet",
        subcategory: "bracelets",
        price: 390,
        oldPrice: 799,
        rating: 4.9,
        reviewsCount: 48,
        badge: "Best Seller",
        image: "assets/images/products-2/Royal Twist Bracelet.jpg",
        description: "Elegant twisted rope cuff crafted in high-luster gold finish. Features a flexible adjustable fit perfect for stacking or wearing as a single statement piece.",
        specs: {
            material: "18K Gold Plated Alloy",
            finish: "Anti-Tarnish Luster Coating",
            sizing: "Adjustable Free Size",
            hypoallergenic: "100% Skin Safe & Lead-Free"
        },
        featured: true,
        bestSeller: true
    },
    {
        id: "TS-002",
        name: "Golden Fan Drop Earrings",
        category: "earing",
        subcategory: "earrings",
        price: 330,
        oldPrice: 699,
        rating: 4.8,
        reviewsCount: 35,
        badge: "Trending",
        image: "assets/images/products-2/Golden Fan Drop Earrings.jpg",
        description: "Exquisite fan-shaped drop earrings with textured gold accents and lustrous teardrop pearl accents. Ideal for festive gatherings and evening parties.",
        specs: {
            material: "High-Grade Alloy & Shell Pearl",
            finish: "Gold Plated Anti-Tarnish",
            dropLength: "3.5 cm",
            weight: "Lightweight Daily Wear"
        },
        featured: true,
        bestSeller: true
    },
    {
        id: "TS-003",
        name: "Solitaire Heart Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 160,
        oldPrice: 399,
        rating: 4.9,
        reviewsCount: 52,
        badge: "Best Value",
        image: "assets/images/products-2/Solitaire Heart Necklace.jpg",
        description: "Delicate heart-shaped pendant featuring a central sparkling solitaire crystal. Suspended from a thin gold chain with premium anti-tarnish coating.",
        specs: {
            material: "Gold Finish over Brass",
            stone: "Austrian Solitaire Zirconia",
            chainLength: "16 inches + 2 inch extender",
            closure: "Lobster Clasp"
        },
        featured: true,
        bestSeller: true
    },
    {
        id: "TS-004",
        name: "Infinity Line Ring",
        category: "ring",
        subcategory: "rings",
        price: 180,
        oldPrice: 449,
        rating: 4.8,
        reviewsCount: 29,
        badge: "Premium",
        image: "assets/images/products-2/Infinity Line Ring.jpg",
        description: "Contemporary criss-cross infinity band studded with micro-pavé zirconia stones. Free-size adjustable design for effortless daily elegance.",
        specs: {
            material: "Rhodium & Gold Plated Alloy",
            stone: "Micro-Pavé Cubic Zirconia",
            sizing: "Adjustable Free Size (Fits 6-9)",
            finish: "High Polish Anti-Tarnish"
        },
        featured: true,
        bestSeller: false
    },
    {
        id: "TS-005",
        name: "Dazzling Solitaire Ring",
        category: "ring",
        subcategory: "rings",
        price: 160,
        oldPrice: 399,
        rating: 4.9,
        reviewsCount: 41,
        badge: "Best Seller",
        image: "assets/images/products-2/Dazzling Solitaire Ring.jpg",
        description: "Classic solitaire crystal ring with a sparkling pavé crown setting. Plated with durable anti-tarnish gold finish to preserve its shine wear after wear.",
        specs: {
            material: "18K Gold Finish",
            stone: "Round Brilliant Cut Zirconia",
            sizing: "Adjustable Free Size",
            care: "Wipe with dry microfiber cloth"
        },
        featured: true,
        bestSeller: true
    },
    {
        id: "TS-006",
        name: "Crystal Bloom Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 330,
        oldPrice: 699,
        rating: 5.0,
        reviewsCount: 63,
        badge: "Luxury",
        image: "assets/images/products-2/Crystal Bloom Necklace.jpg",
        description: "Radiant floral pendant crafted with marquise-cut crystal petals that catch and reflect light from every angle. Includes an elegant gold chain.",
        specs: {
            material: "Gold Plated Brass Base",
            stone: "Marquise Grade AAAAA Zirconia",
            chainLength: "18 inches",
            warranty: "Anti-Tarnish Color Guarantee"
        },
        featured: true,
        bestSeller: false
    },
    {
        id: "TS-007",
        name: "Petite Solitaire Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 240,
        oldPrice: 499,
        rating: 4.8,
        reviewsCount: 38,
        badge: "Trending",
        image: "assets/images/products-2/Petite Solitaire Necklace.jpg",
        description: "Minimalist round solitaire crystal pendant suspended on a fine gold link chain. Designed for everyday subtlety and effortless layering.",
        specs: {
            material: "14K Gold Polish",
            stone: "Round Cut Solitaire Crystal",
            chainLength: "16 inches + 2 inch extension",
            hypoallergenic: "100% Skin Friendly"
        },
        featured: true,
        bestSeller: false
    },
    {
        id: "TS-008",
        name: "Golden Loop Earrings",
        category: "earing",
        subcategory: "earrings",
        price: 360,
        oldPrice: 749,
        rating: 4.9,
        reviewsCount: 27,
        badge: "New",
        image: "assets/images/products-2/Golden Loop Earrings.jpg",
        description: "Sculptural ribbon loop drop earrings polished in brilliant gold tone. A modern, bold statement piece crafted to elevate formal and casual outfits.",
        specs: {
            material: "High-Luster Gold Alloy",
            weight: "Ultra-Lightweight Comfort",
            closure: "Push-Back Stud Posts",
            finish: "Mirror Gold Polish"
        },
        featured: true,
        bestSeller: false
    },
    {
        id: "TS-009",
        name: "Elegant Ear Cuff",
        category: "earing",
        subcategory: "earrings",
        price: 270,
        oldPrice: 599,
        rating: 4.9,
        reviewsCount: 34,
        badge: "Trending",
        image: "assets/images/products-2/Elegant Ear Cuff.jpg",
        description: "Non-pierced luxury ear cuff featuring sparkling crystal clusters. Ergonomically designed to curve smoothly around your ear with a firm, comfortable grip.",
        specs: {
            material: "Flexible Alloy with Gold Coating",
            stone: "Austrian Crystal Accents",
            piercingRequired: "No Piercing Needed",
            sizing: "Gently Adjustable"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-010",
        name: "Pearl Blossom Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 260,
        oldPrice: 549,
        rating: 4.8,
        reviewsCount: 45,
        badge: "Classic",
        image: "assets/images/products-2/Pearl Blossom Necklace.jpg",
        description: "Graceful flower pendant featuring shimmering crystal petals and a central pearl accent. Suspended on a high-polish gold chain.",
        specs: {
            material: "Gold Plated Brass & Simulated Pearl",
            stone: "Pavé Zirconia Crystals",
            chainLength: "16 inches + 2 inch extension",
            finish: "Anti-Tarnish Protected"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-011",
        name: "Floral Pearl Drop Earrings",
        category: "earing",
        subcategory: "earrings",
        price: 270,
        oldPrice: 599,
        rating: 4.9,
        reviewsCount: 39,
        badge: "Best Seller",
        image: "assets/images/products-2/Floral Pearl Drop Earrings.jpg",
        description: "Delicate crystal flower studs paired with teardrop pearls. Features premium anti-tarnish gold plating for long-lasting brilliance.",
        specs: {
            material: "Shell Pearl & Rhodium Stud Posts",
            stone: "Grade AAAAA Zirconia",
            closure: "Hypoallergenic Bullet Backs",
            finish: "Anti-Tarnish Luster"
        },
        featured: false,
        bestSeller: true
    },
    {
        id: "TS-012",
        name: "Golden Bow Earrings",
        category: "earing",
        subcategory: "earrings",
        price: 190,
        oldPrice: 449,
        rating: 4.8,
        reviewsCount: 31,
        badge: "Cute",
        image: "assets/images/products-2/Golden Bow Earrings.jpg",
        description: "Charming bow-knot stud earrings in polished gold tone. Lightweight and comfortable for everyday wear with a touch of playful sweetness.",
        specs: {
            material: "Gold Plated Metal Alloy",
            weight: "3.2 grams (pair)",
            closure: "Push-Back Posts",
            care: "Avoid contact with perfumes"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-013",
        name: "Butterfly Charm Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 160,
        oldPrice: 399,
        rating: 5.0,
        reviewsCount: 58,
        badge: "Trending",
        image: "assets/images/products-2/Butterfly Charm Necklace.jpg",
        description: "Elegant butterfly pendant featuring a smooth pearlized enamel finish on a delicate gold chain. Symbolizes beauty, transformation, and freedom.",
        specs: {
            material: "Gold Plated Brass & Enamel",
            chainLength: "16 inches + 2 inch extender",
            closure: "Lobster Clasp",
            hypoallergenic: "Yes"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-014",
        name: "Tulip Drop Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 230,
        oldPrice: 499,
        rating: 4.9,
        reviewsCount: 44,
        badge: "Popular",
        image: "assets/images/products-2/Ruby Drop Necklace.jpg",
        description: "Charming tulip bloom pendant highlighted by a rich ruby-red teardrop crystal. Plated in anti-tarnish gold for wear-after-wear brilliance.",
        specs: {
            material: "18K Gold Polish",
            stone: "Ruby Red Crystal Accent",
            chainLength: "18 inches",
            finish: "Anti-Tarnish Sealed"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-015",
        name: "Classic Solitaire Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 150,
        oldPrice: 349,
        rating: 4.8,
        reviewsCount: 62,
        badge: "Best Value",
        image: "assets/images/products-2/Classic Solitaire Necklace.jpg",
        description: "Timeless solitaire crystal pendant on a delicate gold link chain. A versatile staple piece perfect for everyday wear or layering.",
        specs: {
            material: "Gold Tone Alloy",
            stone: "Round Cut Zirconia",
            chainLength: "16 inches",
            hypoallergenic: "Skin Safe"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-016",
        name: "Crystal Floral Studs",
        category: "earing",
        subcategory: "earrings",
        price: 349,
        oldPrice: 699,
        rating: 5.0,
        reviewsCount: 49,
        badge: "Premium",
        image: "assets/images/products-2/Crystal Floral Studs.jpg",
        description: "Clusters of marquise-cut crystal petals arranged into a sparkling floral bloom. Fitted with skin-safe hypoallergenic posts.",
        specs: {
            material: "Rhodium Plated Sterling Silver Posts",
            stone: "Marquise Zirconia Crystals",
            dimensions: "1.8 cm diameter",
            finish: "High Luster Polish"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-017",
        name: "Oval Charm Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 270,
        oldPrice: 599,
        rating: 4.8,
        reviewsCount: 33,
        badge: "New",
        image: "assets/images/products-2/Oval Charm Necklace.jpg",
        description: "Sophisticated oval frame pendant featuring a floating central crystal accent on a fine gold chain.",
        specs: {
            material: "Gold Plated Brass",
            stone: "Brilliant Cut Zirconia",
            chainLength: "16 inches + 2 inch extender",
            closure: "Secure Clasp"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-018",
        name: "Tulip Floral Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 230,
        oldPrice: 499,
        rating: 4.9,
        reviewsCount: 37,
        badge: "Elegant",
        image: "assets/images/products-2/Mini Floral Necklace.jpg",
        description: "Delicate tulip blossom pendant with a crystal center. Designed to complement daily outfits with subtle botanical beauty.",
        specs: {
            material: "18K Gold Polish",
            stone: "Pastel Crystal Accent",
            chainLength: "16 inches",
            finish: "Anti-Tarnish Protected"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-019",
        name: "Crystal Cross Necklace",
        category: "neckpeace",
        subcategory: "necklaces",
        price: 330,
        oldPrice: 699,
        rating: 5.0,
        reviewsCount: 41,
        badge: "Special",
        image: "assets/images/products-2/Crystal Cross Necklace.jpg",
        description: "Classic cross pendant paved with brilliant-cut zirconia crystals. Features a high-shine anti-tarnish gold finish.",
        specs: {
            material: "Gold Plated Brass Base",
            stone: "Grade AAAAA Zirconia",
            chainLength: "18 inches",
            warranty: "1 Year Color Warranty"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-020",
        name: "Royal Floral Hoop Earrings",
        category: "earing",
        subcategory: "earrings",
        price: 240,
        oldPrice: 499,
        rating: 4.8,
        reviewsCount: 28,
        badge: "Trending",
        image: "assets/images/products-2/Royal Floral Hoop Earrings.jpg",
        description: "Four-petal crystal flower studs paired with a delicate dangling hoop accent. Lightweight and hypoallergenic for comfortable all-day wear.",
        specs: {
            material: "Gold Plated Alloy",
            stone: "Cubic Zirconia",
            closure: "Push Back Posts",
            weight: "4.8 grams (pair)"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-021",
        name: "Heart Bloom Earrings",
        category: "earing",
        subcategory: "earrings",
        price: 280,
        oldPrice: 599,
        rating: 4.9,
        reviewsCount: 36,
        badge: "New",
        image: "assets/images/products-2/Heart Bloom Earrings.jpg",
        description: "Sparkling floral studs crafted with marquise-cut crystal petals arranged in a heart blossom cluster.",
        specs: {
            material: "Rhodium & Gold Polish",
            stone: "Marquise Zirconia Crystals",
            closure: "Bullet Back Posts",
            hypoallergenic: "Yes"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-022",
        name: "Delicate Charm Anklet",
        category: "anklet",
        subcategory: "anklets",
        price: 230,
        oldPrice: 499,
        rating: 4.9,
        reviewsCount: 51,
        badge: "Trending",
        image: "assets/images/products-2/Delicate Charm Anklet.jpg",
        description: "Dainty gold chain anklet adorned with hanging crystal and clover charms. Adjustable length for a customized, comfortable fit.",
        specs: {
            material: "Gold Plated Metal Base",
            charms: "Crystal & Clover Accents",
            length: "8.5 inches + 2 inch extender",
            finish: "Anti-Tarnish Coated"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-023",
        name: "Floral Crystal Anklet",
        category: "anklet",
        subcategory: "anklets",
        price: 279,
        oldPrice: 599,
        rating: 5.0,
        reviewsCount: 43,
        badge: "Premium",
        image: "assets/images/products-2/Floral Crystal Anklet.jpg",
        description: "Elegant ankle chain featuring sparkling emerald-green crystal accents. Finished with premium anti-tarnish gold coating.",
        specs: {
            material: "Gold Finish over Brass",
            stone: "Emerald Green Crystal Accents",
            length: "9 inches + 2 inch extension",
            closure: "Lobster Clasp"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-024",
        name: "Royal Silver Jhumka Earrings",
        category: "festive",
        subcategory: "jhumkas",
        price: 270,
        oldPrice: 599,
        rating: 5.0,
        reviewsCount: 67,
        badge: "Festive Best",
        image: "assets/images/products-2/Royal Silver Jhumka Earrings.jpg",
        description: "Traditional oxidized silver jhumka earrings featuring intricate filigree engraving and dangling pearl bead accents.",
        specs: {
            material: "Oxidized German Silver Polish",
            beads: "Simulated Pearl Ghungroos",
            length: "4.8 cm",
            weight: "Medium Weight Traditional Wear"
        },
        featured: true,
        bestSeller: true
    },
    {
        id: "TS-025",
        name: "Emerald Jhumka Earrings",
        category: "festive",
        subcategory: "jhumkas",
        price: 270,
        oldPrice: 599,
        rating: 4.9,
        reviewsCount: 54,
        badge: "Festive Special",
        image: "assets/images/products-2/Emerald Jhumka Earrings.jpg",
        description: "Royal ethnic jhumka earrings studded with deep green emerald-cut stones and antique silver filigree detail.",
        specs: {
            material: "Antique Oxidized Silver Finish",
            stone: "Emerald Green Faux Gemstones",
            length: "5.2 cm",
            closure: "Secure Fish-Hook / Stud Post"
        },
        featured: true,
        bestSeller: false
    },
    {
        id: "TS-026",
        name: "Rose Quartz Jhumka Earrings",
        category: "festive",
        subcategory: "jhumkas",
        price: 270,
        oldPrice: 599,
        rating: 4.9,
        reviewsCount: 48,
        badge: "Festive",
        image: "assets/images/products-2/Rose Quartz Jhumka Earrings.jpg",
        description: "Soft pink rose quartz style drop jhumka earrings in vintage silver finish. Designed for festive celebrations and weddings.",
        specs: {
            material: "Oxidized Silver Base",
            stone: "Faux Rose Quartz Drops",
            length: "5.0 cm",
            weight: "12 grams (pair)"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-027",
        name: "Royal Silver Long Earrings",
        category: "festive",
        subcategory: "earrings",
        price: 280,
        oldPrice: 649,
        rating: 5.0,
        reviewsCount: 59,
        badge: "Royal",
        image: "assets/images/products-2/Royal Silver Long Earrings.jpg",
        description: "Dramatic long chandelier earrings crafted in oxidized silver with dangling pearl clusters. Perfect statement festive wear.",
        specs: {
            material: "Oxidized Silver Polish",
            accents: "Pearl & Filigree Chains",
            dropLength: "7.2 cm",
            closure: "Stud Push-Back"
        },
        featured: false,
        bestSeller: false
    },
    {
        id: "TS-028",
        name: "Classic Gold Bracelet",
        category: "bracelet",
        subcategory: "bracelets",
        price: 460,
        oldPrice: 999,
        rating: 5.0,
        reviewsCount: 72,
        badge: "Bestseller",
        image: "assets/images/products-2/Classic Gold Bracelet.jpg",
        description: "Premium solid cuff bracelet crafted in high-luster mirror-polished gold. Features a smooth ergonomic curve with double security clasp.",
        specs: {
            material: "18K Gold Plated Solid Alloy",
            finish: "Mirror Polish Anti-Tarnish",
            clasp: "Double Security Fold-Over",
            sizing: "Fits 6.5 - 7.5 inch wrists"
        },
        featured: true,
        bestSeller: true
    }
];

// Dynamically fetch live products from Google Sheets (List Product tab)
async function loadDynamicProductsFromSheet() {
    const scriptUrl = (window.CONFIG && window.CONFIG.GOOGLE_SHEETS_URL) ? window.CONFIG.GOOGLE_SHEETS_URL : "https://script.google.com/macros/s/AKfycbwynFx5fhxNNADl5M41gJyGECuiitJuTAT9uHdJtiUMvF2nvWdXpjBeyowMy_2RI3Eu/exec";
    if (!scriptUrl) return;

    try {
        const response = await fetch(scriptUrl + "?action=getProducts");
        if (!response.ok) return;
        const liveProducts = await response.json();

        if (Array.isArray(liveProducts) && liveProducts.length > 0) {
            THE_SARVI_PRODUCTS.length = 0;
            THE_SARVI_PRODUCTS.push(...liveProducts);

            if (typeof renderBestSellers === 'function') {
                renderBestSellers();
            }

            window.dispatchEvent(new CustomEvent('sarviProductsUpdated'));
        }
    } catch (err) {
        console.warn("Using static fallback products catalog", err);
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        loadDynamicProductsFromSheet();
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = THE_SARVI_PRODUCTS;
}
