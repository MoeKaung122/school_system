import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import {
  ArrowLeft, Edit3, Phone, Mail, MapPin,
  Calendar, CreditCard, Award, BookOpen
} from 'lucide-react';

const StudentProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const student = location.state?.studentData;

  // အကယ်၍ Data မရှိဘဲ ဒီ Page ကို ရောက်လာရင် Dashboard ပြန်လွှတ်မယ်
  if (!student) {
    return (
      <div className="flex h-screen items-center justify-center">
        <button onClick={() => navigate('/')} className="bg-indigo-600 text-white px-6 py-2 rounded-xl">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* Header & Actions */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-gray-400"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Student Profile</h1>
            </div>
            <button
              onClick={() => navigate('/admission', { state: { studentData: student, isEdit: true } })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center space-x-2 transition-all"
            >
              <Edit3 size={18} />
              <span>Edit Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Basic Info Card */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
                <div className="w-32 h-32 bg-indigo-50 rounded-full mx-auto mb-4 flex items-center justify-center text-indigo-500 font-black text-4xl border-4 border-white shadow-md">
                  {student.name.charAt(0)}
                </div>
                <h2 className="text-xl font-black text-gray-800">{student.name}</h2>
                <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mt-1">{student.admission_no}</p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider border border-emerald-100">
                    {student.status || 'Active'}
                  </span>
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider border border-indigo-100">
                    {student.grade}
                  </span>
                </div>
              </div>

              {/* Quick Contact Info */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-5">
                <h3 className="font-black text-gray-800 text-sm uppercase tracking-widest border-b border-gray-50 pb-4">Contact Info</h3>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-50 rounded-2xl text-gray-400"><Phone size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Phone Number</p>
                    <p className="text-sm font-bold text-gray-700">{student.contact_phone || 'N/A'}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-50 rounded-2xl text-gray-400"><MapPin size={18} /></div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-tighter">Address</p>
                    <p className="text-sm font-bold text-gray-700 leading-relaxed">{student.address || 'Yangon, Myanmar'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Tabs/Cards */}
            <div className="lg:col-span-2 space-y-8">

              {/* Academic & Parent Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Parents Card */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><Award size={20} /></div>
                    <h3 className="font-black text-gray-700">Family Info</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Father Name</p>
                      <p className="font-bold text-gray-700">{student.father_name}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mother Name</p>
                      <p className="font-bold text-gray-700">{student.mother_name || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                {/* Academic Status Card */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><BookOpen size={20} /></div>
                    <h3 className="font-black text-gray-700">School Details</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Section / Room</p>
                      <p className="font-bold text-gray-700">{student.section}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enrollment Date</p>
                      <p className="font-bold text-gray-700">June 12, 2025</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance & Fees Stats Placeholder */}
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="font-black text-gray-700 mb-6">Performance & Fees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 font-black text-xs uppercase tracking-widest">Attendance Rate</p>
                      <h4 className="text-2xl font-black text-emerald-700">92%</h4>
                    </div>
                    <Calendar className="text-emerald-200" size={40} />
                  </div>
                  <div className="p-6 bg-rose-50 rounded-[2rem] border border-rose-100 flex items-center justify-between">
                    <div>
                      <p className="text-rose-600 font-black text-xs uppercase tracking-widest">Outstanding Fees</p>
                      <h4 className="text-2xl font-black text-rose-700">0 Ks</h4>
                    </div>
                    <CreditCard className="text-rose-200" size={40} />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentProfile;