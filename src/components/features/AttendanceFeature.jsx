import React, { useState } from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { MOCK_DATA } from '../../data/mockData';

const AttendanceFeature = ({ role }) => {
  const [marked, setMarked] = useState({});

  const handleMark = (id, status) => {
    setMarked(prev => ({ ...prev, [id]: status }));
  };

  if (role === 'student') {
    return (
      <Card>
        <h3 className="text-lg font-bold mb-4">My Attendance Record</h3>
        <div className="flex items-center justify-between mb-6 p-4 bg-indigo-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-500">Overall Attendance</p>
            <p className="text-2xl font-bold text-indigo-600">92%</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total Days</p>
            <p className="font-semibold">145 / 158</p>
          </div>
        </div>
        <div className="space-y-3">
          {[1,2,3,4,5].map(d => (
            <div key={d} className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600">Nov {d}, 2023</span>
              <Badge type="success">Present</Badge>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Class Attendance</h2>
        <div className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</div>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="pb-3 pl-2">Roll No</th>
                <th className="pb-3">Name</th>
                <th className="pb-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_DATA.students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="py-3 pl-2 font-mono text-gray-500">#{student.rollNo}</td>
                  <td className="py-3 font-medium">{student.name}</td>
                  <td className="py-3">
                    <div className="flex justify-center gap-2">
                      {['Present', 'Absent', 'Late'].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleMark(student.id, status)}
                          className={`px-3 py-1 rounded-md text-sm transition-colors ${
                            marked[student.id] === status
                              ? status === 'Present' ? 'bg-green-100 text-green-700 border-green-200 border'
                              : status === 'Absent' ? 'bg-red-100 text-red-700 border-red-200 border'
                              : 'bg-yellow-100 text-yellow-700 border-yellow-200 border'
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex justify-end">
          <Button>Save Attendance Record</Button>
        </div>
      </Card>
    </div>
  );
};

export default AttendanceFeature;
