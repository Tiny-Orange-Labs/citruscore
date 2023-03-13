import SlInput from '@shoelace-style/shoelace/dist/components/input/input';
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { client } from '../../data/misc';
import toast from '../../utilities/toast/toast';
import { localized, msg } from '@lit/localize';
import { capitalize } from '../../utilities/text/text';

@localized()
@customElement('login-layout')
export default class LoginLayout extends LitElement {
    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    async #sendLogin(username: string, password: string) {
        const request = await fetch('/v1/login', {
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

        if (!json.auth) {
            return toast('danger', msg('Wrong Password or Username'), msg('Your Username or Password is wrong'));
        }

        window.location.href = new URL(window.location.href).origin;
    }

    async #loginClick() {
        const unsernameInput = this.querySelector('#username') as SlInput;
        const username = (unsernameInput?.value || '').toLocaleLowerCase().trim();
        const passwordInput = this.querySelector('#password') as SlInput;
        const password = passwordInput?.value || '';

        if (username !== '' && password !== '') {
            return this.#sendLogin(username, password);
        } else {
            toast('warning', msg('Credentials are Empty'), msg('Please fill in Username and Password'));
        }
    }

    #keydown(e: any) {
        if (e.key === 'Enter') {
            this.#loginClick();
        }
    }

    render() {
        return html`<div></div>
            <div class="flex flex-col justify-center gap-2">
                <div>
                    <p class="text-2xl">Login</p>
                    <p>Your Account</p>
                </div>

                <sl-input id="username" label="${capitalize(msg('username'))}:" maxlength="20" minlength="3" autofocus>
                    <sl-icon name="person-circle" placeholder="Max Musterman" slot="prefix"></sl-icon>
                </sl-input>
                <sl-input
                    id="password"
                    label="${capitalize(msg('password'))}:"
                    type="password"
                    @keydown="${this.#keydown}"
                    password-toggle
                >
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
