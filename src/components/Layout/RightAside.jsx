import React from 'react';
import { Megaphone, CalendarDays, Clock } from 'lucide-react';

const RightAside = () => {
  // ၁။ ကြေညာချက် Data များ (Notice Board)
  const notices = [
    { 
      id: 1, 
      date: "16 May, 2026", 
      title: "Summer Holiday Starts", 
      desc: "ကျောင်းသားများနှင့် ဆရာများအားလုံးအတွက် နွေရာသီကျောင်းပိတ်ရက် စတင်ပါမည်။",
      color: "bg-blue-500"
    },
    { 
      id: 2, 
      date: "12 May, 2026", 
      title: "Exam Results Published", 
      desc: "Grade 10 အတန်းအတွက် စာမေးပွဲအဖြေလွှာများ ထွက်ရှိပါပြီ။",
      color: "bg-green-500"
    },
    { 
      id: 3, 
      date: "05 May, 2026", 
      title: "Fee Collection Deadline", 
      desc: "ယခုလအတွက် လစာပေးသွင်းရန် နောက်ဆုံးသတ်မှတ်ရက် ဖြစ်ပါသည်။",
      color: "bg-red-500"
    }
  ];

  return (
    // မျက်နှာပြင်ကျယ်မှသာ (xl) ညာဘက်ဘေးမှာ ပေါ်ပါမယ်။ Mobile/Tablet မှာ ဖျောက်ထားပါမယ်။
    <aside className="w-80 bg-gray-50/50 border-l border-gray-100 h-screen overflow-y-auto hidden xl:block p-6 sticky top-0 right-0 z-30">
      
      {/* ၆။ Notice Board Section */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-gray-800">Notice Board</h3>
          <div className="bg-indigo-50 p-2 rounded-xl text-indigo-600">
            <Megaphone size={20} />
          </div>
        </div>

        <div className="space-y-6">
          {notices.map((notice) => (
            <div key={notice.id} className="relative pl-4">
              {/* ဘေးတိုက်မျဉ်းလေး (Timeline Indicator) */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-full ${notice.color}`}></div>
              
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                {notice.date}
              </p>
              <h4 className="text-sm font-bold text-gray-700 mt-1">{notice.title}</h4>
              <p className="text-xs text-gray-500 mt-1.5 leading-relaxed line-clamp-2">
                {notice.desc}
              </p>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-6 py-3 rounded-2xl bg-gray-50 text-sm font-bold text-gray-600 hover:bg-indigo-600 hover:text-white transition-all">
          View All Notices
        </button>
      </div>

      {/* ၇။ Upcoming Events Section */}
      <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-black text-gray-800">Upcoming Events</h3>
          <div className="bg-orange-50 p-2 rounded-xl text-orange-600">
            <CalendarDays size={20} />
          </div>
        </div>

        <div className="space-y-4">
          {/* Event Card 1 */}
          <div className="flex items-start space-x-4 p-4 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md hover:shadow-orange-50 transition-all cursor-pointer group">
            <div className="bg-orange-100 text-orange-600 px-3 py-2 rounded-xl text-center">
              <p className="text-xs font-bold">MAY</p>
              <p className="text-xl font-black">20</p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-700 group-hover:text-orange-600 transition-colors">Science Fair 2026</h4>
              <div className="flex items-center text-xs text-gray-400 mt-1 space-x-1">
                <Clock size={12} />
                <span>09:00 AM - 03:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
};

export default RightAside;