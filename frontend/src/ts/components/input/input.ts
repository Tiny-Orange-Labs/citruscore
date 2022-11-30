import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { capitalize } from '../../utilities/text/text';
import { repeat } from 'lit/directives/repeat.js';

@customElement('project-input')
export default class InputButton extends LitElement {
    @property({ attribute: true }) prefix: string = '';
    @property({ attribute: true }) label: string = '';
    @property({ attribute: true, type: Array }) options = [];
    @property({ attribute: true }) type: string = 'text';
    @property({ attribute: true }) optional: boolean = false;
    @property({ attribute: true }) placeholder: string = '';

    get value() {
        const inputValue = this.querySelector('input')?.value;
        const hasPostFix = this.options.length !== 0;

        if (hasPostFix) {
            return {
                option: this.querySelector('select')?.value,
                value: inputValue,
            };
        }

        return inputValue;
    }

    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    #renderPostFix() {
        if (this.options.length === 0) {
            return;
        }

        return html`<div class="absolute inset-y-0 right-0 flex items-center">
            <label for="currency" class="sr-only">Currency</label>
            <select
                id="currency"
                name="currency"
                class="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                ${repeat(this.options, (elem: string) => {
                    return html`<option value="${elem}">${elem}</option>`;
                })}
            </select>
        </div>`;
    }

    #renderPrefix() {
        if (!this.prefix) {
            return;
        }

        return html`<div class="pointer-events-none absolute inset-y-0 left-0 p-2 flex items-center pl-3">
            <span class="text-gray-500 sm:text-sm">${this.prefix}</span>
        </div>`;
    }

    #renderLabel() {
        const labelText = capitalize(this.label);

        if (this.optional) {
            return html`<label for="${this.label}" class="input-label">
                ${labelText}
                <span class="input-label-optional">optional</span>
            </label>`;
        }

        return html`<label for="${this.label}" class="input-label">${labelText}</label>`;
    }

    render() {
        return html`${this.#renderLabel()}
            <div class="relative mt-1 rounded-md shadow-sm">
                ${this.#renderPrefix()}
                <input
                    type="text"
                    name="${this.label}"
                    id="${this.label}"
                    class="block w-full rounded-md border-gray-300 p-2 ${this.prefix
                        ? 'pl-7'
                        : ''} pr-12 focus:border-primary focus:ring-primary sm:text-sm"
                    placeholder="${this.placeholder}"
                />
                ${this.#renderPostFix()}
            </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'project-input': InputButton;
    }
}
