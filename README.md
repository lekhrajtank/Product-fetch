# Responsive Product Grid CSS

A fully responsive CSS stylesheet for displaying products in a flexible, proportional grid.  
It automatically adapts to any screen size, ensuring a seamless and beautiful UI.

- **Desktop (≥992 px):** 3 columns  
- **Tablet & Phone (<992 px):** 2 columns  
- **Fluid scaling:** Typography, spacing, and cards resize smoothly with viewport width.

---

## 📂 File Included

- `styles.css`  
  Contains:
  - CSS reset
  - CSS variables for easy theming
  - Fluid typography
  - Responsive grid layout
  - Product card styles & animations
  - Media queries for breakpoints

---

## 🚀 Features

### 1️⃣ Fluid Typography & Spacing
Uses `calc()` to scale fonts and spacing.
```css
html {
  font-size: calc(0.875rem + 0.5vw);
}
```
### 2️⃣ Easy Theming with CSS Variables

Centralized colors & gradients for quick adjustments.

```css
:root {
  --primary: #2c3e50;
  --accent: #e74c3c;
  --light: #ecf0f1;
  --dark: #2c3e50;
  --gray: #7f8c8d;
  --border: #bdc3c7;
  --success: #27ae60;
  --error-color: #7f8c8d;
  --line-color: #e0e0e0;
  --card-bg: #ffffff;
  --btn-gradient: linear-gradient(135deg, rgb(20,127,255), rgb(84,221,255));
  --btn-hover: linear-gradient(135deg, rgb(15,110,230), rgb(70,200,230));
    }
```

## 3️⃣ Responsive Grid

```css
.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

@media (max-width: 62rem) { /* ≤992px */
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

- On desktops, **3 columns**.
- On tablets & smaller, **2 columns**.

---

## 4️⃣ Aspect-Ratio for Product Images

```css
.product-image {
  aspect-ratio: 4 / 3;
}
```

- Maintains consistent shape across all devices.
- Resize the window, and images stay perfectly proportional.

---

## 5️⃣ Animations & Hover Effects

- Fade-in cards using `fadeInUp` keyframe.
- Subtle scale + shadow on hover.

---

## 🔥 Installation

- Copy `styles.css` into your project’s CSS folder.
- Link it in your HTML file:

```html
<link rel="stylesheet" href="css/styles.css">
```

---

## 📝 Example HTML Structure

```html
<div class="container">
  <div class="controls">
    <!-- Sorting, filters, etc. -->
  </div>

  <div class="products-grid">
    <div class="product-card">
      <div class="product-image">
        <img src="images/product1.jpg" alt="Product Name">
      </div>
      <div class="product-info">
        <h2 class="product-title">Product Name</h2>
        <p class="product-price">$49.99</p>
        <div class="product-actions">
          <button class="btn btn-cart">Add to Cart</button>
        </div>
      </div>
    </div>
    <!-- Repeat more .product-card elements -->
  </div>
</div>
```

---

## 🎨 Customization

- **Colors & gradients:** Change values in `:root` at the top of your CSS.
- **Breakpoints:** Adjust `@media (max-width: 62rem)` to change where it switches to 2 columns.
- **Image ratio:** Modify `aspect-ratio` in `.product-image` to fit your design (like `16 / 9`).

---

## 🌍 Browser Support

✅ Works in all modern browsers supporting:

- CSS Variables
- `calc()`
- `aspect-ratio`

Older browsers still display the grid & images, but without advanced scaling.

---

## 📄 License

MIT License © Lekhraj Tank

   

