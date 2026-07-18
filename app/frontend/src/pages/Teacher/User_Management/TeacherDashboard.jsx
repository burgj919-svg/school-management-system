import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import API from '../../../api';
import { FaChalkboardTeacher, FaBookOpen, FaCalendarCheck, FaClipboardList } from 'react-icons/fa';

function TeacherDashboard() {
  const [teacher, setTeacher] = useState({ name: '', email: '' });
  const [stats, setStats] = useState({ classes: 0, students: 0, materials: 0 });

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setTeacher({ name: u.name || '', email: u.email || '' });
      } catch {}
    }
    API.get('/api/v1/teacherprofile')
      .then((res) => {
        const d = res.data?.data || res.data;
        setTeacher({ name: d.name || teacher.name, email: d.email || '' });
      })
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'My Classes', value: stats.classes, icon: FaChalkboardTeacher, color: 'from-blue-500 to-blue-600' },
    { label: 'Lesson Materials', value: stats.materials, icon: FaBookOpen, color: 'from-emerald-500 to-emerald-600' },
    { label: 'Attendance', value: stats.students, icon: FaCalendarCheck, color: 'from-amber-500 to-amber-600' },
    { label: 'Active Subjects', value: '—', icon: FaClipboardList, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="md:ml-[230px] ml-0 p-4 sm:p-6 lg:p-8 transition-all duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg mb-8">
            <h1 className="text-3xl font-black tracking-tight">Welcome back, {teacher.name || 'Teacher'}</h1>
            <p className="text-cyan-100 mt-2 text-sm">Here is your teaching overview for today.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex items-center gap-4 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center text-white text-lg`}>
                    <Icon />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-slate-800">{card.value}</p>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">{card.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Links</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { name: 'My Classes', path: '/TeacherMyClasses' },
                { name: 'Timetable', path: '/TeacherTimetable' },
                { name: 'Lesson Materials', path: '/MyClassess' },
                { name: 'Attendance', path: '/AttendTeacher' },
                { name: 'Profile', path: '/TeacherProfile' },
              ].map((link, i) => (
                <a key={i} href={link.path}
                  className="block text-center px-4 py-3 bg-slate-50 rounded-xl text-sm font-semibold text-slate-700 hover:bg-cyan-50 hover:text-cyan-700 border border-slate-100 hover:border-cyan-200 transition-all">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;
