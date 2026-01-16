# 🚀 Deployment & Qikink API Guide

## 📦 Deployment Status
- **Current Version**: v2.2 (Gold Theme + Fixes)
- **Features**: Smart CSV Import, Private API Proxy, Delete Products, Price Filter

## 🔄 How to Use Qikink Sync

### Method 1: Smart CSV Import (Recommended)
1. Go to Qikink Dashboard -> Products.
2. Filter your products.
3. Export as CSV (or just copy row data).
4. Go to **Admin -> 🚀 Qikink Sync**.
5. Paste into the Bulk Import box.
6. Click **Import**.
   - ✅ Auto-detects T-Shirts, Hoodies, Mugs (assigns correct images).
   - ✅ Auto-detects Sizes (e.g. XS-XS).
   - ✅ Auto-guesses Colors.

### Method 2: API Sync (Beta)
*Note: This usually requires a backend server to bypass CORS security.*
1. Go to **Admin -> 🚀 Qikink Sync**.
2. Scroll to "Automatic API Sync".
3. Enter your **Qikink API Key**.
4. Click **Connect & Sync**.
5. If it fails (Red Alert), use Method 1.

## 🛠 Troubleshooting
- **Button not visible?**: Hard Refresh (Cmd+Shift+R).
- **Wrong Images?**: Check product keyword (needs "Hoodie", "Shirt", "Mug").
- **Prices Wrong?**: Check CSV column order.
