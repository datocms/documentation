---
layout: page.ejs
category: jekyll
position: 4
title: Retrieve fields values
---

Once you have obtained a record object, you can access to the value associated to a field using its *Field ID*:

<div class="two">
  <div>![foo](/images/edit-field-dialog.png)</div>
  <div>![foo](/images/edit-field-button.png)</div>
</div>

In this case, the field ID is `title`, so we can use it as a method on the record object to retrieve its value:

```ruby
blog_post = dato.blog_posts.first     # get the first blog post of the collection

puts blog_post.title                  # => "Hello world!"
```

Each record also exposes some additional methods you can use:

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


Most field types return scalar values (integers, booleans, strings, etc.), but some other return more complex structures.

---

### Geolocation fields

*Geolocation* fields expose the following methods:

```ruby
blog_post.position.latitude    # => 41.90278349999999
blog_post.position.longitude   # => 12.496365500000024

blog_post.position.to_hash     # => {
                               #  latitude: 41.90278349999999,
                               #  longitude: 12.496365500000024
                               # }
```

---

### Video fields

*Video* fields expose the following methods:

```ruby
blog_post.video.title          # => "Nyan Cat"
blog_post.video.url            # => "https://www.youtube.com/watch?v=QH2-TGUlwu4&t=11s"
blog_post.video.thumbnail_url  # => "https://i.ytimg.com/vi/QH2-TGUlwu4/hqdefault.jpg"
blog_post.video.provider       # => "youtube"
blog_post.video.provider_uid   # => "QH2-TGUlwu4"
blog_post.video.height         # => 344
blog_post.video.width          # => 459

blog_post.video.to_hash        # => {
                               #  title: "Nyan Cat",
                               #  url: "https://www.youtube.com/watch?v=QH2-TGUlwu4&t=11s",
                               #  thumbnail_url: "https://i.ytimg.com/vi/QH2-TGUlwu4/hqdefault.jpg",
                               #  provider: "youtube",
                               #  provider_uid: "QH2-TGUlwu4",
                               #  height: 344,
                               #  width: 459
                               # }
```

---
