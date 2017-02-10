---
layout: page.ejs
category: metalsmith
position: 4
title: Link fields
---

Suppose our `blog_post` model has the following fields:

* `author`: *Single link* referencing a `user` record;
* `related_posts`: *Multiple links* referencing other `blog_post` records;

In this case, `blog_post.author` will return the linked `user` record (or `null`, if the relation is empty), and `blog_post.related` will return an array of `blog_post` records.

```javascript
blog_post.author.full_name   # => "Mark Smith"

blog_post.related.map(relatedPost => {
  relatedPost.title         # => "Another post!"
})
```

Use method chains to navigate deeply across your records' relationships:

```
blog_post.related.first.author.name       # => "Tom Kepler"
```

#### Reverse lookups

You can easily find all the blog post for a specific author with this Javascript one-liner:

```javascript
peter = dato.find("1413")
dato.blogPosts.filter(blogPost => blogPost.author.id === peter.id)
```
