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
  ),
  Heart: ({ fill }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
  ),
  Star: ({ fill }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill={fill ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
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
  const [view, setView] = useState('shop'); // 'shop', 'admin', 'about', 'track', 'contact'
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminUsers, setAdminUsers] = useState(() => {
    const saved = localStorage.getItem('luxe-admin-users');
    return saved ? JSON.parse(saved) : [{ username: 'admin', password: 'admin123' }];
  });
  const [resetMode, setResetMode] = useState(null); // 'admin' or 'customer'
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
  const [productUploadType, setProductUploadType] = useState('url'); // 'url' or 'file'
  const [activeProductTab, setActiveProductTab] = useState('overview'); // 'overview', 'pricing', 'inventory', 'delivery', 'media'
  const [imagePreview, setImagePreview] = useState(''); // Live preview for admin upload
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('luxe-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured'); // 'featured', 'price-low', 'price-high', 'newest'

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
    vision: "To become the premier global destination for curators of excellence in both the digital and physical realms.",
    aboutStory: "Luxe started with a simple belief: that the tools we use and the objects we surround ourselves with should reflect our standards. We curate the best so you don't have to.",
    googleSheetUrl: "",
    googleScriptUrl: "",
    bgColor: "#111111",
    surfaceColor: "#1a1a1a",
    fontFamily: "'Inter', sans-serif",
    btnRadius: "0"
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
    document.documentElement.style.setProperty('--bg-color', siteSettings.bgColor || '#111111');
    document.documentElement.style.setProperty('--surface-color', siteSettings.surfaceColor || '#1a1a1a');
    document.documentElement.style.setProperty('--font-main', siteSettings.fontFamily || "'Inter', sans-serif");
    document.documentElement.style.setProperty('--btn-radius', (siteSettings.btnRadius || '0') + 'px');
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('luxe-orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('luxe-user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('luxe-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Routing Logic
  useEffect(() => {
    localStorage.setItem('luxe-customers', JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem('luxe-admin-users', JSON.stringify(adminUsers));
  }, [adminUsers]);

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
    const SCRIPT_URL = siteSettings.googleScriptUrl;
    if (!SCRIPT_URL) {
      console.log("Google Script URL not configured.");
      return;
    }
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

  const fetchUsersFromSheets = async () => {
    const SCRIPT_URL = siteSettings.googleScriptUrl;
    if (!SCRIPT_URL) {
      alert("Please configure the Google Apps Script URL in Site Customization > Data Management.");
      return;
    }
    try {
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      if (data && Array.isArray(data)) {
        // Merge strategy: Update existing by email, add new
        const newCustomers = [...customers];
        data.forEach(sheetUser => {
          if (!newCustomers.find(c => c.email === sheetUser.email)) {
            newCustomers.push(sheetUser);
          }
        });
        setCustomers(newCustomers);
        alert("Sync Complete: Customer data updated from Google Sheets.");
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      alert("Failed to sync with Google Sheets. Check console for details.");
    }
  };

  // Auto-Sync on Tab Load
  useEffect(() => {
    if (view === 'admin' && adminSubView === 'customers' && siteSettings.googleScriptUrl) {
      console.log("Auto-syncing customers...");
      fetchUsersFromSheets();
    }
  }, [view, adminSubView]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const user = adminUsers.find(u => u.username === adminUsername && u.password === adminPassword);
    if (user) {
      setIsAdminAuthenticated(true);
      setAdminPassword('');
      setAdminUsername('');
    } else {
      alert("Invalid Username or Password");
    }
  };

  const addAdmin = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAdmin = {
      username: formData.get('username'),
      password: formData.get('password')
    };
    if (adminUsers.find(u => u.username === newAdmin.username)) {
      alert("Admin username already exists.");
      return;
    }
    setAdminUsers([...adminUsers, newAdmin]);
    e.target.reset();
    alert("New Admin added successfully.");
  };

  const deleteAdmin = (username) => {
    if (adminUsers.length <= 1) {
      alert("Cannot delete the last admin.");
      return;
    }
    if (confirm(`Delete admin '${username}'?`)) {
      setAdminUsers(adminUsers.filter(u => u.username !== username));
    }
  };

  const resetCustomerPassword = (email) => {
    const newPass = prompt("Enter new password for " + email + ":");
    if (newPass) {
      setCustomers(customers.map(c => c.email === email ? { ...c, password: newPass } : c));
      alert("Password updated for " + email);
    }
  };

  const handleForgotPass = (e, type) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    alert(`Password reset link sent to ${email} (Simulation). Check your inbox.`);
    setResetMode(null);
  };

  const addProduct = (newProd) => {
    setProducts([...products, { ...newProd, id: Date.now(), rating: 5.0, reviews: [] }]);
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

  // Wishlist Logic
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter(id => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };

  // Reviews Logic
  const addReview = (productId, review) => {
    const updatedProducts = products.map(p => {
      if (p.id === productId) {
        const newReviews = p.reviews ? [...p.reviews, review] : [review];
        const newRating = newReviews.reduce((acc, r) => acc + r.rating, 0) / newReviews.length;
        return { ...p, reviews: newReviews, rating: newRating };
      }
      return p;
    });
    setProducts(updatedProducts);
  };

  // Sorting Logic
  const getSortedProducts = (productsToSort) => {
    let sorted = [...productsToSort];
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'newest':
        return sorted.reverse(); // Assuming default order is somewhat chronological or id based
      default:
        return sorted;
    }
  };

  const filteredProducts = getSortedProducts(products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.type && product.type.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchesSearch && matchesCategory;
  }));

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
      {view !== 'admin' && (
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

              {currentUser && <a href="#" onClick={(e) => { e.preventDefault(); setIsWishlistOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Icons.Heart fill={wishlist.length > 0} /> <span style={{ fontSize: '0.8rem' }}>({wishlist.length})</span>
              </a>}
              <div className="cart-trigger" onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer' }}>
                <Icons.Cart />
                {cart.length > 0 && <span className="cart-count">{cart.reduce((a, c) => a + c.qty, 0)}</span>}
              </div>
            </div>
          </div>
        </nav>

      )
      }

      {
        view === 'admin' ? (
          <div className="admin-container container section-padding">
            {!isAdminAuthenticated ? (
              <div className="admin-login">
                <h2>Admin Control Center</h2>
                <p style={{ opacity: 0.6, marginBottom: '30px' }}>Secure administrator access only.</p>

                {resetMode === 'admin' ? (
                  <form onSubmit={(e) => handleForgotPass(e, 'admin')}>
                    <div className="form-group">
                      <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>Enter your registered email or recovery key to reset credentials.</p>
                      <input type="text" placeholder="Recovery Email / Key" required />
                    </div>
                    <button type="submit" className="btn-primary full-width">Send Recovery Link</button>
                    <button type="button" className="btn-secondary full-width" style={{ marginTop: '10px' }} onClick={() => setResetMode(null)}>Cancel</button>
                  </form>
                ) : (
                  <form onSubmit={handleAdminLogin}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Username"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        placeholder="Passcode"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary full-width">Unlock Dashboard</button>

                    <div style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <button type="button" onClick={() => setResetMode('admin')} style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer' }}>
                        Forgot Credentials?
                      </button>
                      <a href="/" onClick={(e) => { e.preventDefault(); setView('shop'); }} style={{ color: 'inherit', textDecoration: 'underline' }}>
                        &larr; Return to Shop
                      </a>
                    </div>
                  </form>
                )}
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
                      <button
                        className={`tab-btn ${adminSubView === 'qikink-sync' ? 'active' : ''}`}
                        onClick={() => setAdminSubView('qikink-sync')}
                        style={{ background: 'none', border: 'none', color: adminSubView === 'qikink-sync' ? 'var(--accent-color)' : '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                      >
                        🚀 Qikink Sync
                      </button>
                    </div>
                  </div>
                  <button className="btn-secondary" onClick={() => setIsAdminAuthenticated(false)}>Logout</button>
                </div>

                {adminSubView === 'products' ? (
                  <div className="admin-grid">
                    <div className="add-product-card">
                      <h3>Add New Catalog Item</h3>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        let finalImage = formData.get('imageUrl');

                        if (productUploadType === 'file') {
                          const file = e.target.querySelector('input[type="file"]').files[0];
                          if (file) {
                            finalImage = await new Promise(resolve => {
                              const reader = new FileReader();
                              reader.onload = (ev) => resolve(ev.target.result);
                              reader.readAsDataURL(file);
                            });
                          }
                        }

                        // Use preview as fallback if URL/File logic fails or if preview is already set by file input
                        if (!finalImage && imagePreview) finalImage = imagePreview;

                        // Custom Validation
                        const name = formData.get('name');
                        const price = formData.get('price');
                        const desc = formData.get('desc');

                        if (!name) { alert("Please enter a Product Name (Overview)"); setActiveProductTab('overview'); return; }
                        if (!desc) { alert("Please enter a Tagline (Overview)"); setActiveProductTab('overview'); return; }
                        if (!price) { alert("Please enter a Base Price (Pricing)"); setActiveProductTab('pricing'); return; }
                        if (!finalImage) { alert("Please provide an Image (Media)"); setActiveProductTab('media'); return; }

                        addProduct({
                          name: formData.get('name'),
                          brand: formData.get('brand'),
                          sku: formData.get('sku'),
                          stock: parseInt(formData.get('stock') || 0),
                          status: formData.get('status'),
                          category: formData.get('category'),
                          type: formData.get('type'),
                          price: parseFloat(formData.get('price')),
                          salePrice: formData.get('salePrice') ? parseFloat(formData.get('salePrice')) : null, // New Field
                          tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()) : [], // New Field
                          weight: formData.get('weight'),
                          dimensions: formData.get('dimensions'),
                          downloadUrl: formData.get('downloadUrl'),
                          qikinkProductId: formData.get('qikinkProductId'), // Qikink Integration
                          qikinkVariantId: formData.get('qikinkVariantId'), // Qikink Integration
                          fulfillmentType: formData.get('fulfillmentType') || 'self', // 'self' or 'qikink'
                          image: finalImage,
                          desc: formData.get('desc'),
                          fullDesc: formData.get('fullDesc'),
                          sizes: formData.get('sizes') ? formData.get('sizes').split(',').map(s => s.trim()).filter(s => s) : [],
                          colors: formData.get('colors') ? formData.get('colors').split(',').map(c => c.trim()).filter(c => c) : []
                        });
                        e.target.reset();
                        setImagePreview('');
                        alert("Product Added Successfully!");
                      }}>

                        {/* Product Editor Tabs */}
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', overflowX: 'auto' }}>
                          {['overview', 'pricing', 'inventory', 'delivery', 'media'].map(tab => (
                            <button type="button" key={tab} onClick={() => setActiveProductTab(tab)} style={{
                              background: 'none',
                              border: 'none',
                              color: activeProductTab === tab ? 'var(--accent-color)' : '#fff',
                              fontWeight: activeProductTab === tab ? 'bold' : 'normal',
                              padding: '5px 10px',
                              cursor: 'pointer',
                              textTransform: 'capitalize'
                            }}>{tab}</button>
                          ))}
                        </div>

                        {/* Tab Content */}
                        <div style={{ minHeight: '300px' }}>

                          {/* OVERVIEW TAB */}
                          <div className="form-section animate-fade" style={{ display: activeProductTab === 'overview' ? 'block' : 'none' }}>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                              <div style={{ flex: 2 }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Product Name</label>
                                <input name="name" placeholder="e.g. Ultra-Luxe Hoodie" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Brand / Vendor</label>
                                <input name="brand" placeholder="e.g. Gucci" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              </div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                              <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Short Tagline</label>
                              <input name="desc" placeholder="A brief hook..." style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                              <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Full Description</label>
                              <textarea name="fullDesc" placeholder="Detailed product story..." style={{ width: '100%', height: '120px', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px', resize: 'none' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Search Tags (SEO)</label>
                              <input name="tags" placeholder="Comma separated (e.g. summer, sale, cotton)" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                            </div>
                          </div>

                          {/* PRICING TAB */}
                          <div className="form-section animate-fade" style={{ display: activeProductTab === 'pricing' ? 'block' : 'none' }}>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Base Price ($)</label>
                                <input name="price" type="number" step="0.01" placeholder="0.00" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Sale Price ($)</label>
                                <input name="salePrice" type="number" step="0.01" placeholder="Optional" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                                <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '5px' }}>If set, original price will be crossed out.</p>
                              </div>
                            </div>
                            <div>
                              <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Cost per Item ($)</label>
                              <input name="cost" type="number" step="0.01" placeholder="Internal use only" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '5px' }}>Customers won't see this.</p>
                            </div>
                          </div>

                          {/* INVENTORY TAB */}
                          <div className="form-section animate-fade" style={{ display: activeProductTab === 'inventory' ? 'block' : 'none' }}>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>SKU (Stock Keeping Unit)</label>
                                <input name="sku" placeholder="e.g. PROD-001" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Barcode (ISBN/UPC)</label>
                                <input name="barcode" placeholder="Optional" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Stock Quantity</label>
                                <input name="stock" type="number" placeholder="0" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              </div>
                              <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Status</label>
                                <select name="status" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }}>
                                  <option value="Active">Active</option>
                                  <option value="Draft">Draft</option>
                                  <option value="Sold Out">Sold Out</option>
                                  <option value="Archived">Archived</option>
                                </select>
                              </div>
                            </div>
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}>
                              <h4 style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Options</h4>
                              <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ flex: 1 }}>
                                  <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Sizes</label>
                                  <input name="sizes" placeholder="S, M, L" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Colors</label>
                                  <input name="colors" placeholder="Red, Blue" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* DELIVERY TAB */}
                          {/* DELIVERY TAB */}
                          <div className="form-section animate-fade" style={{ display: activeProductTab === 'delivery' ? 'block' : 'none' }}>
                            <div style={{ marginBottom: '20px' }}>
                              <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Product Type</label>
                              <div style={{ display: 'flex', gap: '10px' }}>
                                <select name="category" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }}>
                                  <option value="physical">Physical Product</option>
                                  <option value="digital">Digital Download</option>
                                </select>
                                <input name="type" placeholder="Category Type (e.g. Shorts)" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              </div>
                            </div>

                            <div className="physical-fields">
                              <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--accent-color)' }}>Shipping Info (Physical Only)</h4>
                              <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{ flex: 1 }}>
                                  <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Weight (kg)</label>
                                  <input name="weight" type="number" step="0.1" placeholder="0.0" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Dimensions (LxWxH)</label>
                                  <input name="dimensions" placeholder="10x10x5 cm" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                                </div>
                              </div>
                            </div>

                            <div className="digital-fields" style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                              <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--accent-color)' }}>Digital Fulfillment (Digital Only)</h4>
                              <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Download / Access Link</label>
                              <input name="downloadUrl" placeholder="https://drive.google.com/..." style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                              <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '5px' }}>This link will be sent to the customer after purchase.</p>
                            </div>

                            {/* QIKINK DROPSHIPPING INTEGRATION */}
                            <div className="qikink-fields" style={{ marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                              <h4 style={{ fontSize: '0.9rem', marginBottom: '10px', color: 'var(--accent-color)' }}>🚀 Qikink Dropshipping</h4>
                              <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Fulfillment Type</label>
                                <select name="fulfillmentType" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }}>
                                  <option value="self">Self Fulfilled</option>
                                  <option value="qikink">Qikink Fulfillment</option>
                                </select>
                              </div>
                              <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
                                <div style={{ flex: 1 }}>
                                  <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Qikink Product ID</label>
                                  <input name="qikinkProductId" placeholder="Optional - from Qikink dashboard" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                                </div>
                                <div style={{ flex: 1 }}>
                                  <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '5px' }}>Qikink Variant ID</label>
                                  <input name="qikinkVariantId" placeholder="Optional - specific variant" style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                                </div>
                              </div>
                              <p style={{ fontSize: '0.7rem', opacity: 0.5, background: 'rgba(112, 71, 235, 0.1)', padding: '10px', borderRadius: '5px', border: '1px solid rgba(112, 71, 235, 0.3)' }}>
                                💡 <strong>How to use:</strong> Get Product/Variant IDs from your Qikink dashboard. Orders for Qikink products will be automatically forwarded for fulfillment.
                              </p>
                            </div>
                          </div>

                          {/* MEDIA TAB */}
                          <div className="form-section animate-fade" style={{ display: activeProductTab === 'media' ? 'block' : 'none' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                              <button type="button" className={`filter-btn ${productUploadType === 'url' ? 'active' : ''}`} onClick={() => setProductUploadType('url')}>Image URL</button>
                              <button type="button" className={`filter-btn ${productUploadType === 'file' ? 'active' : ''}`} onClick={() => setProductUploadType('file')}>File Upload</button>
                            </div>

                            {productUploadType === 'url' ? (
                              <input name="imageUrl" placeholder="https://..." onChange={(e) => setImagePreview(e.target.value)} style={{ width: '100%', padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                            ) : (
                              <div style={{ padding: '40px', border: '2px dashed var(--border-color)', borderRadius: '10px', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                                <input type="file" accept="image/*" id="file-upload-input" style={{ display: 'none' }} onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => setImagePreview(ev.target.result);
                                    reader.readAsDataURL(file);
                                  }
                                }} />
                                <label htmlFor="file-upload-input" style={{ cursor: 'pointer' }}>
                                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📂</div>
                                  <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Click to Upload</span>
                                  <p style={{ marginTop: '10px', opacity: 0.6, fontSize: '0.8rem' }}>JPG, PNG, GIF up to 10MB</p>
                                </label>
                              </div>
                            )}

                            <div style={{ marginTop: '30px' }}>
                              <label style={{ fontSize: '0.8rem', opacity: 0.6, display: 'block', marginBottom: '10px' }}>Live Preview</label>
                              <div className="image-preview-box" style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: imagePreview ? '2px solid var(--accent-color)' : '1px solid var(--border-color)' }}>
                                {imagePreview ? (
                                  <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                  <span style={{ opacity: 0.4, fontSize: '0.8rem' }}>No image selected</span>
                                )}
                              </div>
                            </div>
                          </div>

                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                          <button type="button" className="btn-secondary" onClick={() => e.target.reset()} style={{ marginRight: '10px' }}>Reset</button>
                          <button type="submit" className="btn-primary" style={{ minWidth: '200px' }}>Save Product</button>
                        </div>

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
                  </div >
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
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`} style={{
                                padding: '5px 10px',
                                borderRadius: '50px',
                                fontSize: '0.7rem',
                                background: order.status === 'Delivered' ? 'rgba(0,255,0,0.1)' : 'rgba(255,255,255,0.05)',
                                color: order.status === 'Delivered' ? '#00ff00' : '#fff'
                              }}>
                                {order.status}
                              </span>
                              {order.hasQikinkItems && (
                                <span style={{
                                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                  color: '#fff',
                                  padding: '4px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.65rem',
                                  fontWeight: 'bold',
                                  textTransform: 'uppercase'
                                }}>🚀 Qikink ({order.qikinkItems?.length || 0})</span>
                              )}
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
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="btn-secondary" onClick={fetchUsersFromSheets}>Manual Sync</button>
                      </div>
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
                              <button className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.7rem' }} onClick={() => resetCustomerPassword(c.email)}>Reset Pass</button>
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
                ) : adminSubView === 'settings' ? (
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

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Theme Colors</label>
                          <div style={{ display: 'flex', gap: '20px' }}>
                            <div>
                              <label style={{ fontSize: '0.7rem', opacity: 0.5, display: 'block', marginBottom: '5px' }}>Accent</label>
                              <input type="color" value={siteSettings.accentColor} onChange={(e) => setSiteSettings({ ...siteSettings, accentColor: e.target.value })} style={{ border: 'none', width: '40px', height: '40px', cursor: 'pointer', background: 'none' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.7rem', opacity: 0.5, display: 'block', marginBottom: '5px' }}>Background</label>
                              <input type="color" value={siteSettings.bgColor || '#111111'} onChange={(e) => setSiteSettings({ ...siteSettings, bgColor: e.target.value })} style={{ border: 'none', width: '40px', height: '40px', cursor: 'pointer', background: 'none' }} />
                            </div>
                            <div>
                              <label style={{ fontSize: '0.7rem', opacity: 0.5, display: 'block', marginBottom: '5px' }}>Surface</label>
                              <input type="color" value={siteSettings.surfaceColor || '#1a1a1a'} onChange={(e) => setSiteSettings({ ...siteSettings, surfaceColor: e.target.value })} style={{ border: 'none', width: '40px', height: '40px', cursor: 'pointer', background: 'none' }} />
                            </div>
                          </div>
                        </div>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Typography</label>
                          <select
                            style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                            value={siteSettings.fontFamily}
                            onChange={(e) => setSiteSettings({ ...siteSettings, fontFamily: e.target.value })}
                          >
                            <option value="'Inter', sans-serif">Inter (Modern Sans)</option>
                            <option value="'Roboto', sans-serif">Roboto (Geometric)</option>
                            <option value="'Playfair Display', serif">Playfair Display (Luxury Serif)</option>
                            <option value="'Courier New', monospace">Courier (Tech Mono)</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Button Roundness ({siteSettings.btnRadius}px)</label>
                          <input
                            type="range"
                            min="0"
                            max="30"
                            value={siteSettings.btnRadius || 0}
                            onChange={(e) => setSiteSettings({ ...siteSettings, btnRadius: e.target.value })}
                            style={{ width: '100%', accentColor: 'var(--accent-color)' }}
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
                        <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Admin Account Management</h4>
                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '10px' }}>Active Administrators</label>
                          {adminUsers.map(user => (
                            <div key={user.username} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#000', borderRadius: '8px', marginBottom: '5px' }}>
                              <span>{user.username}</span>
                              <button onClick={() => deleteAdmin(user.username)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', opacity: 0.6 }}>Remove</button>
                            </div>
                          ))}
                        </div>

                        <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Add New Admin</label>
                        <form onSubmit={addAdmin} style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                          <input name="username" placeholder="Username" required style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }} />
                          <input name="password" placeholder="Password" required style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }} />
                          <button type="submit" className="btn-secondary full-width">Create Admin Account</button>
                        </form>
                      </div>

                      <div className="settings-section">
                        <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Data Management</h4>
                        <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '15px' }}>Manage user profiles, GDPR compliance records, and contact information.</p>

                        <div className="form-group" style={{ marginBottom: '15px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Google Apps Script URL (JSON API)</label>
                          <input
                            style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                            value={siteSettings.googleScriptUrl}
                            onChange={(e) => setSiteSettings({ ...siteSettings, googleScriptUrl: e.target.value })}
                            placeholder="https://script.google.com/macros/s/..."
                          />
                        </div>
                        <div className="form-group" style={{ marginBottom: '15px' }}>
                          <label style={{ display: 'block', fontSize: '0.8rem', opacity: 0.6, marginBottom: '5px' }}>Master Google Sheet URL</label>
                          <input
                            style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '8px' }}
                            value={siteSettings.googleSheetUrl}
                            onChange={(e) => setSiteSettings({ ...siteSettings, googleSheetUrl: e.target.value })}
                            placeholder="https://docs.google.com/spreadsheets/d/..."
                          />
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                          <button
                            className="btn-secondary full-width"
                            onClick={() => setAdminSubView('customers')}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                          >
                            Open Customer Vault
                          </button>
                          {siteSettings.googleSheetUrl && (
                            <a
                              href={siteSettings.googleSheetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary full-width"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textDecoration: 'none' }}
                            >
                              Open Master Sheet <Icons.ArrowRight />
                            </a>
                          )}
                        </div>
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
                ) : adminSubView === 'qikink-sync' ? (
                  <div className="settings-panel" style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <h3 style={{ marginBottom: '30px', color: 'var(--accent-color)' }}>🚀 Qikink Product Sync</h3>

                    <div className="settings-section" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px', borderRadius: '10px', marginBottom: '30px' }}>
                      <h4 style={{ color: '#fff', marginBottom: '10px' }}>Quick Import from Qikink</h4>
                      <p style={{ fontSize: '0.9rem', opacity: 0.9, color: '#fff', marginBottom: '20px' }}>
                        Copy product details from your Qikink dashboard and paste below to add multiple products quickly.
                      </p>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const bulkData = formData.get('bulkImport');

                        if (!bulkData) {
                          alert("Please enter product data");
                          return;
                        }

                        try {
                          // Parse comma-separated or line-separated format
                          const lines = bulkData.split('\n').filter(line => line.trim());
                          let imported = 0;

                          lines.forEach(line => {
                            const parts = line.split(',').map(p => p.trim());
                            if (parts.length >= 3) {
                              addProduct({
                                name: parts[0],
                                price: parseFloat(parts[1]) || 0,
                                image: parts[2] || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                                desc: parts[3] || 'Premium Qikink product',
                                fullDesc: parts[4] || 'High-quality custom product fulfilled by Qikink',
                                category: 'physical',
                                type: parts[5] || 'Custom',
                                qikinkProductId: parts[6] || '',
                                qikinkVariantId: parts[7] || '',
                                fulfillmentType: 'qikink',
                                stock: 999,
                                status: 'Active',
                                brand: 'Qikink',
                                sku: `QK-${Date.now()}-${imported}`,
                                sizes: parts[8] ? parts[8].split('|') : ['S', 'M', 'L', 'XL'],
                                colors: parts[9] ? parts[9].split('|') : ['Black', 'White']
                              });
                              imported++;
                            }
                          });

                          e.target.reset();
                          alert(`✅ Successfully imported ${imported} products from Qikink!`);
                        } catch (error) {
                          alert("Error parsing product data: " + error.message);
                        }
                      }}>
                        <textarea
                          name="bulkImport"
                          placeholder={"Format: Name, Price, Image URL, Description, Full Desc, Type, Product ID, Variant ID, Sizes, Colors\n\nExample:\nCustom T-Shirt, 599, https://..., Cool tee, Premium quality tee, T-Shirt, 12345, 67890, S|M|L|XL, Black|White|Red\nCustom Hoodie, 1299, https://..., Warm hoodie, Cozy hoodie, Hoodie, 12346, 67891, M|L|XL, Black|Navy"}
                          style={{
                            width: '100%',
                            minHeight: '200px',
                            padding: '15px',
                            background: 'rgba(255,255,255,0.1)',
                            border: '2px dashed rgba(255,255,255,0.3)',
                            color: '#fff',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            fontFamily: 'monospace',
                            resize: 'vertical'
                          }}
                        />
                        <button type="submit" className="btn-secondary" style={{ marginTop: '15px', width: '100%', background: '#fff', color: '#764ba2', fontWeight: 'bold' }}>
                          Import Products
                        </button>
                      </form>
                    </div>

                    <div className="settings-section">
                      <h4 style={{ color: 'var(--accent-color)', marginBottom: '15px' }}>Manual Quick Add</h4>
                      <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '20px' }}>
                        Add a single product quickly with minimal details. Fill in more details later.
                      </p>

                      <form onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);

                        addProduct({
                          name: formData.get('name'),
                          price: parseFloat(formData.get('price')),
                          image: formData.get('image') || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                          desc: formData.get('desc') || 'Premium Qikink product',
                          fullDesc: formData.get('desc') || 'High-quality custom product',
                          category: 'physical',
                          type: formData.get('type') || 'Custom',
                          qikinkProductId: formData.get('qikinkProductId'),
                          qikinkVariantId: formData.get('qikinkVariantId'),
                          fulfillmentType: 'qikink',
                          stock: 999,
                          status: 'Active',
                          brand: 'Qikink',
                          sku: `QK-${Date.now()}`,
                          sizes: ['S', 'M', 'L', 'XL'],
                          colors: ['Black', 'White']
                        });

                        e.target.reset();
                        alert("✅ Product added! Edit details in Inventory tab.");
                      }} style={{ display: 'grid', gap: '15px', gridTemplateColumns: '1fr 1fr' }}>
                        <input name="name" placeholder="Product Name *" required style={{ padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                        <input name="price" type="number" step="0.01" placeholder="Price *" required style={{ padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                        <input name="image" placeholder="Image URL" style={{ padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px', gridColumn: '1 / -1' }} />
                        <input name="desc" placeholder="Short Description" style={{ padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px', gridColumn: '1 / -1' }} />
                        <input name="type" placeholder="Type (T-Shirt, Hoodie...)" style={{ padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                        <input name="qikinkProductId" placeholder="Qikink Product ID" style={{ padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px' }} />
                        <input name="qikinkVariantId" placeholder="Qikink Variant ID" style={{ padding: '10px', background: '#111', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '5px', gridColumn: '1 / -1' }} />
                        <button type="submit" className="btn-primary" style={{ gridColumn: '1 / -1' }}>Add Qikink Product</button>
                      </form>
                    </div>

                    <div className="settings-section" style={{ background: 'rgba(112, 71, 235, 0.1)', border: '1px solid rgba(112, 71, 235, 0.3)', padding: '20px', borderRadius: '10px' }}>
                      <h4 style={{ color: 'var(--accent-color)', marginBottom: '10px' }}>💡 How to Use</h4>
                      <ul style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: '1.8', paddingLeft: '20px' }}>
                        <li><strong>Bulk Import:</strong> Copy product data from Qikink catalog (CSV format) and paste above</li>
                        <li><strong>Quick Add:</strong> Add one product at a time for testing</li>
                        <li><strong>Edit Later:</strong> Go to Inventory tab to add images, descriptions, variants</li>
                        <li><strong>Qikink IDs:</strong> Find in your Qikink dashboard product details</li>
                        <li><strong>Auto-Sync (Future):</strong> We'll add Qikink API integration for automatic sync</li>
                      </ul>
                    </div>
                  </div>
                ) : null
                }
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

              {resetMode === 'customer' ? (
                <form onSubmit={(e) => handleForgotPass(e, 'customer')} className="auth-form">
                  <div className="form-group">
                    <p>Enter your email to receive a secure reset link.</p>
                    <input type="email" placeholder="Email Address" required />
                  </div>
                  <button type="submit" className="btn-primary full-width">Send Reset Link</button>
                  <button type="button" className="btn-secondary full-width" style={{ marginTop: '10px' }} onClick={() => setResetMode(null)}>Back to Login</button>
                </form>
              ) : (
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

                  {authMode === 'login' && (
                    <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                      <button type="button" onClick={() => setResetMode('customer')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', cursor: 'pointer', textDecoration: 'underline' }}>Forgot Password?</button>
                    </div>
                  )}

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
              )}

              {!resetMode && (
                <div className="auth-footer">
                  {authMode === 'login' ? (
                    <p>New to Luxe? <button onClick={() => setAuthMode('signup')}>Create Account</button></p>
                  ) : (
                    <p>Already have an ID? <button onClick={() => setAuthMode('login')}>Login here</button></p>
                  )}
                </div>
              )}
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

                <div className="filter-bar-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
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
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} style={{ padding: '8px 12px', borderRadius: '20px', border: '1px solid var(--border-color)', background: 'var(--surface-color)', color: '#fff', cursor: 'pointer' }}>
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="newest">Newest Arrivals</option>
                    </select>
                    <p className="results-count" style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>{filteredProducts.length} items</p>
                  </div>
                </div>

                <div className="product-grid">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                      <div className="card-image" onClick={() => setSelectedProduct(product)} style={{ position: 'relative' }}>
                        {currentUser && (
                          <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }} style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: wishlist.includes(product.id) ? 'var(--accent-color)' : '#fff' }}>
                            <Icons.Heart fill={wishlist.includes(product.id)} />
                          </button>
                        )}
                        {product.type && <span className="type-badge" style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--accent-color)', color: '#000', padding: '4px 10px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', zIndex: 10, textTransform: 'uppercase' }}>{product.type}</span>}
                        {product.salePrice && <span className="sale-badge" style={{ position: 'absolute', top: '40px', left: '10px', background: '#ff4444', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', zIndex: 10, textTransform: 'uppercase' }}>SALE</span>}
                        {product.fulfillmentType === 'qikink' && <span className="qikink-badge" style={{ position: 'absolute', top: product.salePrice ? '70px' : '40px', left: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 'bold', zIndex: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🚀 Qikink</span>}
                        <img src={product.image} alt={product.name} />
                        <div className="card-overlay">
                          <span className="view-details">Quick View</span>
                        </div>
                      </div>
                      <div className="card-info">
                        <div className="card-meta">
                          <span className="category-tag">{product.category}</span>
                          <div className="price-wrap">
                            {product.salePrice ? (
                              <>
                                <span className="original-price" style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '0.8rem', marginRight: '5px' }}>${product.price.toFixed(2)}</span>
                                <span className="sale-price" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>${product.salePrice.toFixed(2)}</span>
                              </>
                            ) : (
                              <span className="price">${product.price.toFixed(2)}</span>
                            )}
                          </div>
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
                    <div className="modal-image" style={{ position: 'relative' }}>
                      <button onClick={() => toggleWishlist(selectedProduct.id)} style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10, background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: wishlist.includes(selectedProduct.id) ? 'var(--accent-color)' : '#fff' }}>
                        <Icons.Heart fill={wishlist.includes(selectedProduct.id)} />
                      </button>
                      <img src={selectedProduct.image} alt={selectedProduct.name} />
                    </div>
                    <div className="modal-details">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                        <div>
                          {selectedProduct.brand && <span className="brand-tag" style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: 'bold', display: 'block', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '1px' }}>{selectedProduct.brand}</span>}
                          <span className="category-tag">{selectedProduct.category} {selectedProduct.type ? `• ${selectedProduct.type}` : ''}</span>
                          <h2>{selectedProduct.name}</h2>
                          {selectedProduct.status === 'Sold Out' || (selectedProduct.stock !== undefined && selectedProduct.stock <= 0) ? (
                            <span className="status-badge sold-out" style={{ background: 'red', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem' }}>SOLD OUT</span>
                          ) : selectedProduct.stock && selectedProduct.stock < 5 ? (
                            <span className="status-badge low-stock" style={{ color: 'orange', fontSize: '0.8rem' }}>Only {selectedProduct.stock} left in stock!</span>
                          ) : null}
                        </div>
                        <div className="rating">
                          ★★★★★ <span>({selectedProduct.rating ? selectedProduct.rating.toFixed(1) : '5.0'})</span>
                        </div>
                      </div>

                      <div className="modal-price-box" style={{ marginBottom: '20px' }}>
                        {selectedProduct.salePrice ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <h2 className="modal-price" style={{ margin: 0, color: 'var(--accent-color)' }}>${selectedProduct.salePrice.toFixed(2)}</h2>
                            <span style={{ textDecoration: 'line-through', opacity: 0.5, fontSize: '1.2rem' }}>${selectedProduct.price.toFixed(2)}</span>
                            <span style={{ background: 'rgba(255, 68, 68, 0.1)', color: '#ff4444', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                              {Math.round(((selectedProduct.price - selectedProduct.salePrice) / selectedProduct.price) * 100)}% OFF
                            </span>
                          </div>
                        ) : (
                          <p className="modal-price">${selectedProduct.price}</p>
                        )}
                      </div>

                      <div className="modal-tags" style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', marginBottom: '20px' }}>
                        {selectedProduct.tags && selectedProduct.tags.map(tag => (
                          <span key={tag} style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="fulfillment-badge" style={{ marginBottom: '20px', padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.2rem' }}>
                          {selectedProduct.category === 'digital' ? '⚡' : '📦'}
                        </span>
                        <div>
                          <strong style={{ fontSize: '0.9rem', display: 'block' }}>
                            {selectedProduct.category === 'digital' ? 'Instant Delivery' : 'Global Shipping'}
                          </strong>
                          <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                            {selectedProduct.category === 'digital'
                              ? 'Access your files immediately after secure payment.'
                              : 'Ships within 2-3 business days in premium packaging.'}
                          </span>
                        </div>
                      </div>
                      <p className="modal-desc">{selectedProduct.fullDesc || selectedProduct.desc}</p>

                      {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                          <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '8px', textTransform: 'uppercase' }}>Select Size</p>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            {selectedProduct.sizes.map(size => (
                              <button key={size} style={{
                                padding: '8px 16px',
                                border: '1px solid var(--border-color)',
                                borderRadius: 'var(--btn-radius)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                minWidth: '40px'
                              }}>
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                        <div style={{ marginBottom: '30px' }}>
                          <p style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '8px', textTransform: 'uppercase' }}>Select Finish</p>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            {selectedProduct.colors.map(color => (
                              <div key={color} title={color} style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                background: color.toLowerCase(),
                                border: '2px solid var(--border-color)',
                                cursor: 'pointer'
                              }} />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="modal-actions">
                        <button className="btn-primary full-width" onClick={() => addToCart(selectedProduct)}>
                          Add to Cart - ${selectedProduct.price}
                        </button>
                      </div>

                      {/* Reviews Section */}
                      <div className="review-section" style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Customer Reviews</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px' }}>
                          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1 }}>{selectedProduct.rating ? selectedProduct.rating.toFixed(1) : '5.0'}</div>
                          <div>
                            <div style={{ display: 'flex', color: 'var(--accent-color)', gap: '2px' }}>
                              {[1, 2, 3, 4, 5].map(s => <Icons.Star key={s} fill={s <= Math.round(selectedProduct.rating || 5)} />)}
                            </div>
                            <span style={{ fontSize: '0.8rem', opacity: 0.6 }}>Based on {selectedProduct.reviews?.length || 12} reviews</span>
                          </div>
                        </div>

                        {/* Add Review */}
                        <form onSubmit={(e) => {
                          e.preventDefault();
                          const text = e.target.review.value;
                          addReview(selectedProduct.id, { user: currentUser?.name || 'Guest', rating: 5, comment: text, date: new Date().toISOString() });
                          e.target.reset();
                          alert("Review submitted!");
                        }} style={{ marginBottom: '30px' }}>
                          <textarea name="review" placeholder="Write a review..." required style={{ width: '100%', padding: '15px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '8px', color: '#fff', minHeight: '80px', marginBottom: '10px' }} />
                          <button type="submit" className="btn-secondary" style={{ fontSize: '0.8rem' }}>Submit Review</button>
                        </form>

                        {/* Review List */}
                        <div className="reviews-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                          {selectedProduct.reviews ? selectedProduct.reviews.map((r, i) => (
                            <div key={i} className="review-item" style={{ padding: '15px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                <strong>{r.user}</strong>
                                <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{new Date(r.date).toLocaleDateString()}</span>
                              </div>
                              <div style={{ display: 'flex', color: 'var(--accent-color)', fontSize: '0.7rem', marginBottom: '8px', gap: '2px' }}>
                                {[...Array(r.rating)].map((_, i) => <Icons.Star key={i} fill={true} />)}
                              </div>
                              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', opacity: 0.9 }}>{r.comment}</p>
                            </div>
                          )) : (
                            <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No custom reviews yet. Be the first!</p>
                          )}
                        </div>
                      </div>

                      {/* Recommended Section */}
                      <div className="recommended-section" style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border-color)' }}>
                        <h4 style={{ marginBottom: '20px', fontSize: '1rem', opacity: 0.8, textTransform: 'uppercase' }}>You Might Also Like</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                          {products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 3).map(rec => (
                            <div key={rec.id} onClick={() => setSelectedProduct(rec)} style={{ cursor: 'pointer' }}>
                              <div style={{ position: 'relative', marginBottom: '8px' }}>
                                <img src={rec.image} style={{ width: '100%', borderRadius: '8px', aspectRatio: '1/1', objectFit: 'cover' }} />
                              </div>
                              <p style={{ fontSize: '0.8rem', fontWeight: 'bold', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{rec.name}</p>
                              <p style={{ fontSize: '0.7rem', opacity: 0.7, margin: 0 }}>${rec.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>
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

                    // Detect Qikink products in cart
                    const qikinkItems = cart.filter(item => {
                      const product = products.find(p => p.id === item.id);
                      return product && product.fulfillmentType === 'qikink';
                    });

                    const newOrder = {
                      id: newOrderId,
                      items: [...cart],
                      total: total,
                      status: 'Confirmed',
                      date: new Date().toISOString(),
                      hasQikinkItems: qikinkItems.length > 0,
                      qikinkItems: qikinkItems.map(item => {
                        const product = products.find(p => p.id === item.id);
                        return {
                          name: item.name,
                          qty: item.qty,
                          qikinkProductId: product.qikinkProductId,
                          qikinkVariantId: product.qikinkVariantId,
                          size: item.selectedSize,
                          color: item.selectedColor
                        };
                      })
                    };

                    setOrders([newOrder, ...orders]);
                    setCart([]);
                    setIsCartOpen(false);

                    // Show different message for Qikink orders
                    if (qikinkItems.length > 0) {
                      alert(`Order Placed Successfully! 🎉\n\nYour Order ID: ${newOrderId}\n\n⚡ ${qikinkItems.length} item(s) will be fulfilled by Qikink\n\nProcessing: 2-3 business days\nYou can track your order in the Track section.`);
                    } else {
                      alert(`Order Placed Successfully!\n\nYour Vault ID: ${newOrderId}\n\nYou can track your items in the Track section.`);
                    }

                    // Send to Google Sheets
                    saveUserToSheets({
                      type: 'Order Placed',
                      orderId: newOrderId,
                      total: total,
                      items: cart.length,
                      hasQikink: qikinkItems.length > 0,
                      qikinkCount: qikinkItems.length,
                      date: new Date().toISOString()
                    });

                    // Send Qikink email notification (if admin email configured)
                    if (qikinkItems.length > 0 && siteSettings.contactEmail) {
                      const emailBody = `
NEW QIKINK ORDER: ${newOrderId}

${qikinkItems.map(item => `
- ${item.name} (Qty: ${item.qty})
  Qikink Product ID: ${item.qikinkProductId || 'N/A'}
  Variant ID: ${item.qikinkVariantId || 'N/A'}
`).join('')}

Total: $${total.toFixed(2)}

Action Required: Process this order on Qikink dashboard.
                      `.trim();

                      // Note: In production, this would trigger actual email via backend
                      console.log('📧 Qikink Order Email:', emailBody);
                    }
                  }}>Proceed to Checkout</button>
                </div>
              )}
            </div>

            {/* Wishlist Sidebar */}
            <div className={`cart-overlay ${isWishlistOpen ? 'open' : ''}`} onClick={() => setIsWishlistOpen(false)} />
            <div className={`cart-sidebar ${isWishlistOpen ? 'open' : ''}`}>
              <div className="cart-header">
                <h2>Your Wishlist ({wishlist.length})</h2>
                <button onClick={() => setIsWishlistOpen(false)}><Icons.X /></button>
              </div>
              <div className="cart-items">
                {wishlist.length === 0 ? (
                  <div className="empty-cart">
                    <Icons.Heart />
                    <p>No favorites yet.</p>
                  </div>
                ) : (
                  products.filter(p => wishlist.includes(p.id)).map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} />
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p className="item-price">${item.price.toFixed(2)}</p>
                        <button onClick={() => {
                          toggleWishlist(item.id);
                          addToCart(item);
                          setIsWishlistOpen(false);
                          setIsCartOpen(true);
                        }} className="add-btn-small" style={{ marginTop: '10px', fontSize: '0.8rem' }}>Move to Cart</button>
                        <button onClick={() => toggleWishlist(item.id)} className="remove-item" style={{ display: 'block', marginTop: '10px' }}>Remove</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
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
        )
      }
    </div >
  );
}

export default App;
