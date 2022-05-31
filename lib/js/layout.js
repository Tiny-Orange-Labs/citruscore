import { LitElement, html, css } from 'lit';

class AppLayout extends LitElement {
    static styles = css`:host {
        display: grid;
        grid-template-columns: var(--nav-width) 1fr;
        gap: var(--gap);
        max-height: 100vh;
        height: 100vh;
    }`;

    constructor () {
        super();
    }

  
    render () {
        return html`<nav></nav><main></main>`;
    }
}

export default customElements.define('app-layout', AppLayout);
