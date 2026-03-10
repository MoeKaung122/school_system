import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  GraduationCap, 
  Users, 
  Wallet, 
  ClipboardCheck, 
  FileText, 
  Settings, 
  LogOut,
  BookOpen
} from 'lucide-react';

const Sidebar = () => {
  // Menu Item များကို Array ဖြင့် စနစ်တကျ သိမ်းထားခြင်း
  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={22} />, label: 'Dashboard' },
    { path: '/students', icon: <GraduationCap size={22} />, label: 'Students' },
    { path: '/teachers', icon: <Users size={22} />, label: 'Teachers' },
    { path: '/finance', icon: <Wallet size={22} />, label: 'Accounting' },
    { path: '/attendance', icon: <ClipboardCheck size={22} />, label: 'Attendance' },
    { path: '/exams', icon: <FileText size={22} />, label: 'Exams' },
    { path: '/settings', icon: <Settings size={22} />, label: 'Settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col sticky top-0 left-0 z-50">
      
      {/* ၁။ Logo အပိုင်း */}
      <div className="h-20 flex items-center px-8 border-b border-gray-100">
        <div className="bg-indigo-600 p-2 rounded-xl text-white mr-3 shadow-md shadow-indigo-200">
          <BookOpen size={24} />
        </div>
        <span className="text-2xl font-black text-gray-800 tracking-tight">AKKHOR</span>
      </div>

      {/* ၂။ Main Menu List */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Main Menu</p>
        
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `
              flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 group
              ${isActive 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'
              }
            `}
          >
            <div className="transition-transform group-hover:scale-110">
              {item.icon}
            </div>
            <span className="font-bold text-sm">{item.label}</span>
          </NavLink>
        ))}
      </div>

      {/* ၃။ Logout Button (အောက်ခြေမှာ အမြဲကပ်နေအောင်) */}
      <div className="p-4 border-t border-gray-100">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-2xl transition-all font-bold text-sm group">
          <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;