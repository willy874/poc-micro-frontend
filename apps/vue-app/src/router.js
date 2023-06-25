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
      name: 'VUE',
      path: '/vue',
      props: {
        name: 'vue_webpack_app',
        url: '/apps/vue_webpack_app/remoteEntry.js'
      },
      component: () => import('./MicroApp.vue')
    },
    {
      name: 'REACT',
      path: '/react',
      props: {
        name: 'react_webpack_app',
        url: '/apps/react_webpack_app/remoteEntry.js'
      },
      component: () => import('./MicroApp.vue')
    },
  ]
})