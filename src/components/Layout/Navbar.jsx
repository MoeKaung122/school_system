import React from 'react';
import { Search, Bell, MessageSquare, ChevronDown, Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white h-20 px-8 flex justify-between items-center border-b border-gray-100 sticky top-0 z-40">
      
      {/* ၁။ ဘယ်ဘက်ခြမ်း - Search Section */}
      <div className="flex items-center space-x-4 flex-1">
        {/* Mobile မှာ Sidebar ဖွင့်ဖို့ Menu Icon (Optional) */}
        <button className="lg:hidden text-gray-500 hover:bg-gray-100 p-2 rounded-xl transition-all">
          <Menu size={20} />
        </button>

        <div className="relative group w-full max-w-md hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search students, results, or fees..." 
            className="block w-full bg-gray-50 border-none rounded-2xl py-2.5 pl-11 pr-4 text-sm font-medium text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all outline-none"
          />
        </div>
      </div>

      {/* ၂။ ညာဘက်ခြမ်း - Action Icons & User Profile */}
      <div className="flex items-center space-x-3 md:space-x-6">
        
        {/* Messages */}
        <button className="relative p-2 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
          <MessageSquare size={22} />
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500 border-2 border-white"></span>
          </span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all">
          <Bell size={22} />
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border-2 border-white"></span>
          </span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-100 mx-2 hidden sm:block"></div>

        {/* User Info */}
        <div className="flex items-center space-x-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-gray-800 group-hover:text-indigo-600 transition-colors">Mr. Admin</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Super Admin</p>
          </div>
          
          <div className="relative">
            <img 
              src="https://ui-avatars.com/api/?name=Admin&background=6366f1&color=fff&bold=true" 
              alt="Admin Profile" 
              className="w-10 h-10 rounded-2xl border-2 border-transparent group-hover:border-indigo-100 object-cover transition-all"
            />
            {/* Online Status Dot */}
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          
          <ChevronDown size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;