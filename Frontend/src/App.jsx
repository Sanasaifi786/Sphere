import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import CategoryPills from './components/CategoryPills'
import Home from './pages/Home'
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
        <div className={`main-content relative transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <CategoryPills />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
