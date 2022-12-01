var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import ViewLayout from './view';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
let DashboardView = class DashboardView extends ViewLayout {
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
        const row1 = html `
            <project-input
                label="email"
                placeholder="max.mustermann"
                options='["@gmail.com","@yahoo.com","@gmx.net"]'
            ></project-input>
            <project-input optional="true" prefix="€" label="Preis" options='["USD","YEN","EURO"]'></project-input>
            <project-button content="Acceept" icon="check"></project-button>
            <project-button
                @click="${this.#settingsClick}"
                content="Setting"
                type="highlight"
                icon="gear"
            ></project-button>
        `;
        const row2 = html `
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
};
DashboardView = __decorate([
    customElement('dashboard-layout')
], DashboardView);
export default DashboardView;
