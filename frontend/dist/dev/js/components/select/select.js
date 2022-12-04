var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';
let ProjectSelect = class ProjectSelect extends LitElement {
    label = '';
    selected = '';
    options = [];
    values = [];
    set value(value) {
        const select = this.querySelector('select');
        if (select) {
            select.value = value;
        }
    }
    get value() {
        const select = this.querySelector('select');
        return select?.value || '';
    }
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    render() {
        const options = repeat(this.options, (item, i) => {
            if (this.values[i] === this.selected) {
                return html `<option value="${this.values[i]}" selected>${item}</option>`;
            }
            return html `<option value="${this.values[i]}">${item}</option>`;
        });
        if (this.label) {
            return html `<label class="input-label">${this.label}</label
                ><select class="select">
                    ${options}
                </select> `;
        }
        return html `<select class="select">
            ${options}
        </select> `;
    }
};
__decorate([
    property({ attribute: true })
], ProjectSelect.prototype, "label", void 0);
__decorate([
    property({ attribute: true })
], ProjectSelect.prototype, "selected", void 0);
__decorate([
    property({ attribute: true, type: Array })
], ProjectSelect.prototype, "options", void 0);
__decorate([
    property({ attribute: true, type: Array })
], ProjectSelect.prototype, "values", void 0);
ProjectSelect = __decorate([
    localized(),
    customElement('project-select')
], ProjectSelect);
export default ProjectSelect;
