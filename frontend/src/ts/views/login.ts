import SlInput from '@shoelace-style/shoelace/dist/components/input/input';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { client } from '../data/misc';
import toast from '../misc/toast';
import { localized, msg } from '@lit/localize';

@localized()
@customElement('login-layout')
export default class LoginLayout extends LitElement {
    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    async #sendRequest(username: string, password: string) {
        const request = await fetch('/auth', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    username,
                    password,
                },
                client,
            }),
        });
        const json = await request.json();

        console.log(json);
    }

    async #loginClick() {
        const unsernameInput = this.querySelector('#username') as SlInput;
        const username = (unsernameInput?.value || '').toLocaleLowerCase().trim();
        const passwordInput = this.querySelector('#password') as SlInput;
        const password = passwordInput?.value || '';

        if (username !== '' && password !== '') {
            return this.#sendRequest(username, password);
        } else {
            toast('warning', msg('Credentials are Empty'), msg('Please fill in Username and Password'));
        }
    }

    render() {
        return html`<div></div>
            <div class="flex flex-col justify-center gap-2">
                <div>
                    <p class="text-2xl">Login</p>
                    <p>Your Account</p>
                </div>

                <sl-input id="username" label="Username:" autofocus>
                    <sl-icon name="person-circle" placeholder="Max Musterman" slot="prefix"></sl-icon>
                </sl-input>
                <sl-input id="password" label="Password:" placeholder="*****" type="password" password-toggle>
                    <sl-icon name="unlock" slot="prefix"></sl-icon>
                </sl-input>

                <div class="flex items-center justify-between">
                    <sl-button @click="${this.#loginClick}">Login</sl-button>
                    <span class="cursor-pointer">Forget Password</span>
                </div>
            </div>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'login-layout': LoginLayout;
    }
}
