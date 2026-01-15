import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    orderBy
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Products Service
export const addProduct = async (productData) => {
    try {
        const docRef = await addDoc(collection(db, 'products'), {
            ...productData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding product:', error);
        return { success: false, error: error.message };
    }
};

export const updateProduct = async (id, updates) => {
    try {
        await updateDoc(doc(db, 'products', id), {
            ...updates,
            updatedAt: new Date().toISOString()
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating product:', error);
        return { success: false, error: error.message };
    }
};

export const deleteProduct = async (id) => {
    try {
        await deleteDoc(doc(db, 'products', id));
        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { success: false, error: error.message };
    }
};

export const subscribeToProducts = (callback) => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(products);
    }, (error) => {
        console.error('Error subscribing to products:', error);
        callback([]);
    });
};

// Orders Service
export const addOrder = async (orderData) => {
    try {
        const docRef = await addDoc(collection(db, 'orders'), {
            ...orderData,
            createdAt: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding order:', error);
        return { success: false, error: error.message };
    }
};

export const subscribeToOrders = (callback) => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(orders);
    }, (error) => {
        console.error('Error subscribing to orders:', error);
        callback([]);
    });
};

// Customers Service
export const subscribeToCustomers = (callback) => {
    const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
        const customers = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(customers.filter(user => user.role === 'customer'));
    }, (error) => {
        console.error('Error subscribing to customers:', error);
        callback([]);
    });
};

// Wishlist Service
export const updateWishlist = async (userId, productIds) => {
    try {
        await updateDoc(doc(db, 'users', userId), {
            wishlist: productIds
        });
        return { success: true };
    } catch (error) {
        console.error('Error updating wishlist:', error);
        return { success: false, error: error.message };
    }
};
