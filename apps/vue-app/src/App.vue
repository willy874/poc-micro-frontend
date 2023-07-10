<script lang="jsx">
import { defineComponent } from 'vue'
import { RouterView, RouterLink } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <h2>Micro App Vue</h2>
        <ul>
          <li><RouterLink to="/vue">Vue</RouterLink></li>
          <li><RouterLink to="/react">React</RouterLink></li>
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
