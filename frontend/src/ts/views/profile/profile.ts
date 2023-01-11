import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
import SlInput from '@shoelace-style/shoelace/dist/components/input/input';
import { imgs } from '../../data/fallbacks';

const passwordMinLength = 8;
const passwordMaxLength = 35;
const maxLengthAbout = 560;
const activeMemberClass = 'team-member-active';

type Member = {
    _id: string;
    username: string;
    role: string;
    email: string;
    rights: {
        [key: string]: boolean;
    };
    about: string;
    avatar: string;
};

@localized()
@customElement('profile-layout')
export default class ProfileView extends ViewLayout {
    @property() me = {
        _id: '',
        username: '',
        email: '',
        about: '',
        avatar: '',
    };
    @property() user = {
        _id: '',
        username: '',
        role: '',
        email: '',
        rights: {},
        about: '',
        avatar: '',
    };
    @property({ type: Object, reflect: true }) team = {
        _id: '',
        maxMembers: 0,
        name: 'loading…',
        members: [
            {
                _id: '',
                username: 'loading…',
                role: 'loading…',
                email: '',
                rights: {},
                about: '',
                avatar: '',
            },
        ],
    };

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

    async #getUserData() {
        const request = await fetch('/me', {
            method: 'GET',
            ...header,
        });
        const me = await request.json();

        this.me = me;

