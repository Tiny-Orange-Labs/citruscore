import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { navElements, navData } from '../data/nav';
import { repeat } from 'lit/directives/repeat.js';
import ViewLayout from './view';

@customElement('app-layout')
export default class AppLayout extends LitElement {
    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    bootstrapActiveMenu() {
        const fallBackFirstTimeUse: string = navElements.items[0].name;
        const activeView: string = localStorage.getItem('active-view') || fallBackFirstTimeUse;
        const view = this.querySelector(`.nav-element-click[name="${activeView}"]`) as ViewLayout;

        if (view) {
            view.click();
        }
    }

    #viewSwitch({ detail: { name } }: { detail: { name: string } }) {
        const active = this.querySelector('.view[active="true"]') as ViewLayout;
        const view = this.querySelector(`.view[name="${name}"]`) as ViewLayout;

        if (active) {
            active.setAttribute('active', 'false');
        }

        localStorage.setItem('active-view', name);
        view.setAttribute('active', 'true');
        view.setActive();
    }

    #clickMobileHamburger() {
        const nav = this.querySelector('.nav') as HTMLElement;
        const closed: boolean = nav.getAttribute('closed') === 'true';

        return nav.setAttribute('closed', !closed + '');
    }

    render() {
        return html`<main-nav class="nav" closed="true" @viewSwitch="${this.#viewSwitch}"></main-nav>
            <main>
                <div class="view-header">
                    <i
                        closed="true"
                        @click="${this.#clickMobileHamburger}"
                        class="fa fa-solid fa-fw fa-bars fa-2x hamburger-menu"
                    ></i>
                </div>
                ${repeat(navElements.items, (elem: navData) => {
                    if (elem.name === 'dashboard') {
                        return html`<dashboard-layout
                            name="${elem.name}"
                            class="view"
                            active="false"
                        ></dashboard-layout>`;
                    }
                    if (elem.name === 'profile') {
                        return html`<profile-layout name="${elem.name}" class="view" active="false"></profile-layout>`;
                    }

                    return html`<view-layout name="${elem.name}" class="view" active="false"></view-layout>`;
                })}
            </main>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'app-layout': AppLayout;
    }
}
