import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navElements, navData } from '../data/nav';
import { repeat } from 'lit/directives/repeat.js';

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

    #renderRows({ rows }: navData) {
        return [...new Array(rows)].map(function () {
            return html`<div class="view-row">
                <project-button content="Search" icon="check"></project-button>
                <project-button content="Search" icon="magnifying-glass"></project-button>
                <project-button content="Setting" type="highlight" icon="gear"></project-button>
                <project-input label="name" placeholder="oliver"></project-input>
                <project-input prefix="€" label="preis" placeholder="0.0"></project-input>
                <project-input
                    label="email"
                    placeholder="max.mustermann"
                    options='["@gmail.com","@yahoo.com","@gmx.net"]'
                ></project-input>
                <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            </div>`;
        });
    }

    render() {
        const viewData: navData = navElements.items.find(i => i.name === this.name) as navData;

        return html`<div class="view-container">
            <header>
                <h1 class="text-xl my-3">${this.name?.toLocaleUpperCase()}</h1>
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
