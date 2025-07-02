// DOM elements
const productsGrid = document.getElementById('products-grid');
const sortSelect = document.getElementById('sort');
const productCount = document.getElementById('product-count');
const notification = document.getElementById('notification');
const loadBtn = document.getElementById('load-btn');

// API URL
const API_URL = 'https://interveiw-mock-api.vercel.app/api/getProducts';

// Global products array
let allProducts = [];

// Fetch products from API 
async function fetchProducts() {
    try {
        const btn = loadBtn || document.getElementById('retry-btn');
        
        // Set button to loading state with dots
        if (btn) {
            btn.innerHTML = '<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>';
            btn.disabled = true;
        }

        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Process API response
        allProducts = data.data.map(item => {
            const product = item.product;
            const prices = product.variants.map(variant => parseFloat(variant.price));
            const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

            return {
                id: product.id,
                title: product.title,
                image: product.image?.src || 'https://via.placeholder.com/500x500?text=No+Image',
                price: minPrice
            };
        });

        // Update product count
        productCount.textContent = `${allProducts.length} Products`;

        // Display products
        displayProducts(allProducts);

    } catch (error) {
        console.error('Error fetching products:', error);
        showErrorState();
    } finally {
        // Reset button state
        const btn = loadBtn || document.getElementById('retry-btn');
        if (btn) {
            btn.innerHTML = '<i class="fas fa-sync-alt"></i> Load Products';
            btn.disabled = false;
        }
    }
}

// Show error state
function showErrorState() {
    productsGrid.innerHTML = `
        <div class="products-grid" id="products-grid">
            <div class="empty-state">
                <img src="./Images/empty.jpg" alt="Empty cardboard" class="empty-cardboard">
                <h3>Oops... looks like the shelves are empty!</h3>
                <p>Smash that "Load Products" button to fix this tragic situation.</p>
                <button class="btn-load" id="retry-btn">
                    <i class="fas fa-sync-alt"></i> Retry
                </button>
            </div>
        </div>
    `;

    // Add event listener to retry button
    document.getElementById('retry-btn').addEventListener('click', fetchProducts);
}

// Display products with staggered animation
function displayProducts(productsToDisplay) {
    productsGrid.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = `
            <div class="empty-state">
                <img src="./Images/empty.jpg" alt="Empty cardboard" class="empty-cardboard">
                <h3>No snowboards found</h3>
                <p>Try adjusting your filters to find what you're looking for.</p>
            </div>
        `;
        return;
    }

    productsToDisplay.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.style.animationDelay = `${index * 0.1}s`;

        // Shorten title if needed
        const displayTitle = product.title.length > 35
            ? product.title.substring(0, 35) + '...'
            : product.title;

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.title}" loading="lazy">
            </div>
            <div class="product-info">
                <h3 class="product-title">${displayTitle}</h3>
                <div class="product-price">Rs. ${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn btn-cart" data-id="${product.id}">
                        <i class="fas fa-shopping-cart"></i> ADD TO CART
                    </button>
                </div>
            </div>
        `;

        productsGrid.appendChild(productCard);
    });
}

// Sort products based on selected option
function sortProducts(productsToSort, sortOption) {
    if (sortOption === 'price-asc') {
        return [...productsToSort].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
        return [...productsToSort].sort((a, b) => b.price - a.price);
    }
    return [...productsToSort];
}

// Show notification
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize the page
function initPage() {
    // Set up event listeners
    loadBtn.addEventListener('click', fetchProducts);

    // Handle sort change
    sortSelect.addEventListener('change', () => {
        if (allProducts.length > 0) {
            const sorted = sortProducts(allProducts, sortSelect.value);
            displayProducts(sorted);
        }
    });

    // Add to cart functionality
    productsGrid.addEventListener('click', (e) => {
        const cartBtn = e.target.closest('.btn-cart');
        if (cartBtn) {
            showNotification();
        }
    });
}

// Initialize the page
initPage();