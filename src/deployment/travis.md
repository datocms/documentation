---
layout: page.ejs
category: deploy
position: 2
title: Deploying to S3 with Travis CI
---

<div class="note">
**This guide assumes you have a working static website project on your machine integrated with DatoCMS**

If that's not your case, you can return to the previous sections of this documentation to see how to properly configure the DatoCMS administrative area and how to integrate DatoCMS with your favorite static website generator. 
</div>

### Step 1: create your Git repository

Create a new repository on [GitHub](https://github.com/new). To avoid errors, do not initialize the new repository with README, license, or gitignore files. You can add these files after your project has been pushed to GitHub.

Open Terminal (for Mac users) or the command prompt (for Windows and Linux users). In the terminal, initialize the local directory of your project as a Git repository.

```bash
$ git init
```

Add the files in your new local repository. This stages them for the first commit.

```bash
$ git add .
```

Commit the files that you've staged in your local repository.

```bash
$ git commit -m 'First commit'
```

At the top of your GitHub repository's Quick Setup page, click the clipboard icon to copy the remote repository URL. In Terminal, add the URL for the remote repository where your local repository will be pushed.

```bash
$ git remote add origin YOUR_GITHUB_REPOSITORY_URL
```

Verify your URL:

```bash
$ git remote -v
```

Now, it's time to push the changes in your local repository to GitHub.

```bash
git push -u origin master
```

Now that your project is up and running on GitHub, let's connect it to Netlify.

### Step 2: add the Travis config file to your Git repository

Travis CI uses a `.travis.yml` file in the root of your repository to learn about your project and how you want your builds to be executed. This config file can be very minimalistic or have a lot of customization in it. Please refer to the [official documentation](https://docs.travis-ci.com/user/customizing-the-build/) to learn about all the details.

#### Jekyll

```yaml
install:
  - bundle install 
script:
  - bundle exec dato dump
  - bundle exec dato jekyll build
deploy:
  provider: "s3"
  access_key_id: "YOUR AWS ACCESS KEY"
  secret_access_key: "YOUR AWS SECRET KEY"
  bucket: "YOUR BUCKET NAME"
  region: "eu-west-1"
  local_dir: "build"
  skip_cleanup: true
```

Depending on your static generator the **Build command** and **Publish directory** field need to be filled with different values:

| SSG        | Build command                                       | Publish directory |
|------------|-----------------------------------------------------|-------------------|
| Jekyll     | `bundle exec dato dump && bundle exec jekyll build` | `public/`         |
| Hugo       | `dato dump && hugo`                                 | `public/`         |
| Middleman  | `bundle exec middleman build`                       | `build/`          |
| Metalsmith | `dato dump node index.js`                           | `build/`          |
| Hexo       | `dato dump && hexo generate`                        | `public/`         |

### Step 3: connect Netlify to DatoCMS

There's only one last step needed: connecting DatoCMS to Netlify, so that everytime one of your editors press the *Publish changes* button in your administrative area, a new build process (thus a new publication of the final website) gets triggered.

To do so, go to the *Admin area > Deployment settings* and select *Netlify*:

<div class="smaller">
![foo](/images/netlify/9.png)
</div>

On the new window that pops up, click on "Grant Access" to allow DatoCMS to setup the auto-deploy meachanism for you:

<div class="smaller">
![foo](/images/netlify/10.png)
</div>

Select the Netlify site that you want to link to DatoCMS:

<div class="smaller">
![foo](/images/netlify/11.png)
</div>

DatoCMS will configure a number of bi-directional hooks for you:

<div class="smaller">
![foo](/images/netlify/12.png)
</div>

When everything is done, confirm the integration pressing the *Save Settings* button:

<div class="small">
![foo](/images/netlify/13.png)
</div>
