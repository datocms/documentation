---
layout: page.ejs
category: jekyll
title: Managing SEO
position: 9
---

Given a record object, you can obtain its title, description, [OpenGraph](http://ogp.me/) and [Twitter card](https://dev.twitter.com/cards/overview) meta tags with the `.seo_meta_tags` method:

```ruby
blog_post.seo_meta_tags

# => [
#   { tag_name: "title", content: "Bike Pannier - Alban Bike Bags" },
#
#   { tag_name: "meta",  attributes: { name: "description",         content: "Lorem ipsum..." } },
#   { tag_name: "meta",  attributes: { name: "twitter:card",        content: "summary" } },
#   { tag_name: "meta",  attributes: { name: "twitter:description", content: "Lorem ipsum..." } },
#   { tag_name: "meta",  attributes: { name: "twitter:image",       content: "https://dato-images.imgix.net/72/123-image.png" } },
#   { tag_name: "meta",  attributes: { name: "twitter:site",        content: "@AlbanBikeBags" } }
#   { tag_name: "meta",  attributes: { name: "twitter:title",       content: "Bike Pannier" } },
#
#   { tag_name: "meta",  attributes: { property: "article:modified_time", content: "2017-01-26T09:11:19Z" } },
#   { tag_name: "meta",  attributes: { property: "article:publisher",     content: "https://www.facebook.com/AlbanBags/" } },
#   { tag_name: "meta",  attributes: { property: "og:description",        content: "Lorem ipsum..." } },
#   { tag_name: "meta",  attributes: { property: "og:image",              content: "https://dato-images.imgix.net/72/123-image.png" } },
#   { tag_name: "meta",  attributes: { property: "og:locale",             content: "en_US" } },
#   { tag_name: "meta",  attributes: { property: "og:site_name",          content: "Alban Bike Bags" } },
#   { tag_name: "meta",  attributes: { property: "og:title",              content: "Bike Pannier" } },
#   { tag_name: "meta",  attributes: { property: "og:type",               content: "article" } },
# ]
```

These meta tags are generated from record's *SEO meta tags* field and the global SEO settings for the administrative area. If the record doesn't have a *SEO meta tags* field, the method tries to guess reasonable values inspecting the other fields of the record (single-line strings and images).

---

### Favicon meta tags

Similarly, you can also get desktop, iOS, Android and Windows Phone favicon meta tags:

```ruby
dato.site.favicon_meta_tags

```

---

### How to use meta tags in your Jekyll website

In your `dato.config.rb` file you can simply dump all the tags in the frontmatter:

```ruby
# dato.config.rb

dato.blog_posts.each do |article|
  directory "_posts" do
    create_post "#{article.slug}.md" do
      frontmatter(
        :yaml,
        layout: "article",
        title: article.title,
        seo_meta_tags: article.seo_meta_tags
      )

      content(article.content)
    end
  end
end
```

And in your Jekyll views, transform the data into proper HTML tags:

```html
# _layouts/article.html

<!DOCTYPE html>
<html>
<head>
  <!-- ... -->
  {% for tag in page.seo_meta_tags %}
    {{ tag | tagify }}
  {% endfor %}
</head>
<body>
  <h1>{{ page.title }}</h1>
</body>
</html>
```

You can place the `tagify` liquid filter inside your project `_plugins` directory:

```ruby
# _plugins/tagify.rb

module Jekyll
  module TagifyFilter
    def tagify(input)
      name = input["tag_name"]
      content = input["content"]

      attributes = input.fetch("attributes", {}).
        map { |k, v| %Q(#{k}="#{CGI::escapeHTML(v)}") }

      if content.nil?
        "<#{[name, attributes].flatten.compact.join(' ')}>"
      else
        "<#{[name, attributes].flatten.compact.join(' ')}>#{content}</#{name}>"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TagifyFilter)
```
