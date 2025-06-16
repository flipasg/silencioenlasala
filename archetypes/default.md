---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
url: "/{{ now.Format "2006" }}/{{ now.Format "01" }}/{{ .Name | urlize }}.html"
tags:
  - "{{ now.Format "2006" }}"
  - "{{ .Section }}"
---
