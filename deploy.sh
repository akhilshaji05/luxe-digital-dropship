#!/bin/bash

# Quick Deploy Script - Deploy Current Working Version
# Your site is already working with localStorage
# This will build and deploy to production

echo "🚀 Deploying Luxe Digital to Production..."
echo ""

cd /Users/akhil/Documents/luxe-digital

echo "📦 Step 1: Building production bundle..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed! Check errors above."
  exit 1
fi

echo "✅ Build successful!"
echo ""

echo "📤 Step 2: Committing and pushing to Git..."
git add .
git commit -m "deploy: Product catalog updates and UI improvements"
git push origin main

if [ $? -ne 0 ]; then
  echo "❌ Git push failed! Check errors above."
  exit 1
fi

echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🌐 Your site will be live in ~2 minutes at:"
echo "   https://luxe-digital-dropship.vercel.app"
echo ""
echo "📊 Monitor deployment: https://vercel.com/dashboard"
