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

if (customElements.get('vue-webpack-app') === undefined) {
  customElements.define('vue-webpack-app', MicroApp);
}