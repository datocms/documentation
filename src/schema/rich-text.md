---
layout: page.ejs
category: schema
position: 6
title: Modular content fields
---

Everyone hates WYSIWYG editors: developers know they produce dirty code, designers fear the introduction of unwanted styling, editors struggle to use them. Sure, DatoCMS features a WYSIWYG editor since day one, but we want to keep it simple and lightweight: you cannot add inline images or other media you could regret in the future to have added in an unstructured way.

In DatoCMS you can achieve structured, rich-content editing using a specific type of field called **Modular content**:

<div class="small">![foo](/images/modular-content/1.png)</div>

The idea is to give your authors the choice to compose their content by alternating certain blocks (ie. text, images, videos, etc.), which are nothing more but "low-level" models. Authors, to compose a structured content, will be able to add and reorder these blocks as they prefer:

<div class="small">![foo](/images/modular-content/4.png)</div>

This gives authors a lot of freedom to organise their content, much like Medium editor does, while keeping the content clean and structured:

---

### How to build a Modular content editor

Suppose we have an *Article* model, and we want to add a modular content field to manage its content. The first step is to decide which are the different kind of basic blocks you want your authors to alternate. In this case, we want our content to be a flexible composition of:

* Text
* Quotes
* Videos
* and Images

#### Create the "building blocks"

To achieve this result, first you need to create a different model for each one of these blocks. The *Quote* model, for example, will be made of two fields: one containing the actual quote, the other containing the author.

<div class="smaller">![foo](/images/modular-content/2.png)</div>

#### Add the Modular content field to your model

Now that the basic blocks are ready, we can finally select the Article model, and add a Modular content field (you'll find it under the Text group):

Let's name it "Content", and in the "Validations" tab, make sure to select the low-level models you previously created:

<div class="small">![foo](/images/modular-content/3.png)</div>

#### Hiding "building-block" models from the navigation bar

If you create a model only to be used as building-blocks inside a Modular content field, it is perfectly safe and suggested to remove it from the navigation bar, so that they can only be accessed and created within the modular-content editor.
