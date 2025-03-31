"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchTasks, toggleCompleteTask, deleteTask } from "../utils/api";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: string; // "incomplete" or "complete"
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("❌ You must be logged in to view your tasks.");
      return;
    }

    fetchTasks(token)
      .then(setTasks)
      .catch((err) => {
        console.error("❌ Failed to fetch tasks:", err);
        setError("⚠️ Failed to load tasks.");
      });
  }, []);

  const handleComplete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await toggleCompleteTask(id, true, token);
    const updated = await fetchTasks(token);
    setTasks(updated);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await deleteTask(id, token);
    const updated = await fetchTasks(token);
    setTasks(updated);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🗂️ Your To-Do Tasks</h1>

      <div className="mb-4 text-right">
        <Link href="/tasks/new">
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
            ➕ Add New Task
          </button>
        </Link>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks found. Add some! 👇</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`p-3 border rounded bg-white shadow-sm flex justify-between items-center ${
                task.status === "complete" ? "opacity-50 line-through" : ""
              }`}
            >
              <div>
                <strong>{task.title}</strong>
                {task.description && <p className="text-sm">{task.description}</p>}
              </div>
              <div className="flex gap-2">
                {task.status !== "complete" && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="text-green-600 hover:underline"
                  >
                    ✅ Done
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
