import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // <--- NEW IMPORTS
import { Menu, Search, Bell, LogOut } from 'lucide-react';
import Classes from "./pages/Classes";


// Layout Components
import Sidebar from './components/layout/Sidebar';
import LoginScreen from './components/layout/LoginScreen';

// Feature Components
import DashboardContent from './components/features/DashboardContent';
import AttendanceFeature from './components/features/AttendanceFeature';
import TimetableFeature from './components/features/TimetableFeature';
import GradesFeature from './components/features/GradesFeature';
import HomeworkFeature from './components/features/HomeworkFeature';
import NoticesFeature from './components/features/NoticesFeature';
import AddStudent from './components/features/AddStudent';
import AddTeacher from './components/features/AddTeacher';
import { MOCK_DATA } from './data/mockData';

export default function App() {
  const [userRole, setUserRole] = useState(null); 
  // const [activeTab, setActiveTab] = useState('dashboard'); <--- REMOVED THIS
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Data State
  const [students, setStudents] = useState(MOCK_DATA.students);
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Prof. Sarah Connor", subject: "Physics", email: "sarah@school.com" },
    { id: 2, name: "Dr. Emmett Brown", subject: "Science", email: "doc@school.com" }
  ]);

  const location = useLocation(); // <--- This reads the current URL

  const handleLogin = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  // Helper to format the Header Title (e.g., "/fee-management" -> "Fee Management")
  const getPageTitle = () => {
    const path = location.pathname.replace('/', '');
    return path ? path.replace('-', ' ') : 'Dashboard';
  };

  // 1. If no user is logged in, show the Login Screen
  if (!userRole) return <LoginScreen onLogin={handleLogin} />;

  // 2. If logged in, show the Main App Layout
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Sidebar
        role={userRole} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        // activeTab props removed (Router handles it now)
      />

      <div className="md:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-gray-900">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 capitalize hidden sm:block">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-gray-200"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            {/* THIS IS THE NEW ROUTER SYSTEM */}
            <Routes>
              <Route path="/" element={<DashboardContent role={userRole} />} />
              <Route path="/attendance" element={<AttendanceFeature role={userRole} />} />
              <Route path="/timetable" element={<TimetableFeature />} />
              <Route path="/grades" element={<GradesFeature role={userRole} />} />
              <Route path="/homework" element={<HomeworkFeature role={userRole} />} />
              <Route path="/notices" element={<NoticesFeature />} />
              
              {/* Passing Props exactly as you did before */}
              <Route path="/students" element={<AddStudent data={students} setData={setStudents} />} />
              <Route path="/teachers" element={<AddTeacher data={teachers} setData={setTeachers} />} />
              
              {/* Placeholders for incomplete features */}
              
              <Route path="/classes" element={<Classes />} />


              {/* Redirect unknown routes to Dashboard */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}