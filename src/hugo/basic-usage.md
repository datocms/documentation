---
layout: page.ejs
category: hugo
position: 2
title: Basic usage
---

### Installation

Assuming you have a working NodeJS environment on your machine, you can install the `datocms-client` NodeJS package running these commands inside your Hugo project:

```bash
$ npm init
$ npm install datocms-client
```

The npm package exposes a CLI tool: if everything worked correctly, you should now run it and see the help banner:

```bash
$ ./node_modules/.bin/dato

Usage:
  dato dump [--watch] [--verbose] [--token=<apiToken>] [--config=<file>]
  dato migrate-slugs [--token=<apiToken>] [--skip-id-prefix]
  dato check
  dato -h | --help
  dato --version
```

The main command the `dato` CLI tool exposes is `dump`, which is the one you're going to use to fetch the records from our API and transform them into local files.

You can invoke the command like this:

```bash
$ ./node_modules/.bin/dato dump --token=SITE_READONLY_API_TOKEN
```

You can find your API token in the *Admin area > API tokens* section:

![foo](/images/api-token.png)

#### Passing the API token as environment variable

Instead of specifying the API token as a parameter, you can pass it as an environment variable:

```bash
$ export DATO_API_TOKEN=abc123
$ ./node_modules/.bin/dato dump
```

The CLI tool also loads environment variables from a `.env` file, so you can place the token there and forget about it (just make sure not to publish your `.env` file on Github):

```bash
$ echo '.env' >> .gitignore
$ echo 'DATO_API_TOKEN=abc123' >> .env
$ ./node_modules/.bin/dato dump
```

---

### The config file

The `dump` command will read a file `dato.config.js` (or the file passed by the `--config` option). This file should export a function that instructs how to transform the content stored remotely on DatoCMS into local files:

Let's watch a simple example to get started:

```ruby
// dato.config.js

module.exports = (dato, root, i18n) => {
  const content = { hello: "world" }
  root.create_data_file("_data/foobar.yml", :yaml, content)
}
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
# iterate over the "Blog post" records...
dato.blog_posts.each do |article|

  # ...and inside a directory...
  directory "_posts" do

    # ...create a markdown file for each article!
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

Once your `dato.config.js` is ready, just run the `dato dump` command: you should see your Jekyll project populated with content. Run `jekyll serve` and enjoy!

Obviously, that's just a quick tour: you can learn all the details about how to access your records inside your config file in the following sections.
