import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import ReceiptModal from '../components/Shared/ReceiptModal';
import {
    Search, CreditCard, DollarSign, Clock, CheckCircle,
    Filter, Download, ChevronRight, X, Calendar as CalendarIcon, User
} from 'lucide-react';

const FeesManagement = () => {
    // Modal ၂ ခုအတွက် State များ ခွဲထုတ်ထားပါတယ်
    const [isPaymentFormOpen, setIsPaymentFormOpen] = useState(false);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);

    // လခပေးမယ့် Form အတွက် State များ
    const [selectedStudent, setSelectedStudent] = useState(null); // ဘယ်သူ့အတွက် သွင်းမှာလဲ မှတ်ရန်
    const [selectedMonths, setSelectedMonths] = useState([]);
    const [paymentDate, setPaymentDate] = useState('');
    const monthlyFee = 50000;
    const [receiptData, setReceiptData] = useState({});

    const allMonths = [
        'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
        'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'
    ];

    // Table ထဲက "Pay Fee" ကို နှိပ်ရင် Form ဖွင့်မယ်
    const handleOpenPaymentForm = (student = null) => {
        setSelectedStudent(student);
        setIsPaymentFormOpen(true);
    };

    // Payment Form ပွင့်လာရင် ဒီနေ့ရက်စွဲနဲ့ လက်ရှိလကို Auto ရွေးပေးမယ်
    useEffect(() => {
        if (isPaymentFormOpen) {
            const today = new Date().toISOString().split('T')[0];
            setPaymentDate(today);
            const currentMonthShort = new Date().toLocaleString('default', { month: 'short' });
            setSelectedMonths([currentMonthShort]);
        }
    }, [isPaymentFormOpen]);

    const toggleMonth = (month) => {
        if (selectedMonths.includes(month)) {
            setSelectedMonths(selectedMonths.filter(m => m !== month));
        } else {
            setSelectedMonths([...selectedMonths, month]);
        }
    };

    // ငွေသွင်းတာကို Confirm လုပ်ရင်
    const handlePaymentSubmit = (e) => {
        e.preventDefault();
        const totalAmount = selectedMonths.length * monthlyFee;

        // ၁။ Receipt Data ကို ပြင်ဆင်မယ်
        setReceiptData({
            name: selectedStudent ? selectedStudent.name : "Walk-in Student",
            id: selectedStudent ? selectedStudent.admission_no : "-",
            grade: selectedStudent ? selectedStudent.grade : "-",
            amount: totalAmount.toLocaleString()
        });

        // ၂။ Payment Form ကို ပိတ်ပြီး၊ Receipt Modal ကို ဖွင့်မယ်
        setIsPaymentFormOpen(false);
        setSelectedMonths([]);
        setTimeout(() => setIsReceiptOpen(true), 300); // Animation လေးနဲ့ ပွင့်လာအောင် 
    };

    // Sample Data
    const [feeRecords, setFeeRecords] = useState([
        { id: 1, name: "Aung Aung", admission_no: "ADM-001", grade: "Grade 10", amount: "50,000", date: "2026-03-10", status: "Paid", method: "KPay" },
        { id: 2, name: "Su Su Myat", admission_no: "ADM-002", grade: "Grade 10", amount: "50,000", date: "-", status: "Pending", method: "-" },
    ]);

    return (
        <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden relative">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />

                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-black text-gray-800 tracking-tight">Fees Management</h1>
                            <p className="text-sm text-gray-400 font-medium">Track and collect student tuition fees</p>
                        </div>
                        <button
                            onClick={() => handleOpenPaymentForm()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center justify-center space-x-2 transition-all"
                        >
                            <DollarSign size={20} />
                            <span>Collect New Fee</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mt-6">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="py-5 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest">Student</th>
                                    <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Grade</th>
                                    <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                    <th className="py-5 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="py-5 px-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {feeRecords.map((fee) => (
                                    <tr key={fee.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="py-5 px-8">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 font-bold text-xs">{fee.name.charAt(0)}</div>
                                                <div>
                                                    <p className="font-bold text-gray-700 text-sm">{fee.name}</p>
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{fee.admission_no}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-5 px-6 font-bold text-gray-500 text-sm">{fee.grade}</td>
                                        <td className="py-5 px-6 font-black text-gray-700 text-sm">{fee.amount} Ks</td>
                                        <td className="py-5 px-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${fee.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                {fee.status}
                                            </span>
                                        </td>
                                        <td className="py-5 px-8 text-right">
                                            <button
                                                onClick={() => handleOpenPaymentForm(fee)}
                                                className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all shadow-sm font-bold text-xs px-4"
                                            >
                                                Pay Fee
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* --- PAYMENT MODAL POPUP --- */}
            {isPaymentFormOpen && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-indigo-600 p-6 text-white flex items-center justify-between relative overflow-hidden">
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/10 rounded-full"></div>
                            <div>
                                <h2 className="text-xl font-black relative z-10">Fee Collection</h2>
                                <p className="text-indigo-200 text-xs font-medium mt-1 relative z-10">Record a new payment for a student</p>
                            </div>
                            <button onClick={() => setIsPaymentFormOpen(false)} className="p-2 hover:bg-indigo-500 rounded-xl transition-colors relative z-10">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handlePaymentSubmit} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Student Name or ID</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl px-4 focus-within:ring-2 focus-within:ring-indigo-100">
                                        <User size={18} className="text-gray-400" />
                                        <input 
                                            type="text" 
                                            required 
                                            defaultValue={selectedStudent ? selectedStudent.name : ""}
                                            className="w-full bg-transparent border-none py-3.5 pl-3 text-sm font-bold outline-none" 
                                            placeholder="Search student..." 
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Payment Date</label>
                                    <div className="flex items-center bg-gray-50 rounded-2xl px-4 focus-within:ring-2 focus-within:ring-indigo-100">
                                        <CalendarIcon size={18} className="text-gray-400" />
                                        <input
                                            type="date"
                                            required
                                            value={paymentDate}
                                            onChange={(e) => setPaymentDate(e.target.value)}
                                            className="w-full bg-transparent border-none py-3.5 pl-3 text-sm font-bold outline-none text-gray-700"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Method</label>
                                    <select className="w-full bg-gray-50 border-none rounded-2xl px-4 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100 appearance-none cursor-pointer">
                                        <option value="Cash">Cash</option>
                                        <option value="KPay">KBZ Pay</option>
                                        <option value="WavePay">Wave Pay</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Select Months to Pay</label>
                                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                        {selectedMonths.length} Months Selected
                                    </span>
                                </div>
                                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                    {allMonths.map((month) => {
                                        const isSelected = selectedMonths.includes(month);
                                        return (
                                            <button
                                                type="button"
                                                key={month}
                                                onClick={() => toggleMonth(month)}
                                                className={`py-2 rounded-xl text-xs font-black transition-all border ${isSelected
                                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 scale-105'
                                                    : 'bg-white text-gray-400 border-gray-200 hover:border-indigo-300 hover:text-indigo-500'
                                                    }`}
                                            >
                                                {month}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Amount</p>
                                    <p className="text-2xl font-black text-gray-800">
                                        {(selectedMonths.length * monthlyFee).toLocaleString()} <span className="text-sm text-gray-400">Ks</span>
                                    </p>
                                </div>
                                <button
                                    type="submit"
                                    disabled={selectedMonths.length === 0}
                                    className={`px-8 py-4 rounded-2xl font-black flex items-center space-x-2 transition-all ${selectedMonths.length > 0
                                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    <CheckCircle size={20} />
                                    <span>Confirm Payment</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- RECEIPT MODAL --- */}
            <ReceiptModal
                isOpen={isReceiptOpen}
                onClose={() => setIsReceiptOpen(false)}
                data={receiptData}
            />
            
        </div>
    );
};

export default FeesManagement;