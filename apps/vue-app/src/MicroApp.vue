<script>
import { h, onMounted, defineComponent } from 'vue'

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export default defineComponent({
  name: 'MicroApp',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup({ name }) {
    onMounted(async () => {
      await loadScript()
      const getModule = await window[name].get()
      getModule()
    })
    return () => h(name);
  }
});
</script>