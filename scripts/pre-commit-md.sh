#!/bin/bash

# Get list of staged .md files in content/
files=$(git diff --cached --name-only --diff-filter=ACM | grep '^content/.*\.md$')

for file in $files; do
  # Check if file starts with '---'
  if ! head -n 1 "$file" | grep -q '^---'; then
    # Get section (folder), filename, and current date
    section=$(echo "$file" | cut -d'/' -f2)
    name=$(basename "$file" .md)
    year=$(date +%Y)
    month=$(date +%m)
    now=$(date +"%Y-%m-%dT%H:%M:%S%z")
    slug=$(echo "$name" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')

    # Create temp file with front matter + original content
    tmpfile=$(mktemp)
    cat > "$tmpfile" <<EOF
---
title: "$(echo "$name" | sed 's/-/ /g' | sed 's/.*/\u&/')"
date: $now
draft: false
url: "/$year/$month/$slug.html"
tags:
  - "$year"
  - "$section"
---

EOF
    cat "$file" >> "$tmpfile"
    mv "$tmpfile" "$file"
    git add "$file"
    echo "Added front matter to $file"
  fi
done 