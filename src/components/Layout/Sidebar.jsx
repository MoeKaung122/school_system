import React, { useState } from 'react';
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
  BookOpen,
  ChevronDown ,
  Calendar// Dropdown အတွက် မျှားခေါင်း Icon ထပ်ထည့်ထားပါတယ်
} from 'lucide-react';

const Sidebar = () => {
  // Dropdown အဖွင့်/အပိတ်ကို မှတ်သားမယ့် State
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (label) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label] // နှိပ်လိုက်တဲ့ Menu ကို ပြောင်းပြန်လုပ်မယ် (ဖွင့်/ပိတ်)
    }));
  };

  // Menu Item များ (Dropdown ပါတဲ့ဟာတွေအတွက် subItems ထည့်ပေးထားပါတယ်)
  const menuItems = [
    { path: '/', icon: <LayoutDashboard size={22} />, label: 'Dashboard' },
    {
      icon: <GraduationCap size={22} />,
      label: 'Students',
      subItems: [
        { path: '/students', label: 'All Students' },
        { path: '/admission', label: 'Admission Form' }
      ]
    },
    {
      icon: <Users size={22} />,
      label: 'Teachers',
      subItems: [
        { path: '/teachers', label: 'All Teachers' },
        { path: '/add-teacher', label: 'Add Teacher' }
      ]
    },
    { path: '/accounting', icon: <Wallet size={22} />, label: 'Accounting' },
    { path: '/attendance', icon: <ClipboardCheck size={22} />, label: 'Attendance' },
    { path: '/exam-results', icon: <FileText size={22} />, label: 'Exams' },
    { path: '/settings', icon: <Settings size={22} />, label: 'Settings' },
    // Sidebar.jsx ထဲက menuItems အပိုင်းမှာ သွားထည့်ရန်
    { path: '/calendar', icon: <Calendar size={22} />, label: 'School Calendar' },
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

        {menuItems.map((item, index) => {
          // Sub-menu (Dropdown) ပါသလား စစ်ဆေးခြင်း
          const hasSubMenu = item.subItems && item.subItems.length > 0;
          const isOpen = openDropdowns[item.label];

          return (
            <div key={index} className="flex flex-col">
              {hasSubMenu ? (
                // --- Dropdown Menu အမေ (Button) ---
                <button
                  onClick={() => toggleDropdown(item.label)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group
                    ${isOpen ? 'text-indigo-600 bg-indigo-50' : 'text-gray-500 hover:bg-indigo-50 hover:text-indigo-600'}
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`transition-transform group-hover:scale-110 ${isOpen ? 'scale-110' : ''}`}>
                      {item.icon}
                    </div>
                    <span className="font-bold text-sm">{item.label}</span>
                  </div>
                  {/* လှည့်သွားမယ့် မျှားခေါင်းလေး */}
                  <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-600' : 'text-gray-400'}`} />
                </button>
              ) : (
                // --- ရိုးရိုး Menu (Link) ---
                <NavLink
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
              )}

              {/* --- Dropdown Sub-menu အခွဲများ (Links) --- */}
              {hasSubMenu && (
                <div
                  className={`
                    overflow-hidden transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'}
                  `}
                >
                  <div className="flex flex-col pl-12 pr-2 py-1 space-y-1 border-l-2 border-indigo-50 ml-6">
                    {item.subItems.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={subItem.path}
                        className={({ isActive }) => `
                          relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all
                          ${isActive
                            ? 'text-indigo-600 bg-indigo-50'
                            : 'text-gray-400 hover:text-indigo-600 hover:bg-indigo-50'
                          }
                        `}
                      >
                        {/* ဝင်ရိုးလေးကို လှအောင် မျဉ်းနဲ့ ဆက်ပေးထားတယ် */}
                        <div className="absolute left-[-18px] top-1/2 w-3 h-[2px] bg-indigo-100"></div>
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
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