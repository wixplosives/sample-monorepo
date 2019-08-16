import { expect } from 'chai';
import React from 'react';
import { App } from '@sample-monorepo/app';
import { renderToString } from 'react-dom/server';

describe('<App />', () => {
    it('renders without throwing on the server', () => {
        expect(() => renderToString(<App text="" />)).to.not.throw();
    });

    it('renders provided text', () => {
        expect(renderToString(<App text="It works" />)).to.contain('It works');
    });
});
