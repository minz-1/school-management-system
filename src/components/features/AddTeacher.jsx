import React, { useState } from 'react';
import { Trash2, Plus, Mail, BookOpen, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';


const AddTeacher = ({ data, setData }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', subject: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) return;

    const newTeacher = {
      id: Date.now(),
      ...formData,
    };

    setData([...data, newTeacher]);
    setFormData({ name: '', subject: '', email: '' });
    setIsFormOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this teacher?")) {
      setData(data.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Management</h2>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? <><X size={18}/> Cancel</> : <><Plus size={18}/> Add Teacher</>}
        </Button>
      </div>

      {/* ADD FORM */}
      {isFormOpen && (
        <Card className="bg-green-50 border-green-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-lg mb-4 text-green-900">Register New Teacher</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" 
                placeholder="Ex. Sarah Connor"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input 
                name="subject" 
                value={formData.subject} 
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" 
                placeholder="Ex. Mathematics"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                name="email" 
                value={formData.email} 
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none" 
                placeholder="Ex. sarah@school.com"
              />
            </div>
            <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">Save Teacher</Button>
          </form>
        </Card>
      )}

      {/* TEACHER LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((teacher) => (
          <Card key={teacher.id} className="relative group hover:shadow-md transition-shadow">
            <button 
              onClick={() => handleDelete(teacher.id)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={18} />
            </button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold text-lg">
                {teacher.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-gray-800">{teacher.name}</h3>
                <p className="text-sm text-green-600 font-medium">{teacher.subject}</p>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
              <Mail size={16} />
              <span>{teacher.email || 'No email provided'}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddTeacher;