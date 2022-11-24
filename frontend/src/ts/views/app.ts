import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { navElements, navData } from '../data/nav';
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
        const active = this.querySelector('view-layout[active="true"]') as HTMLElement;
        const view = this.querySelector(`view-layout[name="${name}"]`) as HTMLElement;

        if (active) {
            active.setAttribute('active', 'false');
        }

        localStorage.setItem('active-view', name);
        view.setAttribute('active', 'true');
    }

    render() {
        const activeView = localStorage.getItem('active-view');

        return html`<main-nav class="nav" @viewSwitch="${this.#viewSwitch}"></main-nav>
            <main>
                ${repeat(navElements.items, (elem: navData) => {
                    const active = elem.name === activeView;

                    return html`<view-layout
                        name="${elem.name}"
                        active="${active}"
                        class="bg-primarybg view"
                    ></view-layout>`;
                })}
            </main>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'app-layout': AppLayout;
    }
}
