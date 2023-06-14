---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: home
---
  {% assign sortedDungeons = site.categories.dungeon | sort: 'title' %}
  {% assign sortedMounts = site.categories.mount | sort: 'title' %}
  {% assign sortedMaterials = site.categories.material | sort: 'title' %}
  {% assign sortedopenWorld = site.categories.openWorld | sort: 'title' %}

  {% include post-list.html posts=sortedDungeons title="Dungeons" %}
  {% include post-list.html posts=sortedMaterials title="Materials" %}
  {% include post-list.html posts=sortedMounts title="Mounts" %}
  {% include post-list.html posts=sortedopenWorld title="Open World Farms" %}
  