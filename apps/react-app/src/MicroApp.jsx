import { createElement, useEffect, useRef } from 'react'

function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = url
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script)
  })
}

export default function MicroApp({ name, url }) {
  const tagName = name.split('_').join('-')
  const ref = useRef(null)
  useEffect(() => {
    if (!window[name]) {
      loadScript(url)
        .then(() => window[name].get('./app'))
        .then((get) => get())
    }
  }, [name, url])
  return createElement(tagName, { ref })
}
