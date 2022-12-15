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
        const row1 = html`<sl-button variant="default">Default</sl-button>
            <sl-button variant="primary">Primary</sl-button>
            <sl-button variant="success">Success</sl-button>
            <sl-button variant="neutral">Neutral</sl-button>
            <sl-button variant="warning">Warning</sl-button>
            <sl-button variant="danger">Danger</sl-button>`;
        const row2 = html`<sl-button-group label="Alignment">
            <sl-button>Left</sl-button>
            <sl-button>Center</sl-button>
            <sl-button>Right</sl-button>
        </sl-button-group>`;

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
