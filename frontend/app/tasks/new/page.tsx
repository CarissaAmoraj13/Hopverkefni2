"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createTask } from "../../utils/api"; // ✅ two levels up
import Navbar from "../../../components/Navbar"; // ✅ three levels up

export default function NewTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreateTask = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("⚠️ You must be logged in to create tasks.");
      return;
    }

    console.log("📤 Creating task:", { title, description });

    try {
      await createTask(title, description, token);
      console.log("✅ Task created successfully");
      router.push("/tasks");
    } catch (err) {
      console.error("❌ Failed to create task:", err);
      setError("⚠️ Failed to create task. Please try again.");
    }
  };

  console.log("✅ Loaded /tasks/new page");

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-white p-6 mt-6 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-4">➕ Create a New Task</h1>

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
          className="w-full p-2 border mb-4 rounded"
        />

        <button
          onClick={handleCreateTask}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Create Task
        </button>
      </div>
    </div>
  );
}
