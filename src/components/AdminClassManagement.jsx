import React, { useState } from "react";

const AdminClassManagement = ({ teachers, classes, setClasses }) => {
  const [form, setForm] = useState({
    className: "",
    assignedTeacher: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.className.trim()) {
      setError("Class name is required.");
      return;
    }

    const exists = classes.some(
      (c) => c.className.toLowerCase() === form.className.toLowerCase()
    );

    if (exists) {
      setError("Class already exists.");
      return;
    }

    const newClass = {
      id: classes.length ? Math.max(...classes.map((c) => c.id)) + 1 : 1,
      className: form.className.trim(),
      assignedTeacher: form.assignedTeacher
    };

    setClasses([...classes, newClass]);

    setForm({
      className: "",
      assignedTeacher: ""
    });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold text-slate-900">Class Management</h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Create Class Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4"
        >
          <h3 className="text-base font-semibold text-slate-800">Add New Class</h3>

          <div>
            <label className="text-xs text-gray-600">Class Name</label>
            <input
              name="className"
              value={form.className}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200"
              placeholder="e.g. Class 10-A"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600">Assign Teacher</label>
            <select
              name="assignedTeacher"
              value={form.assignedTeacher}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-white"
            >
              <option value="">Select a teacher</option>
              {teachers.map((t) => (
                <option key={t.id} value={t.fullName}>
                  {t.fullName}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700"
          >
            Create Class
          </button>
        </form>

        {/* Class List */}
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-base font-semibold text-slate-800 mb-3">Existing Classes</h3>

          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500 border-b">
              <tr>
                <th className="text-left py-2">Class Name</th>
                <th className="text-left py-2">Assigned Teacher</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls) => (
                <tr key={cls.id} className="border-b">
                  <td className="py-2">{cls.className}</td>
                  <td className="py-2">
                    {cls.assignedTeacher || "Not Assigned"}
                  </td>
                </tr>
              ))}

              {!classes.length && (
                <tr>
                  <td
                    colSpan={2}
                    className="text-center py-4 text-gray-400"
                  >
                    No classes created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminClassManagement;
