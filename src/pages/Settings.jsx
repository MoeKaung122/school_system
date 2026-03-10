import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import { 
  Settings as SettingsIcon, School, Bell, Shield, 
  Save, Globe, Mail, Phone, MapPin, Plus, Trash2 
} from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');

  // Sample Grades & Subjects State
  const [grades, setGrades] = useState(['Grade 9', 'Grade 10', 'Grade 11']);
  const [subjects, setSubjects] = useState(['Mathematics', 'English', 'Physics', 'Chemistry']);

  const tabs = [
    { id: 'General', icon: <School size={18} />, label: 'General' },
    { id: 'Academic', icon: <Globe size={18} />, label: 'Academic' },
    { id: 'Notifications', icon: <Bell size={18} />, label: 'Alerts' },
    { id: 'Security', icon: <Shield size={18} />, label: 'Security' },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Settings</h1>
            <p className="text-sm text-gray-400 font-medium">Configure school information and system preferences</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Tabs */}
            <div className="lg:w-64 space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl font-bold text-sm transition-all ${
                    activeTab === tab.id 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                    : 'bg-white text-gray-400 hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
                
                {activeTab === 'General' && (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <h3 className="text-lg font-black text-gray-800">School Profile</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">School Name</label>
                        <div className="flex items-center bg-gray-50 rounded-2xl px-5 border border-gray-100">
                          <School size={18} className="text-gray-400" />
                          <input className="w-full bg-transparent border-none py-3.5 pl-3 text-sm font-bold outline-none" defaultValue="Future Star International" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Email Address</label>
                        <div className="flex items-center bg-gray-50 rounded-2xl px-5 border border-gray-100">
                          <Mail size={18} className="text-gray-400" />
                          <input className="w-full bg-transparent border-none py-3.5 pl-3 text-sm font-bold outline-none" defaultValue="info@futurestar.com" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Phone Number</label>
                        <div className="flex items-center bg-gray-50 rounded-2xl px-5 border border-gray-100">
                          <Phone size={18} className="text-gray-400" />
                          <input className="w-full bg-transparent border-none py-3.5 pl-3 text-sm font-bold outline-none" defaultValue="09 123456789" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Address</label>
                        <div className="flex items-center bg-gray-50 rounded-2xl px-5 border border-gray-100">
                          <MapPin size={18} className="text-gray-400" />
                          <input className="w-full bg-transparent border-none py-3.5 pl-3 text-sm font-bold outline-none" defaultValue="Yangon, Myanmar" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Academic' && (
                  <div className="space-y-10 animate-in fade-in duration-300">
                    {/* Grade Settings */}
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-black text-gray-800">Grades / Classes</h3>
                        <button className="text-indigo-600 font-bold text-xs flex items-center hover:underline">
                          <Plus size={16} className="mr-1" /> Add Grade
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {grades.map((grade, idx) => (
                          <div key={idx} className="bg-indigo-50 border border-indigo-100 px-4 py-2 rounded-xl flex items-center space-x-3">
                            <span className="text-xs font-black text-indigo-600 uppercase tracking-wide">{grade}</span>
                            <button className="text-indigo-300 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Subject Settings */}
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-black text-gray-800">Active Subjects</h3>
                        <button className="text-indigo-600 font-bold text-xs flex items-center hover:underline">
                          <Plus size={16} className="mr-1" /> Add Subject
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {subjects.map((sub, idx) => (
                          <div key={idx} className="bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-xl flex items-center space-x-3">
                            <span className="text-xs font-black text-emerald-600 uppercase tracking-wide">{sub}</span>
                            <button className="text-emerald-300 hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Changes Button */}
                <div className="mt-12 pt-8 border-t border-gray-50 flex justify-end">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center space-x-2 transition-all">
                    <Save size={20} />
                    <span>Save All Changes</span>
                  </button>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;