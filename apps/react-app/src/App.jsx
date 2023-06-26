import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MicroApp from './MicroApp'
import MicroAppModule from './MicroAppModule'

function App() {
  return (
    <div>
      <h1>Micro App React</h1>
      <BrowserRouter>
        <ul>
          <li><Link to="/webpack-vue">Webpack Vue</Link></li>
          <li><Link to="/webpack-react">Webpack React</Link></li>
          <li><Link to="/vite-vue">Vite Vue</Link></li>
          <li><Link to="/vite-react">Vite React</Link></li>
        </ul>
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
      </BrowserRouter>
    </div>
  )
}


export default App
