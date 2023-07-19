import { useEffect, useRef } from 'react'
import MicroApp from './MicroApp'
import MicroAppModule from './MicroAppModule'
import { useNavigate, useLocation, useParams, useSearchParams, Routes, Route } from 'react-router-dom'

export default function RouterProvider() {
  const navigation = useNavigate()
  const location = useLocation()
  const routeParams = useParams()
  const [searchParams] = useSearchParams()
  const route = useRef({})
  useEffect(() => {
    route.current = {
      app: 'react_app',
      hash: location.hash,
      path: location.pathname,
      query: routeParams,
      params: { ...searchParams },
    }
  }, [location, routeParams, searchParams])
  useEffect(() => {
    const { path } = route.current
    const routerEventHandler = (event) => {
      if (event.detail.path !== path && event.detail.app !== 'react_app') {
        navigation(event.detail.path)
      }
    }
    window.addEventListener('micro-app:routing-event', routerEventHandler);
    return () => {
      window.removeEventListener('micro-app:routing-event', routerEventHandler);
    }
  }, [])
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('micro-app:routing-event', {
      detail: route.current
    }))
  }, [location])
  return (
    <Routes>
      <Route path="/" element={<div></div>} />
      <Route path="/webpack-vue" element={(
        <MicroApp name="vue_webpack_app" url="/apps/vue_webpack_app/remoteEntry.js" />
      )} />
      <Route path="/webpack-react" element={(
        <MicroApp name="react_webpack_app" url="/apps/react_webpack_app/remoteEntry.js" />
      )} />
      <Route path="/vite-vue" element={(
        <MicroAppModule name="vue_vite_app" url="/apps/vue_vite_app/assets/remoteEntry.js" />
      )} />
      <Route path="/vite-react" element={(
        <MicroAppModule name="react_vite_app" url="/apps/react_vite_app/assets/remoteEntry.js" />
      )} />
    </Routes>
  )
}
