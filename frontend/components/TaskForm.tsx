"use client";
import { useState } from "react";

export default function TaskForm({ onAddTask }: { onAddTask: (title: string) => void }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title);
      setTitle("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 mt-6"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blush"
        placeholder="✍️ Add a new task..."
      />
      <button
        type="submit"
        className="bg-blush text-white font-semibold px-5 py-2 rounded-lg hover:bg-pink-400 transition"
      >
        ➕ Add
      </button>
    </form>
  );
}
