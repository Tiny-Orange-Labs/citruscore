var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import Chart from 'chart.js/auto';
let GraphCard = class GraphCard extends LitElement {
    constructor() {
        super();
    }
    createRenderRoot() {
        return this; // prevents creating a shadow root
    }
    fill() {
        const canvas = this.querySelector('canvas');
        const data = {
            labels: ['januar', 'february', 'march', 'april,', 'may', 'juni', 'juli', 'august'],
            datasets: [
                {
                    label: 'My First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1,
                },
            ],
        };
        const ctx = canvas.getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                onClick: e => { },
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }
    render() {
        return html `<sl-card class="card-overview graph-cards">
            <div>
                <canvas></canvas>
            </div>

            <div slot="footer">data in a chart</div>
        </sl-card>`;
    }
};
GraphCard = __decorate([
    localized(),
    customElement('graph-card')
], GraphCard);
export default GraphCard;
