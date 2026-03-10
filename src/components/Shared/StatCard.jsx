import React from 'react';

const StatCard = ({ title, value, color, icon, trend }) => {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col justify-between group cursor-pointer">
      
      <div className="flex justify-between items-start mb-6">
        {/* Icon (အရောင်အပြည့်နဲ့ သေချာပေါ်အောင် ပြင်ထားသည်) */}
        <div className={`${color} text-white p-4 rounded-[1rem] shadow-md group-hover:-translate-y-1 group-hover:shadow-lg transition-all duration-300`}>
          {icon}
        </div>

        {/* Trend Label */}
        {trend && (
          <span className="bg-gray-50 text-gray-500 border border-gray-100 text-[10px] font-bold px-3 py-1.5 rounded-full">
            {trend}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-3xl font-black text-gray-800 mb-1">{value}</h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
      </div>

    </div>
  );
};

export default StatCard;