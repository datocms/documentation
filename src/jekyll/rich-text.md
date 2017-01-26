---
layout: page.ejs
title: Rich-text fields
category: jekyll
position: 7
---

Suppose a `blog_post` model has a rich-text field called `content`, which in turn accepts the following models as [building-blocks](/schema/rich-text.html):

* Model `blog_post_text_block`: made of a `text` field (*multi-paragraph text*);
* Model `blog_post_quote_block`: made of a `quote` field (*multi-paragraph text*) and `author` field (*single-line string*);
* Model `blog_post_gallery_block`: made of a `gallery` field (*image gallery*);

A rich-text field works much like a *multiple link* field, as it returns the array of inner records:

```ruby
blog_post.content.each do |record|
  if record.item_type.api_key == "blog_post_text_block"
    puts record.text
  elsif record.item_type.api_key == "blog_post_quote_block"
    puts record.quote
    puts record.author
  else
    record.gallery.each do |image|
      puts image.url
    end
  end
end
```

