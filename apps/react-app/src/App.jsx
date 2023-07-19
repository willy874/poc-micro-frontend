import { BrowserRouter, Link } from 'react-router-dom'
import RouterProvider from './RouterProvider'
import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)
  return (
    <div style={{ border: '1px solid #000' }}>
      <h1>Micro App React</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Add</button>
      <BrowserRouter>
        <ul>
          <li><Link to="/webpack-vue">Webpack Vue</Link></li>
          <li><Link to="/webpack-react">Webpack React</Link></li>
          <li><Link to="/vite-vue">Vite Vue</Link></li>
          <li><Link to="/vite-react">Vite React</Link></li>
        </ul>
        <RouterProvider />
      </BrowserRouter>
    </div>
  )
}


export default App
