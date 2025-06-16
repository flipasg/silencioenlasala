#!/usr/bin/env python3
import os
import glob
from datetime import datetime

def has_front_matter(path):
    with open(path, 'r') as f:
        first = f.readline()
        return first.strip() == '---'

def add_front_matter(path, section):
    name = os.path.splitext(os.path.basename(path))[0]
    year = datetime.now().strftime('%Y')
    month = datetime.now().strftime('%m')
    now = datetime.now().isoformat()
    slug = name.lower().replace(' ', '-')
    title = name.replace('-', ' ').title()
    fm = f"""---
title: \"{title}\"
date: {now}
draft: false
url: "/{year}/{month}/{slug}.html"
tags:
  - \"{year}\"
  - \"{section}\"
---\n\n"""
    with open(path, 'r+') as f:
        content = f.read()
        f.seek(0, 0)
        f.write(fm + content)

changed = False
for mdfile in glob.glob('content/**/*.md', recursive=True):
    if not has_front_matter(mdfile):
        section = mdfile.split('/')[1]
        add_front_matter(mdfile, section)
        print(f"Added front matter to {mdfile}")
        changed = True

if changed:
    exit(2)  # Special code to indicate changes were made 