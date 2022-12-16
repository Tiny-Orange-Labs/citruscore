import { LitElement, html, PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import Chart from 'chart.js/auto';
import { getRelativePosition } from 'chart.js/helpers';

@localized()
@customElement('graph-card')
export default class GraphCard extends LitElement {
    constructor() {
        super();
    }

    createRenderRoot() {
        return this; // prevents creating a shadow root
    }

    fill() {
        const canvas: any = this.querySelector('canvas');
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
        const ctx: any = canvas.getContext('2d');
        return new Chart(ctx, {
            type: 'line',
            data: data,
            options: {
                onClick: e => {},
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }

    render() {
        return html`<sl-card class="card-overview graph-cards">
            <div>
                <canvas></canvas>
            </div>

            <div slot="footer">data in a chart</div>
        </sl-card>`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'graph-card': GraphCard;
    }
}
