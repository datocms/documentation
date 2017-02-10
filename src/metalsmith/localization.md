---
layout: page.ejs
category: metalsmith
title: Localization
position: 8
---

Just as explained in the product overview, DatoCMS is totally agnostic in terms of static site generators: it just allows you to dump content locally, and the rest is up to you.

Within your `dato.config.js` file, you can easily switch between your locales like this:

```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {
  i18n.locale = 'en';
  dato.blogPosts[0].title;  // => "Hello world!"

  i18n.locale = 'it';
  dato.blogPosts[0].title   // => "Ciao mondo!"
};
```

You can also iterate over your locales with `i18n.availableLocales`:

```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {

  // iterate over all the administrative area languages...
  i18n.availableLocales.forEach((locale) => {

    // iterate over the "Blog post" records...
    dato.blogPosts.forEach((blogPost) => {

      // ...and create a markdown file for each article!
      postsDir.createPost(`${blogPost.slug}-${locale}.md`, 'yaml', {
        frontmatter: {
          title: blogPost.title,
          categories: blogPost.categories.map(cat => cat.slug),
          language: locale,
          date: blogPost.publishedAt,
        },
        content: blogPost.content
      });
    });
  });
};
```
