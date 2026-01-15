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
  ),
  Instagram: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
  ),
  Twitter: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
  ),
  Linkedin: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
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
  const [view, setView] = useState('shop'); // 'shop', 'admin', 'contact', 'about', or 'track'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminSubView, setAdminSubView] = useState('products'); // 'products', 'settings', 'orders', or 'customers'
  const [orderId, setOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('luxe-user');
    return saved ? JSON.parse(saved) : null;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('luxe-customers');
    return saved ? JSON.parse(saved) : [];
  });

  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [editingCustomer, setEditingCustomer] = useState(null);

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('luxe-orders');
    return saved ? JSON.parse(saved) : [];
  });

  const initialSettings = {
    logoText: "LUXE",
    heroTitle: "Digital Assets & Premium Drops",
    heroSubtitle: "Curated high-end presets, templates, and physical lifestyle products for the elite standard.",
    shopTitle: "The Collection",
    newsletterTitle: "Join the Luxe List",
    newsletterSubtitle: "Check your email for a 10% discount on your first order.",
    contactAddress: "123 Luxury Lane, Suite 500 Beverly Hills, CA 90210",
    contactEmail: "concierge@luxe.digital",
    contactPhone: "+1 (555) 000-LUXE",
    contactHours: "Monday - Friday: 9am - 6pm PST",
    accentColor: "#7047eb",
    heroBg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
    mission: "To redefine the digital lifestyle by providing exclusive, high-performance assets and premium physical goods.",
    vision: "To become the premier global destination for curators of excellence in both the digital and physical realms.",
    aboutStory: "Luxe started with a simple belief: that the tools we use and the objects we surround ourselves with should reflect our standards. We curate the best so you don't have to."
  };

  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('luxe-settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

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

  useEffect(() => {
    localStorage.setItem('luxe-settings', JSON.stringify(siteSettings));
    document.documentElement.style.setProperty('--accent-color', siteSettings.accentColor);
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('luxe-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('luxe-user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('luxe-customers', JSON.stringify(customers));
  }, [customers]);

  // URL Routing Sync
  useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin') setView('admin');
    else if (path === '/track') setView('track');
    else if (path === '/about') setView('about');
    else if (path === '/contact') setView('contact');
    else setView('shop');

    const handlePopState = () => {
      const newPath = window.location.pathname;
      if (newPath === '/admin') setView('admin');
      else if (newPath === '/track') setView('track');
      else if (newPath === '/about') setView('about');
      else if (newPath === '/contact') setView('contact');
      else setView('shop');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const path = view === 'shop' ? '/' : `/${view}`;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
  }, [view]);

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

  const handleAuth = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (authMode === 'signup') {
      const name = formData.get('name');
      const gdprConsent = formData.get('gdpr');

      if (!gdprConsent) {
        alert("You must agree to the Privacy Policy to proceed.");
        return;
      }

      if (customers.find(c => c.email === email)) {
        alert("Account already exists. Please login.");
        setAuthMode('login');
        return;
      }

      const newUser = {
        name,
        email,
        phone: formData.get('phone'),
        password, // For demo purposes, we'll store this locally
        signupDate: new Date().toISOString(),
        gdprStamp: `Consent ID: ${Math.random().toString(36).substr(2, 9)}`
      };

      setCustomers([...customers, newUser]);
      setCurrentUser(newUser);
      saveUserToSheets({ ...newUser, type: 'New User Signup' });
    } else {
      const user = customers.find(c => c.email === email && c.password === password);
      if (user) {
        setCurrentUser(user);
      } else {
        alert("Invalid credentials. Try again or Create Account.");
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setView('shop');
    setIsAdminAuthenticated(false);
  };

  const deleteCustomer = (email) => {
    if (confirm("Are you sure you want to delete this customer? This action cannot be undone.")) {
      setCustomers(customers.filter(c => c.email !== email));
    }
  };

  const updateCustomer = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updated = {
      ...editingCustomer,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone')
    };

    setCustomers(customers.map(c => c.email === editingCustomer.email ? updated : c));
    setEditingCustomer(null);
    alert("Customer profiles updated successfully.");
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo" onClick={() => setView('shop')} style={{ cursor: 'pointer' }}>
            {siteSettings.logoText}
          </div>
          <div className="nav-links">
            <a href="#hero" onClick={() => setView('shop')}>Home</a>
            <a href="#shop" onClick={() => setView('shop')}>Shop</a>
            <button className="nav-link-btn" onClick={() => setView('about')}>About</button>
            <button className="nav-link-btn" onClick={() => setView('track')}>Track</button>
            <button className="nav-link-btn" onClick={() => setView('contact')}>Contact</button>
            <button className="admin-link" onClick={() => setView('admin')}>Admin</button>

            {currentUser && (
              <div className="user-profile">
                <span className="user-name">Welcome, {currentUser.name.split(' ')[0]}</span>
                <button className="logout-inline" onClick={logout}>Exit</button>
              </div>
            )}

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
              <h2>Admin Control Center</h2>
              <p style={{ opacity: 0.6, marginBottom: '30px' }}>Secure administrator access only.</p>
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
                <div>
                  <h2>Control Center</h2>
                  <div className="admin-tabs" style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                    <button
                      className={`tab-btn ${adminSubView === 'products' ? 'active' : ''}`}
                      onClick={() => setAdminSubView('products')}
                      style={{ background: 'none', border: 'none', color: adminSubView === 'products' ? 'var(--accent-color)' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Inventory
                    </button>
                    <button
                      className={`tab-btn ${adminSubView === 'orders' ? 'active' : ''}`}
                      onClick={() => setAdminSubView('orders')}
                      style={{ background: 'none', border: 'none', color: adminSubView === 'orders' ? 'var(--accent-color)' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Orders
                    </button>
                    <button
                      className={`tab-btn ${adminSubView === 'customers' ? 'active' : ''}`}
                      onClick={() => setAdminSubView('customers')}
                      style={{ background: 'none', border: 'none', color: adminSubView === 'customers' ? 'var(--accent-color)' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Customers
                    </button>
                    <button
                      className={`tab-btn ${adminSubView === 'settings' ? 'active' : ''}`}
                      onClick={() => setAdminSubView('settings')}
                      style={{ background: 'none', border: 'none', color: adminSubView === 'settings' ? 'var(--accent-color)' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Site Customization
                    </button>
                  </div>
                </div>
                <button className="btn-secondary" onClick={() => setIsAdminAuthenticated(false)}>Logout</button>
              </div>

              {adminSubView === 'products' ? (
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
              ) : adminSubView === 'orders' ? (
                <div className="admin-orders-cms">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h3>Order Management ({orders.length})</h3>
                    <button className="delete-btn" onClick={() => { if (confirm("Clear all order history?")) setOrders([]); }}>Clear History</button>
                  </div>
                  <div className="table-scroll" style={{ background: '#000' }}>
                    {orders.length === 0 ? <p style={{ padding: '20px', opacity: 0.5 }}>No orders placed yet.</p> : (
                      orders.map(order => (
                        <div key={order.id} className="admin-order-row" style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1.5fr', alignItems: 'center', gap: '20px' }}>
                          <div>
                            <strong style={{ color: 'var(--accent-color)' }}>{order.id}</strong>
                            <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{new Date(order.date).toLocaleDateString()}</div>
                          </div>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>${order.total.toFixed(2)}</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{order.items.length} items</div>
                          </div>
                          <div>
                            <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`} style={{
                              padding: '5px 10px',
                              borderRadius: '50px',
                              fontSize: '0.7rem',
                              background: order.status === 'Delivered' ? 'rgba(0,255,0,0.1)' : 'rgba(255,255,255,0.05)',
                              color: order.status === 'Delivered' ? '#00ff00' : '#fff'
                            }}>
                              {order.status}
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <select
                              value={order.status}
                              onChange={(e) => {
                                setOrders(orders.map(o => o.id === order.id ? { ...o, status: e.target.value } : o));
                              }}
                              style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', color: '#fff', padding: '5px', borderRadius: '5px', fontSize: '0.8rem' }}
                            >
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipping">Shipping</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                            <button className="delete-btn" onClick={() => setOrders(orders.filter(o => o.id !== order.id))}>X</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : adminSubView === 'customers' ? (
                <div className="admin-customers-cms">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h3>Registered Customers ({customers.length})</h3>
                    <button className="btn-secondary" onClick={() => alert("Syncing with Google Sheets...")}>Manual Sync</button>
                  </div>
                  <div className="table-scroll" style={{ background: '#000' }}>
                    {customers.length === 0 ? <p style={{ padding: '20px', opacity: 0.5 }}>No registered users yet.</p> : (
                      customers.map(c => (
                        <div key={c.email} className="admin-user-row" style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1.5fr 0.5fr 1.5fr', alignItems: 'center', gap: '15px' }}>
                          <div style={{ fontWeight: 'bold' }}>{c.name}</div>
                          <div style={{ opacity: 0.7 }}>{c.email}</div>
                          <div style={{ opacity: 0.7 }}>{c.phone || 'N/A'}</div>
                          <div style={{ fontSize: '0.8rem', opacity: 0.5 }}>{new Date(c.signupDate).toLocaleDateString()}</div>
                          <div style={{ fontSize: '0.6rem', color: 'var(--accent-color)' }}>{c.gdprStamp}</div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.7rem' }} onClick={() => setEditingCustomer(c)}>Edit</button>
                            <button className="delete-btn" style={{ padding: '5px 10px', fontSize: '0.7rem' }} onClick={() => deleteCustomer(c.email)}>Delete</button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {editingCustomer && (
                    <div className="modal-overlay open" style={{ zIndex: 2000 }}>
                      <div className="admin-edit-card" style={{ background: 'var(--surface-color)', padding: '40px', borderRadius: '30px', border: '1px solid var(--border-color)', width: '100%', maxWidth: '400px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Edit Customer Profile</h3>
                        <form onSubmit={updateCustomer}>
                          <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '0.8rem', opacity: 0.6 }}>Full Name</label>
                            <input name="name" defaultValue={editingCustomer.name} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }} required />
                          </div>
                          <div className="form-group" style={{ marginBottom: '15px' }}>
                            <label style={{ fontSize: '0.8rem', opacity: 0.6 }}>Email Address</label>
                            <input name="email" defaultValue={editingCustomer.email} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }} required />
                          </div>
                          <div className="form-group" style={{ marginBottom: '25px' }}>
                            <label style={{ fontSize: '0.8rem', opacity: 0.6 }}>Mobile Number</label>
                            <input name="phone" defaultValue={editingCustomer.phone} style={{ width: '100%', padding: '12px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }} required />
                          </div>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <button type="submit" className="btn-primary full-width">Update Profile</button>
                            <button type="button" className="btn-secondary" onClick={() => setEditingCustomer(null)}>Cancel</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="site-settings-card" style={{ background: 'var(--surface-color)', padding: '40px', borderRadius: '20px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ marginBottom: '30px' }}>Global Site Settings</h3>
                  <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

                    <div className="settings-section">
                      <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Branding & Theme</h4>
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Logo Text</label>
                        <input
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                          value={siteSettings.logoText}
                          onChange={(e) => setSiteSettings({ ...siteSettings, logoText: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Accent Color</label>
                        <input
                          type="color"
                          style={{ width: '100%', height: '40px', padding: '2px', background: '#000', border: '1px solid var(--border-color)', borderRadius: '8px' }}
                          value={siteSettings.accentColor}
                          onChange={(e) => setSiteSettings({ ...siteSettings, accentColor: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="settings-section">
                      <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Hero (Homepage)</h4>
                      <div className="form-group" style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Headline</label>
                        <input
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                          value={siteSettings.heroTitle}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroTitle: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Subheadline</label>
                        <textarea
                          style={{ width: '100%', height: '80px', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', resize: 'none' }}
                          value={siteSettings.heroSubtitle}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSubtitle: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="settings-section">
                      <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Contact Page Info</h4>
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <input
                          placeholder="Address"
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', marginBottom: '10px' }}
                          value={siteSettings.contactAddress}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactAddress: e.target.value })}
                        />
                        <input
                          placeholder="Email"
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', marginBottom: '10px' }}
                          value={siteSettings.contactEmail}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                        />
                        <input
                          placeholder="Phone"
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', marginBottom: '10px' }}
                          value={siteSettings.contactPhone}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                        />
                        <input
                          placeholder="Store Hours"
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                          value={siteSettings.contactHours}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactHours: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="settings-section">
                      <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Backgrounds</h4>
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Hero Background Image URL</label>
                        <input
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                          value={siteSettings.heroBg}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroBg: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="settings-section">
                      <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Social Media Links</h4>
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Instagram</label>
                        <input
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                          value={siteSettings.instagram}
                          onChange={(e) => setSiteSettings({ ...siteSettings, instagram: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Twitter / X</label>
                        <input
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                          value={siteSettings.twitter}
                          onChange={(e) => setSiteSettings({ ...siteSettings, twitter: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>LinkedIn</label>
                        <input
                          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                          value={siteSettings.linkedin}
                          onChange={(e) => setSiteSettings({ ...siteSettings, linkedin: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="settings-section">
                      <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Data Management</h4>
                      <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '15px' }}>Manage user profiles, GDPR compliance records, and contact information.</p>
                      <button
                        className="btn-secondary full-width"
                        onClick={() => setAdminSubView('customers')}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                      >
                        Open Customer Vault
                      </button>
                    </div>

                  </div>
                  <div className="settings-section">
                    <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>About Us (Mission & Vision)</h4>
                    <div className="form-group" style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Our Mission</label>
                      <textarea
                        style={{ width: '100%', height: '80px', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', resize: 'none' }}
                        value={siteSettings.mission}
                        onChange={(e) => setSiteSettings({ ...siteSettings, mission: e.target.value })}
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: '10px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Our Vision</label>
                      <textarea
                        style={{ width: '100%', height: '80px', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', resize: 'none' }}
                        value={siteSettings.vision}
                        onChange={(e) => setSiteSettings({ ...siteSettings, vision: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Our Story</label>
                      <textarea
                        style={{ width: '100%', height: '80px', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px', resize: 'none' }}
                        value={siteSettings.aboutStory}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutStory: e.target.value })}
                      />
                    </div>
                  </div>
                  <button className="btn-primary" style={{ marginTop: '30px', width: 'auto' }} onClick={() => alert("Changes applied successfully.")}>Save Deployment Configuration</button>
                </div>
              )}
            </div>
          )}
        </div>
      ) : !currentUser ? (
        <div className="auth-gate container section-padding">
          <div className="auth-card">
            <div className="auth-header">
              <h1>{authMode === 'login' ? 'Welcome Back' : 'Join the Elite'}</h1>
              <p>{authMode === 'login' ? 'Enter your credentials to access the vault.' : 'Create your secure account to explore the catalog.'}</p>
            </div>

            <form onSubmit={handleAuth} className="auth-form">
              {authMode === 'signup' && (
                <div className="form-group">
                  <input name="name" type="text" placeholder="Full Name" required />
                </div>
              )}
              {authMode === 'signup' && (
                <div className="form-group">
                  <input name="phone" type="tel" placeholder="Mobile Number" required />
                </div>
              )}
              <div className="form-group">
                <input name="email" type="email" placeholder="Email Address" required />
              </div>
              <div className="form-group">
                <input name="password" type="password" placeholder="Password" required />
              </div>

              {authMode === 'signup' && (
                <div className="gdpr-box">
                  <label className="checkbox-wrap">
                    <input type="checkbox" name="gdpr" required />
                    <span className="checkmark"></span>
                    <span className="gdpr-text">
                      I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                      I consent to my data being stored in accordance with GDPR standards.
                    </span>
                  </label>
                </div>
              )}

              <button type="submit" className="btn-primary full-width">
                {authMode === 'login' ? 'Login to Vault' : 'Create Secure ID'}
              </button>
            </form>

            <div className="auth-footer">
              {authMode === 'login' ? (
                <p>New to Luxe? <button onClick={() => setAuthMode('signup')}>Create Account</button></p>
              ) : (
                <p>Already have an ID? <button onClick={() => setAuthMode('login')}>Login here</button></p>
              )}
            </div>
          </div>
        </div>
      ) : view === 'about' ? (
        <div className="about-page container section-padding">
          <div className="about-header text-center">
            <span className="badge">Our Philosophy</span>
            <h1>Crafting Digital & Physical Excellence</h1>
          </div>
          <div className="about-grid">
            <div className="about-card story-card">
              <h3>The Story</h3>
              <p>{siteSettings.aboutStory}</p>
            </div>
            <div className="mission-vision-grid">
              <div className="about-card">
                <h3>Mission</h3>
                <p>{siteSettings.mission}</p>
              </div>
              <div className="about-card">
                <h3>Vision</h3>
                <p>{siteSettings.vision}</p>
              </div>
            </div>
          </div>
          <div className="about-cta section-padding text-center">
            <h2>Join the Future of Commerce</h2>
            <button className="btn-primary" onClick={() => setView('shop')}>Explore The Collection</button>
          </div>
        </div>
      ) : view === 'track' ? (
        <div className="track-page container section-padding">
          <div className="track-header text-center">
            <h1>Track Your Selection</h1>
            <p>Enter your 12-digit vault ID to locate your luxury shipment.</p>
          </div>
          <div className="track-card-wrap">
            <div className="track-card">
              <form onSubmit={(e) => {
                e.preventDefault();
                const found = orders.find(o => o.id.toUpperCase() === orderId.toUpperCase());
                if (found) {
                  setTrackingResult({
                    status: found.status,
                    location: found.status === 'Delivered' ? "Final Destination" : (found.status === 'Confirmed' ? "Order Received" : "Logistics Hub"),
                    estimated: "Calculating..."
                  });
                } else {
                  alert("Order ID not found in our vault.");
                  setTrackingResult(null);
                }
              }}>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. LUX-9922001)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary full-width">Locate Package</button>
              </form>

              {trackingResult && (
                <div className="tracking-info-box" style={{ marginTop: '30px', animation: 'fadeIn 0.4s ease-out' }}>
                  <div className="status-item">
                    <span>Status:</span>
                    <strong>{trackingResult.status}</strong>
                  </div>
                  <div className="status-item">
                    <span>Current Location:</span>
                    <strong>{trackingResult.location}</strong>
                  </div>
                  <div className="status-item">
                    <span>Estimated Delivery:</span>
                    <strong>{trackingResult.estimated}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
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
                <p>{siteSettings.contactAddress}</p>
              </div>
              <div className="info-item">
                <h3>Contact Details</h3>
                <p>Email: {siteSettings.contactEmail}<br />Phone: {siteSettings.contactPhone}</p>
              </div>
              <div className="info-item">
                <h3>Customer Service</h3>
                <p>{siteSettings.contactHours}</p>
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
          <section id="hero" className="hero" style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6)), url(${siteSettings.heroBg})` }}>
            <div className="hero-blob one"></div>
            <div className="hero-blob two"></div>
            <div className="container">
              <div className="hero-text">
                <h1>{siteSettings.heroTitle}</h1>
                <p>{siteSettings.heroSubtitle}</p>
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
                <h2 className="section-title">{siteSettings.shopTitle}</h2>
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
                <h2>{siteSettings.newsletterTitle}</h2>
                <p>{siteSettings.newsletterSubtitle}</p>
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
                  const newOrderId = 'LUX-' + Math.random().toString(36).substr(2, 6).toUpperCase();
                  const newOrder = {
                    id: newOrderId,
                    items: [...cart],
                    total: total,
                    status: 'Confirmed',
                    date: new Date().toISOString()
                  };
                  setOrders([newOrder, ...orders]);
                  setCart([]);
                  setIsCartOpen(false);
                  alert(`Order Placed Successfully!\n\nYour Vault ID: ${newOrderId}\n\nYou can track your items in the Track section.`);

                  saveUserToSheets({
                    type: 'Order Placed',
                    orderId: newOrderId,
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
              <div className="social-links" style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '30px' }}>
                <a href={siteSettings.instagram} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-color)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                  <Icons.Instagram />
                </a>
                <a href={siteSettings.twitter} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-color)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                  <Icons.Twitter />
                </a>
                <a href={siteSettings.linkedin} target="_blank" rel="noopener noreferrer" className="social-icon" style={{ color: 'rgba(255,255,255,0.6)', transition: '0.3s' }} onMouseEnter={e => e.target.style.color = 'var(--accent-color)'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
                  <Icons.Linkedin />
                </a>
              </div>
              <p>&copy; {new Date().getFullYear()} {siteSettings.logoText}. All rights reserved.</p>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
