import React from 'react';
import Card from '../ui/Card';
import { MOCK_DATA } from '../../data/mockData';

const TimetableFeature = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-800">Weekly Timetable</h2>
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Monday</th>
              <th className="px-6 py-3">Tuesday</th>
              <th className="px-6 py-3">Wednesday</th>
              <th className="px-6 py-3">Thursday</th>
              <th className="px-6 py-3">Friday</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.timetable.map((slot, idx) => (
              <tr key={idx} className={`border-b ${slot.mon === "BREAK" ? "bg-gray-50" : "bg-white"}`}>
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{slot.time}</td>
                {slot.mon === "BREAK" ? (
                  <td colSpan="5" className="px-6 py-4 text-center font-bold text-gray-400 tracking-widest">LUNCH BREAK</td>
                ) : (
                  <>
                    <td className="px-6 py-4">{slot.mon}</td>
                    <td className="px-6 py-4">{slot.tue}</td>
                    <td className="px-6 py-4">{slot.wed}</td>
                    <td className="px-6 py-4">{slot.thu}</td>
                    <td className="px-6 py-4">{slot.fri}</td>
                    <td className="px-6 py-4">{slot.sat}</td>

                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

export default TimetableFeature;
