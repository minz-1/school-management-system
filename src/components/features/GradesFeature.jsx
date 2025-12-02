import React from 'react';
import Card from '../ui/Card';
import { MOCK_DATA } from '../../data/mockData';

const GradesFeature = ({ role }) => {
  if (role === 'student') {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">My Grades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_DATA.grades.map((g, idx) => (
            <Card key={idx} className="border-t-4 border-t-indigo-500">
              <div className="text-gray-500 text-sm mb-1">{g.subject}</div>
              <div className="flex justify-between items-end">
                <span className="text-3xl font-bold text-gray-800">{g.grade}</span>
                <span className="text-sm text-gray-600">Final: {g.final}%</span>
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <h3 className="font-bold mb-4">Detailed Report</h3>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-sm text-gray-500">
                <th className="py-2">Subject</th>
                <th className="py-2">Mid Term</th>
                <th className="py-2">Finals</th>
                <th className="py-2">Total Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {MOCK_DATA.grades.map((g, idx) => (
                <tr key={idx}>
                  <td className="py-3 font-medium">{g.subject}</td>
                  <td className="py-3">{g.midTerm}/100</td>
                  <td className="py-3">{g.final}/100</td>
                  <td className="py-3 font-bold text-indigo-600">{g.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Grade Entry</h2>
        <div className="flex gap-2">
          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>Class 10-A</option>
            <option>Class 10-B</option>
          </select>
          <select className="border rounded-md px-3 py-1 text-sm bg-white">
            <option>Mathematics</option>
            <option>Physics</option>
          </select>
        </div>
      </div>
      <Card>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="py-2 pl-2">Student</th>
              <th className="py-2 w-32">Mid Term</th>
              <th className="py-2 w-32">Final Exam</th>
              <th className="py-2 w-32">Assignment</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {MOCK_DATA.students.map((student) => (
              <tr key={student.id}>
                <td className="py-3 pl-2">
                  <div className="font-medium">{student.name}</div>
                  <div className="text-xs text-gray-500">#{student.rollNo}</div>
                </td>
                <td className="py-3">
                  <input type="number" className="w-20 border rounded px-2 py-1" placeholder="0-100" />
                </td>
                <td className="py-3">
                  <input type="number" className="w-20 border rounded px-2 py-1" placeholder="0-100" />
                </td>
                <td className="py-3">
                  <input type="number" className="w-20 border rounded px-2 py-1" placeholder="0-20" />
                </td>
                <td className="py-3">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default GradesFeature;
