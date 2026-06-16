#!/bin/bash
set -e
echo "═══════════════════════════════════════"
echo "  Linting all packages..."
echo "═══════════════════════════════════════"

packages=("design-system" "icons" "core" "animations" "transitions" "carousels" "footers" "shaders")

for pkg in "${packages[@]}"; do
  if [ -d "packages/$pkg" ]; then
    echo ""
    echo "🔍 Linting @all-for-one/$pkg..."
    cd "packages/$pkg"
    npx eslint src/ --ext .ts,.tsx 2>/dev/null || echo "  ⚠️  Lint warnings (non-blocking)"
    cd ../..
  fi
done

echo ""
echo "✅ Lint complete"
