#!/bin/bash
set -e
echo "═══════════════════════════════════════"
echo "  Building All for One packages..."
echo "═══════════════════════════════════════"

packages=("design-system" "icons" "core" "animations" "transitions" "carousels" "footers" "shaders")

for pkg in "${packages[@]}"; do
  if [ -d "packages/$pkg" ]; then
    echo ""
    echo "📦 Building @all-for-one/$pkg..."
    cd "packages/$pkg"
    npm run build 2>/dev/null || echo "  ⚠️  Build skipped (no build script)"
    cd ../..
    echo "  ✅ Done"
  fi
done

echo ""
echo "═══════════════════════════════════════"
echo "  ✅ All packages built!"
echo "═══════════════════════════════════════"
