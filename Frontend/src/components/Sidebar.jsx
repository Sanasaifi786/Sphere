import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home, TrendingUp, Film, Library, Clock, ThumbsUp, ListVideo, History, PlaySquare,
  Settings, HelpCircle, MessageSquare, ChevronDown, ChevronRight
} from 'lucide-react';
import { getSubscribedChannels } from '../api/subscription.api';
import { useAuth } from '../context/AuthContext';

// Desktop Sidebar
function Sidebar({ sidebarOpen }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showSubscriptions, setShowSubscriptions] = useState(true);
  const [subscribedChannels, setSubscribedChannels] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchSubscribedChannels = async () => {
      if (user?._id) {
        try {
          const response = await getSubscribedChannels(user._id);
          if (response.success) {
            setSubscribedChannels(response.data);
          }
        } catch (error) {
          console.error("Error fetching subscribed channels:", error);
        }
      } else {
        setSubscribedChannels([]);
      }
    };

    fetchSubscribedChannels();
  }, [user]);

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
        <div className="mb-2 ml-2">
          {sidebarOpen && (
            <h3 className="px-6 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wide">
              Home
            </h3>
          )}
          {mainNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === 'home') {
                  navigate('/');
                } else if (item.id === 'trending') {
                  navigate('/trending');
                }
              }}
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
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === 'liked') {
                  navigate('/liked-videos');
                } else if (item.id === 'history') {
                  navigate('/history');
                }
              }}
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
        {sidebarOpen && user && (
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
                {subscribedChannels
                  .filter(sub => sub.subscribedChannel) // Filter out invalid subscriptions
                  .slice(0, isExpanded ? undefined : 5)
                  .map(sub => (
                    <button
                      key={sub.subscribedChannel._id}
                      onClick={() => {
                        setActiveTab(`channel-${sub.subscribedChannel._id}`);
                        navigate(`/c/${sub.subscribedChannel.username}`);
                      }}
                      className="w-full flex items-center gap-3 px-6 py-2 text-white hover:bg-zinc-900 transition-colors"
                    >
                      <div className="relative">
                        {sub.subscribedChannel.avatar ? (
                          <img src={sub.subscribedChannel.avatar} alt={sub.subscribedChannel.username} className="w-6 h-6 rounded-full object-cover" />
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-xs font-bold">
                            {sub.subscribedChannel.username.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <span className="text-sm truncate flex-1 text-left">{sub.subscribedChannel.fullName}</span>
                    </button>
                  ))}
                {subscribedChannels.length === 0 && (
                  <div className="px-6 py-2 text-sm text-gray-500">No subscriptions yet</div>
                )}
                {subscribedChannels.filter(sub => sub.subscribedChannel).length > 5 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full px-6 py-2 text-sm text-gray-400 hover:bg-zinc-900 text-left flex items-center gap-2"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronDown size={16} className="rotate-180" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        Show more
                      </>
                    )}
                  </button>
                )}
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