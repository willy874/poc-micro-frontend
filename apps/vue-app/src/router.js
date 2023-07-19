import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'HOME',
      path: '/',
      component: () => import( './Home.vue')
    },
    {
      name: 'WEBPACK_VUE',
      path: '/webpack-vue',
      props: {
        name: 'vue_webpack_app',
        url: '/apps/vue_webpack_app/remoteEntry.js'
      },
      component: () => import('./MicroApp.vue')
    },
    {
      name: 'WEBPACK_REACT',
      path: '/webpack-react',
      props: {
        name: 'react_webpack_app',
        url: '/apps/react_webpack_app/remoteEntry.js'
      },
      component: () => import('./MicroApp.vue')
    },
    {
      name: 'VITE_VUE',
      path: '/vite-vue',
      props: {
        name: 'vue_vite_app',
        url: '/apps/vue_vite_app/assets/remoteEntry.js'
      },
      component: () => import('./MicroAppModule.vue')
    },
    {
      name: 'VITE_REACT',
      path: '/vite-react',
      props: {
        name: 'react_vite_app',
        url: '/apps/react_vite_app/assets/remoteEntry.js'
      },
      component: () => import('./MicroAppModule.vue')
    },
  ]
})