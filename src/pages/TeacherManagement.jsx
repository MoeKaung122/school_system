import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import { 
  Plus, Search, Mail, Phone, BookOpen, 
  MoreVertical, Edit2, Trash2, X, Save, GraduationCap 
} from 'lucide-react';

const TeacherManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sample Teacher Data
  const [teachers, setTeachers] = useState([
    { 
      id: 1, 
      name: "Daw Aye Aye", 
      subject: "Mathematics", 
      email: "ayeaye@school.com", 
      phone: "09123456789", 
      grade: "Grade 10, 11", 
      status: "Active" 
    },
    { 
      id: 2, 
      name: "U Ba Nyunt", 
      subject: "Physics", 
      email: "banyunt@school.com", 
      phone: "09987654321", 
      grade: "Grade 11", 
      status: "Active" 
    }
  ]);

  // Form State for New Teacher
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
    qualification: '',
    joined_date: new Date().toISOString().split('T')[0],
    assigned_grades: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTeacher = {
      id: Date.now(),
      ...formData,
      status: "Active"
    };
    setTeachers([newTeacher, ...teachers]);
    setIsModalOpen(false);
    setFormData({ name: '', subject: '', email: '', phone: '', qualification: '', joined_date: '', assigned_grades: '' });
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Teacher Management</h1>
              <p className="text-sm text-gray-400 font-medium">Manage faculty members and academic assignments</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2 transition-all"
            >
              <Plus size={20} />
              <span>Add New Teacher</span>
            </button>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search by name, subject or email..." 
                className="w-full bg-gray-50 border-none rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
              />
            </div>
          </div>

          {/* Teacher Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
                <button className="absolute top-6 right-6 text-gray-300 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black text-xl">
                    {teacher.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-800 text-lg">{teacher.name}</h3>
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                      {teacher.subject}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-500 space-x-3">
                    <div className="p-2 bg-gray-50 rounded-lg"><Mail size={14} /></div>
                    <span className="text-xs font-bold">{teacher.email}</span>
                  </div>
                  <div className="flex items-center text-gray-500 space-x-3">
                    <div className="p-2 bg-gray-50 rounded-lg"><Phone size={14} /></div>
                    <span className="text-xs font-bold">{teacher.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-500 space-x-3">
                    <div className="p-2 bg-gray-50 rounded-lg"><BookOpen size={14} /></div>
                    <span className="text-xs font-bold">Assigned: {teacher.grade}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                   <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center">
                     <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div> {teacher.status}
                   </span>
                   <div className="flex space-x-2">
                      <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Edit2 size={16} /></button>
                      <button className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* --- ADD TEACHER MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl overflow-hidden">
            <div className="bg-indigo-600 p-8 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black">Register Teacher</h2>
                <p className="text-indigo-100 text-xs mt-1">Fill in the professional details of the new faculty member</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-indigo-500 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Full Name *</label>
                <input 
                  required
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100" 
                  placeholder="e.g. Daw Aye Aye"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Main Subject *</label>
                <select 
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                >
                  <option value="">Select Subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="English">English</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Phone Number</label>
                <input 
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100" 
                  placeholder="09..." 
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Qualification / Education</label>
                <div className="flex items-center bg-gray-50 rounded-2xl px-5">
                  <GraduationCap size={18} className="text-gray-400" />
                  <input 
                    className="w-full bg-transparent border-none py-3.5 pl-3 text-sm font-bold outline-none" 
                    placeholder="e.g. M.Sc (Maths), B.Ed"
                    onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                  />
                </div>
              </div>

              <div className="col-span-2 pt-4 border-t border-gray-50 flex justify-end space-x-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-2xl font-black text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="bg-indigo-600 text-white px-10 py-3 rounded-2xl font-black shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center space-x-2"
                >
                  <Save size={18} />
                  <span>Save Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherManagement;