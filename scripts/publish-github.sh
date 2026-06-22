#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if ! command -v gh >/dev/null 2>&1; then
  echo "GitHub CLI (gh) is not installed."
  echo "Install: https://cli.github.com/"
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Log in to GitHub first:"
  gh auth login
fi

gh repo create furnitects \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description "Furnitects partner operations website — custom wardrobe catalog, instant quote calculator, WhatsApp confirmation"

echo ""
echo "Done! Your repo:"
gh repo view --web 2>/dev/null || gh repo view --json url -q .url
