import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, Mic, Menu, User, Star, LogOut, Settings, HelpCircle, LogIn } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = ({ toggleSidebar }) => {
    const { user, logout } = useAuth();
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
                setProfileDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setProfileDropdownOpen(false);
        navigate('/');
    };

    const menuItems = [
        { label: 'Your Channel', description: 'View your channel', icon: User, href: user ? `/c/${user.username}` : '#' },
        { label: 'Settings', description: 'Manage your account', icon: Settings, href: '/settings' },
        { label: 'Help', description: 'Get help and support', icon: HelpCircle, href: '/help' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-black text-white flex items-center justify-between px-4 z-50 border-b border-gray-800">
            {/* Left Section: Logo & Menu */}
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="p-2 hover:bg-gray-800 rounded-full">
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-1 cursor-pointer">
                    <img
                        src={logo}
                        alt="Sphere Logo"
                        className="h-14 object-contain"
                    />
                </div>
            </div>

            {/* Center Section: Search Bar */}
            <div className="flex items-center flex-1 max-w-2xl mx-4">
                <div className="flex flex-1 items-center">
                    <div className="flex w-full items-center bg-[#121212] border border-gray-700 rounded-full px-4 py-2 focus-within:border-blue-500 ml-8">
                        <Search size={20} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-white ml-2 w-full placeholder-gray-400"
                        />
                    </div>
                </div>
                <button className="ml-4 p-2 bg-[#121212] hover:bg-[#222] rounded-full">
                    <Mic size={20} />
                </button>
            </div>

            {/* Right Section: Login */}
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="group relative" ref={profileDropdownRef}>
                        <div
                            className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-semibold cursor-pointer"
                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                        >
                            {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                        </div>
                        <div
                            className={`absolute right-0 pt-4 z-10 ${profileDropdownOpen ? 'block' : 'hidden'}`}
                        >
                            <div className="bg-[#1E1E1E] rounded-lg shadow-2xl border border-gray-700 mt-2 w-80 z-50 overflow-hidden">
                                <div className="bg-gradient-to-r from-pink-400 to-purple-600 p-4 text-white">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                                            {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.username.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white">{user.fullName || user.username}</div>
                                            <div className="text-sm opacity-90 text-gray-200">{user.email}</div>
                                            <div className="text-xs opacity-75 flex items-center mt-1 text-gray-200">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                Premium Member
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-2 max-h-96 overflow-y-auto">
                                    {menuItems.map((item, index) => {
                                        const Icon = item.icon;
                                        return (
                                            <Link
                                                key={index}
                                                to={item.href}
                                                className="flex items-center px-4 py-3 hover:bg-[#2A2A2A] transition-colors duration-150 group"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            >
                                                <div className="w-10 h-10 rounded-lg bg-[#2A2A2A] flex items-center justify-center mr-3 group-hover:bg-[#333] transition-colors duration-150">
                                                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-gray-200 text-sm">{item.label}</div>
                                                    <div className="text-xs text-gray-400">{item.description}</div>
                                                </div>
                                                {item.badge && (
                                                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                                                        {item.badge}
                                                    </span>
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>

                                <div className="border-t border-gray-700 p-2">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg transition-colors duration-150 group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-red-900/20 flex items-center justify-center mr-3 group-hover:bg-red-900/30 transition-colors duration-150">
                                            <LogOut className="w-5 h-5 text-red-400" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="font-medium text-sm">Logout</div>
                                            <div className="text-xs text-red-400/80">Securely log out of your account</div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link to="/login">
                        <button className="flex items-center gap-2 border border-gray-700 rounded-full px-4 py-1.5 hover:bg-[#263850] hover:border-blue-700 text-white-400 font-medium text-sm">
                            <User size={20} />
                            <span>Sign in</span>
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
