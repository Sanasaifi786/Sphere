import React, { useState } from 'react';
import {
  Home, TrendingUp, Film, Library, Clock, ThumbsUp, ListVideo, History, PlaySquare,
  Gamepad2, Music, Newspaper, Trophy, GraduationCap, Settings, HelpCircle, MessageSquare,
  ChevronDown, ChevronRight
} from 'lucide-react';

// Desktop Sidebar
function Sidebar({ sidebarOpen }) {
  const [activeTab, setActiveTab] = useState('home');
  const [showSubscriptions, setShowSubscriptions] = useState(true);

  const subscribedChannels = [
    { id: 1, name: 'Tech Channel', avatar: '💻', online: true },
    { id: 2, name: 'Gaming Pro', avatar: '🎮', online: false },
    { id: 3, name: 'Music World', avatar: '🎵', online: true },
    { id: 4, name: 'Cooking Master', avatar: '👨‍🍳', online: false },
    { id: 5, name: 'Travel Vlog', avatar: '✈️', online: true },
  ];

  const mainNavItems = [
    { id: 'home', icon: Home, label: 'Home', badge: null },
    { id: 'trending', icon: TrendingUp, label: 'Trending', badge: null },
    { id: 'subscriptions', icon: Film, label: 'Subscriptions', badge: null },
  ];

  const libraryItems = [
    { id: 'library', icon: Library, label: 'Library', badge: null },
    { id: 'watch-later', icon: Clock, label: 'Watch Later', badge: null },
    { id: 'liked', icon: ThumbsUp, label: 'Liked Videos', badge: null },
    { id: 'playlists', icon: ListVideo, label: 'Playlists', badge: null },
    { id: 'history', icon: History, label: 'Watch History', badge: null },
    { id: 'your-videos', icon: PlaySquare, label: 'Your Videos', badge: null },
  ];

  const moreItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'feedback', icon: MessageSquare, label: 'Send Feedback' },
  ];

  return (
    <div className={`h-full bg-black border-r border-gray-800 transition-all duration-300 overflow-y-auto z-30 shrink-0 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <nav className="py-2">
        {/* Main Navigation */}
        <div className="mb-2">
          {mainNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${activeTab === item.id
                ? 'bg-zinc-900 text-white border-r-4 border-white'
                : 'text-white hover:bg-zinc-900'
                } ${!sidebarOpen && 'justify-center px-0'}`}
            >
              <item.icon size={24} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-white text-black text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {sidebarOpen && <div className="border-t border-gray-800 my-2"></div>}

        {/* Library Section */}
        <div className="mb-2">
          {sidebarOpen && (
            <h3 className="px-6 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Library
            </h3>
          )}
          {libraryItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${activeTab === item.id
                ? 'bg-zinc-900 text-white border-r-4 border-white'
                : 'text-white hover:bg-zinc-900'
                } ${!sidebarOpen && 'justify-center px-0'}`}
            >
              <item.icon size={22} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs text-gray-400">{item.badge}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {sidebarOpen && <div className="border-t border-gray-800 my-2"></div>}

        {/* Subscriptions */}
        {sidebarOpen && (
          <div className="mb-2">
            <button
              onClick={() => setShowSubscriptions(!showSubscriptions)}
              className="w-full flex items-center justify-between px-6 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wide hover:bg-zinc-900"
            >
              <span>Subscriptions</span>
              {showSubscriptions ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
            {showSubscriptions && (
              <div>
                {subscribedChannels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveTab(`channel-${channel.id}`)}
                    className="w-full flex items-center gap-3 px-6 py-2 text-white hover:bg-zinc-900 transition-colors"
                  >
                    <div className="relative">
                      <span className="text-2xl">{channel.avatar}</span>
                      {channel.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <span className="text-sm truncate flex-1 text-left">{channel.name}</span>
                  </button>
                ))}
                <button className="w-full px-6 py-2 text-sm text-gray-400 hover:bg-zinc-900 text-left">
                  Show 15 more
                </button>
              </div>
            )}
          </div>
        )}

        {sidebarOpen && <div className="border-t border-gray-800 my-2"></div>}

        {/* More Section */}
        <div className="mb-2">
          {moreItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${activeTab === item.id
                ? 'bg-zinc-900 text-white border-r-4 border-white'
                : 'text-white hover:bg-zinc-900'
                } ${!sidebarOpen && 'justify-center px-0'}`}
            >
              <item.icon size={22} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs text-gray-400">{item.badge}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {sidebarOpen && (
          <div className="px-6 py-4 text-xs text-gray-400 space-y-2">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-white">About</a>
              <a href="#" className="hover:text-white">Press</a>
              <a href="#" className="hover:text-white">Copyright</a>
              <a href="#" className="hover:text-white">Contact</a>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-white">Creators</a>
              <a href="#" className="hover:text-white">Advertise</a>
              <a href="#" className="hover:text-white">Developers</a>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-white">Terms</a>
              <a href="#" className="hover:text-white">Privacy</a>
              <a href="#" className="hover:text-white">Policy</a>
            </div>
            <p className="pt-2">© 2025 Sphere</p>
          </div>
        )}
      </nav>
    </div>
  )
};
export default Sidebar;