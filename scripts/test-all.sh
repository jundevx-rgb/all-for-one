#!/bin/bash
set -e
echo "═══════════════════════════════════════"
echo "  Running tests for all packages..."
echo "═══════════════════════════════════════"

packages=("design-system" "icons" "core" "animations" "transitions" "carousels" "footers" "shaders")
failed=0

for pkg in "${packages[@]}"; do
  if [ -d "packages/$pkg" ]; then
    echo ""
    echo "🧪 Testing @all-for-one/$pkg..."
    cd "packages/$pkg"
    npx vitest run --reporter=verbose 2>/dev/null || {
      echo "  ❌ Tests failed for $pkg"
      failed=1
    }
    cd ../..
  fi
done

echo ""
if [ $failed -eq 0 ]; then
  echo "═══════════════════════════════════════"
  echo "  ✅ All tests passed!"
  echo "═══════════════════════════════════════"
else
  echo "═══════════════════════════════════════"
  echo "  ❌ Some tests failed"
  echo "═══════════════════════════════════════"
  exit 1
fi
