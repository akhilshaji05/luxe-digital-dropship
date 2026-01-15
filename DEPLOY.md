# 🚀 Deploy Firebase Integration to Production

## ⚠️ CRITICAL: Add Firebase Config to Vercel First!

Your local `.env` file is **NOT** deployed to Vercel (it's in `.gitignore` for security). You **must** add Firebase credentials to Vercel's environment variables.

---

## Step 1: Add Environment Variables to Vercel (5 minutes)

### Option A: Via Vercel Dashboard (Recommended)

1. **Go to**: https://vercel.com/dashboard
2. **Select your project**: `luxe-digital-dropship`
3. **Click**: Settings → Environment Variables
4. **Add each variable** (one at a time):

| Variable Name | Value (from your .env file) |
|---------------|----------------------------|
| `VITE_FIREBASE_API_KEY` | Your API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Your auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Your project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Your storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Your sender ID |
| `VITE_FIREBASE_APP_ID` | Your app ID |

5. **Environment**: Select "Production", "Preview", and "Development" for all
6. **Click "Save"** for each variable

### Option B: Via Vercel CLI

```bash
vercel env add VITE_FIREBASE_API_KEY
vercel env add VITE_FIREBASE_AUTH_DOMAIN
vercel env add VITE_FIREBASE_PROJECT_ID
vercel env add VITE_FIREBASE_STORAGE_BUCKET
vercel env add VITE_FIREBASE_MESSAGING_SENDER_ID
vercel env add VITE_FIREBASE_APP_ID
```

---

## Step 2: Deploy to Production

### Quick Deploy (3 commands):

```bash
cd /Users/akhil/Documents/luxe-digital

# Build and test locally first
npm install
npm run build

# Deploy to Git (triggers Vercel auto-deploy)
git add .
git commit -m "feat: Firebase integration - secure auth, cloud database, image storage"
git push origin main
```

---

## Step 3: Monitor Deployment

1. **Watch Vercel deploy**: https://vercel.com/dashboard
2. **Deployment takes**: ~2-3 minutes
3. **Check build logs** for any errors

---

## Step 4: Create First Admin User

Once deployed:

1. **Visit**: https://luxe-digital-dropship.vercel.app
2. **Click "Login"** → Create account
3. **Use your admin email** (e.g., `admin@luxe.digital`)
4. **Go to Firebase Console** → Firestore Database
5. **Find your user** in `users` collection
6. **Add field**: `role` = `admin` (string type)
7. **Logout and login again** - you now have admin access!

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Site loads without errors
- [ ] Customer signup works
- [ ] Customer login works
- [ ] Admin login works (after setting role)
- [ ] Product images upload to Firebase Storage
- [ ] Products appear in real-time
- [ ] Wishlist syncs across devices

---

## 🐛 Troubleshooting

**"Firebase: Error (auth/invalid-api-key)"**
→ Environment variables not set in Vercel. Go back to Step 1.

**Build fails with "Cannot find module 'firebase'"**
→ Run `npm install` locally first, then commit `package-lock.json`

**"Permission denied" errors**
→ Check Firebase security rules are published (see main walkthrough)

**Old localStorage data still showing**
→ Clear browser cache or use incognito mode

---

## 📊 What Gets Deployed

✅ **Included**:
- All Firebase service files
- Updated App.jsx with Firebase integration
- Firebase SDK in package.json
- Security rules (manual setup in Firebase Console)

❌ **NOT Included** (by design):
- `.env` file (security - use Vercel env vars instead)
- `node_modules` (rebuilt on Vercel)
- Old localStorage data (migration required)

---

**Ready to deploy?** Run the commands in Step 2! 🚀
