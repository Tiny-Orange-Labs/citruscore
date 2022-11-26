import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { navElements, navData } from '../data/nav';

@customElement('main-nav')
export default class MainNav extends LitElement {
    #activeClass: string = 'nav-elem-active';

    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    #click(event: { target: HTMLElement; bubbles: boolean }) {
        const target = event.target as HTMLElement;
        const parent = target.parentNode as HTMLElement;
        const isNav = target.classList.contains('nav-element');
        const element = isNav ? target : parent;
        const active = document.querySelector(`.${this.#activeClass}`);
        const isFooterElement: boolean = element.getAttribute('isNavFooter') === 'true';
        const clickViewEvent = new CustomEvent('viewSwitch', {
            detail: {
                name: element.getAttribute('name'),
            },
        });

        if (active) {
            active.classList.remove(this.#activeClass);
        }
        if (!isFooterElement) {
            element.classList.add(this.#activeClass);
        }

        this.setAttribute('closed', 'true');
        return this.dispatchEvent(clickViewEvent);
    }

    #clickOnCloseMobile() {
        const closed: boolean = this.getAttribute('closed') === 'true';
        this.setAttribute('closed', !closed + '');
    }

    #renderNavLogoBar() {
        return html`<header class="nav-header">
            <img class="nav-logo" src="./assets/img/logos/${navElements.logo.src}" />
            <i @click="${this.#clickOnCloseMobile}" class="fa fa-solid fa-times fa-fw close-mobil-nav"></i>
        </header>`;
    }

    #renderNavFooter() {
        const hasFooter: boolean = !!navElements.items.find(elem => elem.isNavFooter);

        if (!hasFooter) {
            return;
        }

        return html`<footer class="nav-footer">
            <img src="./assets/img/fallbacks/avatar.png" />
            <div name="profile" isNavFooter="true">
                <span>User Name</span>
                <small @click="${this.#click}" class="view-profile">View Profile</small>
            </div>
        </footer>`;
    }

    #renderNavItems() {
        const activeView: string | null = localStorage.getItem('active-view');

        return repeat(navElements.items, (elem: navData) => {
            const [first, ...rest]: string = elem.name;
            const classes: string = activeView === elem.name ? this.#activeClass : '';

            if (!elem.viewable) {
                return;
            }

            return html`<div @click="${this.#click}" class="nav-element ${classes}" name="${elem.name}">
                <i class="fa-solid fa-${elem.icon} fa-fw mr-2"></i>
                <span>${first.toLocaleUpperCase()}${rest.join('')}</span>
            </div>`;
        });
    }

    render() {
        const navLogoBar = this.#renderNavLogoBar();
        const bottom = this.#renderNavFooter();
        const elements = this.#renderNavItems();

        return html`${navLogoBar}${elements}${bottom}`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'main-nav': MainNav;
    }
}
