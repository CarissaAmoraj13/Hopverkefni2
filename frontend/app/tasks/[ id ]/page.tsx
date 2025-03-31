"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getTaskById, updateTask } from "../../utils/api"
import Navbar from "../../../components/Navbar";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string; // ✅ Fix: Explicitly cast id to string

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    const loadTask = async () => {
      try {
        const task = await getTaskById(id, token);
        setTitle(task.title);
        setDescription(task.description || "");
        setCompleted(task.status === "complete"); // ✅ match backend "status" field
      } catch (err) {
        console.error("❌ Error loading task:", err);
        setError("⚠️ Failed to load task.");
      }
    };

    loadTask();
  }, [id]);

  const handleUpdateTask = async () => {
    const token = localStorage.getItem("token");
    if (!token || !id) return;

    try {
      await updateTask(id, title, completed, token);
      router.push("/"); // ✅ Go back to homepage after update
    } catch (err) {
      console.error("❌ Error updating task:", err);
      setError("⚠️ Failed to update task.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-6 mt-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">✏️ Edit Task</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />
        <textarea
          placeholder="Task Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
            className="mr-2"
          />
          Mark as Completed
        </label>

        <button
          onClick={handleUpdateTask}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Update Task
        </button>
      </div>
    </div>
  );
}
