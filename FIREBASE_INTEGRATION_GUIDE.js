// Firebase App.jsx Integration - READY TO APPLY
// This file shows the key changes needed to integrate Firebase into App.jsx
// Apply these changes AFTER completing Firebase setup

// ============================================
// 1. ADD IMPORTS AT TOP OF FILE (after line 1)
// ============================================
import { useAuth } from './hooks/useAuth';
import {
    subscribeToProducts,
    addProduct as addProductToFirestore,
    updateProduct,
    deleteProduct as deleteProductFromFirestore,
    subscribeToOrders,
    addOrder,
    subscribeToCustomers,
    updateWishlist
} from './services/firestoreService';
import { uploadProductImage, compressImage } from './services/storageService';

// ============================================
// 2. REPLACE STATE DECLARATIONS (lines 82-120)
// ============================================
// REMOVE these localStorage-based states:
// - currentUser (line 95-98)
// - customers (line 100-103)
// - adminUsers (line 86-89)
// - isAdminAuthenticated (line 83)

// REPLACE WITH:
const { currentUser, loading, isAdmin, signup, login, logout, resetPassword } = useAuth();
const [products, setProducts] = useState([]);
const [orders, setOrders] = useState([]);
const [customers, setCustomers] = useState([]);

// ============================================
// 3. ADD FIREBASE LISTENERS (after state declarations)
// ============================================
// Subscribe to products
useEffect(() => {
    const unsubscribe = subscribeToProducts((productsData) => {
        setProducts(productsData);
    });
    return unsubscribe;
}, []);

// Subscribe to orders
useEffect(() => {
    const unsubscribe = subscribeToOrders((ordersData) => {
        setOrders(ordersData);
    });
    return unsubscribe;
}, []);

// Subscribe to customers (admin only)
useEffect(() => {
    if (isAdmin) {
        const unsubscribe = subscribeToCustomers((customersData) => {
            setCustomers(customersData);
        });
        return unsubscribe;
    }
}, [isAdmin]);

// ============================================
// 4. UPDATE AUTH HANDLERS
// ============================================
// REPLACE handleAuth function (line 428-469) with:
const handleAuth = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');

    if (authMode === 'signup') {
        const name = formData.get('name');
        const phone = formData.get('phone');
        const gdprConsent = formData.get('gdpr');

        if (!gdprConsent) {
            alert("You must agree to the Privacy Policy to proceed.");
            return;
        }

        const result = await signup(email, password, { name, phone });
        if (!result.success) {
            alert("Signup failed: " + result.error);
        }
    } else {
        const result = await login(email, password);
        if (!result.success) {
            alert("Login failed: " + result.error);
        }
    }
};

// REPLACE handleAdminLogin (line 292-302) with:
const handleAdminLogin = async (e) => {
    e.preventDefault();
    const result = await login(adminUsername, adminPassword);

    if (result.success && isAdmin) {
        setAdminPassword('');
        setAdminUsername('');
    } else if (result.success && !isAdmin) {
        alert("Access denied. Admin privileges required.");
        await logout();
    } else {
        alert("Invalid credentials: " + result.error);
    }
};

