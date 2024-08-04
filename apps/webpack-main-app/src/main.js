import { init, registerRemotes, loadRemote } from '@module-federation/enhanced/runtime'

const remotes = [
  {
    name: "sub_webpack_app",
    entry: "/apps/webpack-sub-app/mf-manifest.json",
    alias: 'sub_webpack_app'
  },
  // {
  //   name: "vite_vue_app",
  //   entry: "/apps/vite-vue-app/assets/remoteEntry.js",
  //   alias: 'vite_vue_app'
  // },
]

init({
  name: '@main/webpack',
})

registerRemotes(remotes, {
  force: true
})

loadRemote('sub_webpack_app/app').then(({ setup }) => {
  setup()
})
// loadRemote('vite_vue_app/app').then(({ setup }) => {
//   setup()
// })

console.log('Webpack Main App loaded');