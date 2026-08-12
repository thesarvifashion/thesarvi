# The Sarvi Fashion — SEO & Custom Domain Deployment Guide

## 🌐 Custom Domain Configuration (`thesarvi.com`)

The custom domain `thesarvi.com` is configured with GitHub Pages.

### DNS Records (GoDaddy)
- **A Records (Apex `@`)**:
  - `185.199.108.153`
  - `185.199.109.153`
  - `185.199.110.153`
  - `185.199.111.153`
- **CNAME Record**:
  - `www` ➔ `thesarvifashion.github.io.` (or `thesarvi.com`)

---

## 🔍 SEO & Crawl Optimization

### 1. `robots.txt`
Located at `https://thesarvi.com/robots.txt`:
```text
User-agent: *
Allow: /
Sitemap: https://thesarvi.com/sitemap.xml
```

### 2. `sitemap.xml`
Located at `https://thesarvi.com/sitemap.xml`:
- Includes all main landing pages, product catalog, about us, contact form, and legal policy pages.

### 3. On-Page SEO Audit
- **Unique Meta Titles & Descriptions**: Set across all 7 pages (`index.html`, `shop.html`, `about.html`, `contact.html`, `privacy.html`, `refund.html`, `terms.html`).
- **OpenGraph Tags**: Added `og:title`, `og:description`, `og:image`, `og:url` for rich social media link previews on WhatsApp, Instagram, Facebook, and Twitter.
- **Canonical URLs**: Added explicit `<link rel="canonical" href="https://thesarvi.com/...">` tags to prevent duplicate content indexing.
- **Semantic HTML5 & Alt Tags**: Descriptive alt tags added on all product, category, and social grid images.

---

## 🛍️ Catalog Categories & Image Structure
- **Categories (6)**: `NECKPEACE`, `BRACELET`, `EARING`, `RING`, `ANKLET`, `FESTIVE JEWELLERY`
- **Products Database**: `assets/js/products.js` (28 products)
- **Product Images**: `assets/images/products-2/`
