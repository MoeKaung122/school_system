import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import { Save, FileText, CheckCircle } from 'lucide-react';

const ExamsPage = () => {
    // ဥပမာ ဒေတာ (တကယ်တမ်း Backend က လာရမှာပါ)
    const [marks, setMarks] = useState([
        { id: "ADM-2026-001", name: "Aung Aung", myanmar: 85, english: 70, math: 95 },
        { id: "ADM-2026-002", name: "Su Su Myat", myanmar: 75, english: 88, math: 82 },
        { id: "ADM-2026-003", name: "Kyaw Kyaw", myanmar: 60, english: 55, math: 40 },
    ]);

    const handleMarkChange = (id, subject, value) => {
        setMarks(marks.map(m => m.id === id ? { ...m, [subject]: parseInt(value) || 0 } : m));
    };

    return (
        <div className="flex h-screen bg-[#f8f9fc] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h1 className="text-3xl font-black text-gray-800 tracking-tight">Exam Mark Entry</h1>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] mt-1">First Semester - Grade 10 (A)</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-8 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100">
                            <Save size={18} />
                            <span>Save All Marks</span>
                        </button>
                    </div>

                    {/* Filter Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <select className="bg-white border-none rounded-2xl px-6 py-4 font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-100 outline-none">
                            <option>Grade 10</option>
                            <option>Grade 9</option>
                        </select>
                        <select className="bg-white border-none rounded-2xl px-6 py-4 font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-100 outline-none">
                            <option>Section A</option>
                            <option>Section B</option>
                        </select>
                        <select className="bg-white border-none rounded-2xl px-6 py-4 font-bold text-gray-700 shadow-sm focus:ring-2 focus:ring-indigo-100 outline-none">
                            <option>First Term Exam</option>
                            <option>Final Exam</option>
                        </select>
                    </div>

                    {/* Mark Entry Table */}
                    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <table className="w-full">
                            <thead>
                                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest border-b border-gray-50">
                                    <th className="pb-6 text-left pl-4">Student Name</th>
                                    <th className="pb-6 text-center">Myanmar</th>
                                    <th className="pb-6 text-center">English</th>
                                    <th className="pb-6 text-center">Math</th>
                                    <th className="pb-6 text-center">Total</th>
                                    <th className="pb-6 text-center">Result</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {marks.map((student) => {
                                    const total = student.myanmar + student.english + student.math;
                                    const isFail = student.myanmar < 40 || student.english < 40 || student.math < 40;

                                    return (
                                        <tr key={student.id} className="hover:bg-gray-50/50 transition-all">
                                            <td className="py-6 pl-4">
                                                <p className="font-black text-gray-800">{student.name}</p>
                                                <p className="text-[10px] text-gray-400 font-bold uppercase">{student.id}</p>
                                            </td>
                                            <td className="py-6">
                                                <input 
                                                    type="number" 
                                                    value={student.myanmar} 
                                                    onChange={(e) => handleMarkChange(student.id, 'myanmar', e.target.value)}
                                                    className="w-16 mx-auto block bg-gray-50 border-none rounded-xl py-2 px-2 text-center font-bold focus:ring-2 focus:ring-indigo-100 outline-none"
                                                />
                                            </td>
                                            <td className="py-6">
                                                <input 
                                                    type="number" 
                                                    value={student.english} 
                                                    onChange={(e) => handleMarkChange(student.id, 'english', e.target.value)}
                                                    className="w-16 mx-auto block bg-gray-50 border-none rounded-xl py-2 px-2 text-center font-bold focus:ring-2 focus:ring-indigo-100 outline-none"
                                                />
                                            </td>
                                            <td className="py-6">
                                                <input 
                                                    type="number" 
                                                    value={student.math} 
                                                    onChange={(e) => handleMarkChange(student.id, 'math', e.target.value)}
                                                    className="w-16 mx-auto block bg-gray-50 border-none rounded-xl py-2 px-2 text-center font-bold focus:ring-2 focus:ring-indigo-100 outline-none"
                                                />
                                            </td>
                                            <td className="py-6 text-center">
                                                <span className="font-black text-indigo-600 text-lg">{total}</span>
                                            </td>
                                            <td className="py-6 text-center">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isFail ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                                                    {isFail ? 'Fail' : 'Pass'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ExamsPage;