<script>
import { h, onMounted, defineComponent, computed, onUpdated } from 'vue'

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
    },
    url: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const tagName = computed(() => props.name.split('_').join('-'))
    const fetchMicroApp = () => {
      if (!window[props.name]) {
        return loadScript(props.url)
          .then(() => window[props.name].get('./app'))
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