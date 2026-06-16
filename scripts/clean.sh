#!/bin/bash
echo "🧹 Cleaning all dist directories..."
find packages -name "dist" -type d -exec rm -rf {} + 2>/dev/null
find packages -name ".turbo" -type d -exec rm -rf {} + 2>/dev/null
find apps -name ".next" -type d -exec rm -rf {} + 2>/dev/null
find apps -name "dist" -type d -exec rm -rf {} + 2>/dev/null
rm -rf storybook-static 2>/dev/null
echo "✅ Clean complete"
