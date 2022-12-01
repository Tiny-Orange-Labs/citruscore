import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navElements, navData } from '../data/nav';

@customElement('view-layout')
export default class ViewLayout extends LitElement {
    @property({ attribute: true, reflect: true })
    name: string = '';

    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    #renderRows({ rows }: navData, ROWS: any) {
        return [...new Array(rows)].map(function (_, i) {
            return html`<div class="view-row">${ROWS[i]}</div>`;
        });
    }

    render(ROWS: any = '') {
        const viewData: navData = navElements.items.find(i => i.name === this.name) as navData;

        return html`<div class="view-container">
            <header>
                <h1 class="text-xl my-3">${this.name?.toLocaleUpperCase()}</h1>
            </header>
            <div class="view-content grid-cols-${viewData.rows}">${this.#renderRows(viewData, ROWS)}</div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-layout': ViewLayout;
    }
}
