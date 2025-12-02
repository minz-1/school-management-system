import React from 'react';
import { Users, User, BookOpen, BarChart2 } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { MOCK_DATA } from '../../data/mockData';

const DashboardContent = ({ role }) => {
  if (role === 'admin') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-indigo-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">{MOCK_DATA.stats.students}</h3>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                <Users size={20} />
              </div>
            </div>
          </Card>
          <Card className="border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Teachers</p>
                <h3 className="text-2xl font-bold">{MOCK_DATA.stats.teachers}</h3>
              </div>
              <div className="bg-green-50 p-2 rounded-lg text-green-600">
                <User size={20} />
              </div>
            </div>
          </Card>
          <Card className="border-l-4 border-orange-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Classes</p>
                <h3 className="text-2xl font-bold">{MOCK_DATA.stats.classes}</h3>
              </div>
              <div className="bg-orange-50 p-2 rounded-lg text-orange-600">
                <BookOpen size={20} />
              </div>
            </div>
          </Card>
          <Card className="border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Avg Attendance</p>
                <h3 className="text-2xl font-bold">{MOCK_DATA.stats.attendanceRate}%</h3>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <BarChart2 size={20} />
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-lg font-bold mb-4">Recent Activities</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4 text-sm border-b pb-2 last:border-0">
                  <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                  <p className="flex-1 text-gray-600">Teacher Sarah updated marks for Class 10-A</p>
                  <span className="text-gray-400 text-xs">2h ago</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="secondary" className="justify-start">Add Student</Button>
              <Button variant="secondary" className="justify-start">Add Teacher</Button>
              <Button variant="secondary" className="justify-start">Create Notice</Button>
              <Button variant="secondary" className="justify-start">Fee Report</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Teacher/Student Dashboard Logic
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Welcome back, {role === 'teacher' ? 'Prof. Sarah' : 'Alice'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg">Today's Schedule</h3>
            <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="space-y-3">
             {MOCK_DATA.timetable.slice(0,3).map((slot, idx) => (
               <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
                 <div className="w-24 text-sm font-semibold text-gray-600">{slot.time.split(' - ')[0]}</div>
                 <div className="w-1 h-8 bg-indigo-200 mx-4 rounded-full"></div>
                 <div>
                   <p className="font-bold text-gray-800">{slot.mon}</p>
                   <p className="text-xs text-gray-500">Room 304 • Class 10-A</p>
                 </div>
               </div>
             ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
             <h3 className="font-bold text-lg mb-3">Notices</h3>
             <div className="space-y-3">
               {MOCK_DATA.notices.slice(0, 2).map(notice => (
                 <div key={notice.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                    <p className="text-sm font-semibold text-gray-800">{notice.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
                 </div>
               ))}
             </div>
          </Card>
          {role === 'student' && (
            <Card className="bg-indigo-600 text-white">
              <h3 className="font-bold text-lg">Homework Due</h3>
              <p className="text-indigo-200 text-sm mt-1">You have 2 pending assignments</p>
              <Button variant="secondary" className="mt-4 w-full text-sm py-1">View All</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
