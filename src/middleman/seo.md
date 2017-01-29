---
layout: page.ejs
category: middleman
title: Managing SEO
position: 9
---

Given a record object, you can obtain its title, description, [OpenGraph](http://ogp.me/) and [Twitter card](https://dev.twitter.com/cards/overview) meta tags using the `dato_meta_tags` helper:

```erb
# source/templates/article.html.erb

<% content_for(:head) do %>
  <%= dato_meta_tags(article) %>
<% end %>

<h1><%= article.title %></h1>
```

```erb
# source/layouts/layout.erb

<html>
  <head>
    <%= yield_content :head %>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```

The final result will be:

```html
<html>
  <head>
    <title>Hello world! - My Awesome Site</title>

    <meta name="description" content="..."/>
    <meta name="twitter:card" content="..." />
    <meta name="twitter:description" content="..."/>
    <meta name="twitter:image" content="..."/>
    <meta name="twitter:site" content="..."/>
    <meta name="twitter:title" content="..."/>
    <meta name="twitter:url" content="..."/>

    <meta property="og:description" content="..."/>
    <meta property="og:image" content="..."/>
    <meta property="og:locale" content="..." />
    <meta property="og:site_name" content="..." />
    <meta property="og:title" content="..."/>
    <meta property="og:type" content="..." />
    <meta property="og:url" content="..."/>
  </head>
  <body>
    <h1>Hello world!</h1>
  </body>
</html>
```

Meta tags are generated from record's *SEO meta tags* field and the global SEO settings for the administrative area. If the record doesn't have a *SEO meta tags* field, the helper tries to guess reasonable values inspecting the other fields of the record (single-line strings and images).

---

### Favicon meta tags

Similarly, you can also get desktop, iOS, Android and Windows Phone favicon meta tags with the `dato_favicon_meta_tags` helper:

```erb
# source/layouts/layout.erb

<html>
  <head>
    <%= yield_content :head %>
    <%= dato_favicon_meta_tags %>
  </head>
  <body>
    <%= yield %>
  </body>
</html>
```