        return me;
    }

    async #hasUserDataChanged(newData: any) {
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
        const usernameElem = this.querySelector('#username') as SlInput;
        const emailElem = this.querySelector('#mail') as SlInput;
        const aboutElem = this.querySelector('#about') as SlInput;
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

    #changeLangEvent({ target: { value } }: { target: { value: string } }) {
        setLocale(value);
        localStorage.setItem('lang', value);
        document.querySelector('html')?.setAttribute('lang', value);
    }

    #renderLanguageSelect() {
        const lang: string = localStorage.getItem('lang') || languages[0].code;

        return html` <sl-select
            size="small"
            @click="${this.#changeLangEvent}"
            label="${capitalize(msg('language'))}"
            value="${lang}"
            class="md:w-1/4"
        >
            ${repeat(languages, function ({ name, code }) {
                return html` <sl-menu-item size="small" value="${code}">${name}</sl-menu-item>`;
            })}
        </sl-select>`;
    }

    async #sendCheckPassword(oldPassword: string): Promise<boolean> {
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

    async #sendChangePassword(newPassword: string) {
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
        const oldPasswordElem = this.querySelector('#oldpassword') as SlInput;
        const newPasswordElem = this.querySelector('#newpassword') as SlInput;
        const newPasswordconfirmElem = this.querySelector('#newpasswordconfirm') as SlInput;
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
            return toast(
                'warning',
                msg('New Password'),
                msg('New password must contain at least one lowercase letter'),
            );
        }
        if (!/[A-Z]/.test(newPassword)) {
            return toast(
                'warning',
                msg('New Password'),
                msg('New password must contain at least one uppercase letter'),
            );
        }
        if (await this.#sendChangePassword(newPassword)) {
            setTimeout(() => location.reload(), 4000);
            return toast('success', msg('New Password'), msg('Password changed successfully, refresh in 5 seconds'));
        }

        return toast('danger', msg('New Password'), msg('Something went wrong'));
    }

    async #sendAvatar(file: File, imgTag: HTMLImageElement, e: ProgressEvent<FileReader>) {
        const request = await fetch('/changeAvatar', {
            method: 'POST',
            ...header,
            body: JSON.stringify({
                data: {
                    type: file.type,
                    name: file.name,
                    size: file.size,
                    lastModified: file.lastModified,
                    width: imgTag.width,
                    height: imgTag.height,
                    file: e.target?.result,
                },
                client,
            }),
        });
        const json = await request.json();
    }

    async #changeAvatarEvent(e: { target: { files: any[]; result: any } }) {
        const reader = new FileReader();
        const file = e.target.files[0];
        const imgTag = document.createElement('img');
        const url = URL.createObjectURL(file);

        reader.onload = (event: ProgressEvent<FileReader>) => {
            imgTag.src = url;

            imgTag.onload = () => {
                this.#sendAvatar(file, imgTag, event);
                URL.revokeObjectURL(url);
            };
        };

        reader.readAsDataURL(file);
    }

    #clickUploadAvatar() {
        const input = this.querySelector('input[type="file"]') as HTMLInputElement;
        input.click();
    }

    #renderAccountSection(content: Promise<any>) {
        console.log(this.me);
        return html` <div class="account-section">
                <div>
                    <div class="grid grid-rows-1 md:grid-cols-2 md:gap-4">
                        <sl-input
                            id="username"
                            minlength="3"
                            maxlength="20"
                            label="${capitalize(msg('username'))}"
                            size="small"
                            value="${until(
                                content.then(function (data) {
                                    return data.username;
                                }),
                                'Loading...',
                            )}"
                        ></sl-input>
                        <sl-input
                            id="mail"
                            label="${capitalize(msg('Email address'))}"
                            type="email"
                            size="small"
                            value="${until(
                                content.then(function (data) {
                                    return data.email;
                                }),
                                'Loading...',
                            )}"
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
                        value="${until(
                            content.then(function (data) {
                                return data.about;
                            }),
                            '',
                        )}"
                    ></sl-textarea>
                </div>
                <div>
                    <p>${capitalize(msg('photo'))}</p>
                    <sl-tooltip content="${msg('click to upload new avatar')}" placement="top">
                        <sl-avatar
                            @click="${this.#clickUploadAvatar}"
                            style="--size: 10rem;"
                            image="${until(
                                content.then(function (data) {
                                    return data.avatar || imgs.avatar;
                                }),
                                imgs.avatar,
                            )}"
                        ></sl-avatar>
                        <input
                            @change="${this.#changeAvatarEvent}"
                            type="file"
                            class="hidden"
                            accept="image/jpeg,image/jpg,image/webp,image/png"
                        />
                    </sl-tooltip>
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
        return html`<div class="password-section">
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

    #bootstrapFirstClickOnTeamTab() {
        const hasActive = this.querySelector(`.team-member.${activeMemberClass}`);

        if (!hasActive) {
            const memberElem = this?.querySelector('.team-member') as HTMLElement;
            const _id = memberElem?.getAttribute('data-id') as string;
            const member = this.team.members.find((member: Member) => member._id === _id);

            if (member) {
                return this.#clickOnteamMember(member);
            }
        }
    }

    async #tabSwitchEvent({ detail: { name } }: { detail: { name: string } }) {
        if (name === 'team') {
            const teamRequest = await fetch('/team', {
                method: 'GET',
                ...header,
            });
            const team = await teamRequest.json();
            const membersRequest = await fetch('/getUsers', {
                method: 'POST',
                ...header,
                body: JSON.stringify({
                    data: {
                        ids: team.members.map((member: any) => member.member),
                    },
                    client,
                }),
            });
            const members = await membersRequest.json();

            this.team = team;
            this.team.members = this.team.members.map((member: any, i: number) => {
                return {
                    ...member,
                    ...members[i],
                };
            });
            this.requestUpdate();
            requestAnimationFrame(() => {
                this.#bootstrapFirstClickOnTeamTab();
            });
        }
    }

    #clickOnteamMember(member: Member) {
        const hasActive = this.querySelector(`.team-member.${activeMemberClass}`) as HTMLElement;
        const active_id = hasActive?.getAttribute('data-id');

        this.user = member;

        if (active_id !== member._id) {
            const newActive = this?.querySelector(`.team-member[data-id="${member._id}"]`) as HTMLElement;

            hasActive?.classList.remove(activeMemberClass);
            newActive.classList.add(activeMemberClass);

            return this.requestUpdate();
        }
    }

    #renderTeamSection() {
        return html`<div class="team-section">
            <div>
                <div>
                    <sl-input size="small" label="${capitalize(msg('search'))}">
                        <sl-icon name="search" type="text" slot="prefix"></sl-icon>
                    </sl-input>
                    <div class="mt-4">
                        ${repeat(
                            this.team.members,
                            member => member._id,
                            member => {
                                return html`<div
                                        class="team-member"
                                        @click="${() => this.#clickOnteamMember(member)}"
                                        data-id="${member._id}"
                                    >
                                        <sl-avatar image="${member.avatar || imgs.avatar}"></sl-avatar>
                                        <div>
                                            <p>${member.username}</p>
                                            <p>${msg('role')}: ${member.role}</p>
                                        </div>
                                    </div>
                                    <sl-divider></sl-divider>`;
                            },
                        )}
                    </div>
                </div>
            </div>
            <div class="selected-team-section">
                <sl-avatar style="--size: 8rem;" image="${this.user.avatar || imgs.avatar}"></sl-avatar>

                <h2 class="text-2xl font-bold">
                    ${msg('{{1}} member of {{2}}')
                        .replace('{{1}}', this.user.username)
                        .replace('{{2}}', this.team.name)}
                </h2>
                <div class="selected-team-section-stats">
                    <div>
                        <p class="text-gray-600">${msg('name')}</p>
                        <p>${this.user.username}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">${msg('Email address')}</p>
                        <p>${this.user.email}</p>
                    </div>
                    <div>
                        <p class="text-gray-600">${capitalize(msg('role'))}</p>
                        <p>${this.user.role}</p>
                    </div>
                </div>
                <div>
                    <p class="text-gray-600">${capitalize(msg('about'))}</p>
                    <p>${this.user.about}</p>
                </div>
            </div>
        </div>`;
    }

    #renderRows() {
        const content = fetch('/me', {
            method: 'GET',
        }).then(r => r.json());

        const row1 = html`<sl-tab-group @sl-tab-show="${this.#tabSwitchEvent}">
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
}

declare global {
    interface HTMLElementTagNameMap {
        'profile-layout': ProfileView;
    }
}
