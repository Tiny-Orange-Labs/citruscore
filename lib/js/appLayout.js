import { LitElement, html } from 'lit';

class AppLayout extends LitElement {
    #sideNaviWidth =  getComputedStyle(document.documentElement).getPropertyValue('--side-navi-width');

    constructor () {
        super();
    }

    createRenderRoot () {
        return this;
    }

    openNavi () {
        const sideNavi = this.querySelector('nav');
        const isOpen = sideNavi.getAttribute('data-open');

        if (isOpen === 'true') {
            sideNavi.setAttribute('data-open', 'false');
            return document.body.style.setProperty('--side-navi-width', '0');
        } 

        sideNavi.setAttribute('data-open', 'true');
        document.body.style.setProperty('--side-navi-width', this.#sideNaviWidth);
    }

    render () {
        const naviElements = [
            html`<p class="navi-element hover-background"><i class="fa-solid fa-house"></i>&nbsp;Main</p>`,
            html`<p class="navi-element hover-background"><i class="fa-solid fa-gears"></i>&nbsp;Settings</p>`
        ];

        return html`<header><i @click="${this.openNavi}" class="fa-solid fa-bars"></i></header><nav data-open="true">${naviElements}</nav><main></main></main>`;
    }
}

export default customElements.define('app-layout', AppLayout);
