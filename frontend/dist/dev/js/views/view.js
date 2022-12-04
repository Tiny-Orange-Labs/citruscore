var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navElements } from '../data/nav';
import { localized, msg } from '@lit/localize';
import { capitalize } from '../utilities/text/text';
let ViewLayout = class ViewLayout extends LitElement {
    name = '';
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #renderRows({ rows }, ROWS) {
        return [...new Array(rows)].map(function (_, i) {
            return html `<div class="view-row">${ROWS[i]}</div>`;
        });
    }
    render(ROWS = '') {
        const viewData = navElements.items.find(i => i.name === this.name);
        // Workaround for localized, because it only compiles statically
        const hlStaticElements = Object.freeze({
            analytics: html `<h1 class="view-headline">${capitalize(msg('analytics'))}</h1>`,
            dashboard: html `<h1 class="view-headline">${capitalize(msg('dashboard'))}</h1>`,
            calendar: html `<h1 class="view-headline">${capitalize(msg('calendar'))}</h1>`,
            profile: html `<h1 class="view-headline">${capitalize(msg('profile'))}</h1>`,
        });
        return html `<div class="view-container">
            <header>${hlStaticElements[this.name]}</header>
            <div class="view-content grid-cols-${viewData.rows}">${this.#renderRows(viewData, ROWS)}</div>
        </div>`;
    }
};
__decorate([
    property({ attribute: true, reflect: true })
], ViewLayout.prototype, "name", void 0);
ViewLayout = __decorate([
    localized(),
    customElement('view-layout')
], ViewLayout);
export default ViewLayout;
