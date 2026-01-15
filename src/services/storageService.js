import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase/config';

/**
 * Upload a product image to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} productId - The product ID (used for folder organization)
 * @returns {Promise<{success: boolean, url?: string, error?: string}>}
 */
export const uploadProductImage = async (file, productId) => {
    try {
        // Create a unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}_${file.name}`;
        const storageRef = ref(storage, `products/${productId}/${filename}`);

        // Upload file
        const snapshot = await uploadBytes(storageRef, file);

        // Get download URL
        const url = await getDownloadURL(snapshot.ref);

        return { success: true, url };
    } catch (error) {
        console.error('Error uploading image:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Delete a product image from Firebase Storage
 * @param {string} imageUrl - The full URL of the image to delete
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export const deleteProductImage = async (imageUrl) => {
    try {
        // Extract the storage path from the URL
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);

        return { success: true };
    } catch (error) {
        console.error('Error deleting image:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Compress image before upload (optional optimization)
 * @param {File} file - The image file to compress
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<Blob>}
 */
export const compressImage = (file, maxWidth = 1200, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', quality);
            };

            img.onerror = reject;
        };

        reader.onerror = reject;
    });
};
