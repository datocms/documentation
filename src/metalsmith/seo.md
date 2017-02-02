---
layout: page.ejs
category: metalsmith
title: Managing SEO
position: 9
---

Given a record object, you can obtain its title, description, [OpenGraph](http://ogp.me/) and [Twitter card](https://dev.twitter.com/cards/overview) meta tags with the `.seo_meta_tags` method:

```javascript
blog_post.seo_meta_tags

// => [
//   { tag_name: "title", content: "Bike Pannier - Alban Bike Bags" },
//
//   { tag_name: "meta",  attributes: { name: "description",         content: "Lorem ipsum..." } },
//   { tag_name: "meta",  attributes: { name: "twitter:card",        content: "summary" } },
//   { tag_name: "meta",  attributes: { name: "twitter:description", content: "Lorem ipsum..." } },
//   { tag_name: "meta",  attributes: { name: "twitter:image",       content: "https://dato-images.imgix.net/72/123-image.png" } },
//   { tag_name: "meta",  attributes: { name: "twitter:site",        content: "@AlbanBikeBags" } }
//   { tag_name: "meta",  attributes: { name: "twitter:title",       content: "Bike Pannier" } },
//
//   { tag_name: "meta",  attributes: { property: "article:modified_time", content: "2017-01-26T09:11:19Z" } },
//   { tag_name: "meta",  attributes: { property: "article:publisher",     content: "https://www.facebook.com/AlbanBags/" } },
//   { tag_name: "meta",  attributes: { property: "og:description",        content: "Lorem ipsum..." } },
//   { tag_name: "meta",  attributes: { property: "og:image",              content: "https://dato-images.imgix.net/72/123-image.png" } },
//   { tag_name: "meta",  attributes: { property: "og:locale",             content: "en_US" } },
//   { tag_name: "meta",  attributes: { property: "og:site_name",          content: "Alban Bike Bags" } },
//   { tag_name: "meta",  attributes: { property: "og:title",              content: "Bike Pannier" } },
//   { tag_name: "meta",  attributes: { property: "og:type",               content: "article" } },
// ]
```

Meta tags are generated from record's *SEO meta tags* field and the global SEO settings for the administrative area. If the record doesn't have a *SEO meta tags* field, the method tries to guess reasonable values by inspecting the other fields of the record (single-line strings and images).

---

### Favicon meta tags

Similarly, you can also get desktop, iOS, Android and Windows Phone favicon meta tags with the `dato_favicon_meta_tags` helper:

```javascript
dato.site.favicon_meta_tags

```

---

### How to use meta tags in your Metalsmith website

In your `dato.config.js` file you can simply dump all the tags in the frontmatter:

```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {

  // inside a "post" directory...
  root.directory("post", (dir) => {

    // ...iterate over the "Blog post" records...
    dato.blogPosts.forEach((blogPost) => {

      // ...and create a markdown file for each article!
      root.createPost(`${blogPost.slug}.md`, 'yaml', {
        frontmatter: {
          layout: "article",
          title: blogPost.title,
          seo_meta_tags: blogPost.seoMetaTags
        },
        content: blogPost.content
      });
    }
  });
}
```

And in your HTML views, transform the data into proper HTML tags:

```html
# _layouts/article.html

<!DOCTYPE html>
<html>
<head>
  <!-- ... -->
  <% chiSiamo.seoMetaTags.forEach(function(tag) { %>
    {{ tag }}
  <% } %>
</head>
<body>
  <h1>{{ page.title }}</h1>
</body>
</html>
```
