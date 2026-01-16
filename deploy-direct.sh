#!/bin/bash

# Direct Vercel Deployment Script
# Use this if Git push isn't updating the site

echo "🚀 Direct Vercel Deploy"
echo "======================"
echo ""

cd /Users/akhil/Documents/luxe-digital

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "⚠️ Vercel CLI not found. Installing..."
  npm install -g vercel
fi

# Build first
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

# Deploy directly to Vercel
echo "🚀 Uploading to Vercel..."
echo "NOTE: If asked, select scope 'akhilshaji05' and project 'luxe-digital-dropship'"
echo ""

# Deploy to production flag
vercel --prod

echo ""
echo "✅ Deployment sent!"
