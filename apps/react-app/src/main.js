import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'


class MicroApp extends HTMLElement {
  connectedCallback() {
    this.style.cssText = `
      width: 100%;
      height: 100%;
    `;
    createRoot(this).render(createElement(App));
  }
}

if (customElements.get('react-app') === undefined) {
  customElements.define('react-app', MicroApp);
}