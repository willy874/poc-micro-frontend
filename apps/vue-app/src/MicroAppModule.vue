<script>
import { h, onMounted, defineComponent, computed, onUpdated } from 'vue'

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.type = 'module'
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
    },
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const tagName = computed(() => props.name.split('_').join('-'))
    const fetchMicroApp = () => {
      if (!document.querySelector(`script[src="${props.url}"]`)) {
        return loadScript(props.url)
          .then(() => eval(`import("${props.url}")`))
          .then((container) => container.get('./app'))
          .then((get) => get())
      }
      return Promise.resolve()
    }
    onMounted(() => fetchMicroApp())
    onUpdated(() => fetchMicroApp())
    return () => h(tagName.value)
  }
});
</script>