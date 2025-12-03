import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import CategoryPills from './components/CategoryPills'
import Home from './pages/Home'
import Login from './pages/Login'
import SignIn from './pages/SignIn'
import Channel from './pages/Channel'
import UploadVideo from './pages/UploadVideo'
import EditVideo from './pages/EditVideo'
import Trending from './pages/Trending'
import VideoPlayer from './pages/VideoPlayer'
import LikedVideos from './pages/LikedVideos'
import WatchHistory from './pages/WatchHistory'
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
        <div className={`main-content relative transition-all duration-300 w-full`}>
          <CategoryPills />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignIn />} />
              <Route path="/c/:username" element={<Channel />} />
              <Route path="/upload" element={<UploadVideo />} />
              <Route path="/edit/:videoId" element={<EditVideo />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/video/:videoId" element={<VideoPlayer />} />
              <Route path="/liked-videos" element={<LikedVideos />} />
              <Route path="/history" element={<WatchHistory />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
