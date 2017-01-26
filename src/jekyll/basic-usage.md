---
layout: page.ejs
category: jekyll
position: 2
title: Basic usage
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

The main command the `dato` CLI tool exposes is `dump`, which is the one you're going to use to fetch the records from our API and transform them into local files.

You can invoke the command like this:

```bash
$ bundle exec dato dump --token=SITE_READONLY_API_TOKEN
```

You can find your API token in the *Admin area > API tokens* section:

![foo](/images/api-token.png)

---

### The config file

The `dump` command will read a file `dato.config.rb` (or the file passed by the `--config` option). This file should contain instructions to transform the content stored remotely in DatoCMS into local files.

Let's watch a simple example to get started:

```ruby
# dato.config.rb

content = { hello: "world" }
create_data_file("_data/foobar.yml", :yaml, content)
```

Here, `create_data_file` is a method made available to you that can generate YAML/TOML/JSON files. It's perfect to generate Jekyll data files.

You can also generate Jekyll posts and collections with the `create_post` method:

```ruby
create_post "_posts/article.md" do
  frontmatter(:yaml, { title: "First article", category: [ "Random" ] })
  content("Lorem **ipsum dolor sit amet**, consectetur adipiscing elit.")
end
```

If you need to place a collection of posts within a folder, you can use the `directory` method, so that every time the `dump` command is executed, previous content of the directory will be erased:

```ruby
directory "_posts" do
  10.times do |i|
    create_post "article-#{i}.md" do
      frontmatter(:yaml, { title: "Article #{i}", category: [ "Random" ] })
      content("Lorem **ipsum dolor sit amet**, consectetur adipiscing elit.")
    end
  end
end
```

Now that you know how you can create local files, the final step is to start generating them with data coming from DatoCMS. An object called `dato` is available for you exactly for this purpose:

```ruby
# let's iterate over the "Blog post" records...
dato.blog_posts.each do |article|

  # ...and inside a directory...
  directory "_posts" do

    # ...create a markdown file for each one of them!
    create_post "#{article.slug}.md" do
      frontmatter(
        :yaml,
        title: article.title,
        category: article.categories.map(&:name)
      )

      content(article.content)
    end
  end
end
```

Once your `dato.config.rb` is ready, just run the `dato dump` command: you should see your Jekyll project populated with content. Run `jekyll serve` and enjoy!

Obviously, that's just a quick tour: you can learn all the details about how to access your records inside your config file in the following sections.
