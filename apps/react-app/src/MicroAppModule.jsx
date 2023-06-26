import { createElement, useEffect, useRef } from 'react'

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

export default function MicroApp({ name, url }) {
  const tagName = name.split('_').join('-')
  const ref = useRef(null)
  useEffect(() => {
    if (!document.querySelector(`script[src="${url}"]`)) {
      loadScript(url)
        .then(() => eval(`import("${url}")`))
        .then((container) => container.get('./app'))
        .then((get) => get())
    }
  }, [name, url])
  return createElement(tagName, { ref })
}
