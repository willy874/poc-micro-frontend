import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import MicroApp from './MicroApp'

function App() {
  return (
    <div>
      <h1>Micro App React</h1>
      <BrowserRouter>
        <ul>
          <li><Link to="/vue">Vue</Link></li>
          <li><Link to="/react">React</Link></li>
        </ul>
        <Routes>
          <Route path="/" element={<div></div>} />
          <Route path="/vue" element={<div>
            <MicroApp name="vue_webpack_app" url="/apps/vue_webpack_app/remoteEntry.js" />
          </div>} />
          <Route path="/react" element={<div>
            <MicroApp name="react_webpack_app" url="/apps/react_webpack_app/remoteEntry.js" />
          </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
