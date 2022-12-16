var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { navElements } from './data/nav';
import { repeat } from 'lit/directives/repeat.js';
let AppLayout = class AppLayout extends LitElement {
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    bootstrapActiveMenu() {
        const fallBackFirstTimeUse = navElements.items[0].name;
        const activeView = localStorage.getItem('active-view') || fallBackFirstTimeUse;
        const view = this.querySelector(`.nav-element-click[name="${activeView}"]`);
        if (view) {
            view.click();
        }
    }
    #viewSwitch({ detail: { name } }) {
        const active = this.querySelector('.view[active="true"]');
        const view = this.querySelector(`.view[name="${name}"]`);
        if (active) {
            active.setAttribute('active', 'false');
        }
        localStorage.setItem('active-view', name);
        view.setAttribute('active', 'true');
        view.setActive();
    }
    #clickMobileHamburger() {
        const nav = this.querySelector('.nav');
        const closed = nav.getAttribute('closed') === 'true';
        return nav.setAttribute('closed', !closed + '');
    }
    render() {
        return html `<main-nav class="nav" closed="true" @viewSwitch="${this.#viewSwitch}"></main-nav>
            <main>
                <div class="view-header">
                    <i
                        closed="true"
                        @click="${this.#clickMobileHamburger}"
                        class="fa fa-solid fa-fw fa-bars fa-2x hamburger-menu"
                    ></i>
                </div>
                ${repeat(navElements.items, (elem) => {
            if (elem.name === 'dashboard') {
                return html `<dashboard-layout
                            name="${elem.name}"
                            class="view"
                            active="false"
                        ></dashboard-layout>`;
            }
            if (elem.name === 'profile') {
                return html `<profile-layout name="${elem.name}" class="view" active="false"></profile-layout>`;
            }
            return html `<view-layout name="${elem.name}" class="view" active="false"></view-layout>`;
        })}
            </main>`;
    }
};
AppLayout = __decorate([
    customElement('app-layout')
], AppLayout);
export default AppLayout;
