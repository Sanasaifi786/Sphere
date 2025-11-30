import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <BrowserRouter>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="app-container pt-16">
        <Sidebar sidebarOpen={sidebarOpen} />
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
