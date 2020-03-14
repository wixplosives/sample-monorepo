import React from 'react';
import { render, hydrate } from 'react-dom';
import { App } from './app';
import 'sanitize.css';
import 'sanitize.css/typography.css';

const container = upsertContainer();

if (container.hasAttribute('data-ssr')) {
    hydrate(<App text="Hello World (hydrated)" />, container);
} else {
    render(<App text="Hello World (client-only)" />, container);
}

function upsertContainer(): HTMLElement {
    const existingContainer = document.getElementById('SITE_MAIN');
    if (existingContainer) {
        return existingContainer;
    } else {
        const newContainer = document.createElement('div');
        newContainer.id = 'SITE_MAIN';
        document.body.appendChild(newContainer);
        return newContainer;
    }
}
