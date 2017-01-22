const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata')
const markdown = require('metalsmith-markdown')
const path = require('metalsmith-path')
const watch = require('metalsmith-watch')
const collectionMetadata = require('metalsmith-collection-metadata')
const msIf = require('metalsmith-if');
const htmlMinifier = require("metalsmith-html-minifier");
const sortOn = require('sort-on');

const marked = require('marked');
const tag = require('html-tag');

const isDevelopment = process.env.NODE_ENV == 'development';

Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .metadata({
    environment: isDevelopment ? 'development' : 'production'
  })
  .use(msIf(
    isDevelopment,
    watch({
      paths: {
        "src/**/*": "**/*",
        "layouts/**/*": "**/*",
      },
      livereload: isDevelopment
    })
  ))
  .use(metadata({
    settings: 'data/settings.yml'
  }))
  .use(markdown())
  .use(path({ baseDirectory: '/', directoryIndex: 'index.html' }))
  .use((files, metalsmith, done) => {
    const metadata = metalsmith.metadata();
    metadata.categories = {};

    for (var fileName in files) {
      var data = files[fileName];

      if (!data) {
        continue;
      }

      const { category } = data;

      if (!category) {
        continue;
      }

      metadata.categories[category] = metadata.categories[category] || [];
      metadata.categories[category].push(data);
    }

    Object.keys(metadata.categories).forEach(category => {
      metadata.categories[category] = sortOn(metadata.categories[category], 'position');
    });

    done();
  })
  .use(layouts({
    engine: 'ejs',
    rename: true,
    markdown: marked,
    tagGenerator({ tagName, attributes, content }) {
      return tag(tagName, attributes, content);
    }
  }))
  .use(htmlMinifier())
  .build(function(err, files) {
    if (err) { throw err; }
  });
