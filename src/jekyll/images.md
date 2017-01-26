---
layout: page.ejs
category: jekyll
title: File, image and gallery fields
position: 5
---

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
  puts image.title   # => "We love our clients"
  puts image.url     # => "https://dato-images.imgix.net/123/12345-heart.png"
end
```

