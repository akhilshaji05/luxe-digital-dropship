#!/bin/bash

# Auto-sync script
# Usage: ./sync.sh "Commit message"

MSG="${1:-Auto-sync: $(date)}"

echo "Syncing changes..."
git add .
git commit -m "$MSG"
git push origin main
echo "Done."
