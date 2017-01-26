---
layout: page.ejs
category: jekyll
position: 4
title: Link fields
---

Suppose our `blog_post` model has the following fields:

* `author`: *Single link* referencing a `user` record;
* `related_posts`: *Multiple links* referencing other `blog_post` records;

In this case, `blog_post.author` will return the linked `user` record (or `nil`, if the relation is empty), and `blog_post.related` will return an array of `blog_post` records. This allows you to easily navigate across your records' relationships as deep as you like:

```ruby
puts blog_post.author.full_name           # => "Mark Smith"

blog_post.related.each do |related_post|
  puts related_post.title                 # => "Another post!"
end

blog_post.related.first.author.name       # => "Tom Kepler"
```


