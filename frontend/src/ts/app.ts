import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from 'lit/decorators.js';
import { navElements, navData } from './data/nav';
import { repeat } from 'lit/directives/repeat.js';

@customElement('app-layout')
export default class AppLayout extends LitElement {
    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    #viewSwitch({ detail: { name } }: { detail: { name: string } }) {
        const active = this.querySelector('.view[active="true"]') as HTMLElement;
        const view = this.querySelector(`.view[name="${name}"]`) as HTMLElement;

        if (active) {
            active.setAttribute('active', 'false');
        }

        localStorage.setItem('active-view', name);
        view.setAttribute('active', 'true');
    }

    #clickMobileHamburger() {
        const nav = this.querySelector('.nav') as HTMLElement;
        const closed: boolean = nav.getAttribute('closed') === 'true';

        return nav.setAttribute('closed', !closed + '');
    }

    render() {
        const fallBackFirstTimeUse: string = navElements.items[0].name;
        const activeView: string = localStorage.getItem('active-view') || fallBackFirstTimeUse;

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
                    const active = elem.name === activeView;

                    if (elem.name === 'dashboard') {
                        return html`<dashboard-layout
                            name="${elem.name}"
                            active="${active}"
                            class="view"
                        ></dashboard-layout>`;
                    }

                    return html`<view-layout name="${elem.name}" active="${active}" class="view"></view-layout>`;
                })}
            </main>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'app-layout': AppLayout;
    }
}
