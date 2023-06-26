<script lang="jsx">
import { defineComponent } from 'vue'
import HelloWorld from './HelloWorld.vue'

export default defineComponent({
  name: 'App',
  setup() {
    return () => (
      <div>
        <HelloWorld msg="Webpack + Vue"></HelloWorld>
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
