"use client";

import { useEffect, useState } from "react";
import { fetchTasks, deleteTask, toggleCompleteTask } from "../app/utils/api";
import TaskItem from "../components/TaskItem";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setLoading(false);
      return;
    }

    setToken(storedToken);
    loadTasks(storedToken);
  }, []);

  const loadTasks = async (token: string) => {
    try {
      const data = await fetchTasks(token);
      setTasks(data);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
      setError("⚠️ Error fetching tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    if (!token) return;
    try {
      await toggleCompleteTask(id, true, token);
      loadTasks(token);
    } catch (error) {
      console.error("❌ Error marking task complete:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteTask(id, token);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("❌ Error deleting task:", error);
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/tasks/${id}`);
  };

  return (
    <div className="bg-[#FDE2E4] min-h-screen flex flex-col font-sans">
      <Navbar />

      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-3xl bg-white border border-blush shadow-xl rounded-2xl p-8">
          <h1 className="text-4xl font-extrabold text-center text-pink-600 mb-6">
            ✅ Your To-Do List
          </h1>

          {loading && (
            <p className="text-gray-500 text-center text-lg animate-pulse">
              Loading tasks...
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center text-lg">{error}</p>
          )}
          {!loading && !error && tasks.length === 0 && (
            <p className="text-gray-600 text-center text-lg">
              No tasks found. Add some! 💡
            </p>
          )}

          <ul className="mt-6 space-y-4">
            {tasks.map((task) => (
              <TaskItem
                key={task.id}
                id={task.id}
                title={task.title}
                completed={task.completed}
                onComplete={() => handleComplete(task.id)}
                onEdit={() => handleEdit(task.id)}
                onDelete={() => handleDelete(task.id)}
              />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
