import React, { useState, useEffect } from 'react';
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
    desc: "15+ High-end presets for professional editing.",
    rating: 4.8,
    fullDesc: "Unlock professional-level photo editing with our curated Lightroom preset bundle. Designed for photographers who demand excellence, these presets work perfectly for portraits, landscapes, and lifestyle shots."
  },
  {
    id: 2,
    name: "E-Commerce Blueprints",
    category: "digital",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1589330694653-90d18cf48c34?q=80&w=800&auto=format&fit=crop",
    desc: "Complete guide to scaling your dropshipping store.",
    rating: 4.9,
    fullDesc: "The ultimate roadmap to building a 6-figure dropshipping business. Includes supplier lists, ad templates, and conversion optimization strategies that actually work in 2024."
  },
  {
    id: 3,
    name: "Nordic Minimalist Watch",
    category: "physical",
    price: 149.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    desc: "Sleek stainless steel with sapphire crystal.",
    rating: 4.7,
    fullDesc: "A timeless piece of Scandinavian design. Featuring a matte black dial, surgical-grade stainless steel, and a scratch-resistant sapphire crystal lens. Water resistant up to 5ATM."
  },
  {
    id: 4,
    name: "Vegan Leather Carryall",
    category: "physical",
    price: 85.00,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
    desc: "Sustainable materials for the modern traveler.",
    rating: 4.6,
    fullDesc: "Travel in style without compromise. Our carryall is crafted from premium grade vegan leather that is durable, water-resistant, and ethically sourced. Perfect for weekend getaways."
  }
];

