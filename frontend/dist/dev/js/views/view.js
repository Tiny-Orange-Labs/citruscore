var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { navElements } from '../data/nav';
let ViewLayout = class ViewLayout extends LitElement {
    name = '';
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #renderRows({ rows }) {
        return [...new Array(rows)].map(function () {
            return html `<div class="view-row">
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
        const viewData = navElements.items.find(i => i.name === this.name);
        return html `<div class="view-container">
            <header>
                <h1 class="text-xl my-3">${this.name?.toLocaleUpperCase()}</h1>
            </header>
            <div class="view-content grid-cols-${viewData.rows}">${this.#renderRows(viewData)}</div>
        </div>`;
    }
};
__decorate([
    property({ attribute: true, reflect: true })
], ViewLayout.prototype, "name", void 0);
ViewLayout = __decorate([
    customElement('view-layout')
], ViewLayout);
export default ViewLayout;
