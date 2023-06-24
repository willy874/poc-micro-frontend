import { createElement, useEffect } from 'react'
import { PropTypes } from 'react/prop-types'

const loadScript = (origin) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src =  origin;
    script.async = true;
    script.onload = resolve
    script.onerror = reject
    document.body.appendChild(script);
  })
};

export default function MicroApp({ name, origin }) {
  useEffect(() => loadScript(origin), [origin])
  return createElement(name)
}

MicroApp.propTypes = {
  name: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
}