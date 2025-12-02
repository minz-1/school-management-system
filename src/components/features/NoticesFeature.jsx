import React from 'react';
import Card from '../ui/Card';
import { MOCK_DATA } from '../../data/mockData';

const NoticesFeature = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Notice Board</h2>
      <div className="grid gap-4">
        {MOCK_DATA.notices.map(n => (
          <Card key={n.id} className="border-l-4 border-indigo-500">
            <h3 className="font-bold text-lg">{n.title}</h3>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>{n.date}</span>
              <span className="bg-gray-100 px-2 rounded">{n.type}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default NoticesFeature;
