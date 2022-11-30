import { expect } from '@esm-bundle/chai';
import { capitalize } from './text';

it('Checking capitalization of strings', function () {
    expect(capitalize('home')).to.equal('Home');
    expect(capitalize('welcome back')).to.equal('Welcome back');
});
