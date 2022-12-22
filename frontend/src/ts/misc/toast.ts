import { unsafeHTML } from 'lit/directives/unsafe-html.js';
type toast = 'primary' | 'success' | 'neutral' | 'warning' | 'danger';

const toasts = {
    primary: 'info-circle',
    success: 'check2-circle',
    neutral: 'gear',
    warning: 'exclamation-triangle',
    danger: 'exclamation-octagon',
};

export default function (variant: toast, title: string, text: string) {
    const alert = Object.assign(document.createElement('sl-alert'), {
        variant,
        closable: true,
        duration: 3000,
        innerHTML: `
          <sl-icon name="${toasts[variant]}" slot="icon"></sl-icon>
          <strong>${title}</strong><br />${text}
        `,
    });
    document.body.append(alert);
    alert.toast();
}
