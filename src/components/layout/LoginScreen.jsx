import React from 'react';
import { Users, BookOpen, User, GraduationCap } from 'lucide-react';

const LoginScreen = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4 text-white backdrop-blur-sm">
            <GraduationCap size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">EduNexus</h1>
          <p className="text-indigo-100">School Management System</p>
        </div>
        
        <div className="p-8 space-y-4">
          <p className="text-center text-gray-500 mb-6">Select a portal to demo the interface</p>
          
          <button 
            onClick={() => onLogin('admin')}
            className="w-full flex items-center p-4 border rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
          >
            <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-200">
              <Users size={24} />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-bold text-gray-800">Admin Portal</h3>
              <p className="text-sm text-gray-500">Manage users, fees, and settings</p>
            </div>
          </button>

          <button 
            onClick={() => onLogin('teacher')}
            className="w-full flex items-center p-4 border rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
          >
            <div className="bg-green-100 p-2 rounded-lg text-green-600 group-hover:bg-green-200">
              <BookOpen size={24} />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-bold text-gray-800">Teacher Portal</h3>
              <p className="text-sm text-gray-500">Mark attendance, grades, and homework</p>
            </div>
          </button>

          <button 
            onClick={() => onLogin('student')}
            className="w-full flex items-center p-4 border rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
          >
            <div className="bg-orange-100 p-2 rounded-lg text-orange-600 group-hover:bg-orange-200">
              <User size={24} />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-bold text-gray-800">Student Portal</h3>
              <p className="text-sm text-gray-500">View timetable, grades, and diary</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;