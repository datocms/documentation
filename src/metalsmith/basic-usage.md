---
layout: page.ejs
category: metalsmith
position: 2
title: Basic usage
---

### Installation

Inside your Metalsmith project, you can install the `datocms-client` package by running these commands:

```bash
$ npm install datocms-client --save-dev
```

If everything worked correctly, you should now run dato and see something like this:

```bash
$ ./node_modules/.bin/dato
Usage:
  dato dump [--token=<apiToken>] [--config=<file>]
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
$ bundle exec dato dump
```

---

### The config file

The `dump` command will read a file `dato.config.js` (or the file passed by the `--config` option).
This file should contain instructions to transform the content stored remotely in DatoCMS into local files.

Let's watch a simple example to get started:

```javascript
# dato.config.js

module.exports = (dato, root, i18n) => {
  // within a 'content' directory...
  root.directory('./content', dir => {

    // dump the global DatoCMS site setting into a 'site.yml' file
    dir.createDataFile(
      'site.yml',
      'yaml',
      dato.site.toMap()
    );

    // for each Item Type present in the DatoCMS backend...
    dato.itemTypes.forEach(itemType => {

      // dump the items in the collection into a YAML file
      dir.createDataFile(
        `${itemType.apiKey}.yml`,
        'yaml',
        dato.itemsOfType(itemType).map(item => item.toMap())
      );
    });
  });
};

```

Here, `createDataFile` is a method made available to you that can generate YAML/TOML/JSON files.

Once your `dato.config.js` is ready, just run the `dato dump` command: you should see your Metalsmith project populated with content.

Obviously, that's just a quick tour: you can learn all the details about how to access your records inside your config file in the following sections.