// ============================================
// 5. UPDATE PRODUCT FORM SUBMISSION (line 629-681)
// ============================================
// REPLACE the form onSubmit handler with:
const handleProductSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    let finalImage = formData.get('imageUrl');

    // Handle file upload
    if (productUploadType === 'file') {
        const file = e.target.querySelector('input[type="file"]').files[0];
        if (file) {
            // Compress image
            const compressedBlob = await compressImage(file);
            const compressedFile = new File([compressedBlob], file.name, { type: 'image/jpeg' });

            // Upload to Firebase Storage
            const uploadResult = await uploadProductImage(compressedFile, 'temp-' + Date.now());
            if (uploadResult.success) {
                finalImage = uploadResult.url;
            } else {
                alert("Image upload failed: " + uploadResult.error);
                return;
            }
        }
    }

    if (!finalImage && imagePreview) finalImage = imagePreview;

    // Validation
    const name = formData.get('name');
    const price = formData.get('price');
    const desc = formData.get('desc');

    if (!name) { alert("Please enter a Product Name (Overview)"); setActiveProductTab('overview'); return; }
    if (!desc) { alert("Please enter a Tagline (Overview)"); setActiveProductTab('overview'); return; }
    if (!price) { alert("Please enter a Base Price (Pricing)"); setActiveProductTab('pricing'); return; }
    if (!finalImage) { alert("Please provide an Image (Media)"); setActiveProductTab('media'); return; }

    // Add to Firestore
    const productData = {
        name: formData.get('name'),
        brand: formData.get('brand'),
        sku: formData.get('sku'),
        stock: parseInt(formData.get('stock') || 0),
        status: formData.get('status'),
        category: formData.get('category'),
        type: formData.get('type'),
        price: parseFloat(formData.get('price')),
        salePrice: formData.get('salePrice') ? parseFloat(formData.get('salePrice')) : null,
        tags: formData.get('tags') ? formData.get('tags').split(',').map(t => t.trim()) : [],
        weight: formData.get('weight'),
        dimensions: formData.get('dimensions'),
        downloadUrl: formData.get('downloadUrl'),
        image: finalImage,
        desc: formData.get('desc'),
        fullDesc: formData.get('fullDesc'),
        sizes: formData.get('sizes') ? formData.get('sizes').split(',').map(s => s.trim()).filter(s => s) : [],
        colors: formData.get('colors') ? formData.get('colors').split(',').map(c => c.trim()).filter(c => c) : [],
        rating: 5.0,
        reviews: []
    };

    const result = await addProductToFirestore(productData);
    if (result.success) {
        e.target.reset();
        setImagePreview('');
        alert("Product Added Successfully!");
    } else {
        alert("Failed to add product: " + result.error);
    }
};

// ============================================
// 6. UPDATE WISHLIST TOGGLE (line 380-386)
// ============================================
const toggleWishlist = async (productId) => {
    if (!currentUser) {
        alert("Please login to use wishlist");
        return;
    }

    const newWishlist = wishlist.includes(productId)
        ? wishlist.filter(id => id !== productId)
        : [...wishlist, productId];

    setWishlist(newWishlist);
    await updateWishlist(currentUser.uid, newWishlist);
};

// ============================================
// 7. REMOVE ALL localStorage OPERATIONS
// ============================================
// DELETE these useEffect blocks:
// - Line 171-173 (cart localStorage)
// - Line 175-177 (products localStorage)
// - Line 179-186 (settings localStorage)
// - Line 188-190 (orders localStorage)
// - Line 192-194 (currentUser localStorage)
// - Line 196-198 (wishlist localStorage)
// - Line 201-203 (customers localStorage)
// - Line 205-207 (adminUsers localStorage)

// ============================================
// 8. UPDATE CHECKOUT FLOW
// ============================================
// In checkout handler, replace localStorage order creation with:
const handleCheckout = async () => {
    if (!currentUser) {
        alert("Please login to checkout");
        setView('auth');
        return;
    }

    const orderData = {
        userId: currentUser.uid,
        items: cart,
        total: total,
        status: 'Confirmed',
        customerEmail: currentUser.email,
        customerName: currentUser.name
    };

    const result = await addOrder(orderData);
    if (result.success) {
        setCart([]);
        setIsCartOpen(false);
        alert(`Order placed! Order ID: ${result.id}`);
    } else {
        alert("Checkout failed: " + result.error);
    }
};

// ============================================
// SUMMARY OF CHANGES
// ============================================
// ✅ Replaced localStorage auth with Firebase Authentication
// ✅ Replaced localStorage products with Firestore real-time sync
// ✅ Replaced Base64 images with Firebase Cloud Storage
// ✅ Added secure password handling (no plain text)
// ✅ Implemented role-based access control
// ✅ Added real-time data synchronization
