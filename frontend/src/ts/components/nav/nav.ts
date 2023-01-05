import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { until } from 'lit/directives/until.js';
import { navElements, navData } from '../../data/nav';
import { localized, msg } from '@lit/localize';
import { capitalize } from '../../utilities/text/text';
import header from '../../data/header';

@localized()
@customElement('main-nav')
export default class MainNav extends LitElement {
    #activeClass: string = 'nav-elem-active';

    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    #clickOnNav(event: { target: HTMLElement; bubbles: boolean; key: string }) {
        if (event.key && event.key !== 'Enter') {
            return;
        }

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
        return this.setAttribute('closed', !closed + '');
    }

    #renderNavItems() {
        // Workaround for localized, because it only compiles statically
        const navStaticElements: { [index: string]: object | undefined } = Object.freeze({
            analytics: html`<span>${capitalize(msg('analytics'))}</span>`,
            dashboard: html`<span>${capitalize(msg('dashboard'))}</span>`,
            calendar: html`<span>${capitalize(msg('calendar'))}</span>`,
        });

        return repeat(navElements.items, (elem: navData) => {
            if (!elem.viewable) {
                return;
            }

            return html`<div
                @click="${this.#clickOnNav}"
                @keyup="${this.#clickOnNav}"
                class="nav-element nav-element-click"
                name="${elem.name}"
                tabindex="0"
            >
                <sl-icon name="${elem.icon}"></sl-icon>&nbsp;&nbsp;${navStaticElements[elem.name]}
            </div>`;
        });
    }

    #renderNavFooter() {
        const hasFooter: boolean = !!navElements.items.find(elem => elem.isNavFooter);
        const content = fetch('/me', {
            method: 'GET',
            ...header,
        }).then(r => r.json());

        if (!hasFooter) {
            return;
        }

        return html`<footer class="nav-footer">
            <sl-avatar image="./assets/img/fallbacks/avatar.png" label="${msg('Your profile avatar')}"></sl-avatar>
            <div isNavFooter="true" name="profile">
                <span
                    >${until(
                        content.then(function (data) {
                            return data.username;
                        }),
                        'Loading...',
                    )}</span
                >
                <small
                    @click="${this.#clickOnNav}"
                    @keyup="${this.#clickOnNav}"
                    class="view-profile nav-element-click"
                    name="profile"
                    tabindex="0"
                >
                    ${msg('View Profile')}
                </small>
            </div>
        </footer>`;
    }

    #renderNavLogoBar() {
        return html`<header class="nav-header mb-4">
            <img class="nav-logo" src="./assets/img/logos/${navElements.logo.src}" />
            <i @click="${this.#clickOnCloseMobile}" class="fa fa-solid fa-times fa-fw close-mobil-nav"></i>
        </header>`;
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
