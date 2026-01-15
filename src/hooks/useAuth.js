import { useState, useEffect } from 'react';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firestore';

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Fetch user profile from Firestore
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    const userData = userDoc.data();

                    setCurrentUser({
                        uid: user.uid,
                        email: user.email,
                        ...userData
                    });
                    setIsAdmin(userData?.role === 'admin');
                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setCurrentUser(null);
                    setIsAdmin(false);
                }
            } else {
                setCurrentUser(null);
                setIsAdmin(false);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signup = async (email, password, userData) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            // Create user document in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                ...userData,
                email,
                role: 'customer', // Default role
                createdAt: new Date().toISOString()
            });

            return { success: true };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: error.message };
        }
    };

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: error.message };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            console.error('Logout error:', error);
            return { success: false, error: error.message };
        }
    };

    const resetPassword = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { success: true };
        } catch (error) {
            console.error('Password reset error:', error);
            return { success: false, error: error.message };
        }
    };

    return {
        currentUser,
        loading,
        isAdmin,
        signup,
        login,
        logout,
        resetPassword
    };
};
