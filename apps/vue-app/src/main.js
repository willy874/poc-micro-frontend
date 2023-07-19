import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'



class MicroApp extends HTMLElement {
  connectedCallback() {
    this.style.cssText = `
      width: 100%;
      height: 100%;
    `;
    createApp(App).use(router).mount(this);
  }
}

if (customElements.get('vue-app') === undefined) {
  customElements.define('vue-app', MicroApp);
}
