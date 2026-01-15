#!/bin/bash

# Qikink Integration - Test & Deploy Script
# This script will test locally and deploy to production

echo "🚀 Qikink Integration - Test & Deploy"
echo "======================================"
echo ""

# Navigate to project
cd /Users/akhil/Documents/luxe-digital

# Step 1: Test Locally
echo "📦 Step 1: Building project..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful!"
  echo ""
else
  echo "❌ Build failed! Please fix errors before deploying."
  exit 1
fi

# Step 2: Preview (optional)
echo "💡 To test locally, run: npm run dev"
echo "   Then visit: http://localhost:5173"
echo "   Test the Admin → Qikink Sync tab"
echo ""

# Step 3: Deploy
read -p "Deploy to production? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🚀 Step 2: Deploying to production..."
  
  git add .
  git commit -m "feat: Add Qikink auto-sync integration

- New Qikink Sync tab in admin panel
- Bulk import tool for CSV/comma-separated data
- Manual quick add form
- Automatic Qikink badges on products
- Smart order detection with email notifications
- Enhanced order management tracking"
  
  git push origin main
  
  echo ""
  echo "✅ Deployment initiated!"
  echo ""
  echo "📊 Monitor deployment:"
  echo "   https://vercel.com/dashboard"
  echo ""
  echo "🌐 Live site (in ~2-3 minutes):"
  echo "   https://luxe-digital-dropship.vercel.app"
  echo ""
  echo "📝 Test checklist:"
  echo "   1. Access Admin panel"
  echo "   2. Go to 🚀 Qikink Sync tab"
  echo "   3. Try Manual Quick Add"
  echo "   4. Check Inventory for new product"
  echo "   5. View product in Shop (should show Qikink badge)"
else
  echo "⏸️  Deployment skipped. Run this script again when ready."
fi

echo ""
echo "📚 Documentation:"
echo "   QIKINK_SYNC_GUIDE.md - How to use sync feature"
echo "   QIKINK_FEATURES.md - Complete feature reference"
echo "   QIKINK_INTEGRATION_GUIDE.md - Setup guide"
