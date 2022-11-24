var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { navElements } from '../data/nav';
import { repeat } from 'lit/directives/repeat.js';
let AppLayout = class AppLayout extends LitElement {
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    #viewSwitch({ detail: { name } }) {
        const active = this.querySelector('view-layout[active="true"]');
        const view = this.querySelector(`view-layout[name="${name}"]`);
        if (active) {
            active.setAttribute('active', 'false');
        }
        localStorage.setItem('active-view', name);
        view.setAttribute('active', 'true');
    }
    render() {
        const activeView = localStorage.getItem('active-view');
        return html `<main-nav class="nav" @viewSwitch="${this.#viewSwitch}"></main-nav>
            <main>
                ${repeat(navElements.items, (elem) => {
            const active = elem.name === activeView;
            return html `<view-layout
                        name="${elem.name}"
                        active="${active}"
                        class="bg-primarybg view"
                    ></view-layout>`;
        })}
            </main>`;
    }
};
AppLayout = __decorate([
    customElement('app-layout')
], AppLayout);
export default AppLayout;
