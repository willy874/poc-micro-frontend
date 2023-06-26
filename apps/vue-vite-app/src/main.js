import { createApp } from 'vue'
import App from './App.vue'

class MicroApp extends HTMLElement {
  connectedCallback() {
    this.style.cssText = `
      width: 100%;
      height: 100%;
    `;
    createApp(App).mount(this);
  }
}

customElements.define('vue-vite-app', MicroApp);