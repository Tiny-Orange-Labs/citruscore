import { LitElement, html } from 'lit';

class AppLayout extends LitElement {
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
        document.body.style.setProperty('--side-navi-width', '365px');
    }

    constructor () {
        super();
    }

    render () {
        return html`<header><i @click="${this.openNavi}" class="fa-solid fa-bars"></i></header><nav data-open="true"></nav><main></main></main>`;
    }
}

export default customElements.define('app-layout', AppLayout);
