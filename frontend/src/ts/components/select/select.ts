import { LitElement, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';

@localized()
@customElement('project-select')
export default class ProjectSelect extends LitElement {
    @property({ attribute: true }) label: string = '';
    @property({ attribute: true }) selected: string = '';
    @property({ attribute: true, type: Array }) options = [];
    @property({ attribute: true, type: Array }) values = [];

    set value(value: string) {
        const select = this.querySelector('select');

        if (select) {
            select.value = value;
        }
    }

    get value(): string {
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
        const options = repeat(this.options, (item: string, i: number) => {
            if (this.values[i] === this.selected) {
                return html`<option value="${this.values[i] as string}" selected>${item}</option>`;
            }

            return html`<option value="${this.values[i] as string}">${item}</option>`;
        });

        if (this.label) {
            return html`<label class="input-label">${this.label}</label
                ><select class="select">
                    ${options}
                </select> `;
        }

        return html`<select class="select">
            ${options}
        </select> `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'project-select': ProjectSelect;
    }
}
