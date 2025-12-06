import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, LogOut } from 'lucide-react';

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
import AdminUserManagement from './components/admin/AdminUserManagement';

import { MOCK_DATA } from './data/mockData';
import { USERS } from './data/users';

import RequireRole from './components/auth/RequireRole';

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(USERS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [students, setStudents] = useState(MOCK_DATA.students);
  const [teachers, setTeachers] = useState([
    { id: 1, name: 'Prof. Sarah Connor', subject: 'Physics', email: 'sarah@school.com' },
    { id: 2, name: 'Dr. Emmett Brown', subject: 'Science', email: 'doc@school.com' }
  ]);

  const location = useLocation();
  const userRole = currentUser?.role ?? null;

  // LOGIN FUNCTION
  const handleLogin = (username, password) => {
    const trimmed = username.trim();
    const foundUser = users.find(
      (u) => u.username === trimmed && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid username or password" };
    }

    setCurrentUser(foundUser);
    return { success: true };
  };

  // LOGOUT FUNCTION
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Dynamic Page Title
  const getPageTitle = () => {
    const path = location.pathname.replace("/", "");
    if (!path) return "Dashboard";

    const normalized = path.replace("-", " ");
    return normalized
      .split("/")
      .slice(-1)[0]
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  // If not logged in → show login only
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Sidebar role={userRole} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="md:ml-64 transition-all duration-300">
        {/* HEADER */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-slate-200">
          <div className="flex items-center justify-between px-4 py-3 md:px-8">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden p-2 rounded-lg border border-slate-200"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu size={20} />
              </button>

              <div>
                <h1 className="text-lg font-semibold text-slate-900">
                  {getPageTitle()}
                </h1>
                <p className="text-xs text-slate-500 capitalize">
                  Logged in as {userRole} ({currentUser.fullName})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                <Search size={16} className="text-slate-400" />
                <input
                  className="bg-transparent text-xs outline-none w-40"
                  placeholder="Search students, teachers..."
                />
              </div>

              <button className="hidden md:inline-flex p-2 rounded-full bg-slate-100 border border-slate-200">
                <Bell size={18} />
              </button>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-red-600 text-xs font-medium border border-red-100 hover:bg-red-100"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Routes>
              <Route path="/" element={<DashboardContent role={userRole} />} />
              <Route path="/attendance" element={<AttendanceFeature role={userRole} />} />
              <Route path="/timetable" element={<TimetableFeature />} />
              <Route path="/grades" element={<GradesFeature role={userRole} />} />
              <Route path="/homework" element={<HomeworkFeature role={userRole} />} />
              <Route path="/notices" element={<NoticesFeature />} />

              {/* Student Management (Admin Only) */}
              <Route
                path="/students"
                element={
                  <RequireRole allowedRoles="admin" currentRole={userRole}>
                    <AddStudent data={students} setData={setStudents} />
                  </RequireRole>
                }
              />

              {/* Teacher Management (Admin Only) */}
              <Route
                path="/teachers"
                element={
                  <RequireRole allowedRoles="admin" currentRole={userRole}>
                    <AddTeacher data={teachers} setData={setTeachers} />
                  </RequireRole>
                }
              />

              {/* User Management */}
              <Route
                path="/admin/users"
                element={
                  <RequireRole allowedRoles="admin" currentRole={userRole}>
                    <AdminUserManagement users={users} setUsers={setUsers} />
                  </RequireRole>
                }
              />

              {/* Classes */}
              <Route
                path="/classes"
                element={
                  <RequireRole allowedRoles="admin" currentRole={userRole}>
                    <ClassesModule classes={classes} setClasses={setClasses} />
                  </RequireRole>
                }
              />


              {/* Fees */}
              <Route
                path="/fees"
                element={
                  <RequireRole allowedRoles="admin" currentRole={userRole}>
                    <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                      <p className="text-xl font-semibold">Module: Fee Management</p>
                      <p>This feature is currently under construction.</p>
                    </div>
                  </RequireRole>
                }
              />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  );
}
