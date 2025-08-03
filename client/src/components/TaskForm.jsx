import React from "react";
import { useState } from "react";

const TaskForm = ({ setTasks }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks(prev => [...prev, formData]);
    setFormData({ title: "", description: "", status: "pending" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <input
        type="text"
        name="title"
        placeholder="Task Title"
        className="w-full border p-2 rounded"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Task Description"
        className="w-full border p-2 rounded"
        value={formData.description}
        onChange={handleChange}
      ></textarea>
      <select
        name="status"
        className="w-full border p-2 rounded"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>
      <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
