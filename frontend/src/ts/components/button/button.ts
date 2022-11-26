import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('project-button')
export default class ProjectButton extends LitElement {
    @property({ attribute: true })
    icon: string = 'none';
    @property({ attribute: true })
    content: string = '';
    @property({ attribute: true })
    type: string = 'normal';

    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    render() {
        if (this.icon !== 'none') {
            return html`<button class="${this.type}-button">
                <i class="fa fa-solid fa-fw fa-${this.icon}"></i>&nbsp;&nbsp;${this.content}
            </button>`;
        }

        return html`<button class="${this.type}-button">${this.content}</button>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'project-button': ProjectButton;
    }
}
