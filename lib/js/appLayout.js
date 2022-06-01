import { LitElement, html, css } from 'lit';

class fontawesome extends LitElement {
    render () {
        return html`<i  class="fa-solid fa-bars"></i>`;
    }
}
customElements.define('font-awesome', fontawesome);

class AppLayout extends LitElement {
    createRenderRoot () {
        return this;
    }

    constructor () {
        super();
    }

    render () {
        return html`<nav><i  class="fa-solid fa-bars"></i></nav><main><div></div><div></div></main>`;
    }
}

export default customElements.define('app-layout', AppLayout);
