import React, { useState } from 'react';
import { Menu, Search, Bell, LogOut } from 'lucide-react';

// Layout Components
// Make sure these paths match exactly where you saved the files
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
  const [userRole, setUserRole] = useState(null); // 'admin' | 'teacher' | 'student' | null
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // Add these lines inside the App component
  const [students, setStudents] = useState(MOCK_DATA.students);
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Prof. Sarah Connor", subject: "Physics", email: "sarah@school.com" },
    { id: 2, name: "Dr. Emmett Brown", subject: "Science", email: "doc@school.com" }
  ]);

  const handleLogin = (role) => {
    setUserRole(role);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  // Router Logic: Decides which component to show based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardContent role={userRole} />;
      case 'attendance': return <AttendanceFeature role={userRole} />;
      case 'timetable': return <TimetableFeature />;
      case 'grades': return <GradesFeature role={userRole} />;
      case 'homework': return <HomeworkFeature role={userRole} />;
      case 'notices': return <NoticesFeature />;
      case 'students': 
        return <AddStudent data={students} setData={setStudents} />;
      case 'teachers': 
        return <AddTeacher data={teachers} setData={setTeachers} />;
      case 'classes':
      case 'fees':
        return (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <p className="text-xl font-semibold">Module: {activeTab}</p>
            <p>This feature is currently under construction.</p>
          </div>
        );
      default: 
        return <div>Page Not Found</div>;
    }
  };

  // 1. If no user is logged in, show the Login Screen
  if (!userRole) return <LoginScreen onLogin={handleLogin} />;

  // 2. If logged in, show the Main App Layout
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Sidebar
        role={userRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="md:ml-64 transition-all duration-300">
        {/* Header */}
        <header className="bg-white border-b sticky top-0 z-10 px-6 py-4 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600 hover:text-gray-900">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-gray-800 capitalize hidden sm:block">
              {activeTab.replace('-', ' ')}
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
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}