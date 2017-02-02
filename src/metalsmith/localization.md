---
layout: page.ejs
category: metalsmith
title: Localization
position: 8
---

Just as explained in the product overview, DatoCMS is totally agnostic in terms of static site generators: it just allows you to dump content locally, and the rest is up to you.

Within your `dato.config.rb` file, you can easily switch between your locales like this:

```javascript
# dato.config.js

I18n.locale = 'en'
dato.blog_posts.first.title  // => "Hello world!"

I18n.locale = 'it'
dato.blog_posts.first.title   // => "Ciao mondo!"
```

You can also iterate over your locales with `I18n.available_locales`:

```javascript
# dato.config.js

module.exports = (dato, root, i18n) => {

  // inside a "post" directory...
  root.directory("post", (dir) => {

    // ...iterate over the "Blog post" records...
    dato.blogPosts.forEach((blogPost) => {

      // ...and create a markdown file for each article!
      root.createPost(`${blogPost.slug}.md`, 'yaml', {
        frontmatter: {
          title: blogPost.title,
          type: "post",
          categories: blogPost.categories.map(cat => cat.slug),
          date: blogPost.publishedAt,
        },
        content: blogPost.content
      });
    }
  });
}
```
