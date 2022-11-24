import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { navElements, navData } from '../data/nav';

@customElement('view-layout')
export default class ViewLayout extends LitElement {
    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    #renderRows({ rows }: navData) {
        return [...new Array(rows)].map(function () {
            return html`<div class="view-row"></div>`;
        });
    }

    render() {
        const name: string | null = this.getAttribute('name');
        const viewData: navData = navElements.items.find(i => i.name === name) as navData;

        return html`<div class="view-container">
            <header>
                <h1 class="text-xl my-3">${name?.toLocaleUpperCase()}</h1>
            </header>
            <div class="view-content grid-cols-${viewData.rows}">${this.#renderRows(viewData)}</div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-layout': ViewLayout;
    }
}
