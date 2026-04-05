import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
// import RightAside from '../components/Layout/RightAside';
import StatCard from '../components/Shared/StatCard';
import { Link, useNavigate } from 'react-router-dom';
import {
    Users, GraduationCap, UserCheck, UserMinus,
    Search, Edit3, Trash2, Eye,
    DollarSign, Calendar, PlusCircle, FileText, Bell
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();

    // --- States ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("All");
    const [showEventModal, setShowEventModal] = useState(false);
    const [events, setEvents] = useState([
        { date: "Tomorrow", title: "Staff Meeting at 9:00 AM", type: "urgent" },
        { date: "March 20", title: "Grade 10 Final Exams Begin", type: "normal" }
    ]);
    const [newEvent, setNewEvent] = useState({ title: "", date: "" });

    // Navigation Handlers
    const handleEdit = (student) => {
        navigate('/admission', { state: { studentData: student, isEdit: true } });
    };
    const handleView = (student) => {
        navigate('/student-profile', { state: { studentData: student } });
    };
    const handleDelete = (id) => {
        alert(`Delete student ID: ${id}`);
    };

    // --- Data ---
    const quickActions = [
        { label: "Add Student", icon: <PlusCircle size={18} />, path: "/admission", color: "text-indigo-600 bg-indigo-50 border border-indigo-100" },
        { label: "Collect Fee", icon: <DollarSign size={18} />, path: "/fees", color: "text-emerald-600 bg-emerald-50 border border-emerald-100" },
        { label: "Attendance", icon: <UserCheck size={18} />, path: "/attendance", color: "text-amber-600 bg-amber-50 border border-amber-100" },
        { label: "Exam Marks", icon: <FileText size={18} />, path: "/exams", color: "text-rose-600 bg-rose-50 border border-rose-100" },
    ];

    const stats = [
        { title: "Active Students", value: "1,120", color: "bg-indigo-500", icon: <UserCheck size={24} />, trend: "+12 This Month" },
        { title: "Total Teachers", value: "85", color: "bg-orange-500", icon: <Users size={24} />, trend: "Active Now" },
        { title: "New Enrollment", value: "45", color: "bg-emerald-500", icon: <GraduationCap size={24} />, trend: "June Batch" },
        { title: "Dropped / Out", value: "12", color: "bg-rose-500", icon: <UserMinus size={24} />, trend: "-2 Less" }
    ];

    const students = [
        { admission_no: "ADM-2026-001", name: "Aung Aung", father_name: "U Ba", grade: "Grade 10", section: "A", enroll_date: "2026-01-15", status: "Active" },
        { admission_no: "ADM-2026-002", name: "Su Su Myat", father_name: "U Kyaw", grade: "Grade 10", section: "B", enroll_date: "2026-01-20", status: "Active" },
        { admission_no: "ADM-2026-003", name: "Kyaw Kyaw", father_name: "U Mya", grade: "Grade 9", section: "A", enroll_date: "2025-12-05", status: "Dropped" },
    ];

    const uniqueGrades = ["All", ...new Set(students.map(s => s.grade))];
    const filteredStudents = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.admission_no.toLowerCase().includes(searchTerm.toLowerCase());
        const matchGrade = selectedGrade === "All" || s.grade === selectedGrade;
        return matchName && matchGrade;
    });

    return (
        <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <div className="flex-1 flex overflow-hidden">
                    <main className="flex-1 overflow-y-auto p-6 lg:p-10">

                        {/* ========================================= */}
                        {/* အပိုင်း ၁။ Header & Quick Actions */}
                        {/* ========================================= */}
                        <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
                            <div>
                                <h1 className="text-3xl font-black text-gray-800 tracking-tight">School Overview</h1>
                                <p className="text-gray-400 font-bold mt-1 text-sm uppercase tracking-widest">Academic Year: 2025-2026</p>
                            </div>

                            {/* Quick Action Buttons */}
                            <div className="flex flex-wrap gap-3">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => navigate(action.path)}
                                        className={`flex items-center space-x-2 px-5 py-3 rounded-2xl font-black text-[11px] uppercase tracking-wider transition-all hover:shadow-md ${action.color}`}
                                    >
                                        {action.icon}
                                        <span>{action.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* ========================================= */}
                        {/* အပိုင်း ၂။ Top Stats Cards (4 ခု) */}
                        {/* ========================================= */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                            {stats.map((item, index) => (
                                <StatCard
                                    key={index}
                                    title={item.title}
                                    value={item.value}
                                    color={item.color}
                                    icon={item.icon}
                                    trend={item.trend}
                                />
                            ))}
                        </div>

                        {/* ========================================= */}
                        {/* အပိုင်း ၃။ Middle Section (Finance & Notices) */}
                        {/* ========================================= */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">

                            {/* ဘယ်ဘက် - Financial Progress */}
                            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-black text-gray-800 tracking-tight">Fee Collection Progress</h3>
                                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Live</span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-gray-50 h-4 rounded-full mb-8 overflow-hidden border border-gray-100 p-1">
                                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                {/* Amounts */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Received</p>
                                        <p className="text-lg font-black text-gray-800">4.5M <span className="text-xs opacity-50 font-bold">Ks</span></p>
                                    </div>
                                    <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                                        <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest">Pending</p>
                                        <p className="text-lg font-black text-gray-800">1.2M <span className="text-xs opacity-50 font-bold">Ks</span></p>
                                    </div>
                                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Target</p>
                                        <p className="text-lg font-black text-gray-800">5.7M <span className="text-xs opacity-50 font-bold">Ks</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* ညာဘက် - Notice Board / Announcements */}
                            <div className="bg-indigo-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-lg font-black flex items-center">
                                            <Bell size={20} className="mr-3 text-amber-400" /> Notice Board
                                        </h3>
                                        <button
                                            onClick={() => setShowEventModal(true)}
                                            className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all"
                                        >
                                            <PlusCircle size={18} />
                                        </button>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="border-l-4 border-amber-400 pl-4 py-1">
                                            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Tomorrow</p>
                                            <p className="text-sm font-bold mt-1">Staff Meeting at 9:00 AM</p>
                                        </div>
                                        <div className="border-l-4 border-indigo-400 pl-4 py-1">
                                            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">March 20</p>
                                            <p className="text-sm font-bold mt-1 opacity-80">Grade 10 Final Exams Begin</p>
                                        </div>
                                    </div>
                                </div>
                                <button className="mt-6 w-full bg-white/10 hover:bg-white/20 text-white text-xs font-black uppercase tracking-widest rounded-xl py-3 transition-colors">
                                    View All
                                </button>
                            </div>
                        </div>

                        {/* ========================================= */}
                        {/* အပိုင်း ၄။ Student Table Section */}
                        {/* ========================================= */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">

                            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 space-y-4 xl:space-y-0">
                                <div>
                                    <h2 className="text-xl font-black text-gray-800 tracking-tight">Recent Enrollments</h2>
                                    <p className="text-sm text-gray-400 font-medium mt-1">Manage student database records</p>
                                </div>

                                {/* Table Filters */}
                                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                                    <div className="relative flex-1 sm:flex-none">
                                        <select
                                            value={selectedGrade}
                                            onChange={(e) => setSelectedGrade(e.target.value)}
                                            className="w-full bg-gray-50 text-sm font-bold text-gray-600 px-5 py-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                                        >
                                            {uniqueGrades.map((g, i) => <option key={i} value={g}>{g === "All" ? "All Grades" : g}</option>)}
                                        </select>
                                    </div>
                                    <div className="flex items-center bg-gray-50 px-5 py-3 rounded-2xl flex-1 sm:w-64 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                                        <Search size={18} className="text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Admission No or Name..."
                                            className="bg-transparent border-none outline-none ml-3 text-sm font-medium text-gray-700 w-full"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-gray-400 text-[11px] font-black uppercase tracking-[0.15em] border-b border-gray-50">
                                            <th className="pb-5 pl-2">Student Info</th>
                                            <th className="pb-5">Parent</th>
                                            <th className="pb-5 text-center">Class</th>
                                            <th className="pb-5 text-center">Status</th>
                                            <th className="pb-5 text-right pr-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((std) => (
                                                <tr key={std.admission_no} className="hover:bg-indigo-50/30 transition-colors group">
                                                    <td className="py-4 pl-2">
                                                        <p className="font-bold text-gray-800">{std.name}</p>
                                                        <p className="text-[10px] font-black text-gray-400 mt-1 uppercase tracking-wider">{std.admission_no}</p>
                                                    </td>
                                                    <td className="py-4 text-sm font-bold text-gray-600">{std.father_name}</td>
                                                    <td className="py-4 text-center">
                                                        <span className="text-sm font-black text-gray-700">{std.grade}</span>
                                                        <span className="ml-2 bg-gray-100 text-gray-600 text-[10px] font-black px-2 py-1 rounded-lg">Sec {std.section}</span>
                                                    </td>
                                                    <td className="py-4 text-center">
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${std.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                                            {std.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-right pr-2">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            <button onClick={() => handleView(std)} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"><Eye size={16} /></button>
                                                            <button onClick={() => handleEdit(std)} className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"><Edit3 size={16} /></button>
                                                            <button onClick={() => handleDelete(std.admission_no)} className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="py-12 text-center text-gray-400 font-bold">No students found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </main>
{/* 
                    <RightAside /> */}
                </div>
            </div>
            {showEventModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl">
                        <h2 className="text-2xl font-black text-gray-800 mb-6">Add New Event</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Event Title</label>
                                <input
                                    type="text"
                                    placeholder="e.g. School Holiday"
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 mt-1 font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-2">Date</label>
                                <input
                                    type="text"
                                    placeholder="e.g. March 25"
                                    className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 mt-1 font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={() => setShowEventModal(false)}
                                className="flex-1 py-4 rounded-2xl font-black text-gray-400 hover:bg-gray-50 transition-all"
                            >
                                CANCEL
                            </button>
                            <button
                                onClick={() => {
                                    setEvents([...events, { ...newEvent, type: "normal" }]);
                                    setShowEventModal(false);
                                }}
                                className="flex-1 py-4 rounded-2xl font-black bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                            >
                                SAVE EVENT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;