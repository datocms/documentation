---
layout: page.ejs
title: Rich-text fields
category: middleman
position: 7
---

<div class="note">
**Note** This guide assumes you have a basic knowledge of how Rich-text fields work in DatoCMS. If this is not the case, please read [this introduction](/schema/rich-text.html) first.
</div>

Suppose a `blog_post` model has a rich-text field called `content`, which in turn accepts the following models as [building-blocks](/schema/rich-text.html):

* Model `blog_post_text_block`: made of a `text` field (*multi-paragraph text*);
* Model `blog_post_quote_block`: made of a `quote` field (*multi-paragraph text*) and `author` field (*single-line string*);
* Model `blog_post_gallery_block`: made of a `gallery` field (*image gallery*);

A rich-text field works much like a [*multiple links* field](/middleman/links.html), as it returns the array of inner records. In your Middleman templates, to present a rich-text field, you can do something like this:

```erb
<article>
  <header>
    <h1><%= blog_post.title %></h1>
    <p><%= blog_post.author.name %></p>
  </header>
  <% blog_post.content.each do |record| %>
    <% if record.item_type.api_key == "blog_post_text_block" %>
      <div>
        <%= record.text %>
      </div>
    <% elsif record.item_type.api_key == "blog_post_quote_block" %>
      <blockquote>
        <%= record.quote %>
        <footer>
          <cite><%= record.author %></cite>
        </footer>
      </blockquote>
    <% elsif record.item_type.api_key == "blog_post_gallery_block" %>
      <div class="gallery">
        <%= record.gallery.each do |image| %>
          <img src="<%= image.url() %>" alt="<%= image.alt %>" title="<%= image.title %>" />
        <% end %>
      </div>
    <% end %>
  <% end %>
</article>
```

