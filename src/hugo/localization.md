---
layout: page.ejs
category: hugo
title: Localization
position: 8
---

Hugo has built-in support for the creation of [multi-lingual sites](https://gohugo.io/content/multilingual/). 

Within your `dato.config.js` file, you can easily switch between your locales changing the value of `i18n.locale`:

```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {
  i18n.locale = 'en';
  dato.blogPosts[0].title;  // => "Hello world!"

  i18n.locale = 'it';
  dato.blogPosts[0].title   // => "Ciao mondo!"
};
```

If you need to temporarily switch locale, and then restore the previous value, you can use `i18n.withLocale`:

```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {
  i18n.locale = 'en';
  dato.blogPosts[0].title;  // => "Hello world!"

  i18n.withLocale('it', () => {
    i18n.locale;              // => "it"
    dato.blogPosts[0].title;  // => "Hello world!"
  });

  i18n.locale;              // => "en"
  dato.blogPosts[0].title;  // => "Hello world!"
};
```


You can also obtain the list of languages of your administrative area with `i18n.availableLocales`:

```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {
  i18n.availableLocales;  // => [ 'en', 'it' ]
};
```

Here's an complete example that creates multiple versions of your articles, one for each available locale:


```javascript
// dato.config.js

module.exports = (dato, root, i18n) => {
  // inside the "src/article" directory...
  root.directory("content/article", (articlesDir) => {

    // iterate over all the available locales...
    i18n.availableLocales.forEach((locale) => {

      // switch to the nth locale
      i18n.withLocale(locale, () => {

        // iterate over the "Blog post" records...
        dato.blogPosts.forEach((article) => {

          // ...and create a localized markdown file for each article
          articlesDir.createPost(
            `${article.slug}.${locale}.md`, "yaml", {
              frontmatter: {
                title: article.title
              },
              content: article.content
            }
          );
        });
      });
    });
  });
};
```
