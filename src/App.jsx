import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StudentAdmission from './pages/StudentAdmission';
import StudentProfile from './pages/StudentProfile';
import FeesManagement from './pages/FeesManagement';
import TeacherManagement from './pages/TeacherManagement';
import Attendance from './pages/Attendance';
import Accounting from './pages/Accounting';
import ExamResults from './pages/ExamResults';
import Settings from './pages/Settings';
// Placeholder Component
const Placeholder = ({ title }) => (
  <div className="flex items-center justify-center h-64 text-gray-400 font-bold text-2xl border-4 border-dashed rounded-[3rem] m-10">
    {title} Coming Soon...
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* ၁။ Dashboard (Home Page) */}
        <Route path="/" element={<Dashboard />} />
        
        
        <Route path="/students" element={<Dashboard><Placeholder title="Students Management" /></Dashboard>} />
        <Route path="/finance" element={<Dashboard><Placeholder title="Finance & Expenses" /></Dashboard>} />
     
      
        <Route path="/admission" element={<StudentAdmission />} />
        <Route path="/student-profile" element={<StudentProfile />} />  
        <Route path="/fees" element={<FeesManagement />} />
        <Route path="/teachers" element={<TeacherManagement />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/accounting" element={<Accounting />} />
        <Route path="/exams" element={<ExamResults />} />
        <Route path="/settings" element={<Settings />} />

        {/* ၃။ Page မရှိရင် Dashboard ကိုပဲ ပြန်လွှတ်မယ် */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;