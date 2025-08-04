import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaMoon } from "react-icons/fa";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [calendarDate, setCalendarDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColor, setSelectedColor] = useState("#fef9c3");
  const [repeatType, setRepeatType] = useState("Daily");
  const [tags, setTags] = useState(["Daily Routine", "Study"]);
  const [customTag, setCustomTag] = useState("");
  const [viewMode, setViewMode] = useState("form");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const colorOptions = [
    "#a8e6cf",
    "#fbc4ab",
    "#ffd3b6",
    "#ffffd1",
    "#caffbf",
    "#9bf6ff",
    "#bdb2ff",
    "#ffc6ff",
    "#ffadad",
    "#fef9c3",
  ];

  const handleSubmit = () => {
    if (!title) return;

    const newTask = {
      title,
      description,
      color: selectedColor,
      repeatType,
      tags,
      date: calendarDate,
      completed: false,
    };

    setTaskList([...taskList, newTask]);
    setTitle("");
    setDescription("");
    setSelectedColor("#fef9c3");
    setRepeatType("Daily");
    setTags(["Daily Routine", "Study"]);
    setCustomTag("");
    setViewMode("list");
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...taskList];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTaskList(updatedTasks);
  };

  const countTasksByTag = (tag) => {
    return taskList.filter((task) => task.tags.includes(tag)).length;
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen text-gray-800 font-sans">
      <aside className="w-full lg:w-1/5 bg-white p-4 border-b lg:border-b-0 lg:border-r overflow-y-auto">
        <div className="text-2xl font-bold mb-6 flex items-center gap-2">
          <img
            src="/Vector.png"
            alt="Logo"
            className="w-6 h-6 object-contain"
          />
          Listify
        </div>

        <div className="mb-6 overflow-x-auto">
          <Calendar
            onChange={setCalendarDate}
            value={calendarDate}
            className="rounded-lg p-2 bg-gray-100 text-sm"
          />
        </div>

        <div className="text-sm mb-4">
          <h3 className="font-semibold">Tasks</h3>
          <p className="flex justify-between my-1">
            Today <span>{taskList.length}</span>
          </p>

          <h3 className="font-semibold mt-4">Lists</h3>
          {["Daily Routine", "Study"].map((tag, i) => (
            <p key={i} className="flex justify-between my-1">
              {tag} <span>{countTasksByTag(tag)}</span>
            </p>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 md:p-8 bg-gray-50 relative">
        <div className="absolute top-4 right-4 sm:right-6 flex gap-3 sm:gap-4 text-xl text-gray-600 items-center z-10">
          <FaMoon />
          <BsPersonCircle />
          <button
            onClick={handleLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {viewMode === "form" ? (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              New Task 🌀
            </h2>

            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
              <input
                type="text"
                placeholder="Name your new task"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mb-4 p-2 border-b border-gray-300 outline-none"
              />
              <input
                type="text"
                placeholder="Describe your new task"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-6 p-2 border-b border-gray-300 outline-none"
              />

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Card Color</h3>
                <div className="flex gap-3 flex-wrap">
                  {colorOptions.map((color, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 rounded-full border cursor-pointer ${
                        selectedColor === color ? "ring-2 ring-black" : ""
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row flex-wrap gap-6">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Repeat</h3>
                  <div className="flex gap-2 mb-2">
                    {["Daily", "Weekly", "Monthly"].map((type) => (
                      <button
                        key={type}
                        className={`px-4 py-1 border rounded-full ${
                          repeatType === type
                            ? "bg-black text-white"
                            : "bg-white text-gray-600"
                        }`}
                        onClick={() => setRepeatType(type)}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-1 text-xs text-gray-600 flex-wrap">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <div
                          key={day}
                          className="px-2 py-1 bg-gray-100 rounded"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>
                  <p className="text-xs mt-2 text-gray-400">
                    Repeat: Every {repeatType.toLowerCase()}
                  </p>
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold mb-2">
                    Set a tag for your task
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                    <input
                      type="text"
                      placeholder="Add More +"
                      value={customTag}
                      onChange={(e) => setCustomTag(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && customTag) {
                          setTags([...tags, customTag]);
                          setCustomTag("");
                        }
                      }}
                      className="px-3 py-1 border rounded-full text-sm outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-20">
              <button
                onClick={handleSubmit}
                className="bg-black text-white p-3 rounded-full shadow-lg text-lg"
              >
                ✓
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
              Today
            </h2>
            <div className="flex flex-col gap-4">
              {taskList.map((task, index) => (
                <div
                  key={index}
                  className="p-4 rounded-md flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4"
                  style={{ backgroundColor: task.color }}
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-1 sm:mt-0"
                    checked={task.completed}
                    onChange={() => toggleTaskCompletion(index)}
                  />
                  <div>
                    <p
                      className={`${
                        task.completed ? "line-through" : ""
                      } font-medium`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p className="text-sm text-gray-700">
                        {task.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-20">
              <button
                onClick={() => setViewMode("form")}
                className="bg-black text-white p-3 rounded-full shadow-lg text-lg"
              >
                +
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
