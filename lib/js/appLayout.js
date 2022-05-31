import { LitElement, html, css } from 'lit';

class AppLayout extends LitElement {
    static styles = css`:host {
        display: grid;
        grid-template-rows: var(--nav-width) 1fr;
        gap: var(--gap);
        max-height: 100vh;
        height: 100vh;
    }
    
    nav {
        background-color: var(--color-primary);
    }
    
    nav i {
        color: var(--color-on-primary);
    }`;

    constructor () {
        super();
    }

    render () {
        return html`
            <link rel="stylesheet" href="../assets/css/fontawesome.min.css"> 
            <link rel="stylesheet" href="../assets/css/solid.css"> 
            <nav><i class="fa-solid fa-bars"></i></nav><main><div></div><div></div></main>`;
    }
}

export default customElements.define('app-layout', AppLayout);
