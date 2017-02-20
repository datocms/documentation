import '../sass/index.sass'
import lunr from 'lunr';
import queryString from 'query-string';
import { render, Component, h } from 'preact';
import { findAll } from 'highlight-words-core'

const hamburger = document.querySelector('[data-js=toggleSidebar]');
if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.container').classList.toggle('is-open');
  });
}

const searchBox = document.querySelector('[data-js=search-box]');
const search = document.querySelector('[data-js=search-results]');

if (search) {
  const { query } = queryString.parse(location.search);

  searchBox.value = query;

  fetch('/index.json')
  .then(res => res.json())
  .then((index) => {
    const idx = lunr.Index.load(index);
    const results = idx.search(query);
    render(h(Results, { results, query }), search);
  });
}

const Results = ({ results, query }) => (
  results.length === 0 ?
    h('div', null, `No results found for "${query}"!`) :
    h('div', null, results.map((result, key) => h(Result, { key, query, result })))
);

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    fetch(this.props.result.ref)
      .then(res => res.text())
      .then(body => {
        const el = document.createElement('html');
        el.innerHTML = body;
        this.setState({
          loading: false,
          category: el.querySelector('.page__category').innerText,
          title: el.querySelector('.page__title').innerText,
          content: el.querySelector('.page__content').innerText,
        });
      });
  }

  highlight(string) {
    const tokens = lunr.tokenizer(this.props.query);

    let highlightedString = tokens.reduce((acc, token) => {
      const regexp = new RegExp('(' + token.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") + ')', 'gi');
      return acc.replace(regexp, '<span class="highlighted">$1</span>');
    }, string);

    const firstMatch = Math.min(
      ...tokens.map(token => {
        const regexp = new RegExp('(' + token.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&") + ')', 'gi');
        const match = regexp.exec(string);
        return match ? match.index : 0;
      })
    );

    highlightedString = highlightedString.substring(firstMatch - 15);

    return h('span', { dangerouslySetInnerHTML: { __html: (firstMatch > 0 ? '...' : '') + highlightedString } });
  }

  render() {
    if (this.state.loading) {
      return null;
    }

    return h('a', { className: 'result', href: this.props.result.ref },
      h('span', { className: 'result__category' }, this.highlight(this.state.category)),
      h('span', { className: 'result__title' }, this.highlight(this.state.title)),
      h('span', { className: 'result__content' }, this.highlight(this.state.content)),
    );
  }
}


// console.log(results);
