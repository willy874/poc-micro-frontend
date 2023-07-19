import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

class MicroApp extends HTMLElement {
  connectedCallback() {
    this.style.cssText = `
      width: 100%;
      height: 100%;
    `;
    ReactDOM.createRoot(this).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
}

if (customElements.get('react-vite-app') === undefined) {
  customElements.define('react-vite-app', MicroApp);
}
