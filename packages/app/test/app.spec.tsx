import { expect } from 'chai';
import { renderToString } from 'react-dom/server';
import { App } from '@sample/app';

describe('<App />', () => {
  it('renders without throwing on the server', () => {
    expect(() => renderToString(<App text="" />)).to.not.throw();
  });

  it('renders provided text', () => {
    expect(renderToString(<App text="It works" />)).to.contain('It works');
  });
});
