/* ToDo: Test view remove */
import ViewLayout from '../view';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';
import { setLocale } from '../../utilities/language/language';
import { capitalize } from '../../utilities/text/text';
import { language, languages } from '../../data/langs';
import { repeat } from 'lit/directives/repeat.js';

@localized()
@customElement('profile-layout')
export default class ProfileView extends ViewLayout {
    constructor() {
        super();
    }

    // Bootstraping any other lang than english
    updated(): void {
        const lang: string | null = localStorage.getItem('lang');

        if (lang && lang !== 'en') {
            setLocale(lang);
        }
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    #changeEvent({ target: { value } }: { target: { value: string } }) {
        setLocale(value);
        localStorage.setItem('lang', value);
        document.querySelector('html')?.setAttribute('lang', value);
    }

    #renderLanguageSelect() {
        const lang: string = localStorage.getItem('lang') || languages[0].code;

        return html` <sl-select
            size="small"
            @click="${this.#changeEvent}"
            label="${capitalize(msg('language'))}"
            value="${lang}"
        >
            ${repeat(languages, function ({ name, code }) {
                return html` <sl-menu-item size="small" value="${code}">${name}</sl-menu-item>`;
            })}
        </sl-select>`;
    }

    #renderRows() {
        const row1 = html`<div class="grid gap-4 grid-cols-1 md:grid-cols-1fr-auto ">
                <div>
                    <sl-input label="${capitalize(msg('username'))}" size="small"></sl-input>
                    <sl-textarea
                        resize="none"
                        size="small"
                        help-text="${msg('write something about you')}"
                        label="${capitalize(msg('about'))}"
                    ></sl-textarea>
                </div>
                <div>
                    <p>${capitalize(msg('photo'))}</p>
                    <img class="rounded-full w-40" src="./assets/img/fallbacks/avatar.png" />
                </div>
            </div>
            <sl-divider style="--width: 2px;"></sl-divider>
            ${this.#renderLanguageSelect()}
            <sl-divider style="--width: 2px;"></sl-divider>
            <div>
                <sl-button size="small" variant="primary"> ${msg('save')} </sl-button>
            </div>`;
        return [row1];
    }

    render() {
        const rows = this.#renderRows();
        return super.render(rows);
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'profile-layout': ProfileView;
    }
}
