import '../sass/index.sass'
import queryString from 'query-string';
import { render, Component, h } from 'preact';
import Results from './Results';

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
  render(h(Results, { query }), search);
}
