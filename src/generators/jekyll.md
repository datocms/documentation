---
layout: page.ejs
category: generators
position: 1
title: Jekyll
---

**Disclaimer:** This guide assumes you already know what Jekyll is and how it works. If you need some help getting started with Jekyll, you can read the official [Jekyll documentation](https://jekyllrb.com/docs/home/), as well as [Jekyll Tips](http://jekyll.tips/), a comprehensive set of guides, videos and curated resources.

---

### Overview

DatoCMS offers a gem that makes it extremely convenient to transform the content stored in your DatoCMS administrative interface into local:

* Markdown files (complete with YAML frontmatter);
* Jekyll collection files;
* Jekyll data files.

With this gem installed, you specify how records will be dumped into local files using a Ruby config file called `dato.config.rb` you need to place at the root of your Jekyll project.

---

### Installation

Inside your Jekyll project, you can install the `dato` gem tool running these commands:

```bash
$ echo 'gem "dato"' >> Gemfile
$ bundle install
```

The gem exposes a CLI tool: if everything worked correctly, you should now run `bundle exec dato` and see the help banner:

```bash
$ bundle exec dato

DatoCMS commands:
  dato dump --token=TOKEN    # Dumps DatoCMS content into local files
  dato help [COMMAND]        # Describe available commands or one specific command
```

---

### The "dump" command

The main command the `dato` CLI tool exposes is `dump`, which is the one you're going to use to fetch the records from our API and transform them into local files.

You can invoke the command like this:

```bash
$ bundle exec dato dump --token=SITE_READONLY_API_TOKEN
```

You can find your API token in the *Admin area > API tokens* section:

![foo](/images/api-token.png)

The `dump` command requires a file called `dato.config.rb` under your Jekyll project root directory. Within this file, you can easily access to all the content stored in your administrative area and dump it into local files using a custom DSL.

---

### Accessing your records in `dato.config.rb`

By far, the most common thing you'll need to do is to access the records contained in your administrative area. There are multiple ways you can achieve that.

##### Find a record by ID

If you already know the ID of the record you need to access, just use the `dato#find` method:

```ruby
# returns the record with ID 3411
dato.find(3411)
```

##### Find all the records of a specific model

Suppose you have a *Blog post* model in your administrative area, and you want retrieve the complete collection of its records. First thing first, you need to know its *Model ID*:

<div class="two">
  <div>![foo](/images/edit-model-dialog.png)</div>
  <div>![foo](/images/edit-model-button.png)</div>
</div>

In this case, the ID is `blog_post`, so you can retrieve its records **pluralizing the Model ID**, and using it as a method on the `dato` object:

```ruby
# iterate over the Array of records of the `blog_post` model

dato.blog_posts.each do |record|
  # ...
end
```

If you need to access the record associated to a [single-instance model](/schema/single-instance.html), you don't need to pluralize the Model ID:

```ruby
# returns the record for the `about_page` single-instance model
# (or nil, if it hasn't been created yet)

dato.about_page
```

---

### Accessing your records' values

Once you have obtained a record using any of the above methods, you can access to the value associated to a field using its *Field ID*:

<div class="two">
  <div>![foo](/images/edit-field-dialog.png)</div>
  <div>![foo](/images/edit-field-button.png)</div>
</div>

In this case, the field ID is `title`, so we can use it as a method on the record object to retrieve its value:

```ruby
blog_post = dato.blog_posts.first     # get the first blog post of the collection

puts blog_post.title                  # => "Hello world!"
```

Some field types return scalar values (integers, booleans, strings, etc.) other return more complex objects (we'll cover them in the Complex fields paragraph).

Each record also has some additional methods you can use:

```ruby
blog_post.id                  # returns the record ID:
                              # => "1242"

blog_post.item_type           # returns an object representing the model:
blog_post.item_type.id        # => "44"
blog_post.item_type.name      # => "Blog post"
blog_post.item_type.api_key   # => "blog_post"

blog_post.updated_at          # returns last modified date:
                              # => <Time value="2017-01-24 10:41:55 +0100">

blog_post.position            # returns its ordinal number in the collection
                              # (only if the model is sortable):
                              #
                              # => 13

blog_post.to_hash             # returns an hash containing the above, plus all the
                              # fields's values:
                              #
                              # => {
                              #   id: "1242",
                              #   item_type: "blog_post",
                              #   updated_at: <Time value="2017-01-24 10:41:55 +0100">,
                              #   title: "Hello world!",
                              #   ...
                              # }
```

---

### Traversing relationships with single and multiple link fields

Suppose our `blog_post` model has the following fields:

* `author`: *Single link* referencing a `user` record;
* `related_posts`: *Multiple links* referencing other `blog_post` records;

In this case, `blog_post.author` will return the linked `user` record (or `nil`, if the relation is empty), and `blog_post.related` will return an array of `blog_post` records. This allows you to easily navigate across your records' relationships as deep as you like:

```ruby
puts blog_post.author.full_name           # => "Mark Smith"

blog_post.related.each do |related_post|
  puts related_post.title                 # => "Another post!"
end

blog_post.related.first.author.name       # => "Tom Kepler"
```

---

### Media fields

*File attachment* fields expose the following methods:

```ruby
blog_post.attachment.size      # returns the filesize in bytes:
                               # => 1489134

blog_post.attachment.format    # returns the extension:
                               # => "pdf"

blog_post.attachment.url       # returns the file URL:
                               # => "https://dato-images.imgix.net/123/12345-report.pdf"

blog_post.attachment.to_hash   # returns an hash containing all the above:
                               #
                               # => {
                               #   size: 1489134,
                               #   format: "pdf",
                               #   url: "https://dato-images.imgix.net/123/12345-report.pdf"
                               # }
```

*Image fields* share all the methods of *file attachment* fields, but they also expose some additional methods:

```ruby
blog_post.cover_image.size       # returns the filesize in bytes:
                                 # => 168131

blog_post.cover_image.format     # returns the extension:
                                 # => "png"

blog_post.cover_image.width      # returns the image width:
                                 # => 800

blog_post.cover_image.height     # returns the image height:
                                 # => 600

blog_post.cover_image.alt        # returns the image alternative text:
                                 # => "Heart icon"

blog_post.cover_image.title      # returns the image title:
                                 # => "We love our clients"

blog_post.cover_image.url        # returns the file URL:
                                 # => "https://dato-images.imgix.net/123/12345-heart.png"

blog_post.cover_image.to_hash    # returns an hash containing all the above:
                                 #
                                 # => {
                                 #   size: 168131,
                                 #   format: "png",
                                 #   width: 800,
                                 #   height: 600,
                                 #   url: "https://dato-images.imgix.net/123/12345-heart.png"
                                 # }
```

*Image gallery* fields simply return an array of image objects:

```ruby
blog_post.gallery.each do |image|
  puts image.title
  puts image.url
end
```

#### Handle image cropping, resizing, etc.

Every image/file you upload in DatoCMS is stored on [Imgix](https://www.imgix.com/), a super-fast CDN optimized for image delivery. By adding some parameters to your image URL, you can enhance, resize and crop images, compress them and change format for better performance, create complex compositions, and extract useful metadata. The transformations happens on the fly and, once generated, transformed images get cached on the CDN as well for later reuse.

For example, if you want to resize your image and convert it to JPG format, you just need to add `?w=800&h=600&fm=jpg` at the end of the URL. The `.url` method makes it easy to generate these kind of URLs, by simply passing an hash of transformations as argument:

```ruby
blog_post.cover_image.url(w: 800, h: 600, fm: :jpg)
# => "https://dato-images.imgix.net/123/12345-heart.png?w=800&h=600&fm=jpg"
```

Take a look at [Imgix's Image API Reference](https://docs.imgix.com/apis/url) page to see all the transformations available.

---

### Rich-text fields

Suppose a `blog_post` model has a rich-text field called `content`, which in turn accepts the following models as [building-blocks](/schema/rich-text.html):

* Model `blog_post_text_block`: made of a `text` field (*multi-paragraph text*);
* Model `blog_post_quote_block`: made of a `quote` field (*multi-paragraph text*) and `author` field (*single-line string*);
* Model `blog_post_gallery_block`: made of a `gallery` field (*image gallery*);

A rich-text field works much like a *multiple link* field, as it returns the array of inner records:

```ruby
blog_post.content.each do |record|
  if record.item_type.api_key == "blog_post_text_block"
    puts record.text
  elsif record.item_type.api_key == "blog_post_quote_block"
    puts record.quote
    puts record.author
  else
    record.gallery.each do |image|
      puts image.url
    end
  end
end
```

#### Video fields

Once you have a

#### Geolocation fields

Once you have a

#### SEO meta tags fields

Once you have a

---

### Site settings

---

### Localization

---

### Site settings

---

### Managing SEO

---
