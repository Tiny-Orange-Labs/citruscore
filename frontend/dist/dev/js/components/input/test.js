import { html, fixture, expect } from '@open-wc/testing';
import './input';
describe('project-input', () => {
    it('Empty value', async () => {
        const el = await fixture(html `<project-input label="preis" placeholder="0.0"></project-input>`);
        await expect(el.querySelector('.input-label-optional')).to.be.equal(null);
        await expect(el.value).to.equal('');
    });
    it('value with options', async () => {
        const el = await fixture(html `<project-input
                prefix="€"
                label="preis"
                options='["USD","YEN","EURO"]'
                placeholder="0.0"
            ></project-input>`);
        el.querySelector('input').value = '100';
        el.querySelector('select').value = 'EURO';
        await expect(el.value).to.be.deep.equal({
            option: 'EURO',
            value: '100',
        });
    });
    it('Check optional span', async () => {
        const el = await fixture(html `<project-input prefix="€" label="preis" optional="true" placeholder="0.0"></project-input>`);
        await expect(el.querySelector('.input-label-optional')).to.be.not.equal(null);
    });
    it('passes the a11y audit', async () => {
        const el = await fixture(html `<project-input prefix="€" label="preis" placeholder="0.0"></project-input>`);
        await expect(el).to.be.accessible();
    });
});
