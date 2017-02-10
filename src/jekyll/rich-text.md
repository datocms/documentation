---
layout: page.ejs
title: Rich-text fields
category: jekyll
position: 7
---

**Note: This guide assumes you have a basic knowledge of how Rich Text models work in DatoCMS. If this is not the case, please read [this introduction](/schema/rich-text.html) first.**

Suppose a `blog_post` model has a rich-text field called `content`, which in turn accepts the following models as [building-blocks](/schema/rich-text.html):

* Model `blog_post_text_block`: made of a `text` field (*multi-paragraph text*);
* Model `blog_post_quote_block`: made of a `quote` field (*multi-paragraph text*) and `author` field (*single-line string*);
* Model `blog_post_gallery_block`: made of a `gallery` field (*image gallery*);

A rich-text field works much like a [*multiple links* field](/jekyll/links.html), as it returns an array of the inner records. In your `dato.config.rb` file you can dump a rich-text field inside the frontmatter of a post like this:

```
# inside a "_posts" directory...
directory "_posts" do

  # ...iterate over the "Blog post" records...
  dato.blog_posts.each do |article|

    # ...and create a markdown file for each article!
    create_post "#{article.slug}.md" do
      frontmatter(
        :yaml,
        layout: "article",
        title: article.title,
        author: article.author.name,
        content: article.content.to_hash
      )
    end
  end
end
```

Then, in your `src/_layouts/article.html`, you can present it this way:

```django
---
layout: default
---

<article>
  <header>
    <h1>{{ page.title }}</h1>
    <p>{{ page.author }}</p>
  </header>
  {% for record in page.content %}
    {% if record.item_type == "blog_post_text_block" %}
      <div>
        {{ record.text }}
      </div>
    {% elsif record.item_type == "blog_post_quote_block" %}
      <blockquote>
        {{ record.quote }}
        <footer>
          <cite>{{ record.author }}</cite>
        </footer>
      </blockquote>
    {% elsif record.item_type == "blog_post_gallery_block" %}
      <div class="gallery">
        {% for image in record.gallery %}
          <img src="{{ image.url }}" alt="{{ image.alt }}" title="{{ image.title }}" />
        {% endfor %}
      </div>
    {% endif %>
  {% endfor %}
</article>
```
