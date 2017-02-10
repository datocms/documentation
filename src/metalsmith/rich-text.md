---
layout: page.ejs
title: Rich-text fields
category: metalsmith
position: 7
---

**Note: This guide assumes you have a basic knowledge of how Rich Text models work in DatoCMS.
If this is not the case, please read [this introduction](/schema/rich-text.html) first.**

Suppose a `blog_post` model has a rich-text field called `content`, which in turn accepts the following models as [building-blocks](/schema/rich-text.html):

* Model `blog_post_text_block`: made of a `text` field (*multi-paragraph text*);
* Model `blog_post_quote_block`: made of a `quote` field (*multi-paragraph text*) and `author` field (*single-line string*);
* Model `blog_post_gallery_block`: made of a `gallery` field (*image gallery*);

A rich-text field works much like a *multiple link* field, as it returns the array of inner records:

```javascript
blog_post.content.forEach(record => {
  if (record.item_type.api_key === 'blog_post_text_block') {
    record.text
  } else if (record.item_type.api_key === 'blog_post_quote_block') {
    record.quote
    record.author
  } else {
    record.gallery.forEach(image => {
      image.url
    });
  }
});
```
