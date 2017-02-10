---
layout: page.ejs
category: metalsmith
title: Managing SEO
position: 9
---

Given a record object, you can obtain its title, description, [OpenGraph](http://ogp.me/) and [Twitter card](https://dev.twitter.com/cards/overview) meta tags with the `.seoMetaTags` method:

```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {
  root.createPost(`src/about.md`, 'yaml', {
    frontmatter: {
      title: dato.aboutPage.title,
      layout: 'about.ejs',
      seoMetaTags: dato.aboutPage.seoMetaTags,
    },
    content: dato.aboutPage.content
  });
};
```

This will generate a pretty long frontmatter, contaning the complete set of meta tags for the page:

```
---
title: "About me"
layout: "about.ejs"
seoMetaTags:
  - tagName: "title"
    content: "About me - Creative Inc."
  - tagName: "meta"
    attributes:
      property: "og:title"
      content: "About me"
  - tagName: "meta"
    attributes:
      name: "twitter:title"
      content: "About me"
  - tagName: "meta"
    attributes:
      name: "description"
      content: "Lorem ipsum sit dolor amet..."
  - tagName: "meta"
    attributes:
      name: "twitter:site"
      content: "@AlbanBikeBags"
  - tagName: "meta"
    attributes:
      property: "og:image"
      content: "https://dato-images.imgix.net/604/123-image.jpg"
  - tagName: "meta"
    attributes:
      name: "twitter:image"
      content: "https://dato-images.imgix.net/604/123-image.jpg"
  - ...
---

This is the page content, yay!!
```

Meta tags are generated from record's *SEO meta tags* field and the global SEO settings for the administrative area. If the record doesn't have a *SEO meta tags* field, the method tries to guess reasonable values by inspecting the other fields of the record (single-line strings and images).

In you Metalsmith template (in this example `layouts/about.ejs`), you can generate proper HTML tags from this structure like this:

```erb
<html>
  <head>
    <!-- ... -->
    <% seoMetaTags.forEach(tag => { %>
      <%- tagGenerator(tag) -%>
    <% }) %>
  </head>
  <body>
    <h1><%= title %></h1>
  </body>
</html>
```

The helper function `tagGenerator` can be injected in your templates passing it as a key in [`metalsmith-layouts`](https://github.com/superwolff/metalsmith-layouts) configuration object:

```javascript
const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown')
const tag = require('html-tag');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(markdown())
  .use(layouts({
    engine: 'ejs',
    tagGenerator({ tagName, attributes, content }) {
      return tag(tagName, attributes, content);
    }
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
```

---

### Favicon meta tags

Similarly, you can also get desktop, iOS, Android and Windows Phone favicon meta tags with the `dato.site.faviconMetaTags` method:

```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {

  // Create a YAML data file to store global data about the site
  root.createDataFile('src/data/settings.yml', 'yaml', {
    faviconMetaTags: dato.site.faviconMetaTags
  });
};
```

This will be the content of `src/data/settings.yml`:

```yaml
faviconMetaTags:
  - tagName: "link"
    attributes:
      rel: "apple-touch-icon"
      sizes: "57x57"
      href: "https://dato-images.imgix.net/604/123-icon.png?h=57&w=57"
  - tagName: "meta"
    attributes:
      name: "msapplication-square70x70"
      content: "https://dato-images.imgix.net/604/123-icon.png?h=70&w=70"
  - tagName: "link"
    attributes:
      rel: "icon"
      sizes: "16x16"
      href: "https://dato-images.imgix.net/604/123-icon.png?h=16&w=16"
      type: "image/png"
  - ...
```

In you Metalsmith templates, you can generate proper HTML tags from this structure like this:

```erb
<html>
  <head>
    <!-- ... -->
    <% settings.faviconMetaTags.forEach(tag => { %>
      <%- tagGenerator(tag) -%>
    <% }) %>
  </head>
```

The helper function `tagGenerator` can be injected in your templates passing it as a key in [`metalsmith-layouts`](https://github.com/superwolff/metalsmith-layouts) configuration object:

```javascript
const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata')
const tag = require('html-tag');

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .use(metadata({
    settings: 'data/settings.yml'
  }))
  .use(layouts({
    engine: 'ejs',
    tagGenerator({ tagName, attributes, content }) {
      return tag(tagName, attributes, content);
    }
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
```
