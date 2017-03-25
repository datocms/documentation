import { Component, h } from 'preact';
import lunr from 'lunr';
import Result from './Result';

export default class Results extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    fetch('/index.json')
    .then(res => res.json())
    .then((index) => {
      const idx = lunr.Index.load(index);
      this.setState({ loading: false, results: idx.search(this.props.query) });
    });
  }

  handleOpenChat(e) {
    e.preventDefault();
    $crisp.push(['do', 'chat:open']);
  }

  render() {
    const { query } = this.props;
    const { loading, results } = this.state;

    if (loading) {
      return h('div', { className: 'results__loading' }, `Please wait.. looking for results for query "${query}"...`);
    } else if (results.length === 0) {
      return h('div', { className: 'results__loading' },
        `Sorry, no results found for "${query}" :( `,
        "If you're stuck, don't hesitate contacting us via ",
        h('a', { href: '#', onClick: this.handleOpenChat.bind(this) }, 'chat'),
        ' or ',
        h('a', { href: 'mailto:support@datocms.com' }, 'email'),
        '!'
      );
    } else {
      return h('div', null, results.map((result, key) => h(Result, { key, query, result })));
    }
  }
}