function App() {
  const [view, setView] = useState('shop'); // 'shop', 'admin', or 'contact'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('luxe-products');
    return saved ? JSON.parse(saved) : PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('luxe-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [emailSubscribed, setEmailSubscribed] = useState(false);

  useEffect(() => {
    localStorage.setItem('luxe-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('luxe-products', JSON.stringify(products));
  }, [products]);

  // Google Sheets Integration Logic
  const saveUserToSheets = async (userData) => {
    const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL"; // User needs to provide this
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      console.log("User data synced to Google Sheets");
    } catch (err) {
      console.error("Sheets Sync Error:", err);
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123') { // Simple demo password
      setIsAdminAuthenticated(true);
    } else {
      alert("Invalid Access Code");
    }
  };

  const addProduct = (newProd) => {
    setProducts([...products, { ...newProd, id: Date.now(), rating: 5.0 }]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null); // Close modal if open
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

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e) => {
    e.preventDefault();
    setEmailSubscribed(true);
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo" onClick={() => setView('shop')}>LUXE</div>
          <div className="nav-links">
            <a href="#hero" onClick={() => setView('shop')}>Home</a>
            <a href="#shop" onClick={() => setView('shop')}>Shop</a>
            <button className="nav-link-btn" onClick={() => setView('contact')}>Contact</button>
            <button className="admin-link" onClick={() => setView('admin')}>Admin</button>
            <button className="cart-trigger" onClick={() => setIsCartOpen(true)}>
              <Icons.Cart />
              {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
            </button>
          </div>
        </div>
      </nav>

      {view === 'admin' ? (
        <div className="admin-container container section-padding">
          {!isAdminAuthenticated ? (
            <div className="admin-login">
              <h2>Admin Access</h2>
              <form onSubmit={handleAdminLogin}>
                <input
                  type="password"
                  placeholder="Enter Passcode (admin123)"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                />
                <button type="submit" className="btn-primary">Unlock Dashboard</button>
              </form>
            </div>
          ) : (
            <div className="admin-dashboard">
              <div className="dashboard-header">
                <h2>Product Control Center</h2>
                <button className="btn-secondary" onClick={() => setIsAdminAuthenticated(false)}>Logout</button>
              </div>

              <div className="admin-grid">
                <div className="add-product-card">
                  <h3>Add New Product</h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    addProduct({
                      name: formData.get('name'),
                      category: formData.get('category'),
                      price: parseFloat(formData.get('price')),
                      image: formData.get('image'),
                      desc: formData.get('desc'),
                      fullDesc: formData.get('fullDesc')
                    });
                    e.target.reset();
                  }}>
                    <input name="name" placeholder="Product Name" required />
                    <select name="category" required>
                      <option value="digital">Digital</option>
                      <option value="physical">Physical</option>
                    </select>
                    <input name="price" type="number" step="0.01" placeholder="Price" required />
                    <input name="image" placeholder="Image URL (Unsplash)" required />
                    <input name="desc" placeholder="Short description" required />
                    <textarea name="fullDesc" placeholder="Full product description" required />
                    <button type="submit" className="btn-primary">Add to Catalog</button>
                  </form>
                </div>

                <div className="product-list-table">
                  <h3>Live Catalog ({products.length})</h3>
                  <div className="table-scroll">
                    {products.map(p => (
                      <div key={p.id} className="admin-prod-row">
                        <img src={p.image} alt="" />
                        <div className="row-info">
                          <h4>{p.name}</h4>
                          <span>${p.price}</span>
                        </div>
                        <button onClick={() => deleteProduct(p.id)} className="delete-btn">Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : view === 'contact' ? (
        <div className="contact-page container section-padding">
          <div className="contact-header">
            <h1>Get In Touch</h1>
            <p>Have questions about our digital assets or physical drops? We're here to help.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-item">
                <h3>Our Studio</h3>
                <p>123 Luxury Lane, Suite 500<br />Beverly Hills, CA 90210</p>
              </div>
              <div className="info-item">
                <h3>Contact Details</h3>
                <p>Email: concierge@luxe.digital<br />Phone: +1 (555) 000-LUXE</p>
              </div>
              <div className="info-item">
                <h3>Customer Service</h3>
                <p>Monday - Friday: 9am - 6pm PST<br />Saturday: 10am - 4pm PST</p>
              </div>
            </div>
            <div className="contact-form-wrap">
              <form className="contact-form" onSubmit={(e) => {
                e.preventDefault();
                alert("Message secure. Our team will contact you shortly.");
                e.target.reset();
              }}>
                <div className="form-group">
                  <input type="text" placeholder="Full Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" className="btn-primary full-width">Send Message</button>
              </form>
            </div>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105759.7137356262!2d-118.411732!3d34.083656!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c37927977eb!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2susa!4v1705362000000!5m2!1sen!2susa"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '20px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      ) : (
        <>
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
                <div className="search-wrap">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              <div className="filter-bar-wrap">
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
                <p className="results-count">{filteredProducts.length} items found</p>
              </div>

              <div className="product-grid">
                {filteredProducts.map(product => (
                  <div key={product.id} className="product-card">
                    <div className="card-image" onClick={() => setSelectedProduct(product)}>
                      <img src={product.image} alt={product.name} />
                      <div className="card-overlay">
                        <span className="view-details">Quick View</span>
                      </div>
                    </div>
                    <div className="card-info">
                      <div className="card-meta">
                        <span className="category-tag">{product.category}</span>
                        <span className="price">${product.price.toFixed(2)}</span>
                      </div>
                      <h3>{product.name}</h3>
                      <div className="card-footer-btns">
                        <button onClick={() => addToCart(product)} className="add-btn-small">
                          Add to Vault
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Product Modal */}
          <div className={`modal-overlay ${selectedProduct ? 'open' : ''}`} onClick={() => setSelectedProduct(null)}>
            {selectedProduct && (
              <div className="product-modal" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={() => setSelectedProduct(null)}><Icons.X /></button>
                <div className="modal-content">
                  <div className="modal-image">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                  </div>
                  <div className="modal-details">
                    <span className="category-tag">{selectedProduct.category}</span>
                    <h2>{selectedProduct.name}</h2>
                    <div className="rating">
                      {"★".repeat(Math.floor(selectedProduct.rating))}
                      {"☆".repeat(5 - Math.floor(selectedProduct.rating))}
                      <span>({selectedProduct.rating})</span>
                    </div>
                    <p className="modal-price">${selectedProduct.price.toFixed(2)}</p>
                    <div className="modal-desc">
                      <p>{selectedProduct.fullDesc}</p>
                    </div>
                    <button className="btn-primary full-width" onClick={() => addToCart(selectedProduct)}>
                      Secure Item <Icons.ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Newsletter Section */}
          <section className="newsletter section-padding">
            <div className="container">
              <div className="newsletter-box">
                <h2>Join the Inner Circle</h2>
                <p>Get exclusive early access to digital assets and limited physical drops.</p>
                {emailSubscribed ? (
                  <div className="success-msg">
                    <h3>Welcome to the Vault!</h3>
                    <p>Check your email for a 10% discount on your first order.</p>
                  </div>
                ) : (
                  <form className="newsletter-form" onSubmit={(e) => {
                    handleSubscribe(e);
                    const email = e.target.querySelector('input').value;
                    saveUserToSheets({ email, type: 'Newsletter', date: new Date().toISOString() });
                  }}>
                    <input type="email" placeholder="Your email address" required />
                    <button type="submit" className="btn-primary">Subscribe</button>
                  </form>
                )}
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
                <button className="checkout-btn" onClick={() => {
                  alert("Proceeding to secure checkout...");
                  saveUserToSheets({
                    type: 'Checkout Attempt',
                    total: total,
                    items: cart.length,
                    date: new Date().toISOString()
                  });
                }}>Proceed to Checkout</button>
              </div>
            )}
          </div>

          <footer className="footer section-padding">
            <div className="container">
              <p>&copy; 2024 LUXE. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
