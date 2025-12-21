import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, BookOpen, Calendar, CheckSquare, 
  FileText, BarChart2, Bell, X, User, GraduationCap 
} from 'lucide-react';

const Sidebar = ({ role, isOpen, setIsOpen }) => { 
  
  
  const commonMenus = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart2, path: '/' },
    { id: 'notices', label: 'Notice Board', icon: Bell, path: '/notices' },
  ];

  const roleMenus = {
    admin: [
      { id: 'students', label: 'Students', icon: Users, path: '/students' },
      { id: 'teachers', label: 'Teachers', icon: User, path: '/teachers' },
      { id: 'classes', label: 'Classes', icon: BookOpen, path: '/classes' },
      { id: 'timetable', label: 'Timetable', icon: Calendar, path: '/timetable' },
      { id: 'fees', label: 'Fee Management', icon: FileText, path: '/fees' },
    ],
    teacher: [
      { id: 'attendance', label: 'Attendance', icon: CheckSquare, path: '/attendance' },
      { id: 'grades', label: 'Grades & Marks', icon: GraduationCap, path: '/grades' },
      { id: 'homework', label: 'Homework & Diary', icon: BookOpen, path: '/homework' },
      { id: 'timetable', label: 'My Schedule', icon: Calendar, path: '/timetable' },
    ],
    student: [
      { id: 'homework', label: 'Homework', icon: BookOpen, path: '/homework' },
      { id: 'timetable', label: 'Timetable', icon: Calendar, path: '/timetable' },
      { id: 'attendance', label: 'My Attendance', icon: CheckSquare, path: '/attendance' },
      { id: 'grades', label: 'Report Card', icon: GraduationCap, path: '/grades' },
    ]
  };


  const menuItems = [...commonMenus.slice(0,1), ...(roleMenus[role] || []), ...commonMenus.slice(1)];

  return (
    <>
      
      <div 
        className={`fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
      />
      
      
      <div className={`fixed inset-y-0 left-0 w-64 bg-slate-900 text-white z-30 transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight">EduNexus</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              
              <NavLink
                key={item.id}
                to={item.path} 
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-indigo-400 font-bold">
              {role ? role[0].toUpperCase() : '?'}
            </div>
            <div>
              <p className="text-sm font-medium text-white capitalize">{role}</p>
              <p className="text-xs text-slate-500">Online</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;