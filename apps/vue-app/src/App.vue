<script lang="jsx">
import { defineComponent, onUnmounted, onMounted, watch } from 'vue'
import { useRouter, useRoute, RouterView, RouterLink } from 'vue-router'

function pick(obj, keys ) {
  return keys.reduce((acc, key) => {
    if (obj && obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    const route = useRoute()
    const routerEventHandler = (event) => {
      if (event.detail.path !== route.path && event.detail.app !== 'vue_app') {
        router.push(event.detail.path);
      }
    }
    watch(route, (to) => {
      const routePick = (r) => {
        return {
          app: 'vue_app',
          ...pick(r, ['path', 'query', 'params', 'hash'])
        }
      }
      window.dispatchEvent(new CustomEvent('micro-app:routing-event', {
        detail: routePick(to)
      }))
    })
    onMounted(() => {
      window.addEventListener('micro-app:routing-event', routerEventHandler);
    })
    onUnmounted(() => {
      window.removeEventListener('micro-app:routing-event', routerEventHandler);
    })
    return () => (
      <div style={{ border: '1px solid #000' }}>
        <h1>Micro App Vue</h1>
        <ul>
          <li><RouterLink to="/webpack-vue">Webpack Vue</RouterLink></li>
          <li><RouterLink to="/webpack-react">Webpack React</RouterLink></li>
          <li><RouterLink to="/vite-vue">Vite Vue</RouterLink></li>
          <li><RouterLink to="/vite-react">Vite React</RouterLink></li>
        </ul>
        <RouterView />
      </div>
    )
  }
})
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
