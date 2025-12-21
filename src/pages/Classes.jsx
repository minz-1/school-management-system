import React, { useState } from "react";
import { Plus, Edit, Trash2, X, Users, MapPin, User, GraduationCap } from "lucide-react";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";



const INITIAL_CLASSES = [
  {
    id: 1,
    name: "Class 10-A",
    teacher: "Ms. Fatima Khan",
    students: 24,
    room: "Block A - 101",
    capacity: 40,
  },
  {
    id: 2,
    name: "Class 9-B",
    teacher: "Mr. Ali Raza",
    students: 30,
    room: "Block B - 203",
    capacity: 40,
  },
  {
    id: 3,
    name: "Class 8-C",
    teacher: "Ms. Sara Iqbal",
    students: 18,
    room: "Block A - 105",
    capacity: 30,
  },
];

export default function Classes() {
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  
  const [form, setForm] = useState({
    name: "",
    teacher: "",
    room: "",
    capacity: "",
  });

  const dummyTeachers = [
    "Mrs. Fatima Khan",
    "Mr. Ali Raza",
    "Ms. Sara Iqbal",
    "Mr. Hassan",
    "Ms. Noor",
  ];

  function openAdd() {
    setEditing(null);
    setForm({ name: "", teacher: dummyTeachers[0], room: "", capacity: "" });
    setShowForm(true);
  }

  function openEdit(cls) {
    setEditing(cls.id);
    setForm({
      name: cls.name,
      teacher: cls.teacher,
      room: cls.room,
      capacity: String(cls.capacity),
    });
    setShowForm(true);
  }

  function handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this class?")) {
      setClasses((prev) => prev.filter((c) => c.id !== id));
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const { name, teacher, room, capacity } = form;
    
    if (!name.trim()) {
      alert("Class name is required");
      return;
    }

    if (editing) {
      setClasses((prev) =>
        prev.map((c) =>
          c.id === editing
            ? { ...c, name, teacher, room, capacity: Number(capacity) || 0 }
            : c
        )
      );
    } else {
      const newClass = {
        id: Date.now(),
        name,
        teacher,
        room,
        capacity: Number(capacity) || 0,
        students: 0,
      };
      setClasses((prev) => [newClass, ...prev]);
    }
    setShowForm(false);
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <GraduationCap className="text-indigo-600" /> Class Management
          </h2>
         
        </div>
        <Button onClick={openAdd} variant="primary">
          <Plus size={18} className="mr-2" /> Add Class
        </Button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((cls) => {
            const percent = cls.capacity > 0 ? Math.round((cls.students / cls.capacity) * 100) : 0;
            const barColor = percent > 90 ? 'bg-red-500' : percent > 75 ? 'bg-yellow-500' : 'bg-green-500';

            return (
              <Card key={cls.id} className="hover:shadow-lg transition-shadow border-t-4 border-indigo-500 relative">
                
                {/* Card Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{cls.name}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin size={14} className="mr-1" />
                      {cls.room}
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <button 
                      onClick={() => openEdit(cls)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(cls.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="bg-white p-2 rounded-full shadow-sm mr-3">
                      <User size={18} className="text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-semibold">Class Teacher</p>
                      <p className="text-sm font-medium text-gray-800">{cls.teacher}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="flex items-center text-gray-600">
                        <Users size={14} className="mr-1" /> Students
                      </span>
                      <span className="font-bold text-gray-700">
                        {cls.students} <span className="text-gray-400 font-normal">/ {cls.capacity}</span>
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${barColor}`} 
                        style={{ width: `${Math.min(percent, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </Card>
            );
        })}

        {classes.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <GraduationCap size={48} className="mx-auto mb-4 opacity-20" />
            <p>No classes found. Click "Add Class" to get started.</p>
          </div>
        )}
      </div>

      
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editing ? "Edit Class Details" : "Create New Class"}
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Grade 10-A"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class Teacher</label>
                <div className="relative">
                  <select
                    name="teacher"
                    value={form.teacher}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all appearance-none"
                  >
                    {dummyTeachers.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gray-500">
                    <User size={16} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room No</label>
                  <input
                    name="room"
                    value={form.room}
                    onChange={handleChange}
                    placeholder="Block A-101"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                  <input
                    name="capacity"
                    value={form.capacity}
                    onChange={handleChange}
                    type="number"
                    min="1"
                    placeholder="40"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <Button 
                  type="button" 
                  variant="secondary"
                  onClick={() => setShowForm(false)}
                  className="border-none bg-gray-100 hover:bg-gray-200 text-gray-700"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  {editing ? "Save Changes" : "Create Class"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}