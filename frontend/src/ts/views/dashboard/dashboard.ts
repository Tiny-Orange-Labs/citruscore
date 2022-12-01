/* ToDo: Test view remove */
import ViewLayout from '../view';
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';

@localized()
@customElement('dashboard-layout')
export default class DashboardView extends ViewLayout {
    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    #settingsClick() {
        console.log('settingsclick');
    }

    #renderRows() {
        const row1 = html`
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="${msg('Accept')}" icon="check"></project-button>
            <project-button
                @click="${this.#settingsClick}"
                content="${msg('Settings')}"
                type="highlight"
                icon="gear"
            ></project-button>
        `;
        const row2 = html`
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="Search" icon="magnifying-glass"></project-button>
            <project-button content="Setting" type="highlight" icon="gear"></project-button>
        `;

        return [row1, row2];
    }

    render() {
        const rows = this.#renderRows();

        return super.render(rows);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'dashboard-layout': DashboardView;
    }
}
