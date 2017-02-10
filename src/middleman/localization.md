---
layout: page.ejs
category: middleman
title: Localization
position: 8
---

Middleman fully supports localization, so first thing first please read the [official guide](https://middlemanapp.com/advanced/localization/). The `middleman-dato` gem fully integrates with the `i18n` gem, so you can easily switch between your localized content like this:

```ruby
# dato.config.rb

I18n.locale = :en
dato.blog_posts.first.title   # => "Hello world!"

I18n.locale = :it
dato.blog_posts.first.title   # => "Ciao mondo!"
```

Here's an example of a config file that generates one page per locale:

```
# config.rb

activate :dato, token: 'YOUR_READ_ONLY_TOKEN'
activate :i18n, langs: dato.available_locales

dato.tap do |dato|
  # iterate over all the administrative area languages
  dato.available_locales.each do |locale|

    # switch to the nth locale
    I18n.with_locale(locale) do

      # iterate over the "Article" records...
      dato.articles.each do |article|

        # ...and create a proxy file for each article
        proxy(
          "/#{locale}/articles/#{article.slug}/index.html",
          "/templates/article.html",
          locals: { article: article },
          locale: locale
        )
      end
    end
  end
end

ignore "templates/article.html.erb"
```
