---
layout: page
title: Five Man
permalink: /fiveman/
---
  {% assign sortedItems = site.categories.fiveman | sort: 'title' %}

  {% include post-list.html posts=sortedItems  %}