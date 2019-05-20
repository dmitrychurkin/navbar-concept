import Navbar from './components/navbar';

window.addEventListener('DOMContentLoaded', () => {
    new Navbar({
      menu: '.js-menu',
      toggle: '.js-toggle',
      navbar: '.js-navbar',
      navMain: '.js-nav-main',
      searchForm: '.js-search-form',
      group: '.js-group',
      sub: '.js-sub'
    });
});
