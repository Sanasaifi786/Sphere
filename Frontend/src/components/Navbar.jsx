import React from 'react';
import { Search, Mic, Menu, User } from 'lucide-react';

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 h-16 bg-black text-white flex items-center justify-between px-4 z-50 border-b border-gray-800">
            {/* Left Section: Logo & Menu */}
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="p-2 hover:bg-gray-800 rounded-full">
                    <Menu size={24} />
                </button>
                <div className="flex items-center gap-1 cursor-pointer">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-xl">S</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">Sphere</span>
                </div>
            </div>

            {/* Center Section: Search Bar */}
            <div className="flex items-center flex-1 max-w-2xl mx-4">
                <div className="flex flex-1 items-center">
                    <div className="flex w-full items-center bg-[#121212] border border-gray-700 rounded-l-full px-4 py-2 focus-within:border-blue-500 ml-8">
                        <Search size={20} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-transparent border-none outline-none text-white ml-2 w-full placeholder-gray-400"
                        />
                    </div>
                    <button className="bg-[#222] border border-l-0 border-gray-700 px-5 py-2 rounded-r-full hover:bg-[#333]">
                        <Search size={20} className="text-white" />
                    </button>
                </div>
                <button className="ml-4 p-2 bg-[#121212] hover:bg-[#222] rounded-full">
                    <Mic size={20} />
                </button>
            </div>

            {/* Right Section: Login */}
            <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 border border-gray-700 rounded-full px-4 py-1.5 hover:bg-[#263850] hover:border-blue-700 text-blue-400 font-medium text-sm">
                    <User size={20} />
                    <span>Sign in</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
