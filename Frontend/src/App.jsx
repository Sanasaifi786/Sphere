import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* Add your routes here */}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
