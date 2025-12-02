import React from 'react';
import { BookOpen, ChevronRight, Plus } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { MOCK_DATA } from '../../data/mockData';

const HomeworkFeature = ({ role }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Homework & Diary</h2>
        {role === 'teacher' && <Button><Plus size={18} /> Assign Homework</Button>}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_DATA.homework.map((hw) => (
          <Card key={hw.id} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${hw.status === 'Submitted' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                <BookOpen size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-lg">{hw.title}</h4>
                <p className="text-sm text-gray-500">{hw.subject} • Due: {hw.due}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {role === 'student' ? (
                <Badge type={hw.status === 'Submitted' ? 'success' : 'warning'}>{hw.status}</Badge>
              ) : (
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-700">24/30 Submitted</p>
                  <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                    <div className="w-4/5 h-full bg-green-500"></div>
                  </div>
                </div>
              )}
              <Button variant="ghost" className="text-indigo-600"><ChevronRight size={20} /></Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomeworkFeature;
