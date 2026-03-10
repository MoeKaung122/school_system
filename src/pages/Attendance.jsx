import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import { 
  CheckCircle2, XCircle, Search, Calendar as CalendarIcon, 
  ChevronRight, Filter, Save, AlertCircle 
} from 'lucide-react';

const Attendance = () => {
  // ယနေ့ရက်စွဲ
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');

  // Sample Students Data (နောက်ပိုင်း Grade အလိုက် Filter လုပ်ရမှာပါ)
  const [students, setStudents] = useState([
    { id: 1, name: "Aung Aung", roll_no: "1", status: "Present" },
    { id: 2, name: "Su Su Myat", roll_no: "2", status: "Present" },
    { id: 3, name: "Kyaw Kyaw", roll_no: "3", status: "Absent" },
    { id: 4, name: "Mya Mya", roll_no: "4", status: "Present" },
    { id: 5, name: "Hla Hla", roll_no: "5", status: "Present" },
  ]);

  // Attendance Status ပြောင်းတဲ့ Function
  const toggleStatus = (id, newStatus) => {
    setStudents(students.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const handleSaveAttendance = () => {
    const presentCount = students.filter(s => s.status === 'Present').length;
    alert(`${selectedDate} အတွက် ${selectedGrade} ကျောင်းတက်စာရင်း သိမ်းဆည်းပြီးပါပြီ။ (တက် - ${presentCount}, ပျက် - ${students.length - presentCount})`);
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
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Attendance</h1>
              <p className="text-sm text-gray-400 font-medium">Daily student presence tracking</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="bg-white px-4 py-2.5 rounded-2xl border border-gray-100 shadow-sm flex items-center space-x-2">
                <CalendarIcon size={18} className="text-indigo-500" />
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-sm font-bold text-gray-700 outline-none border-none bg-transparent cursor-pointer"
                />
              </div>
              <button 
                onClick={handleSaveAttendance}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center space-x-2 transition-all"
              >
                <Save size={18} />
                <span>Save All</span>
              </button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-6 items-center">
             <div className="flex items-center space-x-3">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Select Class:</span>
                <select 
                  value={selectedGrade}
                  onChange={(e) => setSelectedGrade(e.target.value)}
                  className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  <option>Grade 9</option>
                  <option>Grade 10</option>
                  <option>Grade 11</option>
                </select>
             </div>
             <div className="h-6 w-[1px] bg-gray-100 hidden md:block"></div>
             <div className="flex-1 relative min-w-[200px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input type="text" placeholder="Search student name..." className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none" />
             </div>
          </div>

          {/* Attendance Table Card */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gray-50/50 border-b border-gray-50 flex items-center justify-between">
               <h3 className="text-sm font-black text-gray-700 uppercase tracking-wider">{selectedGrade} Students</h3>
               <div className="flex space-x-4">
                  <div className="flex items-center space-x-1.5">
                     <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full"></div>
                     <span className="text-[10px] font-black text-gray-400 uppercase">Present: {students.filter(s=>s.status === 'Present').length}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                     <div className="w-2.5 h-2.5 bg-rose-500 rounded-full"></div>
                     <span className="text-[10px] font-black text-gray-400 uppercase">Absent: {students.filter(s=>s.status === 'Absent').length}</span>
                  </div>
               </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Roll</th>
                  <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Name</th>
                  <th className="py-5 px-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50/30 transition-colors">
                    <td className="py-4 px-8 font-black text-gray-400 text-sm">{student.roll_no}</td>
                    <td className="py-4 px-6">
                       <p className="font-bold text-gray-700 text-sm">{student.name}</p>
                    </td>
                    <td className="py-4 px-6">
                       <div className="flex items-center justify-center space-x-2">
                          <button 
                            onClick={() => toggleStatus(student.id, 'Present')}
                            className={`flex items-center space-x-1 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                              student.status === 'Present' 
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 shadow-sm' 
                              : 'bg-white text-gray-300 border border-gray-50 grayscale hover:grayscale-0 hover:text-emerald-500'
                            }`}
                          >
                            <CheckCircle2 size={14} />
                            <span>Present</span>
                          </button>
                          
                          <button 
                            onClick={() => toggleStatus(student.id, 'Absent')}
                            className={`flex items-center space-x-1 px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                              student.status === 'Absent' 
                              ? 'bg-rose-50 text-rose-600 border border-rose-100 shadow-sm' 
                              : 'bg-white text-gray-300 border border-gray-50 grayscale hover:grayscale-0 hover:text-rose-500'
                            }`}
                          >
                            <XCircle size={14} />
                            <span>Absent</span>
                          </button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-4">
             <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><AlertCircle size={20} /></div>
             <div>
                <h4 className="text-sm font-black text-amber-800 uppercase tracking-widest">Attendance Policy</h4>
                <p className="text-xs font-bold text-amber-600 mt-1 leading-relaxed">ကျောင်းတက်စာရင်းကို ညနေ ၄ နာရီမတိုင်ခင် အပြီးသတ်ပေးပို့ပေးပါ။ ကျောင်းသားတစ်ဦး ပျက်ကွက်ပါက မိဘထံသို့ အလိုအလျောက် SMS ပေးပို့သွားမည် ဖြစ်ပါသည်။</p>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;