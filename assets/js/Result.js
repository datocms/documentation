import { Component, h } from 'preact';
import lunr from 'lunr';

export default class Result extends Component {
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


