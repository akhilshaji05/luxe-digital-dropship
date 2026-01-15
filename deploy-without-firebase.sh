#!/bin/bash

# Quick Deployment Script - Reverts Firebase and Deploys
# This script will:
# 1. Stash current Firebase work (saved for later)
# 2. Revert to last working version
# 3. Deploy to production

echo "🔄 Reverting Firebase changes temporarily..."

# Save Firebase work
git stash push -m "Firebase integration - will re-apply later"

# Deploy current version
echo "📦 Building production bundle..."
npm run build

echo "🚀 Deploying to Git..."
git add .
git commit -m "chore: Deploy current version (Firebase pending credentials)"
git push origin main

echo "✅ Deployment complete!"
echo ""
echo "📝 Note: Firebase integration is stashed."
echo "To restore Firebase later: git stash pop"
