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
import { until } from 'lit/directives/until.js';
import { client } from '../../data/misc';
import toast from '../../utilities/toast/toast';
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
    async #hasUserDataChanged(newData) {
        const userRequest = await fetch('/user', { method: 'GET' });
        const user = await userRequest.json();
        const sameUsername = newData.username === user.username;
        const sameEmail = newData.email === user.email;
        const sameAbout = newData.about === user.about || '';
        if (sameUsername && sameEmail && sameAbout) {
            return false;
        }
        return true;
    }
    async #save() {
        const usernameElem = this.querySelector('#username');
        const emailElem = this.querySelector('#mail');
        const aboutElem = this.querySelector('#about');
        const newData = {
            username: usernameElem.value,
            email: emailElem.value,
            about: aboutElem.value,
        };
        if (await !this.#hasUserDataChanged(newData)) {
            return toast('neutral', msg('User Update'), msg('Change user details to trigger an update'));
        }
        const request = await fetch('/user', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                client,
                data: newData,
            }),
        });
        const json = request.json();
        console.log(json);
    }
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
        const content = fetch('/user', {
            method: 'GET',
        }).then(r => r.json());
        const row1 = html `<div class="flex column flex-col-reverse gap-4 mb-4 md:grid-cols-1fr-auto md:grid">
                <div>
                    <div class="grid grid-rows-1 md:grid-cols-2 md:gap-4">
                        <sl-input
                            id="username"
                            minlength="3"
                            maxlength="20"
                            label="${capitalize(msg('username'))}"
                            size="small"
                            value="${until(content.then(function (data) {
            return data.username;
        }), 'Loading...')}"
                        ></sl-input>
                        <sl-input
                            id="mail"
                            label="${capitalize(msg('Email address'))}"
                            type="email"
                            size="small"
                            value="${until(content.then(function (data) {
            return data.email;
        }), 'Loading...')}"
                        >
                            <sl-icon name="envelope-at" slot="prefix"></sl-icon>
                        </sl-input>
                    </div>

                    <sl-textarea
                        id="about"
                        maxlength="140"
                        resize="none"
                        size="small"
                        help-text="${msg('write something about you')}"
                        label="${capitalize(msg('about'))}"
                        value="${until(content.then(function (data) {
            return data.about;
        }), '')}"
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
