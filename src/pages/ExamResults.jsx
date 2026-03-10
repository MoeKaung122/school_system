import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import { 
  Award, Search, Filter, Edit3, Save, 
  ChevronRight, AlertCircle, CheckCircle2, XCircle 
} from 'lucide-react';

const ExamResults = () => {
  const [selectedTerm, setSelectedTerm] = useState('First Term');
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');

  // Sample Exam Data
  const [examResults, setExamResults] = useState([
    { id: 1, name: "Aung Aung", roll_no: "1", maths: 85, english: 70, physics: 90, total: 245, status: "Pass" },
    { id: 2, name: "Su Su Myat", roll_no: "2", maths: 45, english: 60, physics: 55, total: 160, status: "Pass" },
    { id: 3, name: "Kyaw Kyaw", roll_no: "3", maths: 30, english: 40, physics: 35, total: 105, status: "Fail" },
    { id: 4, name: "Mya Mya", roll_no: "4", maths: 95, english: 88, physics: 92, total: 275, status: "Pass" },
  ]);

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Exam Results</h1>
              <p className="text-sm text-gray-400 font-medium">Manage student grades and academic performance</p>
            </div>
            
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center space-x-2 transition-all">
              <Save size={18} />
              <span>Publish Results</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-6 items-center">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Exam:</span>
              <select 
                className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option>First Term</option>
                <option>Mid Term</option>
                <option>Final Exam</option>
              </select>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Grade:</span>
              <select 
                className="bg-gray-50 border-none rounded-xl px-4 py-2 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value)}
              >
                <option>Grade 9</option>
                <option>Grade 10</option>
                <option>Grade 11</option>
              </select>
            </div>

            <div className="flex-1 relative min-w-[200px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search by name..." className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-xs font-bold outline-none" />
            </div>
          </div>

          {/* Results Table Card */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-50">
                    <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Roll</th>
                    <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student Name</th>
                    <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Maths</th>
                    <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">English</th>
                    <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Physics</th>
                    <th className="py-5 px-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest bg-indigo-50/30">Total</th>
                    <th className="py-5 px-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Result</th>
                    <th className="py-5 px-6 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {examResults.map((std) => (
                    <tr key={std.id} className="hover:bg-gray-50/30 transition-colors">
                      <td className="py-4 px-8 font-black text-gray-400 text-sm">{std.roll_no}</td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-gray-700 text-sm">{std.name}</p>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input type="number" defaultValue={std.maths} className="w-16 bg-gray-50 border-none rounded-lg py-1.5 text-center text-xs font-bold text-gray-600 focus:ring-1 focus:ring-indigo-200 outline-none" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input type="number" defaultValue={std.english} className="w-16 bg-gray-50 border-none rounded-lg py-1.5 text-center text-xs font-bold text-gray-600 focus:ring-1 focus:ring-indigo-200 outline-none" />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <input type="number" defaultValue={std.physics} className="w-16 bg-gray-50 border-none rounded-lg py-1.5 text-center text-xs font-bold text-gray-600 focus:ring-1 focus:ring-indigo-200 outline-none" />
                      </td>
                      <td className="py-4 px-4 text-center bg-indigo-50/20">
                        <span className="font-black text-indigo-600 text-sm">{std.total}</span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          std.status === 'Pass' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'
                        }`}>
                          {std.status === 'Pass' ? <CheckCircle2 size={12} className="mr-1" /> : <XCircle size={12} className="mr-1" />}
                          {std.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                          <Edit3 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Legend/Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start space-x-4">
              <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><AlertCircle size={20} /></div>
              <div>
                <h4 className="text-xs font-black text-amber-800 uppercase tracking-widest">Grading Note</h4>
                <p className="text-[11px] font-bold text-amber-600 mt-1 leading-relaxed">ဘာသာရပ်တစ်ခုစီတွင် အနည်းဆုံး အမှတ် ၄၀ ရရှိမှသာ "အောင်မြင်သူ" အဖြစ် သတ်မှတ်ပါမည်။ ဂုဏ်ထူးမှတ်မှာ ၈၀ နှင့် အထက် ဖြစ်ပါသည်။</p>
              </div>
            </div>
            
            <div className="p-6 bg-indigo-600 rounded-[2rem] shadow-lg shadow-indigo-100 flex items-center justify-between text-white relative overflow-hidden group">
              <Award className="absolute -right-4 -bottom-4 w-24 h-24 text-white opacity-10 group-hover:scale-110 transition-transform" />
              <div>
                <h4 className="text-xs font-black text-indigo-100 uppercase tracking-widest">Class Average</h4>
                <h3 className="text-2xl font-black mt-1">214.5 <span className="text-sm opacity-60">Avg. Score</span></h3>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                View Charts
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExamResults;