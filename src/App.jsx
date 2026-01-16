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
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
  )
};

const INITIAL_PRODUCTS = [
  { id: 1, name: "Gold Plated Chronograph", price: 2490, category: "accessories", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1000", desc: "A masterpiece of temporal precision, refined with 24K gold accents." },
  { id: 2, name: "Silk Noir Suit", price: 3800, category: "apparel", image: "https://images.unsplash.com/photo-1594932224010-75f427791c50?q=80&w=1000", desc: "Italian silk woven into the perfect evening silhouette." },
  { id: 3, name: "Ethereal Presets Pack", price: 299, category: "digital", image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1000", desc: "Professional lookup tables for digital excellence." },
  { id: 4, name: "Onyx Statement Ring", price: 1200, category: "accessories", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000", desc: "Polished black onyx set in a hammered gold band." }
];

function App() {
  const [view, setView] = useState('shop');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminUsers, setAdminUsers] = useState(() => {
    const saved = localStorage.getItem('luxe-admin-users');
    return saved ? JSON.parse(saved) : [{ username: 'admin', password: 'admin123' }];
  });
  const [adminSubView, setAdminSubView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('luxe-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('luxe-customers');
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('luxe-wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('luxe-orders');
    return saved ? JSON.parse(saved) : [];
  });

  const initialSettings = {
    logoText: "LUXE DIGITAL",
    heroTitle: "Imperial Digital Assets",
    heroSubtitle: "Curated for those who demand excellence in every pixel and fiber.",
    accentColor: "#D4AF37",
    bgColor: "#050505",
    surfaceColor: "#0f0f0f",
    fontFamily: "'Inter', sans-serif",
    heroBg: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000&auto=format&fit=crop",
    bankName: "Luxe Reserve Bank",
    bankAccount: "**** **** **** 8890",
    bankHolder: "LUXE ELITE ADMIN",
    bankIfsc: "LUXE0000123",
    paymentGatewayActive: true,
    contactAddress: "123 Luxury Lane, Beverly Hills, CA 90210",
    contactEmail: "concierge@luxe.digital",
    contactPhone: "+1 (555) 000-LUXE",
    contactHours: "Mon-Fri: 9am - 6pm PST",
    aboutStory: "Luxe Digital exists at the intersection of craftsmanship and technology.",
    mission: "To provide curated excellence in every pixel and fiber.",
    vision: "To be the premier global vault for elite digital and physical assets."
  };

  const [siteSettings, setSiteSettings] = useState(() => {
    const saved = localStorage.getItem('luxe-settings');
    return saved ? JSON.parse(saved) : initialSettings;
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('luxe-products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('luxe-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart');
  const [billingDetails, setBillingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    method: 'card'
  });
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => { localStorage.setItem('luxe-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('luxe-products', JSON.stringify(products)); }, [products]);
  useEffect(() => {
    localStorage.setItem('luxe-settings', JSON.stringify(siteSettings));
    document.documentElement.style.setProperty('--accent-color', siteSettings.accentColor);
    document.documentElement.style.setProperty('--bg-color', siteSettings.bgColor);
    document.documentElement.style.setProperty('--surface-color', siteSettings.surfaceColor);
    document.documentElement.style.setProperty('--font-main', siteSettings.fontFamily);
  }, [siteSettings]);
  useEffect(() => { localStorage.setItem('luxe-orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('luxe-user', JSON.stringify(currentUser)); }, [currentUser]);
  useEffect(() => { localStorage.setItem('luxe-wishlist', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem('luxe-customers', JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem('luxe-admin-users', JSON.stringify(adminUsers)); }, [adminUsers]);

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const user = adminUsers.find(u => u.username === adminUsername && u.password === adminPassword);
    if (user) { setIsAdminAuthenticated(true); setAdminPassword(''); setAdminUsername(''); }
    else { alert("Invalid Credentials"); }
  };

  const deleteProduct = (id) => {
    if (confirm("Delete this item from collection?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  };
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredProducts = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="app" style={{ background: siteSettings.bgColor, color: '#fff', minHeight: '100vh', fontFamily: siteSettings.fontFamily }}>
      {/* NAVBAR */}
      {view !== 'admin' && (
        <nav className="navbar glass-panel" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, padding: '20px 0', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="logo gold-text" onClick={() => setView('shop')} style={{ cursor: 'pointer', fontSize: '1.5rem', fontWeight: 'bold', letterSpacing: '2px' }}>{siteSettings.logoText}</div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} style={{
                display: 'flex', gap: '30px', alignItems: 'center'
              }}>
                {['shop', 'about', 'track', 'contact'].map(v => (
                  <button key={v} onClick={() => { setView(v); setIsMobileMenuOpen(false); }} className="nav-link-btn" style={{
                    textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.75rem'
                  }}>{v === 'shop' ? 'Collection' : v === 'about' ? 'Philosophy' : v === 'track' ? 'Tracking' : 'Concierge'}</button>
                ))}
                <button onClick={() => { setView('admin'); setIsMobileMenuOpen(false); }} className="admin-link-btn" style={{ color: 'var(--accent-color)', border: '1px solid var(--accent-color)', padding: '5px 12px', borderRadius: '2px', fontSize: '0.7rem' }}>Vault</button>
              </div>

              <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <div onClick={() => setIsCartOpen(true)} style={{ cursor: 'pointer', position: 'relative' }}>
                  <Icons.Cart />
                  {cart.length > 0 && <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--accent-color)', color: '#000', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 'bold' }}>{cart.length}</span>}
                </div>
                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={{ display: 'none', color: '#fff' }}>
                  <Icons.Menu />
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main style={{ paddingTop: view === 'admin' ? 0 : '80px' }}>
        {view === 'admin' ? (
          !isAdminAuthenticated ? (
            <div className="admin-login-overlay" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="admin-login-card glass-panel" style={{ width: '400px', padding: '50px', textAlign: 'center' }}>
                <h2 className="gold-text" style={{ marginBottom: '40px' }}>VAULT ACCESS</h2>
                <form onSubmit={handleAdminLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <input value={adminUsername} onChange={e => setAdminUsername(e.target.value)} placeholder="Personnel ID" className="premium-input" required />
                  <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} placeholder="Access Key" className="premium-input" required />
                  <button type="submit" className="premium-btn">Authorize</button>
                  <button type="button" onClick={() => setView('shop')} style={{ opacity: 0.5, fontSize: '0.8rem' }}>Return to Gallery</button>
                </form>
              </div>
            </div>
          ) : (
            <div className="admin-dashboard-layout" style={{ display: 'flex', minHeight: '100vh' }}>
              <aside className="admin-sidebar glass-panel" style={{ width: '280px', position: 'fixed', height: '100vh', padding: '40px 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }} className="gold-text">LUXE SYSTEM v2.5</div>
                {['dashboard', 'products', 'settings'].map(sub => (
                  <button key={sub} onClick={() => setAdminSubView(sub)} className={`admin-nav-item ${adminSubView === sub ? 'active' : ''}`} style={{
                    width: '100%', padding: '15px 30px', textAlign: 'left', background: adminSubView === sub ? 'rgba(212,175,55,0.1)' : 'transparent', border: 'none', color: adminSubView === sub ? 'var(--accent-color)' : '#fff', borderLeft: adminSubView === sub ? '3px solid var(--accent-color)' : '3px solid transparent'
                  }}>{sub.toUpperCase()}</button>
                ))}
                <div style={{ position: 'absolute', bottom: '40px', width: '100%', padding: '0 30px' }}>
                  <button onClick={() => setIsAdminAuthenticated(false)} style={{ width: '100%', color: 'red', background: 'none', border: 'none', fontSize: '0.8rem' }}>Terminate Session</button>
                </div>
              </aside>
              <main style={{ marginLeft: '280px', flex: 1, padding: '50px' }}>
                <h1 className="gold-text" style={{ marginBottom: '40px' }}>{adminSubView.toUpperCase()}</h1>

                {adminSubView === 'dashboard' && (
                  <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '30px' }}>
                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <div style={{ opacity: 0.5, fontSize: '0.7rem' }}>TOTAL EQUITY</div>
                      <div className="gold-text" style={{ fontSize: '2rem' }}>${orders.reduce((a, b) => a + b.total, 0).toLocaleString()}</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <div style={{ opacity: 0.5, fontSize: '0.7rem' }}>ACQUISITIONS</div>
                      <div className="gold-text" style={{ fontSize: '2rem' }}>{orders.length}</div>
                    </div>
                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <div style={{ opacity: 0.5, fontSize: '0.7rem' }}>CATALOG SIZE</div>
                      <div className="gold-text" style={{ fontSize: '2rem' }}>{products.length}</div>
                    </div>
                  </div>
                )}

                {adminSubView === 'products' && (
                  <div>
                    <div className="glass-panel" style={{ padding: '30px', marginBottom: '40px' }}>
                      <h3>{editingProduct ? 'Update Asset' : 'Register New Asset'}</h3>
                      <form onSubmit={e => {
                        e.preventDefault();
                        const fd = new FormData(e.target);
                        const pd = { name: fd.get('name'), price: parseFloat(fd.get('price')), image: fd.get('image'), category: fd.get('category'), desc: fd.get('desc'), id: editingProduct ? editingProduct.id : Date.now() };
                        if (editingProduct) setProducts(products.map(p => p.id === pd.id ? pd : p));
                        else setProducts([...products, pd]);
                        setEditingProduct(null);
                        e.target.reset();
                      }} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
                        <input name="name" defaultValue={editingProduct?.name} placeholder="AssetName" className="premium-input" required />
                        <input name="price" defaultValue={editingProduct?.price} type="number" placeholder="Value" className="premium-input" required />
                        <input name="image" defaultValue={editingProduct?.image} placeholder="Vector/Image URI" className="premium-input" required />
                        <select name="category" defaultValue={editingProduct?.category} className="premium-input">
                          <option value="apparel">Apparel</option>
                          <option value="accessories">Accessories</option>
                          <option value="digital">Digital</option>
                        </select>
                        <textarea name="desc" defaultValue={editingProduct?.desc} placeholder="Legacy Description" className="premium-input" style={{ gridColumn: 'span 2' }} />
                        <button type="submit" className="premium-btn">{editingProduct ? 'Finalize Edit' : 'Add to Catalog'}</button>
                      </form>
                    </div>
                    <div className="glass-panel" style={{ padding: '30px' }}>
                      {products.map(p => (
                        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '15px 0', borderBottom: '1px solid var(--border-color)' }}>
                          <img src={p.image} style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                          <div style={{ flex: 1 }}>{p.name} <span className="gold-text" style={{ marginLeft: '10px' }}>${p.price}</span></div>
                          <button onClick={() => setEditingProduct(p)} style={{ background: 'none', color: 'var(--accent-color)' }}>Edit</button>
                          <button onClick={() => deleteProduct(p.id)} style={{ background: 'none', color: 'red' }}>Delete</button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {adminSubView === 'settings' && (
                  <div className="glass-panel" style={{ padding: '30px' }}>
                    <h3 className="gold-text" style={{ marginBottom: '30px' }}>FINANCIAL PARAMETERS</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      {['bankName', 'bankAccount', 'bankHolder', 'bankIfsc'].map(key => (
                        <div key={key}>
                          <label style={{ fontSize: '0.6rem', opacity: 0.5 }}>{key.toUpperCase()}</label>
                          <input value={siteSettings[key]} onChange={e => setSiteSettings({ ...siteSettings, [key]: e.target.value })} className="premium-input" />
                        </div>
                      ))}
                    </div>
                    <button onClick={() => alert("System parameters updated")} className="premium-btn" style={{ marginTop: '30px' }}>Apply Changes</button>
                  </div>
                )}
              </main>
            </div>
          )
        ) : view === 'about' ? (
          <div className="about-view container section-padding animate-fade">
            <h1 className="gold-text" style={{ fontSize: '3.5rem', marginBottom: '30px' }}>Our Philosophy</h1>
            <div className="glass-panel" style={{ padding: '50px', lineHeight: '1.8' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>{siteSettings.aboutStory}</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                <div>
                  <h3 className="gold-text">Mission</h3>
                  <p>{siteSettings.mission}</p>
                </div>
                <div>
                  <h3 className="gold-text">Vision</h3>
                  <p>{siteSettings.vision}</p>
                </div>
              </div>
            </div>
          </div>
        ) : view === 'track' ? (
          <div className="track-view container section-padding animate-fade">
            <h1 className="gold-text" style={{ fontSize: '3rem', marginBottom: '30px', textAlign: 'center' }}>Vault Tracking</h1>
            <div className="glass-panel" style={{ maxWidth: '600px', margin: '0 auto', padding: '50px', textAlign: 'center' }}>
              <p style={{ opacity: 0.6, marginBottom: '30px' }}>Enter your Acquisition ID to locate your assets.</p>
              <input placeholder="LUX-XXXXXX" className="premium-input" style={{ marginBottom: '20px', textAlign: 'center' }} />
              <button className="premium-btn">Trace Acquisition</button>
            </div>
          </div>
        ) : view === 'contact' ? (
          <div className="contact-view container section-padding animate-fade">
            <h1 className="gold-text" style={{ fontSize: '3rem', marginBottom: '30px' }}>Concierge</h1>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
              <div className="glass-panel" style={{ padding: '40px' }}>
                <h3 className="gold-text">Private Inquiry</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
                  <input placeholder="Your Name" className="premium-input" />
                  <input placeholder="Secure Email" className="premium-input" />
                  <textarea placeholder="How may we assist you?" className="premium-input" style={{ height: '150px' }} />
                  <button className="premium-btn">Transmit Signal</button>
                </form>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div>
                  <h3 className="gold-text">Headquarters</h3>
                  <p style={{ opacity: 0.7 }}>{siteSettings.contactAddress}</p>
                </div>
                <div>
                  <h3 className="gold-text">Direct Line</h3>
                  <p style={{ opacity: 0.7 }}>{siteSettings.contactPhone}</p>
                  <p style={{ opacity: 0.7 }}>{siteSettings.contactEmail}</p>
                </div>
                <div>
                  <h3 className="gold-text">Availability</h3>
                  <p style={{ opacity: 0.7 }}>{siteSettings.contactHours}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="shop-view animate-fade">
            <section style={{ height: '70vh', background: `url(${siteSettings.heroBg}) center/cover`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(3px)' }} />
              <div style={{ position: 'relative', maxWidth: '800px', padding: '0 20px' }}>
                <h1 className="gold-text" style={{ fontSize: '4rem', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>{siteSettings.heroTitle}</h1>
                <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>{siteSettings.heroSubtitle}</p>
                <button className="premium-btn" style={{ marginTop: '40px' }} onClick={() => document.getElementById('grid').scrollIntoView({ behavior: 'smooth' })}>Enter Curation</button>
              </div>
            </section>

            <section id="grid" className="container section-padding">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h2 className="gold-text">Curated Items</h2>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['all', 'apparel', 'accessories', 'digital'].map(cat => (
                    <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                      padding: '8px 16px', border: '1px solid var(--border-color)', background: activeCategory === cat ? 'var(--accent-color)' : 'transparent', color: activeCategory === cat ? '#000' : '#fff', textTransform: 'uppercase', fontSize: '0.7rem'
                    }}>{cat}</button>
                  ))}
                </div>
              </div>
              <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                {filteredProducts.map(p => (
                  <div key={p.id} className="product-card glass-panel" style={{ cursor: 'pointer' }} onClick={() => setSelectedProduct(p)}>
                    <div style={{ height: '350px', overflow: 'hidden' }}>
                      <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '25px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.9rem', marginBottom: '5px' }}>{p.name}</div>
                      <div className="gold-text" style={{ fontWeight: 'bold' }}>${p.price.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {selectedProduct && (
              <div className="modal-overlay open" onClick={() => setSelectedProduct(null)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
                <div className="modal-content glass-panel" onClick={e => e.stopPropagation()} style={{ maxWidth: '900px', width: '100%', display: 'flex', padding: 0 }}>
                  <div style={{ flex: 1, height: '600px' }}><img src={selectedProduct.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <div style={{ flex: 1, padding: '50px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="gold-text" style={{ fontSize: '0.7rem', letterSpacing: '2px' }}>AUTHENTICATED ASSET</span>
                      <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem' }}>×</button>
                    </div>
                    <h2 style={{ fontSize: '2.5rem', margin: '20px 0', fontFamily: 'var(--font-serif)' }}>{selectedProduct.name}</h2>
                    <div className="gold-text" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '30px' }}>${selectedProduct.price.toLocaleString()}</div>
                    <p style={{ opacity: 0.7, lineHeight: '1.8', flex: 1 }}>{selectedProduct.desc}</p>
                    <button className="premium-btn" onClick={() => addToCart(selectedProduct)}>Acquire to Vault</button>
                  </div>
                </div>
              </div>
            )}

            <footer style={{ padding: '80px 0', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
              <div className="gold-text" style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: 'bold' }}>{siteSettings.logoText}</div>
              <p style={{ opacity: 0.3, fontSize: '0.8rem' }}>&copy; {new Date().getFullYear()} LUXE DIGITAL. ESTABLISHED FOR EXCELLENCE.</p>
            </footer>
          </div>
        )}

        {/* CHECKOUT SYSTEM */}
        <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }} style={{ zIndex: 3000 }} />
        <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`} style={{ zIndex: 3100, padding: '40px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            <h2 className="gold-text">{checkoutStep.toUpperCase()}</h2>
            <button onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }} style={{ background: 'none', border: 'none', color: '#fff' }}>CLOSE</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {checkoutStep === 'cart' && (
              <div>
                {cart.length === 0 ? <p style={{ opacity: 0.5, textAlign: 'center', marginTop: '50px' }}>Vault is empty.</p> : (
                  cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', gap: '15px', padding: '15px 0', borderBottom: '1px solid var(--border-color)' }}>
                      <img src={item.image} style={{ width: '50px', height: '50px' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.8rem' }}>{item.name}</div>
                        <div className="gold-text">${item.price}</div>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                          <button onClick={() => updateQty(item.id, -1)}>-</button>
                          <span>{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)}>+</button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} style={{ opacity: 0.5 }}>×</button>
                    </div>
                  ))
                )}
              </div>
            )}

            {checkoutStep === 'billing' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <input placeholder="Full Legal Name" value={billingDetails.fullName} onChange={e => setBillingDetails({ ...billingDetails, fullName: e.target.value })} className="premium-input" />
                <input placeholder="Secure Email" value={billingDetails.email} onChange={e => setBillingDetails({ ...billingDetails, email: e.target.value })} className="premium-input" />
                <input placeholder="Fulfillment Address" value={billingDetails.address} onChange={e => setBillingDetails({ ...billingDetails, address: e.target.value })} className="premium-input" />
              </div>
            )}

            {checkoutStep === 'payment' && (
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <label className={`glass-panel ${billingDetails.method === 'card' ? 'active' : ''}`} style={{ padding: '20px', cursor: 'pointer', border: billingDetails.method === 'card' ? '1px solid var(--accent-color)' : '1px solid var(--border-color)' }}>
                    <input type="radio" checked={billingDetails.method === 'card'} onChange={() => setBillingDetails({ ...billingDetails, method: 'card' })} style={{ display: 'none' }} />
                    Card Acquisition (Instant)
                  </label>
                  <label className={`glass-panel ${billingDetails.method === 'bank' ? 'active' : ''}`} style={{ padding: '20px', cursor: 'pointer', border: billingDetails.method === 'bank' ? '1px solid var(--accent-color)' : '1px solid var(--border-color)' }}>
                    <input type="radio" checked={billingDetails.method === 'bank'} onChange={() => setBillingDetails({ ...billingDetails, method: 'bank' })} style={{ display: 'none' }} />
                    Vault Transfer (Manual)
                  </label>
                </div>
                {billingDetails.method === 'bank' && (
                  <div style={{ marginTop: '20px', padding: '20px', border: '1px solid var(--accent-color)', background: 'rgba(212,175,55,0.1)', fontSize: '0.8rem' }}>
                    <strong>BANK:</strong> {siteSettings.bankName}<br />
                    <strong>ACCOUNT:</strong> {siteSettings.bankAccount}<br />
                    <strong>HOLDER:</strong> {siteSettings.bankHolder}<br />
                    <strong>IFSC:</strong> {siteSettings.bankIfsc}
                  </div>
                )}
              </div>
            )}

            {checkoutStep === 'success' && (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💎</div>
                <h3 className="gold-text">ACQUISITION SUCCESS</h3>
                <p style={{ opacity: 0.6, fontSize: '0.9rem' }}>The ledger has been updated. Your assets are being prepared.</p>
                <button className="premium-btn" style={{ marginTop: '30px' }} onClick={() => { setIsCartOpen(false); setCheckoutStep('cart'); }}>Return</button>
              </div>
            )}
          </div>

          {cart.length > 0 && checkoutStep !== 'success' && (
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '30px', marginTop: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2rem' }}>
                <span>Subtotal</span>
                <span className="gold-text">${total.toLocaleString()}</span>
              </div>
              {checkoutStep === 'cart' && <button className="premium-btn w-full" onClick={() => setCheckoutStep('billing')}>Verify Identity</button>}
              {checkoutStep === 'billing' && <button className="premium-btn w-full" onClick={() => setCheckoutStep('payment')}>Method</button>}
              {checkoutStep === 'payment' && <button className="premium-btn w-full" onClick={() => {
                setOrders([{ id: Date.now(), total, date: new Date().toISOString() }, ...orders]);
                setCart([]);
                setCheckoutStep('success');
              }}>Finalize</button>}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
