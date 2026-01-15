import React, { useState } from 'react';
import './App.css';

// SVG Icons as components to remove lucide-react dependency
const Icons = {
  Cart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
  ),
  X: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
  ),
  Plus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
  ),
  Minus: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
  ),
  ArrowRight: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
  )
};

const PRODUCTS = [
  {
    id: 1,
    name: "Luxe Lightroom Bundle",
    category: "digital",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
    desc: "15+ High-end presets for professional editing."
  },
  {
    id: 2,
    name: "E-Commerce Blueprints",
    category: "digital",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1589330694653-90d18cf48c34?q=80&w=800&auto=format&fit=crop",
    desc: "Complete guide to scaling your dropshipping store."
  },
  {
    id: 3,
    name: "Nordic Minimalist Watch",
    category: "physical",
    price: 149.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    desc: "Sleek stainless steel with sapphire crystal."
  },
  {
    id: 4,
    name: "Vegan Leather Carryall",
    category: "physical",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    desc: "Sustainable materials for the modern traveler."
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">LUXE</div>
          <div className="nav-links">
            <a href="#hero">Home</a>
            <a href="#shop">Shop</a>
            <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
              <Icons.Cart />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero-blob one"></div>
        <div className="hero-blob two"></div>
        <div className="container">
          <div className="hero-text">
            <h1>Digital Mastery <br /><span>Physical Luxury</span></h1>
            <p>Elevate your lifestyle with curated digital assets and premium dropshipping collections.</p>
            <div className="hero-btns">
              <a href="#shop" className="btn-primary">Explore Shop <Icons.ArrowRight /></a>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="shop" className="shop section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The Collection</h2>
            <div className="filter-bar">
              {['all', 'digital', 'physical'].map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.charAt(0) + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="card-image">
                  <img src={product.image} alt={product.name} />
                  <div className="card-overlay">
                    <button onClick={() => addToCart(product)} className="card-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
                <div className="card-info">
                  <div className="card-meta">
                    <span className="category-tag">{product.category}</span>
                    <span className="price">${product.price.toFixed(2)}</span>
                  </div>
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)} />
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Selection</h2>
          <button onClick={() => setIsCartOpen(false)}><Icons.X /></button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <Icons.Cart />
              <p>Your vault is currently empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  <div className="item-controls">
                    <div className="qty-wrap">
                      <button onClick={() => updateQty(item.id, -1)}><Icons.Minus /></button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}><Icons.Plus /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="remove-item">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>

      <footer className="footer section-padding">
        <div className="container">
          <p>&copy; 2024 LUXE. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
