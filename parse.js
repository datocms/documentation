const parser = require('json-schema-ref-parser');
const fetch = require('node-fetch');

const methods = {
  instances: 'all',
  self: 'find'
};

function exampleFor(schema) {
  if (!schema) {
    return null;
  }

  if (schema.example) {
    return schema.example;
  }

  if (schema.anyOf) {
    return exampleFor(schema.anyOf[0]);
  }

  const type = Array.isArray(schema.type) ?
    schema.type[0] :
    schema.type;

  if (type === 'object') {
    if (schema.oneOf) {
      return exampleFor(schema.oneOf[0]);
    }

    if (!schema.properties) {
      return {};
    }

    return Object.keys(schema.properties).reduce((acc, property) => {
      return Object.assign({}, acc, { [property]: exampleFor(schema.properties[property]) });
    }, {});
  } else if (type === 'array') {
    if (schema.items.oneOf) {
      return schema.items.oneOf.map((s) => exampleFor(s));
    }
    return [ exampleFor(schema.items) ];
  } else if (type === 'string') {
    return "";
  } else if (type === 'boolean') {
    return true;
  } else if (type === 'integer') {
    return 20;
  } else if (type === 'null') {
    return null;
  } else {
    throw `Don't know how to manage ${type} type!`;
  }
}

module.exports = {
  load() {
    return fetch('https://site-api.datocms.com/docs/site-api-hyperschema.json')
    .then(r => r.json())
    .then(schema => parser.dereference(schema));
  },
  correctUrl(href) {
    return href.replace(/{\(%2Fschemata%2F([^%]+).*$/, ':$1_id');
  },
  exampleFor(schema) {
    return exampleFor(schema);
  },
  anchorFor(resource, link) {
    return [resource, link.rel].join("-").toLowerCase();
  }
}
