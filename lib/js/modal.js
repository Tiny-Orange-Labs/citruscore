import { LitElement, html, css } from 'lit';

class Modal extends LitElement {
    static styles = css`
    :host {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.25);
    }

    .inner-modal {
        position: absolute;
        background: white;
        padding: var(--big-padding);
        border-radius: var(--border-radius); 
        width: 550px;
        max-width: 82%;
        min-height: 32px;
        word-break: break-word;
    }

    .close-modal {
        color: #aaa;
        line-height: var(--big-padding);
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
        width: 70px;
    }

    .close-modal:hover {
        cursor: pointer;
        color: var(--color-on-background);
    }`;

    constructor () {
        super();
    }
    
    toggle () {
        const isOpen = this.getAttribute('data-open') === 'true';

        if (isOpen) {
            return this.close();
        }

        return this.open();
    }

    open () {
        const isOpen = this.getAttribute('data-open') === 'true';

        if (isOpen) {
            return;
        }

        requestAnimationFrame(() => {
            this.classList.remove('hide');
            return this.setAttribute('data-open', 'true');
        });
    }

    close () {
        const isClosed = this.getAttribute('data-open') === 'false';

        if (isClosed) {
            return;
        }

        requestAnimationFrame(() => {
            this.classList.add('hide');
            return this.setAttribute('data-open', 'false');
        });
    }
    
    set ({ HTML }) {
        this.shadowRoot.querySelector('.modal-content').innerHTML = HTML;
    }

    setAndOpen (options) {
        this.set(options);
        this.open();
    }

    render () {
        return html `<div class="inner-modal"><small @click="${this.close}" class="close-modal">close</small><div class="modal-content"></div></div>`;
    }
}

export default customElements.define('modal-window', Modal);
