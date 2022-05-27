import { createRoot, hydrateRoot } from 'react-dom/client';
import { App } from './app.js';
import 'sanitize.css';
import 'sanitize.css/typography.css';

const rootContainerId = 'SITE_MAIN';

const container = document.getElementById(rootContainerId) ?? createContainer(document.body);

if (container.hasAttribute('data-ssr')) {
  hydrateRoot(container, <App text="Hello World (SSR)" />);
} else {
  createRoot(container).render(<App text="Hello World (client-only)" />);
}

function createContainer(targetParent: Element) {
  const newContainer = document.createElement('div');
  newContainer.id = rootContainerId;
  return targetParent.appendChild(newContainer);
}
