var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg, localized } from '@lit/localize';
import ViewLayout from '../view';
import header from '../../data/header';
import { setLocale } from '../../utilities/language/language';
import { capitalize } from '../../utilities/text/text';
import { languages } from '../../data/langs';
import { until } from 'lit/directives/until.js';
import { client } from '../../data/misc';
import toast from '../../utilities/toast/toast';
import { repeat } from 'lit/directives/repeat.js';
const passwordMinLength = 8;
const passwordMaxLength = 35;
const maxLengthAbout = 560;
let ProfileView = class ProfileView extends ViewLayout {
    me = {
        _id: '',
        username: '',
        email: '',
        about: '',
        avatar: '',
    };
    user = {
        _id: '',
        username: '',
        email: '',
        about: '',
        avatar: '',
    };
    team = {
        _id: '',
        maxMembers: 0,
        name: 'loading…',
        members: [
            {
                _id: '',
                role: 'loading…',
                rights: {},
            },
        ],
    };
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
    async #getUserData() {
        const request = await fetch('/me', {
            method: 'GET',
            ...header,
        });
        const me = await request.json();
        this.me = me;
        return me;
    }
    async #hasUserDataChanged(newData) {
        const user = await this.#getUserData();
        const sameUsername = newData.username === user.username;
        const sameEmail = newData.email === user.email;
        const sameAbout = newData.about === (user.about || '');
        if (sameUsername && sameEmail && sameAbout) {
            return false;
        }
        return true;
    }
    async #saveAccountChanges() {
        const usernameElem = this.querySelector('#username');
        const emailElem = this.querySelector('#mail');
        const aboutElem = this.querySelector('#about');
        const newData = {
            username: usernameElem.value.trim(),
            email: emailElem.value,
            about: aboutElem.value.trim(),
        };
        const hasDataChanged = await this.#hasUserDataChanged(newData);
        if (!hasDataChanged) {
            return toast('neutral', msg('User Update'), msg('Change user details to trigger an update'));
        }
        const request = await fetch('/user', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                client,
                data: newData,
            }),
        });
        const json = await request.json();
        if (json.acknowledged) {
            return toast('success', msg('User Update'), msg('Changes saved'));
        }
    }
    async #logout() {
        await fetch('/logout', {
            method: 'GET',
            ...header,
        });
        return location.reload();
    }
    #changeLangEvent({ target: { value } }) {
        setLocale(value);
        localStorage.setItem('lang', value);
        document.querySelector('html')?.setAttribute('lang', value);
    }
    #renderLanguageSelect() {
        const lang = localStorage.getItem('lang') || languages[0].code;
        return html ` <sl-select
            size="small"
            @click="${this.#changeLangEvent}"
            label="${capitalize(msg('language'))}"
            value="${lang}"
            class="md:w-1/4"
        >
            ${repeat(languages, function ({ name, code }) {
            return html ` <sl-menu-item size="small" value="${code}">${name}</sl-menu-item>`;
        })}
        </sl-select>`;
    }
    async #sendCheckPassword(oldPassword) {
        const request = await fetch('/checkPassword', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    password: oldPassword,
                },
                client,
            }),
        });
        const { auth } = await request.json();
        return auth;
    }
    async #sendChangePassword(newPassword) {
        const request = await fetch('/changePassword', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    password: newPassword,
                },
                client,
            }),
        });
        const json = await request.json();
        return json.status.acknowledged;
    }
    async #changePassword() {
        const oldPasswordElem = this.querySelector('#oldpassword');
        const newPasswordElem = this.querySelector('#newpassword');
        const newPasswordconfirmElem = this.querySelector('#newpasswordconfirm');
        const oldPassword = oldPasswordElem.value;
        const newPassword = newPasswordElem.value;
        const newPasswordConfirm = newPasswordconfirmElem.value;
        const samePassword = newPassword === newPasswordConfirm;
        const user = await this.#getUserData();
        if (oldPassword === '' || newPassword === '' || newPasswordConfirm === '') {
            return toast('warning', msg('New Password'), msg('Please fill out all fields'));
        }
        if (!samePassword) {
            return toast('warning', msg('New Password'), msg("New password doesn't match"));
        }
        if (oldPassword === newPassword) {
            return toast('warning', msg('New Password'), msg('Old password and new password are the same'));
        }
        if (!(await this.#sendCheckPassword(oldPassword))) {
            return toast('warning', msg('New Password'), msg('Old password is wrong'));
        }
        if (newPassword.length < passwordMinLength) {
            return toast('warning', msg('New Password'), msg('New password is too short, min 8 characterss'));
        }
        if (newPassword.length > passwordMaxLength) {
            return toast('warning', msg('New Password'), msg('New password is too long, max 35 characters'));
        }
        if (newPassword.includes(' ')) {
            return toast('warning', msg('New Password'), msg('New password cannot contain spaces'));
        }
        if (user.username === newPassword) {
            return toast('warning', msg('New Password'), msg('New password cannot be the same as your username'));
        }
        if (!/\d/.test(newPassword)) {
            return toast('warning', msg('New Password'), msg('New password must contain at least one number'));
        }
        if (!/[a-z]/.test(newPassword)) {
            return toast('warning', msg('New Password'), msg('New password must contain at least one lowercase letter'));
        }
        if (!/[A-Z]/.test(newPassword)) {
            return toast('warning', msg('New Password'), msg('New password must contain at least one uppercase letter'));
        }
        if (await this.#sendChangePassword(newPassword)) {
            setTimeout(() => location.reload(), 4000);
            return toast('success', msg('New Password'), msg('Password changed successfully, refresh in 5 seconds'));
        }
        return toast('danger', msg('New Password'), msg('Something went wrong'));
    }
    #renderAccountSection(content) {
        return html ` <div class="account-section">
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
                        maxlength="${maxLengthAbout}"
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
                <sl-button size="small" variant="primary" class="float-right" @click="${this.#saveAccountChanges}"
                    >${msg('save')}</sl-button
                >
            </div>`;
    }
    #renderPasswordSection() {
        return html `<div class="password-section">
            <sl-input
                id="oldpassword"
                size="small"
                label="${capitalize(msg('Old Password'))}:"
                type="password"
                password-toggle
            >
            </sl-input>
            <sl-input
                id="newpassword"
                size="small"
                minlength="${passwordMinLength}"
                maxlength="${passwordMaxLength}"
                label="${capitalize(msg('New Password'))}:"
                type="password"
                password-toggle
            ></sl-input>
            <sl-input
                id="newpasswordconfirm"
                size="small"
                minlength="${passwordMinLength}"
                maxlength="${passwordMaxLength}"
                label="${capitalize(msg('Confirm New Password'))}:"
                type="password"
                password-toggle
            ></sl-input>
            <sl-button @click="${this.#changePassword}" class="mt-4" size="small" variant="danger"
                >${msg('update password')}</sl-button
            >
        </div>`;
    }
    async #tabSwitchEvent({ detail: { name } }) {
        if (name === 'team') {
            const request = await fetch('/team', {
                method: 'GET',
                ...header,
            });
            const team = await request.json();
            this.team = team;
            this.team.name = team.name;
            console.log(this.team);
        }
    }
    #clickOnteamMember({ target }) {
        const id = target.dataset.id;
        console.log(id);
    }
    #renderTeamSection() {
        return html `<div class="team-section">
            <div>
                <div>
                    <h2>${this.team.name}</h2>
                    <sl-input size="small" label="${msg('search')}">
                        <sl-icon name="search" type="text" slot="prefix"></sl-icon>
                    </sl-input>
                    <div class="mt-4">
                        ${repeat(this.team.members, member => member._id, member => {
            return html `<div @click="${this.#clickOnteamMember}" data-id="${member._id}">1</div>`;
        })}
                    </div>
                </div>
            </div>
            <div>
                <sl-avatar style="--size: 8rem;"></sl-avatar>
                <p>${capitalize(msg('username'))}</p>
                <p>${this.user.username}</p>
                <p>${msg('Email address')}</p>
                <p>${this.user.email}</p>
                <p>${capitalize(msg('about'))}</p>
                <p>${this.user.about}</p>
                <p>${capitalize(msg('role'))}</p>
                <p></p>
            </div>
        </div>`;
    }
    #renderRows() {
        const content = fetch('/me', {
            method: 'GET',
        }).then(r => r.json());
        const row1 = html `<sl-tab-group @sl-tab-show="${this.#tabSwitchEvent}">
            <sl-tab slot="nav" panel="account">${capitalize(msg('account'))}</sl-tab>
            <sl-tab slot="nav" panel="password">${capitalize(msg('password'))}</sl-tab>
            <sl-tab slot="nav" panel="team">${capitalize(msg('team'))}</sl-tab>

            <sl-tab-panel class="mt-8" name="account">${this.#renderAccountSection(content)}</sl-tab-panel>
            <sl-tab-panel class="mt-8" name="password">${this.#renderPasswordSection()}</sl-tab-panel>
            <sl-tab-panel class="mt-8" name="team">${this.#renderTeamSection()}</sl-tab-panel>
        </sl-tab-group> `;
        return [row1];
    }
    render() {
        const rows = this.#renderRows();
        return super.render(rows);
    }
};
__decorate([
    property()
], ProfileView.prototype, "me", void 0);
__decorate([
    property()
], ProfileView.prototype, "user", void 0);
__decorate([
    property({ type: Object, reflect: true })
], ProfileView.prototype, "team", void 0);
ProfileView = __decorate([
    localized(),
    customElement('profile-layout')
], ProfileView);
export default ProfileView;
