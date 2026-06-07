#!/usr/bin/env bash
#
# optimize-images.sh — shrink photos in this folder for the web.
#
# Resizes every JPG/JPEG/PNG so its longest side is at most MAX_DIM pixels
# and re-encodes JPEGs at QUALITY. Runs in place. Safe to re-run: images
# already at or below MAX_DIM are skipped (sips never upscales).
#
# Usage:
#   ./optimize-images.sh            # optimize all images in this folder
#   ./optimize-images.sh photo.jpg  # optimize specific file(s)
#
# Requires: sips (preinstalled on macOS).

set -euo pipefail

MAX_DIM=1600     # longest edge in pixels
QUALITY=70       # JPEG quality 0-100

cd "$(dirname "$0")"

# Build file list: arguments, or every image in this folder.
if [ "$#" -gt 0 ]; then
  files=("$@")
else
  shopt -s nullglob nocaseglob
  files=(*.jpg *.jpeg *.png)
  shopt -u nullglob nocaseglob
fi

for f in "${files[@]}"; do
  [ "$(basename "$f")" = "optimize-images.sh" ] && continue
  [ -f "$f" ] || { echo "skip (not found): $f"; continue; }

  before=$(stat -f%z "$f")
  width=$(sips -g pixelWidth "$f"  | awk '/pixelWidth/  {print $2}')
  height=$(sips -g pixelHeight "$f" | awk '/pixelHeight/ {print $2}')
  longest=$(( width > height ? width : height ))

  if [ "$longest" -gt "$MAX_DIM" ]; then
    sips -Z "$MAX_DIM" "$f" >/dev/null
  fi

  lower=$(printf '%s' "$f" | tr '[:upper:]' '[:lower:]')
  case "$lower" in
    *.jpg|*.jpeg) sips -s format jpeg -s formatOptions "$QUALITY" "$f" >/dev/null ;;
  esac

  after=$(stat -f%z "$f")
  printf '%-40s %5s KB -> %5s KB\n' "$(basename "$f")" "$((before/1024))" "$((after/1024))"
done

echo "Done."
