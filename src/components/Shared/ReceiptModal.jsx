import React from 'react';
import { Printer, X, CheckCircle } from 'lucide-react';

const ReceiptModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    const handlePrint = () => {
        window.print(); // Browser ရဲ့ Print Function ကို ခေါ်တာပါ
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                
                {/* Modal Header */}
                <div className="flex justify-between items-center p-8 border-b border-gray-50">
                    <h3 className="text-xl font-black text-gray-800 tracking-tight">Payment Receipt</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                {/* Receipt Content (ဒီအပိုင်းကို Print ထုတ်မှာပါ) */}
                <div id="receipt-content" className="p-10 text-gray-800">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-black uppercase tracking-tighter text-indigo-600">Wisdom International School</h2>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Yangon, Myanmar | Tel: 09-1234567</p>
                    </div>

                    <div className="flex justify-between border-y border-dashed border-gray-200 py-6 mb-6">
                        <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase">Receipt No</p>
                            <p className="font-bold text-sm">#RCT-{Math.floor(Math.random() * 10000)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-400 uppercase">Date</p>
                            <p className="font-bold text-sm">{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="space-y-4 mb-8">
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-bold">Student Name:</span>
                            <span className="font-black">{data.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-bold">Admission ID:</span>
                            <span className="font-black">{data.id}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400 font-bold">Grade:</span>
                            <span className="font-black">{data.grade}</span>
                        </div>
                    </div>

                    <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 mb-8">
                        <div className="flex justify-between items-center">
                            <span className="text-indigo-600 font-black uppercase text-xs tracking-widest">Amount Paid</span>
                            <span className="text-2xl font-black text-indigo-700">{data.amount} <span className="text-xs">Ks</span></span>
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="inline-flex items-center space-x-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                            <CheckCircle size={14} />
                            <span>Payment Status: Success</span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="p-8 bg-gray-50 flex gap-4">
                    <button 
                        onClick={handlePrint}
                        className="flex-1 bg-indigo-600 text-white font-black text-xs uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center space-x-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                    >
                        <Printer size={18} />
                        <span>Print Receipt</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReceiptModal;