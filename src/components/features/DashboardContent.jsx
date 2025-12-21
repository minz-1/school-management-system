import React from 'react';
import { Users, User, DollarSign, TrendingUp, Bell, Calendar, BarChart2 } from 'lucide-react';
import Card from '../ui/Card';
import { MOCK_DATA } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

const DashboardContent = ({ role }) => {
  const navigate = useNavigate();

  // === 1. GENERATE "REAL" ATTENDANCE DATA ===
  const totalStudents = MOCK_DATA.stats.students; 
  
  const weeklyStats = [
    { day: 'Mon', percent: 96 },
    { day: 'Tue', percent: 92 },
    { day: 'Wed', percent: 94 },
    { day: 'Thu', percent: 98 },
    { day: 'Fri', percent: 85 },
    { day: 'Sat', percent: 90 },
  ].map(stat => ({
    ...stat,
    count: Math.round(totalStudents * (stat.percent / 100)) 
  }));

  
  if (role === 'admin') {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-indigo-500 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold text-gray-800">{MOCK_DATA.stats.students}</h3>
                <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                  <TrendingUp size={12} className="mr-1"/> +12 New admitted
                </p>
              </div>
              <div className="bg-indigo-50 p-2 rounded-lg text-indigo-600">
                <Users size={20} />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-purple-500 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Teachers</p>
                <h3 className="text-2xl font-bold text-gray-800">{MOCK_DATA.stats.teachers}</h3>
                <p className="text-xs text-gray-400 mt-1">Full-time staff</p>
              </div>
              <div className="bg-purple-50 p-2 rounded-lg text-purple-600">
                <User size={20} />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-green-500 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Fees Collected</p>
                <h3 className="text-2xl font-bold text-gray-800">$45,200</h3>
                <p className="text-xs text-green-600 flex items-center mt-1 font-medium">
                  <TrendingUp size={12} className="mr-1"/> +8.2% vs last month
                </p>
              </div>
              <div className="bg-green-50 p-2 rounded-lg text-green-600">
                <DollarSign size={20} />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-blue-500 p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg Attendance</p>
                <h3 className="text-2xl font-bold text-gray-800">{MOCK_DATA.stats.attendanceRate}%</h3>
                <p className="text-xs text-blue-600 mt-1 font-medium">Today's Live Count</p>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                <BarChart2 size={20} />
              </div>
            </div>
          </Card>
        </div>

       
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          
          <Card className="lg:col-span-2 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-800">Attendance Overview</h3>
              <select className="text-xs border rounded p-1 bg-gray-50 outline-none text-gray-600">
                <option>This Week</option>
              </select>
            </div>
            
            <div className="flex items-end justify-between h-48 gap-3 px-2">
              {weeklyStats.map((stat, i) => (
                <div key={stat.day} className="relative flex flex-col items-center w-full h-full group cursor-pointer">
                  
                  
                  <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
                      <p className="font-bold">{stat.count} Students</p>
                      <p className="text-gray-300 text-[10px]">{stat.percent}% Present</p>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>

                  
                  <div className="relative w-full max-w-10 bg-gray-100 rounded-t-lg h-full overflow-hidden flex items-end">
                     
                     <div 
                        className={`w-full transition-all duration-500 ease-out group-hover:opacity-80 ${i === 3 ? 'bg-indigo-600' : 'bg-indigo-400'}`} 
                        style={{ height: `${stat.percent}%` }}
                     ></div>
                  </div>
                  
                  <span className="text-xs text-gray-500 mt-2 font-medium group-hover:text-indigo-600 transition-colors">
                    {stat.day}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          
          <div className="space-y-6">
            
            
           <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                
                <button 
                  onClick={()=>navigate('/students')} 
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-indigo-100 bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                >
                  <Users size={18} className="mr-2"/> Add Student
                </button>

                <button 
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-purple-100 bg-purple-50 text-purple-700 hover:bg-purple-100"
                >
                  <User size={18} className="mr-2"/> Add Teacher
                </button>

                <button 
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-green-100 bg-green-50 text-green-700 hover:bg-green-100"
                >
                  <DollarSign size={18} className="mr-2"/> Collect Fees
                </button>

                <button 
                  className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-colors border border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100"
                >
                  <Bell size={18} className="mr-2"/> Post Notice
                </button>

              </div>
            </div>

            
            <Card className="shadow-sm">
              <h3 className="text-lg font-bold mb-4 text-gray-800">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { text: "Fees received from John Doe", time: "2m ago", color: "bg-green-500" },
                  { text: "New Teacher Added: Sarah", time: "1h ago", color: "bg-purple-500" },
                  { text: "Class 10-A Result Published", time: "3h ago", color: "bg-blue-500" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <div className={`mt-1.5 w-2 h-2 rounded-full ${item.color} shrink-0`}></div>
                    <div>
                      <p className="text-gray-700 font-medium leading-tight">{item.text}</p>
                      <span className="text-gray-400 text-xs">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-2xl font-bold text-gray-800">Welcome back, {role === 'teacher' ? 'Mr. Hasan' : 'Alice'}</h2>
           <p className="text-gray-500">Here is what's happening in your classes today.</p>
        </div>
        <div className="text-right hidden md:block">
           <p className="text-2xl font-bold text-indigo-600">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
           <p className="text-sm text-gray-400">{new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 border-t-4 border-indigo-500">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg flex items-center">
              <Calendar size={20} className="mr-2 text-indigo-600"/> Today's Schedule
            </h3>
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">Active Term</span>
          </div>
          <div className="space-y-4">
             {MOCK_DATA.timetable.slice(0,3).map((slot, idx) => (
               <div key={idx} className="flex items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                 <div className="w-24 text-sm font-bold text-indigo-600">{slot.time.split(' - ')[0]}</div>
                 <div className="w-1 h-10 bg-gray-200 mx-4 rounded-full"></div>
                 <div>
                   <p className="font-bold text-gray-800 text-lg">{slot.mon}</p>
                   <p className="text-xs text-gray-500 flex items-center">Room 304 <span className="mx-2">•</span> Class 10-A</p>
                 </div>
                 <div className="ml-auto">
                    {idx === 0 && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-bold">NOW</span>}
                 </div>
               </div>
             ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="border-t-4 border-yellow-500">
             <h3 className="font-bold text-lg mb-3 flex items-center">
               <Bell size={20} className="mr-2 text-yellow-600"/> Notices
             </h3>
             <div className="space-y-3">
               {MOCK_DATA.notices.slice(0, 3).map(notice => (
                 <div key={notice.id} className="p-3 bg-yellow-50/50 rounded-lg border border-yellow-100 hover:bg-yellow-50 transition-colors cursor-pointer">
                    <p className="text-sm font-semibold text-gray-800 leading-tight">{notice.title}</p>
                    <p className="text-xs text-gray-400 mt-1">{notice.date}</p>
                 </div>
               ))}
             </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;