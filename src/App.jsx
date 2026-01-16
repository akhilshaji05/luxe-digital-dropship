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
  ),
  Swoosh: () => (
    <svg viewBox="0 0 24 24" width="60" height="24" fill="currentColor"><path d="M21 8.719c.519 0 .957.192 1.314.577.358.384.537.842.537 1.373 0 .531-.179.988-.537 1.373-.357.385-.795.577-1.314.577h-11.233c-.519 0-.957-.192-1.314-.577-.358-.384-.537-.842-.537-1.373 0-.531.179-.988.537-1.373.357-.385.795-.577 1.314-.577h11.233zm-11.233-1.438h11.233c.928 0 1.716.34 2.364 1.02.648.68 1.02 1.492 1.02 2.438 0 .945-.372 1.758-1.02 2.438-.648.68-1.436 1.02-2.364 1.02h-11.233c-.928 0-1.716-.34-2.364-1.02-.648-.68-1.02-1.492-1.02-2.438 0-.945.372-1.758 1.02-2.438.648-.68 1.436-1.02 2.364-1.02zm0-1.438c-1.332 0-2.463.483-3.393 1.448-.93.966-1.395 2.126-1.395 3.482 0 1.355.465 2.516 1.395 3.481.93.966 2.061 1.448 3.393 1.448h11.233c1.332 0 2.463-.482 3.393-1.448.93-.965 1.395-2.126 1.395-3.481 0-1.356-.465-2.516-1.395-3.482-.93-.965-2.061-1.448-3.393-1.448h-11.233z" /></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
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
    buttonRadius: "4px",
    cardRadius: "12px",
    glassBlur: "20px",
    glassOpacity: "0.03",
    fontScale: "100%",
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
    vision: "To be the premier global vault for elite digital and physical assets.",
    layout: [
      { id: 'hero', type: 'hero', active: true },
      { id: 'grid', type: 'product-grid', active: true },
      { id: 'philosophy', type: 'about', active: true },
      { id: 'contact', type: 'contact', active: true }
    ]
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

  const THEMES = {
    empire: { accentColor: '#D4AF37', bgColor: '#050505', surfaceColor: '#0f0f0f', textColor: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.6)', borderColor: 'rgba(212, 175, 55, 0.15)', glassBorder: 'rgba(212, 175, 55, 0.2)', buttonRadius: '4px', cardRadius: '12px', glassBlur: '20px', glassOpacity: '0.03' },
    neon: { accentColor: '#00f2ff', bgColor: '#000814', surfaceColor: '#001d3d', textColor: '#ffffff', textMuted: 'rgba(0, 242, 255, 0.5)', borderColor: 'rgba(0, 242, 255, 0.2)', glassBorder: 'rgba(0, 242, 255, 0.3)', buttonRadius: '0px', cardRadius: '0px', glassBlur: '10px', glassOpacity: '0.1' },
    nordic: { accentColor: '#2d3436', bgColor: '#f5f6fa', surfaceColor: '#ffffff', textColor: '#2d3436', textMuted: 'rgba(45, 52, 54, 0.6)', borderColor: 'rgba(0, 0, 0, 0.05)', glassBorder: 'rgba(0, 0, 0, 0.1)', buttonRadius: '25px', cardRadius: '20px', glassBlur: '40px', glassOpacity: '0.05' },
    royal: { accentColor: '#e84118', bgColor: '#192a56', surfaceColor: '#273c75', textColor: '#ffffff', textMuted: 'rgba(255, 255, 255, 0.7)', borderColor: 'rgba(232, 65, 24, 0.3)', glassBorder: 'rgba(232, 65, 24, 0.4)', buttonRadius: '8px', cardRadius: '16px', glassBlur: '25px', glassOpacity: '0.08' },
    ajio: { accentColor: '#2c4152', bgColor: '#ffffff', surfaceColor: '#f4f4f4', textColor: '#2c4152', textMuted: 'rgba(44, 65, 82, 0.6)', borderColor: 'rgba(0, 0, 0, 0.1)', glassBorder: 'rgba(0, 0, 0, 0.1)', buttonRadius: '0px', cardRadius: '0px', glassBlur: '0px', glassOpacity: '0', fontFamily: "'Inter', sans-serif" },
    nike: { accentColor: '#111111', bgColor: '#ffffff', surfaceColor: '#f5f5f5', textColor: '#111111', textMuted: 'rgba(17, 17, 17, 0.4)', borderColor: 'rgba(17, 17, 17, 0.1)', glassBorder: 'rgba(17, 17, 17, 0.1)', buttonRadius: '40px', cardRadius: '0px', glassBlur: '0px', glassOpacity: '0', fontFamily: "'Inter', sans-serif", fontScale: '110%' }
  };

  const applyThemePrompt = (prompt) => {
    const p = prompt.toLowerCase();
    let newSettings = { ...siteSettings };
    if (p.includes('neon') || p.includes('cyber') || p.includes('future')) Object.assign(newSettings, THEMES.neon);
    else if (p.includes('ajio') || p.includes('fashion') || (p.includes('clean') && p.includes('white'))) {
      Object.assign(newSettings, THEMES.ajio);
    }
    else if (p.includes('nike') || p.includes('sport') || p.includes('performance') || p.includes('bold')) {
      Object.assign(newSettings, THEMES.nike);
      newSettings.logoText = "PERFORMANCE";
    }
    else if (p.includes('minimal') || p.includes('nordic')) {
      Object.assign(newSettings, THEMES.nordic);
      newSettings.logoText = "MINIMAL LUXE";
    }
    else if (p.includes('royal') || p.includes('red') || p.includes('classic')) Object.assign(newSettings, THEMES.royal);
    else if (p.includes('dark') || p.includes('luxury') || p.includes('gold') || p.includes('empire')) Object.assign(newSettings, THEMES.empire);

    if (p.includes('round')) { newSettings.buttonRadius = '50px'; newSettings.cardRadius = '40px'; }
    if (p.includes('sharp')) { newSettings.buttonRadius = '0px'; newSettings.cardRadius = '0px'; }
    if (p.includes('soft')) { newSettings.glassOpacity = '0.01'; newSettings.glassBlur = '40px'; }

    setSiteSettings(newSettings);
    alert("Design algorithm applied successfully.");
  };

  useEffect(() => { localStorage.setItem('luxe-cart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('luxe-products', JSON.stringify(products)); }, [products]);
  useEffect(() => {
    localStorage.setItem('luxe-settings', JSON.stringify(siteSettings));
    const root = document.documentElement.style;
    root.setProperty('--accent-color', siteSettings.accentColor);
    root.setProperty('--bg-color', siteSettings.bgColor);
    root.setProperty('--surface-color', siteSettings.surfaceColor);
    root.setProperty('--font-main', siteSettings.fontFamily);
    root.setProperty('--btn-radius', siteSettings.buttonRadius);
    root.setProperty('--card-radius', siteSettings.cardRadius);
    root.setProperty('--glass-blur', siteSettings.glassBlur);
    root.setProperty('--glass-opacity', siteSettings.glassOpacity);
    root.setProperty('--text-color', siteSettings.textColor);
    root.setProperty('--text-muted', siteSettings.textMuted);
    root.setProperty('--border-color', siteSettings.borderColor);
    root.setProperty('--glass-border', siteSettings.glassBorder);
    document.body.style.fontSize = siteSettings.fontScale;
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
        <header className="nike-header animate-slide-down" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, background: '#fff' }}>
          {/* NIKE UTILITY BAR */}
          <div style={{ background: '#f5f5f5', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '36px', fontSize: '12px', color: '#111', fontWeight: '500' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span style={{ cursor: 'pointer' }}>Jordan</span>
              <span style={{ cursor: 'pointer' }}>Converse</span>
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <span style={{ cursor: 'pointer' }}>Find a Store</span>
              <span style={{ cursor: 'pointer' }}>Help</span>
              <span style={{ cursor: 'pointer' }}>Join Us</span>
              <span style={{ cursor: 'pointer' }}>Sign In</span>
            </div>
          </div>

          {/* PRIMARY NIKE NAV */}
          <div style={{ background: '#fff', padding: '0 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
            <div className="logo" onClick={() => setView('shop')} style={{ cursor: 'pointer', color: '#111', display: 'flex', alignItems: 'center' }}>
              {siteSettings.logoText.toLowerCase().includes('nike') ? (
                <Icons.Swoosh />
              ) : (
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{siteSettings.logoText}</span>
              )}
            </div>

            <div className="nav-links" style={{ display: 'flex', gap: '25px', color: '#111', fontWeight: '600', fontSize: '15px' }}>
              {['New & Featured', 'Men', 'Women', 'Kids', 'Sale', 'SNKRS'].map(item => (
                <span key={item} style={{ cursor: 'pointer' }} onClick={() => setView('shop')}>{item}</span>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ position: 'relative' }}>
                <input
                  placeholder="Search"
                  className="nike-search-input"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ background: '#f5f5f5', border: 'none', borderRadius: '30px', padding: '8px 40px 8px 40px', width: '150px', color: '#111' }}
                />
                <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.8, color: '#111' }}>
                  <Icons.Search />
                </div>
              </div>
              <div style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setView('shop')}>
                <Icons.Heart fill={wishlist.length > 0} />
                {wishlist.length > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#111', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>{wishlist.length}</span>}
              </div>
              <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
                <Icons.Cart />
                {cart.length > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#111', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px' }}>{cart.length}</span>}
              </div>
            </div>
          </div>
        </header>
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
                  <div className="design-lab animate-fade" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <h3 className="gold-text" style={{ marginBottom: '20px' }}>DESIGN PROMPT INTERPRETER</h3>
                      <div style={{ display: 'flex', gap: '15px' }}>
                        <input
                          id="design-prompt"
                          placeholder="Describe your desired aesthetic... (e.g. 'Cyberpunk with neon cyan and sharp edges')"
                          className="premium-input"
                          onKeyDown={e => e.key === 'Enter' && applyThemePrompt(e.target.value)}
                        />
                        <button className="premium-btn" onClick={() => applyThemePrompt(document.getElementById('design-prompt').value)}>Transform</button>
                      </div>
                      <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '10px' }}>Algorithms will interpret your intent and update site parameters instantly.</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <h3 className="gold-text" style={{ marginBottom: '20px' }}>THEME PRESETS</h3>
                      <div className="theme-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px' }}>
                        {Object.keys(THEMES).map(t => (
                          <button key={t} onClick={() => { setSiteSettings({ ...siteSettings, ...THEMES[t] }); alert(`${t.toUpperCase()} sequence initiated.`); }} className="glass-panel theme-card" style={{
                            padding: '20px', textAlign: 'center', border: siteSettings.accentColor === THEMES[t].accentColor ? '1px solid var(--accent-color)' : '1px solid transparent'
                          }}>
                            <div style={{ width: '40px', height: '40px', background: THEMES[t].accentColor, margin: '0 auto 10px', borderRadius: THEMES[t].buttonRadius }} />
                            <div style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{t.toUpperCase()}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <h3 className="gold-text" style={{ marginBottom: '30px' }}>GRANULAR DESIGN TOKENS</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                          <h4 style={{ fontSize: '0.8rem', opacity: 0.6 }}>BASE ARCHITECTURE</h4>
                          <div>
                            <label style={{ fontSize: '0.65rem' }}>BUTTON RADIUS ({siteSettings.buttonRadius})</label>
                            <input type="range" min="0" max="50" value={parseInt(siteSettings.buttonRadius)} onChange={e => setSiteSettings({ ...siteSettings, buttonRadius: `${e.target.value}px` })} style={{ width: '100%' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.65rem' }}>CARD RADIUS ({siteSettings.cardRadius})</label>
                            <input type="range" min="0" max="100" value={parseInt(siteSettings.cardRadius)} onChange={e => setSiteSettings({ ...siteSettings, cardRadius: `${e.target.value}px` })} style={{ width: '100%' }} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                          <h4 style={{ fontSize: '0.8rem', opacity: 0.6 }}>OPTICAL EFFECTS</h4>
                          <div>
                            <label style={{ fontSize: '0.65rem' }}>GLASS BLUR ({siteSettings.glassBlur})</label>
                            <input type="range" min="0" max="100" value={parseInt(siteSettings.glassBlur)} onChange={e => setSiteSettings({ ...siteSettings, glassBlur: `${e.target.value}px` })} style={{ width: '100%' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.65rem' }}>GLASS OPACITY ({siteSettings.glassOpacity})</label>
                            <input type="range" min="0" max="0.5" step="0.01" value={parseFloat(siteSettings.glassOpacity)} onChange={e => setSiteSettings({ ...siteSettings, glassOpacity: e.target.value.toString() })} style={{ width: '100%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <h3 className="gold-text" style={{ marginBottom: '20px' }}>LAYOUT LAB (WIX-LIKE BUILDER)</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        {(siteSettings.layout || []).map((s, idx) => (
                          <div key={s.id} className="glass-panel" style={{ padding: '15px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                              <span style={{ opacity: 0.3, fontSize: '0.7rem' }}>#{idx + 1}</span>
                              <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.type.replace('-', ' ')}</strong>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                              <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} style={{ opacity: idx === 0 ? 0.2 : 1 }}>↑</button>
                              <button onClick={() => moveSection(idx, 'down')} disabled={idx === siteSettings.layout.length - 1} style={{ opacity: idx === siteSettings.layout.length - 1 ? 0.2 : 1 }}>↓</button>
                              <button onClick={() => deleteSection(s.id)} style={{ color: '#ff4444', marginLeft: '10px' }}>×</button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: '30px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {['hero', 'product-grid', 'featured-2-col', 'category-slider', 'about', 'contact'].map(type => (
                            <button key={type} onClick={() => addSection(type)} className="premium-btn" style={{ padding: '8px 15px', fontSize: '0.65rem' }}>+ {type.toUpperCase()}</button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <h3 className="gold-text" style={{ marginBottom: '25px' }}>UNIVERSAL COLOR SUITE</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '20px' }}>
                        {[
                          { label: 'ACCENT', key: 'accentColor' },
                          { label: 'BACKGROUND', key: 'bgColor' },
                          { label: 'SURFACE', key: 'surfaceColor' },
                          { label: 'TEXT PRIMARY', key: 'textColor' },
                          { label: 'TEXT MUTED', key: 'textMuted' },
                          { label: 'BORDER GLOBAL', key: 'borderColor' },
                          { label: 'GLASS BORDER', key: 'glassBorder' }
                        ].map(color => (
                          <div key={color.key}>
                            <label style={{ fontSize: '0.6rem', opacity: 0.5, display: 'block', marginBottom: '8px' }}>{color.label}</label>
                            <input
                              type={color.key.includes('Muted') || color.key.includes('Border') ? 'text' : 'color'}
                              value={siteSettings[color.key]}
                              onChange={e => setSiteSettings({ ...siteSettings, [color.key]: e.target.value })}
                              className="premium-input"
                              style={{ height: color.key.includes('Muted') || color.key.includes('Border') ? '45px' : '55px', padding: '5px' }}
                            />
                            {(color.key.includes('Muted') || color.key.includes('Border')) && <p style={{ fontSize: '0.5rem', opacity: 0.3, marginTop: '5px' }}>Supports RGBA/HEX</p>}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '30px' }}>
                      <h3 className="gold-text" style={{ marginBottom: '20px' }}>LEGACY CORE PARAMETERS</h3>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                        <div>
                          <label style={{ fontSize: '0.6rem', opacity: 0.5 }}>LOGO TEXT</label>
                          <input value={siteSettings.logoText} onChange={e => setSiteSettings({ ...siteSettings, logoText: e.target.value })} className="premium-input" />
                        </div>
                      </div>
                    </div>

                    <button onClick={() => alert("All parameters synchronized manually.")} className="premium-btn">Force Sync</button>
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
            {(siteSettings.layout || []).filter(s => s.active).map(section => {
              if (section.type === 'hero') return (
                <section key={section.id} style={{ height: '70vh', background: `url(${siteSettings.heroBg}) center/cover`, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(3px)' }} />
                  <div style={{ position: 'relative', maxWidth: '800px', padding: '0 20px' }}>
                    <h1 className="gold-text" style={{ fontSize: '4rem', fontFamily: 'var(--font-serif)', marginBottom: '20px' }}>{siteSettings.heroTitle}</h1>
                    <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>{siteSettings.heroSubtitle}</p>
                    <button className="premium-btn" style={{ marginTop: '40px' }} onClick={() => document.getElementById('product-grid')?.scrollIntoView({ behavior: 'smooth' })}>Enter Curation</button>
                  </div>
                </section>
              );

              if (section.type === 'product-grid') return (
                <section key={section.id} id="product-grid" className="container section-padding">
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
                  <div key={section.id} className="container" style={{ padding: '40px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '15px' }}>
                      {filteredProducts.map(p => (
                        <div key={p.id} className="nike-product-card" style={{ cursor: 'pointer', position: 'relative' }} onClick={() => setSelectedProduct(p)}>
                          {siteSettings.logoText.toLowerCase().includes('nike') && <div className="nike-badge">Just In</div>}
                          <div style={{ aspectRatio: '1/1', background: '#f5f5f5', position: 'relative', overflow: 'hidden' }}>
                            <img src={p.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '15px 0' }}>
                            <div style={{ fontWeight: '600', color: '#111' }}>{p.name}</div>
                            <div style={{ fontSize: '0.85rem', color: '#757575' }}>{p.category.charAt(0).toUpperCase() + p.category.slice(1)}'s Sportswear</div>
                            <div style={{ marginTop: '10px', fontWeight: '500', color: '#111' }}>MRP : ${p.price.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              );

              if (section.type === 'about') return (
                <div key={section.id} className="about-view container section-padding">
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
              );

              if (section.type === 'featured-2-col') return (
                <div key={section.id} className="container" style={{ padding: '80px 40px' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '30px', fontWeight: '600', color: '#111' }}>Featured</h2>
                  <div className="nike-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="nike-featured-card" style={{ height: '700px', position: 'relative', overflow: 'hidden' }}>
                      <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: '#fff' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Member Product</h3>
                        <button className="nike-pill-btn" style={{ background: '#fff', color: '#111', padding: '10px 25px', borderRadius: '30px', border: 'none', fontWeight: '600' }}>Shop</button>
                      </div>
                    </div>
                    <div className="nike-featured-card" style={{ height: '700px', position: 'relative', overflow: 'hidden' }}>
                      <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', bottom: '40px', left: '40px', color: '#fff' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Nike Training Gear</h3>
                        <button className="nike-pill-btn" style={{ background: '#fff', color: '#111', padding: '10px 25px', borderRadius: '30px', border: 'none', fontWeight: '600' }}>Shop</button>
                      </div>
                    </div>
                  </div>
                </div>
              );

              if (section.type === 'category-slider') return (
                <div key={section.id} className="container" style={{ padding: '80px 40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111' }}>Shop by Category</h2>
                  </div>
                  <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px' }}>
                    {[
                      { name: 'Lifestyle', img: 'https://images.unsplash.com/photo-1552346154-21d328109a27?q=80&w=500' },
                      { name: 'Running', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=500' },
                      { name: 'Training', img: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=500' },
                      { name: 'Football', img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=500' }
                    ].map(cat => (
                      <div key={cat.name} style={{ minWidth: '300px', flex: 1 }}>
                        <div style={{ height: '400px', background: '#f5f5f5', marginBottom: '15px', overflow: 'hidden' }}>
                          <img src={cat.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ fontWeight: '500', color: '#111' }}>{cat.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );

              if (section.type === 'contact') return (
                <div key={section.id} className="contact-view container section-padding">
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
              );
              return null;
            })}

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
      </main>

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
    </div>
  );
}

export default App;
