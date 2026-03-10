import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import { 
  TrendingUp, TrendingDown, DollarSign, PieChart, 
  ArrowUpRight, ArrowDownRight, Plus, Download, X, CheckCircle 
} from 'lucide-react';

const Accounting = () => {
  // Modal ဖွင့်/ပိတ် ဖို့ State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Transaction အသစ်ထည့်ရန် State
  const [formData, setFormData] = useState({
    type: 'income', // 'income' or 'expense'
    category: 'Student Fee',
    desc: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });

  // ငွေဝင်/ငွေထွက် မှတ်တမ်းများ (ဂဏန်းအစစ်များဖြင့် ပြင်ထားသည်)
  const [transactions, setTransactions] = useState([
    { id: 1, desc: "Tuition Fee - Aung Aung", category: "Student Fee", amount: 50000, date: "2026-03-11", type: "income" },
    { id: 2, desc: "Teacher Salary - Daw Aye Aye", category: "Salary", amount: 350000, date: "2026-03-10", type: "expense" },
    { id: 3, desc: "Electricity Bill (Feb)", category: "Utilities", amount: 85000, date: "2026-03-08", type: "expense" },
    { id: 4, desc: "Tuition Fee - Su Su Myat", category: "Student Fee", amount: 50000, date: "2026-03-07", type: "income" },
  ]);

  // အလိုအလျောက် တွက်ချက်မည့် Logic (ဝင်ငွေ၊ ထွက်ငွေ၊ အမြတ်)
  const totalRevenue = transactions.filter(t => t.type === 'income').reduce((sum, curr) => sum + curr.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, curr) => sum + curr.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  // Stats Card Data ကို Dynamic ဖြစ်အောင် ချိတ်ဆက်ခြင်း
  const stats = [
    { title: "Total Revenue", amount: totalRevenue, change: "+12.5%", isUp: true, icon: <TrendingUp size={20} />, color: "bg-emerald-50 text-emerald-600" },
    { title: "Total Expenses", amount: totalExpenses, change: "-2.4%", isUp: false, icon: <TrendingDown size={20} />, color: "bg-rose-50 text-rose-600" },
    { title: "Net Profit", amount: netProfit, change: "+8.1%", isUp: true, icon: <DollarSign size={20} />, color: "bg-indigo-50 text-indigo-600" },
  ];

  // စာရင်းအသစ် သိမ်းမည့် Function
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      desc: formData.desc,
      category: formData.category,
      amount: parseInt(formData.amount),
      date: formData.date,
      type: formData.type
    };
    
    // အသစ်ထည့်လိုက်တဲ့ စာရင်းကို အပေါ်ဆုံးမှာ ပြမယ်
    setTransactions([newTransaction, ...transactions]);
    setIsModalOpen(false); // Form ပိတ်မယ်
    
    // Form ကို မူလအတိုင်း ပြန်ထားမယ်
    setFormData({ type: 'income', category: 'Student Fee', desc: '', amount: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="flex h-screen bg-[#f8f9fc] font-sans overflow-hidden relative">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-800 tracking-tight">Finance & Accounting</h1>
              <p className="text-sm text-gray-400 font-medium">Monitor school revenue (fees) and expenditures</p>
            </div>
            
            <div className="flex space-x-3">
              <button className="bg-white border border-gray-100 text-gray-600 px-5 py-3 rounded-2xl font-bold shadow-sm hover:bg-gray-50 flex items-center space-x-2 transition-all">
                <Download size={18} />
                <span>Export PDF</span>
              </button>
              {/* Add Transaction Button */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center space-x-2 transition-all"
              >
                <Plus size={18} />
                <span>Add Record</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-110 ${stat.color}`}></div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl ${stat.color}`}>{stat.icon}</div>
                  <div className={`flex items-center text-[10px] font-black px-2 py-1 rounded-lg ${stat.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.isUp ? <ArrowUpRight size={12} className="mr-1" /> : <ArrowDownRight size={12} className="mr-1" />}
                    {stat.change}
                  </div>
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{stat.title}</p>
                <h3 className="text-2xl font-black text-gray-800 mt-1">
                  {stat.amount.toLocaleString()} <span className="text-sm font-bold opacity-40">Ks</span>
                </h3>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Transactions Table */}
            <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
               <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="font-black text-gray-800 uppercase tracking-widest text-sm">Recent Transactions</h3>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full">
                   <thead>
                     <tr className="bg-gray-50/50">
                       <th className="py-4 px-8 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Description</th>
                       <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-left">Date</th>
                       <th className="py-4 px-8 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-50">
                     {transactions.map((t) => (
                       <tr key={t.id} className="hover:bg-gray-50/30 transition-colors">
                         <td className="py-5 px-8">
                            <p className="font-bold text-gray-700 text-sm">{t.desc}</p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">{t.category}</p>
                         </td>
                         <td className="py-5 px-6 font-bold text-gray-400 text-xs">{t.date}</td>
                         <td className={`py-5 px-8 text-right font-black text-sm ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                           {t.type === 'income' ? '+' : '-'} {t.amount.toLocaleString()}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
            </div>

            {/* Monthly Analysis (Static for now) */}
            <div className="bg-indigo-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10"><PieChart size={120} /></div>
               <h3 className="font-black uppercase tracking-widest text-sm mb-8 relative z-10">Monthly Analysis</h3>
               
               <div className="space-y-6 relative z-10">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-indigo-200">Teacher Salaries</span>
                      <span>65%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className="bg-white rounded-full h-1.5" style={{width: '65%'}}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-indigo-200">Maintenance & Utilities</span>
                      <span>20%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className="bg-indigo-300 rounded-full h-1.5" style={{width: '20%'}}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-indigo-200">Marketing & Admission</span>
                      <span>15%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className="bg-indigo-500 rounded-full h-1.5" style={{width: '15%'}}></div>
                    </div>
                  </div>
               </div>

               <div className="mt-12 p-6 bg-white/10 rounded-3xl border border-white/10">
                  <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Financial Health</p>
                  <p className="text-sm font-bold mt-2 italic leading-relaxed">
                    "သင့်ကျောင်း၏ အသားတင်အမြတ်ငွေသည် {netProfit.toLocaleString()} ကျပ် ရှိနေပါသည်။ ဘဏ္ဍာရေးအခြေအနေ ကောင်းမွန်ပါသည်။"
                  </p>
               </div>
            </div>
          </div>
        </main>
      </div>

      {/* --- ADD TRANSACTION MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-indigo-600 p-6 text-white flex items-center justify-between relative overflow-hidden">
              <div>
                <h2 className="text-xl font-black relative z-10">Add Financial Record</h2>
                <p className="text-indigo-200 text-xs font-medium mt-1 relative z-10">Record income (fees) or expenses</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-indigo-500 rounded-xl transition-colors relative z-10">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              
              {/* Type Selection (Income or Expense) */}
              <div className="flex space-x-4 mb-2">
                <label className={`flex-1 flex justify-center items-center py-3 rounded-2xl cursor-pointer border-2 transition-all font-black text-sm ${
                  formData.type === 'income' ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'border-gray-100 text-gray-400 hover:bg-gray-50'
                }`}>
                  <input 
                    type="radio" name="type" className="hidden" 
                    checked={formData.type === 'income'}
                    onChange={() => setFormData({...formData, type: 'income', category: 'Student Fee'})} 
                  />
                  Income (e.g. Fees)
                </label>

                <label className={`flex-1 flex justify-center items-center py-3 rounded-2xl cursor-pointer border-2 transition-all font-black text-sm ${
                  formData.type === 'expense' ? 'border-rose-500 bg-rose-50 text-rose-600' : 'border-gray-100 text-gray-400 hover:bg-gray-50'
                }`}>
                  <input 
                    type="radio" name="type" className="hidden" 
                    checked={formData.type === 'expense'}
                    onChange={() => setFormData({...formData, type: 'expense', category: 'Salary'})} 
                  />
                  Expense (e.g. Salary)
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Description</label>
                  <input 
                    type="text" required 
                    placeholder={formData.type === 'income' ? "e.g. Tuition Fee - Aung Aung" : "e.g. Teacher Salary - Daw Aye"}
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                    value={formData.desc}
                    onChange={(e) => setFormData({...formData, desc: e.target.value})}
                  />
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Category</label>
                  <select 
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-100"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {formData.type === 'income' ? (
                      <>
                        <option value="Student Fee">Student Fee</option>
                        <option value="Admission Fee">Admission Fee</option>
                        <option value="Other Income">Other Income</option>
                      </>
                    ) : (
                      <>
                        <option value="Salary">Teacher Salary</option>
                        <option value="Utilities">Utilities (Bill)</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Other Expense">Other Expense</option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Date</label>
                  <input 
                    type="date" required 
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-sm font-bold outline-none text-gray-700"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 pl-1">Amount (Ks)</label>
                  <input 
                    type="number" required 
                    placeholder="Enter amount..."
                    className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 text-xl font-black text-gray-800 outline-none focus:ring-2 focus:ring-indigo-100"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-50 flex justify-end">
                <button 
                  type="submit" 
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-indigo-100 flex items-center space-x-2 transition-all w-full justify-center"
                >
                  <CheckCircle size={20} />
                  <span>Save Record</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accounting;