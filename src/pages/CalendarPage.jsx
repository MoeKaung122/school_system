import React, { useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import Navbar from '../components/Layout/Navbar';
import { ChevronLeft, ChevronRight, PlusCircle, Clock } from 'lucide-react';

const CalendarPage = () => {
    // လက်ရှိရက်စွဲနဲ့ ပြက္ခဒိန်အတွက် State များ
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([
        { id: 1, date: '2026-03-20', title: 'Grade 10 Final Exams', type: 'exam', color: 'bg-rose-500' },
        { id: 2, date: '2026-03-25', title: 'School Holiday', type: 'holiday', color: 'bg-amber-500' },
        { id: 3, date: '2026-03-27', title: 'Parent-Teacher Meeting', type: 'event', color: 'bg-indigo-500' },
    ]);

    // ပြက္ခဒိန် တွက်ချက်ခြင်း logic
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    const prevMonth = () => setCurrentDate(new Date(year, month - 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1));

    // ရက်စွဲအကွက်များ ထုတ်လုပ်ခြင်း
    const renderDays = () => {
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = [];

        // လအစ လွတ်နေတဲ့ အကွက်များ
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-32 border-b border-r border-gray-50 bg-gray-50/30"></div>);
        }

        // ရက်စွဲအကွက်များ
        for (let d = 1; d <= totalDays; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);

            days.push(
                <div key={d} className="h-32 border-b border-r border-gray-50 p-2 hover:bg-indigo-50/20 transition-colors relative group">
                    <span className={`text-sm font-bold ${d === new Date().getDate() && month === new Date().getMonth() ? 'bg-indigo-600 text-white w-7 h-7 flex items-center justify-center rounded-full shadow-lg shadow-indigo-100' : 'text-gray-700'}`}>
                        {d}
                    </span>
                    <div className="mt-1 space-y-1">
                        {dayEvents.map(event => (
                            <div key={event.id} className={`${event.color} text-white text-[9px] font-black px-2 py-1 rounded-md truncate`}>
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return days;
    };

    return (
        <div className="flex h-screen bg-[#f8f9fc] overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-y-auto p-6 lg:p-10">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                        <div>
                            <h1 className="text-3xl font-black text-gray-800 tracking-tight">School Calendar</h1>
                            <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px] mt-1">Manage academic events & holidays</p>
                        </div>
                        <button className="flex items-center space-x-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                            <PlusCircle size={18} />
                            <span>Add New Event</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        {/* Calendar Controls */}
                        <div className="flex items-center justify-between p-8 border-b border-gray-50">
                            <h2 className="text-xl font-black text-gray-800">{monthName} {year}</h2>
                            <div className="flex items-center space-x-2">
                                <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-all"><ChevronLeft /></button>
                                <button onClick={() => setCurrentDate(new Date())} className="px-4 py-2 text-xs font-black uppercase text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">Today</button>
                                <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-xl transition-all"><ChevronRight /></button>
                            </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 text-center border-b border-gray-50">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="py-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">{day}</div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {renderDays()}
                        </div>
                    </div>

                    {/* Upcoming Events List */}
                    <div className="mt-10">
                        <h3 className="text-lg font-black text-gray-800 mb-6 flex items-center">
                            <Clock size={20} className="mr-2 text-indigo-600" /> Upcoming Schedule
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {events.map(event => (
                                <div key={event.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow">
                                    <div className={`w-3 h-12 rounded-full ${event.color}`}></div>
                                    <div>
                                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{event.date}</p>
                                        <p className="font-bold text-gray-800">{event.title}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
};

export default CalendarPage;