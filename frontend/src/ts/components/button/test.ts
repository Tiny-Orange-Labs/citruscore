import { html, fixture, expect } from '@open-wc/testing';
import './button';

describe('project-button', () => {
    it('Check default properties no Icon', async () => {
        const content = 'hallo welt';
        const el: any = await fixture(html`<project-button content="${content}"></project-button>`);

        expect(el.content).to.equal(content);
        expect(el.innerText).to.equal(content);
        expect(el.icon).to.equal('none');
        expect(el.type).to.equal('normal');
    });

    it('Check default properties with Icon', async () => {
        const el: any = await fixture(html`<project-button icon="home"></project-button>`);

        expect(el.icon).to.equal('home');
        expect(el.type).to.equal('normal');
        expect(el.querySelector('i').classList.contains('fa', 'fa-solid', 'fa-home')).to.equal(true);
    });

    it('passes the a11y audit', async () => {
        const el: any = await fixture(html`<project-button content="hallo welt" icon="home"></project-button>`);
        await expect(el).to.be.accessible();
    });
});
