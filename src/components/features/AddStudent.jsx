import React, { useState } from 'react';
import { Trash2, Plus, Search, X } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const AddStudent = ({ data, setData }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', rollNo: '', class: '' });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create Student
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.rollNo) return;

    const newStudent = {
      id: Date.now(), // Random ID
      ...formData,
      attendance: 100 // Default value
    };

    setData([...data, newStudent]);
    setFormData({ name: '', rollNo: '', class: '' });
    setIsFormOpen(false);
  };

  // Delete Student
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setData(data.filter(student => student.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Student Management</h2>
        <Button onClick={() => setIsFormOpen(!isFormOpen)}>
          {isFormOpen ? <><X size={18}/> Cancel</> : <><Plus size={18}/> Add Student</>}
        </Button>
      </div>

      {/* ADD FORM */}
      {isFormOpen && (
        <Card className="bg-indigo-50 border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-300">
          <h3 className="font-bold text-lg mb-4 text-indigo-900">Add New Student</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Ex. John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Roll No</label>
              <input 
                name="rollNo" 
                value={formData.rollNo} 
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                placeholder="Ex. 101"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
              <select 
                name="class" 
                value={formData.class} 
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="">Select Class</option>
                <option value="10-A">10-A</option>
                <option value="10-B">10-B</option>
                <option value="11-A">11-A</option>
              </select>
            </div>
            <Button type="submit" variant="primary">Save Student</Button>
          </form>
        </Card>
      )}

      {/* STUDENT LIST */}
      <Card className="overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">Roll No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Class</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length > 0 ? (
              data.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-indigo-600 font-medium">#{student.rollNo}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 py-1 px-2 rounded text-xs font-bold">
                      {student.class}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(student.id)}
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                      title="Delete Student"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-400">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AddStudent;