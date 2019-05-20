import Base from './base';
import { INavbarSelectors } from '../interfaces';

export default class Navbar extends Base {

  private static readonly LINK_HEIGHT = 59;
  private static readonly BREAKPOINT = 1260;

  private navbar: HTMLElement;
  private navMain: HTMLElement;
  private searchForm: HTMLElement;
  private group: HTMLElement;
  private isAnimating = false;

  private subSelector: string;

  constructor({ menu, toggle, navbar, navMain, searchForm, group, sub }: INavbarSelectors) {
    super();
    this.subSelector = sub;
    const [navbarEl, navMainEl, searchFormEl, groupEl] = this.getComponentElements([navbar, navMain, searchForm, group]);

    this.navbar = navbarEl;
    this.navMain = navMainEl;
    this.searchForm = searchFormEl;
    this.group = groupEl;

    document.addEventListener('click', e => {

      const { target } = e;
      if (!(target instanceof Element)) {
        return;
      }
      if (target.closest(`${menu}`)) {

        this.toggleMainMenu();

      } else if (target.closest(`${toggle}`)) {

        this.toggleSubMenu(e, target);

      }

    });

    window.matchMedia(`(min-width: ${Navbar.BREAKPOINT}px)`)
      .addListener(this.replaceSearch())
  }

  private replaceSearch(): (matches: boolean | MediaQueryListEvent) => void {

    const { group, searchForm, navMain } = this;
    const fn = (arg: boolean | MediaQueryListEvent) => {

      const matches = (typeof arg === 'object') ? arg.matches : arg;
      if (matches) {

        group.insertBefore(searchForm, group.firstChild);
        this.navbar.classList.remove('active');
        navMain.style.height = '';
        for (const activeEl of Array.from(this.navbar.querySelectorAll('.active'))) {
          if (activeEl instanceof HTMLElement) {
            activeEl.classList.remove('active');
            activeEl.style.height = '';
          }
        }

      } else {

        navMain.insertBefore(searchForm, navMain.firstChild);

      }

    };

    fn(window.innerWidth >= Navbar.BREAKPOINT);

    return fn;

  }

  private toggleMainMenu(): void {

    if (this.isAnimating) {
      return;
    }

    const { navbar: { classList }, navMain } = this;
    this.isAnimating = true;

    classList.toggle('active');

    if (classList.contains('active')) {

      navMain.style.height = `${navMain.scrollHeight}px`;
      setTimeout(() => {
        navMain.style.height = 'auto';
        this.isAnimating = false;
      }, 300);

    } else {

      navMain.style.height = `${navMain.scrollHeight}px`;
      setTimeout(() => {
        navMain.style.height = '';
        this.isAnimating = false;
      }, 50);

    }
  }

  private toggleSubMenu(event: Event, target: Element): void {

    if (window.innerWidth >= Navbar.BREAKPOINT) {
      return;
    }

    event.preventDefault();

    const li = target.closest('li');
    if (!(li instanceof HTMLElement)) {
      return;
    }

    const { classList } = li;
    classList.toggle('active');

    if (classList.contains('active')) {

      const sub = li.querySelector(this.subSelector);
      if (!(sub instanceof HTMLElement)) {
        return;
      }

      li.style.height = `${li.offsetHeight + sub.offsetHeight}px`;

    } else {

      li.style.height = `${Navbar.LINK_HEIGHT}px`;

    }

  }

}