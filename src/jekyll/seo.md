---
layout: page.ejs
category: jekyll
title: Managing SEO
position: 9
---

### Managing SEO meta tags

Given a record object, we make it very easy to build all the meta tags related to a record with the `.seo_meta_tags` method:

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

Meta tags are generated from the values contained in the record's *SEO meta tags* field and  the global SEO settings for the administrative area. If the record doesn't have a *SEO meta tags field*, it tries to guess reasonable values inspecting the other fields of the record (single-line strings and images).

```ruby
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

If the result of `.seo_meta_tags` doesn't satisfy your needs, you can manually generate meta tags accessing directly to the raw values of any *SEO meta tag* field:

```ruby
blog_post.seo.title         # => "Article title"
blog_post.seo.description   # => "Lorem ipsum dolor sit amet, consectetur..."
blog_post.seo.image         # => returns a full image object (see `Media fields` chapter)

blog_post.seo.to_hash       # => {
                            #   title: "Article title",
                            #   description: "Lorem ipsum dolor sit amet, consectetur...",
                            #   image: {
                            #     size: 168131,
                            #     format: "png",
                            #     width: 800,
                            #     height: 600,
                            #     url: "https://dato-images.imgix.net/123/12345-heart.png"
                            #   }
                            # }
```


