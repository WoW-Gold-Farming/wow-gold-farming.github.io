---
layout: page
title: New Farms
permalink: /new/
---
  {% if site.paginate %}
    {% assign posts = paginator.posts %}
  {% else %}
    {% assign posts = site.posts %}
  {% endif %}
  {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
 {%- for post in posts limit:10 -%}
       <li> {{ post.date | date: date_format }} - <a  href="{{ post.url | relative_url }}"> {{ post.title | escape }}</a></li>

      {%- endfor -%}