import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import RightAside from '../components/Layout/RightAside';
import StatCard from '../components/Shared/StatCard';
import { Link, useNavigate } from 'react-router-dom';
import {
    Users, GraduationCap, UserCheck, UserMinus,
    Search, Edit3, Trash2, Eye
} from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    // --- States ---
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGrade, setSelectedGrade] = useState("All");

    const handleEdit = (student) => {

        navigate('/admission', { state: { studentData: student, isEdit: true } });
    };
    const handleView = (student) => {
        navigate('/student-profile', { state: { studentData: student } });
    };
    const stats = [
        {
            title: "Active Students",
            value: "1,120",
            color: "bg-indigo-500",
            icon: <UserCheck size={24} />,
            trend: "+12 This Month"
        },
        {
            title: "Total Teachers",
            value: "85",
            color: "bg-orange-500",
            icon: <Users size={24} />,
            trend: "Active Now"
        },
        {
            title: "New Enrollment",
            value: "45",
            color: "bg-emerald-500",
            icon: <GraduationCap size={24} />,
            trend: "June Batch"
        },
        {
            title: "Dropped / Out",
            value: "12",
            color: "bg-rose-500",
            icon: <UserMinus size={24} />,
            trend: "-2 Less"
        }
    ];
    // --- Students Data (Database Table အတိုင်း Sample) ---
    const students = [
        {
            admission_no: "ADM-2026-001",
            name: "Aung Aung",
            father_name: "U Ba",
            grade: "Grade 10",
            section: "A",
            enroll_date: "2026-01-15",
            status: "Active"
        },
        {
            admission_no: "ADM-2026-002",
            name: "Su Su Myat",
            father_name: "U Kyaw",
            grade: "Grade 10",
            section: "B",
            enroll_date: "2026-01-20",
            status: "Active"
        },
        {
            admission_no: "ADM-2026-003",
            name: "Kyaw Kyaw",
            father_name: "U Mya",
            grade: "Grade 9",
            section: "A",
            enroll_date: "2025-12-05",
            status: "Dropped"
        },
    ];

    // Grade List ထုတ်ယူခြင်း
    const uniqueGrades = ["All", ...new Set(students.map(s => s.grade))];

    // Filter Logic
    const filteredStudents = students.filter(s => {
        const matchName = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.admission_no.toLowerCase().includes(searchTerm.toLowerCase());
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

                        {/* ၁။ Header & Welcome Section */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                            <div>
                                <h1 className="text-3xl font-black text-gray-800 tracking-tight">School Overview</h1>
                                <p className="text-gray-500 font-medium mt-1">Academic Year: 2025-2026</p>
                            </div>
                            <Link
                                to="/admission"
                                className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center space-x-2"
                            >
                                <GraduationCap size={20} />
                                <span>New Admission</span>
                            </Link>
                        </div>

                        {/* ၂။ Premium Stats Cards Section */}
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

                        {/* ၃။ Student Table Section */}
                        <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">
                            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 space-y-4 xl:space-y-0">
                                <div>
                                    <h2 className="text-xl font-black text-gray-800 tracking-tight">Recent Enrollments</h2>
                                    <p className="text-sm text-gray-400 font-medium mt-1">Managing students database records</p>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 w-full xl:w-auto">
                                    {/* Grade Dropdown */}
                                    <div className="relative flex-1 sm:flex-none">
                                        <select
                                            value={selectedGrade}
                                            onChange={(e) => setSelectedGrade(e.target.value)}
                                            className="w-full bg-gray-50 text-sm font-bold text-gray-600 px-5 py-3 rounded-2xl border-none outline-none focus:ring-2 focus:ring-indigo-100 appearance-none cursor-pointer hover:bg-gray-100 transition-colors"
                                        >
                                            {uniqueGrades.map((g, i) => <option key={i} value={g}>{g === "All" ? "All Grades" : g}</option>)}
                                        </select>
                                    </div>

                                    {/* Search Box */}
                                    <div className="flex items-center bg-gray-50 px-5 py-3 rounded-2xl flex-1 sm:w-64 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white transition-all shadow-sm">
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

                            {/* Table Area */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-gray-400 text-[11px] font-black uppercase tracking-[0.15em] border-b border-gray-100">
                                            <th className="pb-5 pl-2">Student / Admission</th>
                                            <th className="pb-5">Parent (Father)</th>
                                            <th className="pb-5 text-center">Class / Section</th>
                                            <th className="pb-5">Status</th>
                                            <th className="pb-5 text-right pr-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((std) => (
                                                <tr key={std.admission_no} className="hover:bg-indigo-50/30 transition-colors group">
                                                    <td className="py-5 pl-2">
                                                        <p className="font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">{std.name}</p>
                                                        <p className="text-[11px] font-bold text-gray-400 mt-1 uppercase tracking-wider">{std.admission_no}</p>
                                                    </td>
                                                    <td className="py-5 text-sm font-bold text-gray-600">
                                                        {std.father_name}
                                                    </td>
                                                    <td className="py-5 text-center">
                                                        <span className="text-sm font-black text-gray-700">{std.grade}</span>
                                                        <span className="ml-2 bg-gray-100 text-gray-600 group-hover:bg-indigo-100 group-hover:text-indigo-600 text-[10px] font-black px-2 py-1 rounded-lg transition-colors">
                                                            Sec {std.section}
                                                        </span>
                                                    </td>
                                                    <td className="py-5">
                                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase ${std.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                                                            }`}>
                                                            {std.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-5 text-right pr-2">
                                                        <div className="flex items-center justify-end space-x-2">
                                                            {/* View Button */}
                                                            <button
                                                                onClick={() => handleView(std)} // 'std' ဆိုတာ map ထဲက ကျောင်းသား
                                                                className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                                                            >
                                                                <Eye size={18} />
                                                            </button>
                                                            {/* Edit Button */}
                                                            <button
                                                                onClick={() => handleEdit(std)}
                                                                className="p-2.5 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"
                                                            >
                                                                <Edit3 size={18} />
                                                            </button>

                                                            {/* Delete Button */}
                                                            <button
                                                                onClick={() => handleDelete(std.admission_no)}
                                                                className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="py-12 text-center text-gray-400 font-medium">
                                                    No students found matching your criteria.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </main>

                    <RightAside />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;