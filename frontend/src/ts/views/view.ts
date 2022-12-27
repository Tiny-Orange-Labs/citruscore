import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navElements, navData } from '../data/nav';
import { localized, msg } from '@lit/localize';
import { capitalize } from '../utilities/text/text';

@localized()
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

    // triggers after some one click on the menu
    setActive() {}

    render(ROWS: any = '') {
        const viewData: navData = navElements.items.find(i => i.name === this.name) as navData;
        // Workaround for localized, because it only compiles statically
        const hlStaticElements: { [index: string]: object | undefined } = Object.freeze({
            analytics: html`<h1 class="view-headline">${capitalize(msg('analytics'))}</h1>`,
            dashboard: html`<h1 class="view-headline">${capitalize(msg('dashboard'))}</h1>`,
            calendar: html`<h1 class="view-headline">${capitalize(msg('calendar'))}</h1>`,
            profile: html`<h1 class="view-headline">${capitalize(msg('profile'))}</h1>`,
        });

        return html`<div class="view-container">
            <header>${hlStaticElements[this.name]}</header>
            <div class="view-content grid-cols-${viewData.rows}">${this.#renderRows(viewData, ROWS)}</div>
        </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'view-layout': ViewLayout;
    }
}
