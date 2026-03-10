import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import { Save, ArrowLeft, UserPlus, Phone, MapPin, Users } from 'lucide-react';

const StudentAdmission = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Dashboard ကနေ Edit နှိပ်ပြီး ဝင်လာတဲ့ Data ရှိမရှိ စစ်ဆေးခြင်း
  const editData = location.state?.studentData;
  const isEdit = location.state?.isEdit;

  // Form State
  const [formData, setFormData] = useState({
    admission_no: '',
    student_name: '',
    grade_id: '',
    section: '',
    father_name: '',
    mother_name: '',
    contact_phone: '',
    address: '',
    academic_year: '2025-2026',
    status: 'Active'
  });

  // Edit နှိပ်လာခဲ့ရင် Form ထဲကို Data တွေ အလိုအလျောက် ဖြည့်ပေးမယ့် Effect
  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        admission_no: editData.admission_no || '',
        student_name: editData.name || '', // Dashboard မှာ 'name' လို့ပေးထားလို့ပါ
        grade_id: editData.grade ? editData.grade.replace('Grade ', '') : '',
        section: editData.section || '',
        father_name: editData.father_name || '',
        mother_name: editData.mother_name || '',
        contact_phone: editData.contact_phone || '',
        address: editData.address || '',
        academic_year: '2025-2026',
        status: editData.status || 'Active'
      });
    }
  }, [isEdit, editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      console.log("Updating Student Data:", formData);
      alert("ကျောင်းသားအချက်အလက်များကို ပြင်ဆင်ပြီးပါပြီ။");
    } else {
      console.log("Saving New Student:", formData);
      alert("ကျောင်းသားသစ်စာရင်းကို သိမ်းဆည်းပြီးပါပြီ။");
    }
    // သိမ်းပြီးရင် Dashboard ကို ပြန်သွားမယ်
    navigate('/');
  };

  // Dynamic Text (အသစ်လား / ပြင်တာလား ပေါ်မူတည်ပြီး စာသားပြောင်းမယ်)
  const pageTitle = isEdit ? "Edit Student Profile" : "Student Admission";
  const pageDesc = isEdit ? "Update existing student's information" : "Add a new student to the academic database";
  const buttonText = isEdit ? "Update Changes" : "Save Admission";

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="p-2 bg-white rounded-xl shadow-sm hover:bg-gray-50 text-gray-400 transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div>
                <h1 className="text-2xl font-black text-gray-800 tracking-tight">{pageTitle}</h1>
                <p className="text-sm text-gray-400 font-medium">{pageDesc}</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* ဘယ်ဘက်ခြမ်း - အဓိက အချက်အလက်များ */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Section 1: Academic Information */}
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">
                <div className="flex items-center space-x-3 mb-6 border-b border-gray-50 pb-4">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                    <UserPlus size={20} />
                  </div>
                  <h2 className="font-black text-gray-700">Academic Details</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Admission No *</label>
                    <input 
                      name="admission_no" 
                      value={formData.admission_no}
                      type="text" 
                      required 
                      disabled={isEdit} // Edit လုပ်ရင် Admission No ကို ပြင်ခွင့်မပေးပါ (Unique ဖြစ်လို့)
                      onChange={handleChange} 
                      className={`w-full border-none rounded-2xl px-5 py-3.5 text-sm font-bold transition-all outline-none focus:ring-2 focus:ring-indigo-100 ${isEdit ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-50'}`} 
                      placeholder="ADM-2026-001" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Student Name *</label>
                    <input 
                      name="student_name" 
                      value={formData.student_name}
                      type="text" 
                      required 
                      onChange={handleChange} 
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all" 
                      placeholder="Enter Full Name" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Grade / Class</label>
                    <select 
                      name="grade_id" 
                      value={formData.grade_id}
                      onChange={handleChange} 
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 appearance-none cursor-pointer transition-all"
                    >
                      <option value="">Select Grade</option>
                      <option value="11">Grade 11</option>
                      <option value="10">Grade 10</option>
                      <option value="9">Grade 9</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Section (Room)</label>
                    <input 
                      name="section" 
                      value={formData.section}
                      type="text" 
                      onChange={handleChange} 
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 transition-all" 
                      placeholder="e.g. A, B or Lotus" 
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Parent Information */}
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">
                <div className="flex items-center space-x-3 mb-6 border-b border-gray-50 pb-4">
                  <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                    <Users size={20} />
                  </div>
                  <h2 className="font-black text-gray-700">Guardian Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Father's Name</label>
                    <input 
                      name="father_name" 
                      value={formData.father_name}
                      type="text" 
                      onChange={handleChange} 
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                      placeholder="U Ba" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Mother's Name</label>
                    <input 
                      name="mother_name" 
                      value={formData.mother_name}
                      type="text" 
                      onChange={handleChange} 
                      className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-orange-100 transition-all" 
                      placeholder="Daw Mya" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Contact Phone</label>
                    <div className="flex items-center bg-gray-50 rounded-2xl px-5 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                      <Phone size={16} className="text-gray-400" />
                      <input 
                        name="contact_phone" 
                        value={formData.contact_phone}
                        type="tel" 
                        onChange={handleChange} 
                        className="w-full bg-transparent border-none py-3.5 text-sm font-bold outline-none ml-2" 
                        placeholder="09xxxxxxxxx" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ညာဘက်ခြမ်း - လိပ်စာနှင့် Submit ခလုတ် */}
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <MapPin size={20} />
                  </div>
                  <h2 className="font-black text-gray-700">Address</h2>
                </div>
                <textarea 
                  name="address" 
                  value={formData.address}
                  rows="4" 
                  onChange={handleChange} 
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-2 focus:ring-emerald-100 transition-all resize-none" 
                  placeholder="Enter full address..."
                ></textarea>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-lg shadow-indigo-100 text-white relative overflow-hidden group">
                {/* Background Decoration */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white opacity-10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
                
                <h3 className="font-black text-lg mb-2 relative z-10">{isEdit ? 'Save Updates?' : 'Ready to Enroll?'}</h3>
                <p className="text-indigo-100 text-xs font-medium mb-6 relative z-10">
                  {isEdit ? 'Please check the modifications before saving.' : 'Please check all information before saving the record.'}
                </p>
                
                <button 
                  type="submit" 
                  className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black flex items-center justify-center space-x-2 hover:bg-indigo-50 transition-colors shadow-xl shadow-indigo-900/10 relative z-10"
                >
                  <Save size={20} />
                  <span>{buttonText}</span>
                </button>
              </div>
            </div>

          </form>
        </main>
      </div>
    </div>
  );
};

export default StudentAdmission;