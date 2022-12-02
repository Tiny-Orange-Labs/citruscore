var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';
let ProjectButton = class ProjectButton extends LitElement {
    icon = 'none';
    content = '';
    type = 'normal';
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    render() {
        if (this.icon !== 'none') {
            return html `<button class="${this.type}-button">
                <i class="fa fa-solid fa-fw fa-${this.icon}"></i>&nbsp;&nbsp;${this.content}
            </button>`;
        }
        return html `<button class="${this.type}-button">${this.content}</button>`;
    }
};
__decorate([
    property({ attribute: true })
], ProjectButton.prototype, "icon", void 0);
__decorate([
    property({ attribute: true, reflect: true })
], ProjectButton.prototype, "content", void 0);
__decorate([
    property({ attribute: true })
], ProjectButton.prototype, "type", void 0);
ProjectButton = __decorate([
    localized(),
    customElement('project-button')
], ProjectButton);
export default ProjectButton;
