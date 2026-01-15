#!/bin/bash

# Quick build test
echo "Testing build..."
cd /Users/akhil/Documents/luxe-digital
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful! Ready to deploy."
  echo ""
  echo "Run: ./deploy-qikink.sh to deploy"
else
  echo "❌ Build still has errors"
fi
