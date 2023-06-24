<script lang="jsx">
import { defineComponent } from 'vue'
import MicroApp from './MicroApp.vue'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <MicroApp name="vue_sub_app"></MicroApp>
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
