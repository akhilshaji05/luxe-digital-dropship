let products = [];
let cart = [];

async function fetchProducts() {
    try {
        const response = await fetch('/api/products');
        products = await response.json();
        renderProducts();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function renderProducts() {
    const digitalContainer = document.getElementById('digital-products');
    const physicalContainer = document.getElementById('physical-products');

    if (!digitalContainer || !physicalContainer) return;

    digitalContainer.innerHTML = '';
    physicalContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <div class="card-image">
                <img src="${product.image}" alt="${product.name}">
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
            <div class="card-info">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        `;

        if (product.category === 'digital') {
            digitalContainer.appendChild(productCard);
        } else {
            physicalContainer.appendChild(productCard);
        }
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        cart.push(product);
        renderCart();
        openCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPrice = document.getElementById('cart-total-price');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
        cartTotalPrice.innerText = '$0.00';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})" style="color: #666; font-size: 0.8rem; margin-top: 5px; cursor: pointer; background: none; border: none; text-decoration: underline;">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    cartTotalPrice.innerText = '$' + total.toFixed(2);
}

function openCart() {
    document.getElementById('cart-sidebar').classList.add('open');
    document.getElementById('cart-overlay').classList.add('open');
}

function closeCart() {
    document.getElementById('cart-sidebar').classList.remove('open');
    document.getElementById('cart-overlay').classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();

    // Event Listeners
    const closeBtn = document.getElementById('close-cart');
    const overlay = document.getElementById('cart-overlay');

    if (closeBtn) closeBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);

    // Cart Link in Navbar
    const cartLink = document.querySelector('a[href="#cart"]');
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }
});
