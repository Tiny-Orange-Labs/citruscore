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
    }

    #renderRows() {
        const lang: string = localStorage.getItem('lang') || languages[0].code;

        const row1 = html`<sl-radio-group
            @click="${this.#changeEvent}"
            label="${capitalize(msg('language'))}"
            value="${lang}"
        >
            ${repeat(languages, function ({ name, code }) {
                return html`<sl-radio-button value="${code}">${name}</sl-radio-button>`;
            })}
        </sl-radio-group>`;
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
