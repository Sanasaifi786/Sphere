
  // Desktop Sidebar
function Sidebar(){
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
    { id: 'subscriptions', icon: Film, label: 'Subscriptions', badge: 12 },
  ];

  const libraryItems = [
    { id: 'library', icon: Library, label: 'Library', badge: null },
    { id: 'watch-later', icon: Clock, label: 'Watch Later', badge: 23 },
    { id: 'liked', icon: ThumbsUp, label: 'Liked Videos', badge: null },
    { id: 'playlists', icon: ListVideo, label: 'Playlists', badge: 8 },
    { id: 'history', icon: History, label: 'Watch History', badge: null },
    { id: 'your-videos', icon: PlaySquare, label: 'Your Videos', badge: 5 },
  ];

  const exploreItems = [
    { id: 'gaming', icon: Gamepad2, label: 'Gaming', color: 'text-purple-500' },
    { id: 'music', icon: Music, label: 'Music', color: 'text-red-500' },
    { id: 'news', icon: Newspaper, label: 'News', color: 'text-blue-500' },
    { id: 'sports', icon: Trophy, label: 'Sports', color: 'text-green-500' },
    { id: 'education', icon: GraduationCap, label: 'Education', color: 'text-yellow-600' },
  ];

  const moreItems = [
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'help', icon: HelpCircle, label: 'Help' },
    { id: 'feedback', icon: MessageSquare, label: 'Send Feedback' },
  ];
    return (
    <div className={`fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 overflow-y-auto z-40 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
      <nav className="py-2">
        {/* Main Navigation */}
        <div className="mb-2">
          {mainNavItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${
                activeTab === item.id 
                  ? 'bg-red-50 text-red-600 border-r-4 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${!sidebarOpen && 'justify-center px-0'}`}
            >
              <item.icon size={24} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {sidebarOpen && <div className="border-t border-gray-200 my-2"></div>}

        {/* Library Section */}
        <div className="mb-2">
          {sidebarOpen && (
            <h3 className="px-6 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Library
            </h3>
          )}
          {libraryItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${
                activeTab === item.id 
                  ? 'bg-red-50 text-red-600 border-r-4 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${!sidebarOpen && 'justify-center px-0'}`}
            >
              <item.icon size={22} />
              {sidebarOpen && (
                <>
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.badge && (
                    <span className="text-xs text-gray-500">{item.badge}</span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>

        {sidebarOpen && <div className="border-t border-gray-200 my-2"></div>}

        {/* Subscriptions */}
        {sidebarOpen && (
          <div className="mb-2">
            <button
              onClick={() => setShowSubscriptions(!showSubscriptions)}
              className="w-full flex items-center justify-between px-6 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide hover:bg-gray-50"
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
                    className="w-full flex items-center gap-3 px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
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
                <button className="w-full px-6 py-2 text-sm text-red-600 hover:bg-gray-100 text-left">
                  Show 15 more
                </button>
              </div>
            )}
          </div>
        )}

        {sidebarOpen && <div className="border-t border-gray-200 my-2"></div>}

        {/* Explore Section */}
        <div className="mb-2">
          {sidebarOpen && (
            <h3 className="px-6 py-2 text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Explore
            </h3>
          )}
          {exploreItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${
                activeTab === item.id 
                  ? 'bg-red-50 text-red-600 border-r-4 border-red-600' 
                  : `${item.color} hover:bg-gray-100`
              } ${!sidebarOpen && 'justify-center px-0'}`}
            >
              <item.icon size={22} />
              {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
            </button>
          ))}
        </div>

        {sidebarOpen && <div className="border-t border-gray-200 my-2"></div>}

        {/* More Section */}
        <div className="mb-2">
          {moreItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-3 transition-colors ${
                activeTab === item.id 
                  ? 'bg-red-50 text-red-600 border-r-4 border-red-600' 
                  : 'text-gray-700 hover:bg-gray-100'
              } ${!sidebarOpen && 'justify-center px-0'}`}
            >
              <item.icon size={22} />
              {sidebarOpen && <span className="flex-1 text-left">{item.label}</span>}
            </button>
          ))}
        </div>

        {sidebarOpen && (
          <div className="px-6 py-4 text-xs text-gray-500 space-y-2">
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-gray-700">About</a>
              <a href="#" className="hover:text-gray-700">Press</a>
              <a href="#" className="hover:text-gray-700">Copyright</a>
              <a href="#" className="hover:text-gray-700">Contact</a>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-gray-700">Creators</a>
              <a href="#" className="hover:text-gray-700">Advertise</a>
              <a href="#" className="hover:text-gray-700">Developers</a>
            </div>
            <div className="flex flex-wrap gap-2">
              <a href="#" className="hover:text-gray-700">Terms</a>
              <a href="#" className="hover:text-gray-700">Privacy</a>
              <a href="#" className="hover:text-gray-700">Policy</a>
            </div>
            <p className="pt-2">© 2024 VidHub</p>
          </div>
        )}
      </nav>
    </div>
  )
};
export default Sidebar;