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
  dato dump --token=TOKEN           # dumps DatoCMS contents into local files
  dato help [COMMAND]               # Describe available commands or one specific command
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

In this case, the ID is `blog_post`, so you can retrieve its records pluralizing the Model ID, and using it as a method on the `dato` object:

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

Once you have obtained a *blog post* record using any of the above methods, you can access to the value associated to a field using its *Field ID*:

<div class="two">
  <div>![foo](/images/edit-field-dialog.png)</div>
  <div>![foo](/images/edit-field-button.png)</div>
</div>

In this case, the ID is `title`: we can use it as a method on the record object to retrieve its value:

```ruby
blog_post = dato.blog_posts.first     # => get the first blog post of the collection
blog_post.title                       # => returns "Hello world!"
```

Each record also has some additional methods you can use:

```ruby
blog_post.id             # returns the record ID:
                         #
                         # => "1242"

blog_post.updated_at     # returns last modified date:
                         #
                         # => <Time value="2017-01-24 10:41:55 +0100">

blog_post.position       # returns its ordinal number in the collection 
                         # (only if the model is sortable):
                         #
                         # => 13 

blog_post.to_hash        # returns an hash containing all its attributes:
                         #
                         # {
                         #   id: "1242",
                         #   item_type: "blog_post",
                         #   updated_at: <Time value="2017-01-24 10:41:55 +0100">,
                         #   title: "Hello world!",
                         #   ...
                         # }
```

---

### Complex fields

#### Single and multiple link fields

Once you have a 

#### Rich-text fields

Once you have a 

#### Image, Image gallery and file attachment fields

Once you have a 

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
