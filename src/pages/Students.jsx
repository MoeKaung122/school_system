import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import {
    Search, Filter, Phone, GraduationCap, MapPin,
    Edit2, Trash2, ChevronDown, X
} from 'lucide-react';

const Students = () => {
    // ၁။ ကျောင်းသား Data (Update လုပ်မှာဖြစ်လို့ State ထဲထည့်ထားမယ်)
    const [students, setStudents] = useState([
        { id: "S-1001", name: "Aung Kaung Myat", grade: "Grade 10", parent: "U Ba", phone: "09-440551234", address: "Yangon", status: "Active", gender: "M" },
        { id: "S-1002", name: "Su Myat Noe", grade: "Grade 9", parent: "Daw Hla", phone: "09-770112233", address: "Mandalay", status: "Active", gender: "F" },
        { id: "S-1003", name: "Kyaw Zayar", grade: "Grade 10", parent: "U Mya", phone: "09-254112244", address: "Bago", status: "Pending", gender: "M" },
        { id: "S-1004", name: "Htet Htet Aung", grade: "Grade 8", parent: "U Tun", phone: "09-965223311", address: "Yangon", status: "Active", gender: "F" },
        { id: "S-1005", name: "Zin Min Htet", grade: "Grade 11", parent: "U Zaw", phone: "09-887766554", address: "Taunggyi", status: "Active", gender: "M" },
    ]);

    // ၂။ UI State များ
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("All Grades");
    const [editingStudent, setEditingStudent] = useState(null); // ပြင်ဆင်နေတဲ့ ကျောင်းသားကို သိမ်းဖို့

    // --- DELETE LOGIC ---
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    // --- UPDATE (EDIT) LOGIC ---
    const handleUpdate = (e) => {
        e.preventDefault();
        setStudents(students.map(s => s.id === editingStudent.id ? editingStudent : s));
        setEditingStudent(null); // Modal ပိတ်မယ်
        alert("Student updated successfully!");
    };

    // --- FILTER LOGIC ---
    const filteredStudents = students.filter(student => {
        const matchesSearch =
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGrade = selectedGrade === "All Grades" || student.grade === selectedGrade;
        return matchesSearch && matchesGrade;
    });

    return (
        <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden">
            <Sidebar role="admin" />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <main className="flex-1 overflow-y-auto p-6 lg:p-10 relative">

                    {/* Page Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-gray-800 tracking-tight">All Students</h1>
                            <p className="text-sm text-gray-400 font-medium mt-1">Total {filteredStudents.length} students found</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative">
                                <select
                                    className="appearance-none bg-white border border-gray-100 shadow-sm px-6 py-3.5 pr-12 rounded-2xl text-sm font-black text-gray-700 outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer transition-all"
                                    value={selectedGrade}
                                    onChange={(e) => setSelectedGrade(e.target.value)}
                                >
                                    <option value="All Grades">All Grades</option>
                                    <option value="Grade 11">Grade 11</option>
                                    <option value="Grade 10">Grade 10</option>
                                    <option value="Grade 9">Grade 9</option>
                                    <option value="Grade 8">Grade 8</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                            </div>

                            <div className="relative w-full md:w-80">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search student..."
                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 shadow-sm rounded-2xl text-sm font-bold focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Table Container */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                        <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Grade</th>
                                        <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Parents Info</th>
                                        <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="py-5 px-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredStudents.map((student) => (
                                        <tr key={student.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="py-4 px-8">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${student.gender === 'M' ? 'bg-indigo-50 text-indigo-600' : 'bg-rose-50 text-rose-600'
                                                        }`}>
                                                        {student.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-gray-800 text-sm">{student.name}</p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">{student.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-[11px] font-black text-gray-500 bg-gray-100 px-3 py-1.5 rounded-xl border border-gray-200/50">
                                                    {student.grade}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="font-bold text-gray-700 text-xs">{student.parent}</p>
                                                <p className="text-gray-400 text-[10px] font-black tracking-widest mt-1">{student.phone}</p>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${student.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                                                    }`}>
                                                    {student.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-8 text-right">
                                                <div className="flex items-center justify-end space-x-1">
                                                    <button
                                                        onClick={() => setEditingStudent(student)}
                                                        className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                    >
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(student.id)}
                                                        className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- EDIT MODAL (ပြင်ဆင်ရန် Form) --- */}
                    {editingStudent && (
                        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                            {/* Modal Container ကို ပိုကျယ်ပေးထားပြီး Content များရင် Scroll ဆွဲလို့ရအောင် ပြင်ထားပါတယ် */}
                            <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">

                                {/* Close Button */}
                                <button onClick={() => setEditingStudent(null)} className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors">
                                    <X size={24} />
                                </button>

                                <h2 className="text-xl font-black text-gray-800 mb-6">Edit Student Profile</h2>

                                <form onSubmit={handleUpdate} className="space-y-5">
                                    {/* Grid Layout သုံးပြီး Input တွေကို ဘယ်ညာ ၂ ကော်လံ ခွဲထားပါတယ် */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        {/* 1. Student Name */}
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Student Name</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-5 py-3.5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-sm transition-all"
                                                value={editingStudent.name}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                                                required
                                            />
                                        </div>

                                        {/* 2. Gender */}
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Gender</label>
                                            <select
                                                className="w-full mt-1 px-5 py-3.5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-sm transition-all cursor-pointer"
                                                value={editingStudent.gender}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, gender: e.target.value })}
                                            >
                                                <option value="M">Male</option>
                                                <option value="F">Female</option>
                                            </select>
                                        </div>

                                        {/* 3. Grade */}
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Grade</label>
                                            <select
                                                className="w-full mt-1 px-5 py-3.5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-sm transition-all cursor-pointer"
                                                value={editingStudent.grade}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, grade: e.target.value })}
                                            >
                                                <option value="Grade 8">Grade 8</option>
                                                <option value="Grade 9">Grade 9</option>
                                                <option value="Grade 10">Grade 10</option>
                                                <option value="Grade 11">Grade 11</option>
                                            </select>
                                        </div>

                                        {/* 4. Status */}
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Account Status</label>
                                            <select
                                                className="w-full mt-1 px-5 py-3.5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-sm transition-all cursor-pointer"
                                                value={editingStudent.status}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, status: e.target.value })}
                                            >
                                                <option value="Active">Active</option>
                                                <option value="Pending">Pending</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>

                                        {/* 5. Parent Name */}
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Parent Name</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-5 py-3.5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-sm transition-all"
                                                value={editingStudent.parent}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, parent: e.target.value })}
                                            />
                                        </div>

                                        {/* 6. Phone Number */}
                                        <div>
                                            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Phone Number</label>
                                            <input
                                                type="text"
                                                className="w-full mt-1 px-5 py-3.5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-sm transition-all"
                                                value={editingStudent.phone}
                                                onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    {/* 7. Full Address (နေရာအပြည့်ယူရန်) */}
                                    <div>
                                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Address</label>
                                        <input
                                            type="text"
                                            className="w-full mt-1 px-5 py-3.5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-100 font-bold text-sm transition-all"
                                            value={editingStudent.address}
                                            onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                                        />
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="pt-4 flex gap-4 mt-2">
                                        <button type="submit" className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm shadow-lg shadow-indigo-100 transition-colors uppercase tracking-widest">
                                            Save All Changes
                                        </button>
                                        <button type="button" onClick={() => setEditingStudent(null)} className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl font-black text-sm transition-colors uppercase tracking-widest">
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Students;