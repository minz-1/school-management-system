import React, { useState } from "react";
import "./Classes.css";

/**
 * INITIAL_CLASSES - mock data / simulated DB
 */
const INITIAL_CLASSES = [
  {
    id: 1,
    name: "Class 10-A",
    teacher: "Mrs. Fatima Khan",
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
  const [editing, setEditing] = useState(null); // holds class id when editing
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
    if (!confirm("Are you sure you want to delete this class?")) return;
    setClasses((prev) => prev.filter((c) => c.id !== id));
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
      // update
      setClasses((prev) =>
        prev.map((c) =>
          c.id === editing
            ? { ...c, name, teacher, room, capacity: Number(capacity) || 0 }
            : c
        )
      );
    } else {
      // add
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
    <div className="edu-page">
      <div className="edu-header">
        <h1>Classes</h1>
        <button className="btn-primary" onClick={openAdd}>
          + Add Class
        </button>
      </div>

      {/* FORM MODAL / TOP FORM */}
      {showForm && (
        <div className="modal-backdrop" onClick={() => setShowForm(false)}>
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>{editing ? "Edit Class" : "Create Class"}</h2>
            <form onSubmit={handleSubmit} className="class-form">
              <label>
                Class Name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g., Grade 10-B"
                />
              </label>

              <label>
                Class Teacher
                <select
                  name="teacher"
                  value={form.teacher}
                  onChange={handleChange}
                >
                  {dummyTeachers.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Room Number
                <input
                  name="room"
                  value={form.room}
                  onChange={handleChange}
                  placeholder="e.g., Block A - 101"
                />
              </label>

              <label>
                Max Capacity
                <input
                  name="capacity"
                  value={form.capacity}
                  onChange={handleChange}
                  type="number"
                  min="1"
                  placeholder="e.g., 40"
                />
              </label>

              <div className="form-actions">
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editing ? "Save" : "Add Class"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* GRID OF CARDS */}
      <div className="grid">
        {classes.map((cls) => (
          <div className="card" key={cls.id}>
            <div className="card-top">
              <div className="class-name">{cls.name}</div>
              <div className="card-actions">
                <button
                  title="Edit"
                  onClick={() => openEdit(cls)}
                  className="icon-btn"
                >
                  ✏️
                </button>
                <button
                  title="Delete"
                  onClick={() => handleDelete(cls.id)}
                  className="icon-btn danger"
                >
                  🗑️
                </button>
              </div>
            </div>

            <div className="card-body">
              <div className="row">
                <div className="label">Teacher</div>
                <div className="value">{cls.teacher}</div>
              </div>

              <div className="row">
                <div className="label">Students</div>
                <div className="value">{cls.students} Students</div>
              </div>

              <div className="row">
                <div className="label">Room</div>
                <div className="value">{cls.room}</div>
              </div>

              <div className="capacity">
                Capacity: {cls.capacity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
