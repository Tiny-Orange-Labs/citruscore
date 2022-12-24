var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* ToDo: Test view remove */
import ViewLayout from '../view';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';
import { setLocale } from '../../utilities/language/language';
import { capitalize } from '../../utilities/text/text';
import { languages } from '../../data/langs';
import { repeat } from 'lit/directives/repeat.js';
let ProfileView = class ProfileView extends ViewLayout {
    constructor() {
        super();
    }
    // Bootstraping any other lang than english
    updated() {
        const lang = localStorage.getItem('lang');
        if (lang && lang !== 'en') {
            setLocale(lang);
        }
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #save() { }
    async #logout() {
        await fetch('/logout', {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
        });
        return location.reload();
    }
    #changeEvent({ target: { value } }) {
        setLocale(value);
        localStorage.setItem('lang', value);
        document.querySelector('html')?.setAttribute('lang', value);
    }
    #renderLanguageSelect() {
        const lang = localStorage.getItem('lang') || languages[0].code;
        return html ` <sl-select
            size="small"
            @click="${this.#changeEvent}"
            label="${capitalize(msg('language'))}"
            value="${lang}"
            class="md:w-1/4"
        >
            ${repeat(languages, function ({ name, code }) {
            return html ` <sl-menu-item size="small" value="${code}">${name}</sl-menu-item>`;
        })}
        </sl-select>`;
    }
    #renderRows() {
        const row1 = html `<div class="flex column flex-col-reverse gap-4 mb-4 md:grid-cols-1fr-auto md:grid">
                <div>
                    <div class="grid grid-rows-1 md:grid-cols-2 md:gap-4">
                        <sl-input label="${capitalize(msg('username'))}" size="small"></sl-input>
                        <sl-input label="${capitalize(msg('Email address'))}" type="email" size="small">
                            <sl-icon name="envelope-at" slot="prefix"></sl-icon>
                        </sl-input>
                    </div>

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
                <sl-button size="small" variant="danger" @click="${this.#logout}">logout</sl-button>
                <sl-button size="small" variant="primary" class="float-right" @click="${this.#save}"
                    >${msg('save')}</sl-button
                >
            </div>`;
        return [row1];
    }
    render() {
        const rows = this.#renderRows();
        return super.render(rows);
    }
};
ProfileView = __decorate([
    localized(),
    customElement('profile-layout')
], ProfileView);
export default ProfileView;