import '../sass/index.sass'

const hamburger = document.querySelector('[data-js=toggleSidebar]');
if (hamburger) {
  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.container').classList.toggle('is-open');
  });
}
