import ReactDOM from 'react-dom';
import { App } from './app';
import 'sanitize.css';
import 'sanitize.css/typography.css';

const rootContainerId = 'SITE_MAIN';

const container = document.getElementById(rootContainerId) ?? createContainer(document.body);

if (container.hasAttribute('data-ssr')) {
  ReactDOM.hydrate(<App text="Hello World (hydrated)" />, container);
} else {
  ReactDOM.render(<App text="Hello World (client-only)" />, container);
}

function createContainer(targetParent: Element) {
  const newContainer = document.createElement('div');
  newContainer.id = rootContainerId;
  targetParent.appendChild(newContainer);
  return newContainer;
}
