require('object.entries').shim();

const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const metadata = require('metalsmith-metadata')
const markdown = require('metalsmith-markdown')
const path = require('metalsmith-path')
const watch = require('metalsmith-watch')
const collectionMetadata = require('metalsmith-collection-metadata')
const msIf = require('metalsmith-if');
const htmlMinifier = require("metalsmith-html-minifier");
const metallic = require('metalsmith-metallic');
const headings = require("metalsmith-headings-identifier");
const sortOn = require('sort-on');
const drafts = require('metalsmith-drafts');
const lunr = require('lunr');
const parser = require('./parse');
const inPlace = require('metalsmith-in-place')
const hljs = require('highlight.js');
const marked = require('marked');
const tag = require('html-tag');

const isDevelopment = process.env.NODE_ENV == 'development';

parser.load()
.then((apiSchema) => {
  Metalsmith(__dirname)
    .source('./src')
    .destination('./build')
    .metadata({
      environment: isDevelopment ? 'development' : 'production',
      apiSchema: apiSchema,
      parser: parser,
      highlight: function(code, lang) {
        return '<pre><code class="hljs ' + lang + '">' + hljs.highlight(lang, code).value + '</code></pre>';
      }
    })
    .use(msIf(
      isDevelopment,
      watch({
        paths: {
          "src/**/*": "**/*",
          "layouts/**/*": "**/*",
          "parse.js": "**/*",
        },
        livereload: isDevelopment
      })
    ))
    .use(metadata({
      settings: 'data/settings.yml'
    }))
    .use(drafts())
    .use(metallic())
    .use((files, metalsmith, done) => {
      for (let fileName in files) {
        files[fileName] = Object.assign(
          {},
          files[fileName],
          { originalFilename: fileName }
        );
      }
      done();
    })
    .use(markdown({ smartypants: true, gfm: true, tables: true }))
    .use(headings())
    .use(path({ baseDirectory: '/', directoryIndex: 'index.html' }))
    .use((files, metalsmith, done) => {
      for (var fileName in files) {
        var data = files[fileName];

        if (!data || !data.copyFrom) {
          continue;
        }

        files[fileName] = Object.assign(
          {},
          files[data.copyFrom],
          data,
          { contents: files[data.copyFrom].contents }
        );
      }
      done();
    })
    .use((files, metalsmith, done) => {
      const metadata = metalsmith.metadata();
      metadata.categories = {};

      for (let fileName in files) {
        files[fileName] = Object.assign({}, files[fileName], { filename: fileName });
        const data = files[fileName];

        if (!data || !data.category) {
          continue;
        }

        const { category } = data;

        metadata.categories[category] = metadata.categories[category] || [];
        metadata.categories[category].push(data);
      }

      Object.keys(metadata.categories).forEach(category => {
        metadata.categories[category] = sortOn(metadata.categories[category], 'position');
        metadata.categories[category].forEach((data, index) => {
          if (index > 0) {
            files[data.filename] = Object.assign({}, files[data.filename], { prevPage: metadata.categories[category][index - 1] });
          }
          if (index < metadata.categories[category].length - 1) {
            files[data.filename] = Object.assign({}, files[data.filename], { nextPage: metadata.categories[category][index + 1] });
          }
        });
      });

      done();
    })
    .use((files, metalsmith, done) => {
      const index = lunr(function () {
        this.ref('path');
        this.field('title', { boost: 10 });
        this.field('contents');
        // this.pipeline.add(lunr.trimmer);
      });

      for (let fileName in files) {
        const data = files[fileName];

        if (fileName.match(/\.html/)) {
          index.add({
            path: data.path,
            contents: data.contents,
            title: data.title,
          });
        }
      }

      const contents = new Buffer(JSON.stringify(index));
      files['index.json'] = { contents: contents };
      done();
    })
    .use(inPlace({ pattern: '**/*.ejs' }))
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
})
