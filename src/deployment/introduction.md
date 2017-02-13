---
layout: page.ejs
category: deploy
position: 1
title: Introduction
---

In the top navigation bar of the interface of DatoCMS you can find a *Publish changes* button your editors can use to trigger a new publication of the final website whenever they like:

![foo](/images/publish-button.png)

The job of building and deploying your static website is not performed directly by DatoCMS, but is delegated to an external Continuous Deployment service. We offer integrations to all the most popular solutions out there:

* [Netlify](/deployment/netlify.html)
* [Travis CI](/deployment/travis.html)
* [Gitlab CI](/deployment/gitlab.html)
* [Semaphore CI](/deployment/semaphore.html)
* [CircleCI](/deployment/circleci.html)

If you need to use something different, we also offer an [agnostic webhook](/deployment/custom.html) you can use to create your custom deployment solution. Regardless the external service you intend to use, your CI build script needs to perform the following steps:

1. Install the required dependencies;
1. Run the `dato dump` command to fetch the DatoCMS content and transform it into local files;
1. Run the build command of your static website generator to produce the actual static website;
1. Upload the files of your static website to S3, Surge.sh or any other hosting solution you intend to use.

In the following chapters we'll deep dive into each different service to see how to properly configure them.
