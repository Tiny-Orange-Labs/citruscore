var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { until } from 'lit/directives/until.js';
import { navElements } from '../../data/nav';
import { localized, msg } from '@lit/localize';
import { capitalize } from '../../utilities/text/text';
import header from '../../data/header';
import { imgs } from '../../data/fallbacks';
let MainNav = class MainNav extends LitElement {
    #activeClass = 'nav-elem-active';
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #clickOnNav(event) {
        if (event.key && event.key !== 'Enter') {
            return;
        }
        const target = event.target;
        const parent = target.parentNode;
        const isNav = target.classList.contains('nav-element');
        const element = isNav ? target : parent;
        const active = document.querySelector(`.${this.#activeClass}`);
        const isFooterElement = element.getAttribute('isNavFooter') === 'true';
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
        const closed = this.getAttribute('closed') === 'true';
        return this.setAttribute('closed', !closed + '');
    }
    #renderNavItems() {
        // Workaround for localized, because it only compiles statically
        const navStaticElements = Object.freeze({
            analytics: html `<span>${capitalize(msg('analytics'))}</span>`,
            dashboard: html `<span>${capitalize(msg('dashboard'))}</span>`,
            calendar: html `<span>${capitalize(msg('calendar'))}</span>`,
        });
        return repeat(navElements.items, (elem) => {
            if (!elem.viewable) {
                return;
            }
            return html `<div
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
        const hasFooter = !!navElements.items.find(elem => elem.isNavFooter);
        const content = fetch('/v1/user/me', {
            method: 'GET',
            ...header,
        }).then(r => r.json());
        if (!hasFooter) {
            return;
        }
        return html `<footer class="nav-footer">
            <sl-avatar
                name="profile"
                @click="${this.#clickOnNav}"
                image="${until(content.then(function (data) {
            if (data.avatar) {
                return `${data.avatar}avatar_small.webp`;
            }
            return imgs.avatar;
        }), imgs.avatar)}"
                label="${msg('Your profile avatar')}"
            ></sl-avatar>
            <div isNavFooter="true" name="profile">
                <span
                    >${until(content.then(function (data) {
            return data.username;
        }), 'Loading...')}</span
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
        return html `<header class="nav-header mb-4">
            <img class="nav-logo" src="./assets/img/logos/${navElements.logo.src}" />
            <i @click="${this.#clickOnCloseMobile}" class="fa fa-solid fa-times fa-fw close-mobil-nav"></i>
        </header>`;
    }
    render() {
        const navLogoBar = this.#renderNavLogoBar();
        const bottom = this.#renderNavFooter();
        const elements = this.#renderNavItems();
        return html `${navLogoBar}${elements}${bottom}`;
    }
};
MainNav = __decorate([
    localized(),
    customElement('main-nav')
], MainNav);
export default MainNav;
