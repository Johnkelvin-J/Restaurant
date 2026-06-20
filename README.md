# 🌴 Namma Chennai Kitchen 🌴
> **Authentic Flavors of the Coromandel Coast**

A premium, visually stunning, single-page responsive website showcasing the rich culinary heritage of Mylapore, Chennai. Featuring local favorites, street-food inspirations, and traditional South Indian staples.

Live Demo: [https://kelwin-2005.github.io/resaurant](https://kelwin-2005.github.io/resaurant) *(Deployment URL)*

---

## ✨ Features

- **Responsive Navigation with Glassmorphism:** A modern sticky header with glassmorphism blur that dynamically shrinks on scroll and highlights the active section in view.
- **Interactive Hero Carousel:** A snappy visual slider rotating authentic, high-quality images of Ghee Roast Dosa, Ambur Star Mutton Biryani, and traditional Degree Filter Coffee.
- **Interactive Degree Filter Kaapi Brewer Widget:** A micro-interactive widget that simulates brewing a fresh cup of South Indian Degree Coffee. Powered by pure CSS keyframe animations, it features a brass dabara set, pouring stream, rising liquid level, foam formation, and floating steam particles.
- **Dynamic Category & Search Filter Menu:** Browse through the 27 authentic Chennai dishes categorized under Aarambam (Starters), Tiffin Center, Mains, Rice & Breads, Desserts, and Beverages. Real-time typing filtering updates the list instantly.
- **Live Stateful Order Basket (Cart Drawer):** A drawer panel sliding from the right to manage orders. Automatically calculates subtotals, GST (5%), and grand totals. Enables adding items, increasing/decreasing quantities, and removing items in real-time.
- **Order Success Modal:** A custom visual overlay with checkmark animations and generated confirmation details upon checking out or sending message inquiries.
- **Custom Premium Animations:** Scroll-linked reveal triggers (using JavaScript `IntersectionObserver`), subtle hover effects, and micro-animations that make the site feel premium and alive.

---

## 🎨 Tech Stack & Styling Tokens

- **Core Structure:** HTML5
- **Logic & Interactions:** Vanilla JavaScript (ES6+)
- **Styling:** Vanilla CSS3
  - **Fonts:** imported `DM Serif Display` (for a classic Tamil tiffin house title look) and `Outfit` (for clean modern body text).
  - **Color Palette:**
    - `--primary-terracotta`: `#C85C32` (earthy Tamil red clay)
    - `--secondary-turmeric`: `#E5A93C` (warm spices/honey gold)
    - `--accent-curry-leaf`: `#2D6A4F` (emerald green)
    - `--bg-rice-cream`: `#FAF7F2` (soft rice water off-white)
    - `--bg-coffee-charcoal`: `#12100E` (rich dark coffee bean)

---

## 📁 Repository Directory Structure

```
├── assets/
│   ├── dosa.png             # Crisp Ghee Roast Dosa hero image
│   ├── biryani.png          # Ambur Star Mutton Biryani hero image
│   └── coffee.png           # Steaming traditional filter coffee image
├── index.html               # Main semantic page structure and menu items
├── styles.css               # Design tokens, layout grids, and animations
├── script.js                # State management, cart logic, and scroll observers
└── README.md                # Project documentation
```

---

## 🚀 Running Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/kelwin-2005/resaurant.git
   cd resaurant
   ```

2. Run a simple local HTTP server. For example, using Python:
   ```bash
   python -m http.server 8000
   ```

3. Open your browser and navigate to `http://localhost:8000`.

---

## 🌐 Deployment to GitHub Pages

To host this website live on GitHub Pages:
1. Push the repository to GitHub.
2. In the repository settings, go to the **Pages** section on the left sidebar.
3. Under **Build and deployment**, set the source to **Deploy from a branch**.
4. Choose the `main` branch and the `/ (root)` folder, then click **Save**.
5. Your site will be live at `https://kelwin-2005.github.io/resaurant/` in a few minutes!
