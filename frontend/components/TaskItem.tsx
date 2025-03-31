"use client";

import React, { FC } from "react";

interface TaskProps {
  id: string;
  title: string;
  completed: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onComplete: () => void;
}

const TaskItem: FC<TaskProps> = ({ id, title, completed, onEdit, onDelete, onComplete }) => {
  return (
    <li
      className="flex justify-between items-center bg-white border border-blush p-4 shadow-sm rounded-xl hover:shadow-md transition"
      data-task-id={id}
    >
      <span
        className={`text-base font-medium ${
          completed ? "line-through text-gray-400" : "text-gray-800"
        }`}
      >
        {title}
      </span>

      <div className="flex items-center space-x-2">
        {/* ✅ Complete Task Button */}
        <button
          onClick={onComplete}
          className={`px-3 py-1 rounded-md text-sm font-semibold text-white ${
            completed
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 transition"
          }`}
          disabled={completed}
          title="Mark as done"
        >
          ✅
        </button>

        {/* ✏️ Edit Task Button */}
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-sm font-semibold text-white rounded-md transition"
          title="Edit task"
        >
          ✏️
        </button>

        {/* 🗑 Delete Task Button */}
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-sm font-semibold text-white rounded-md transition"
          title="Delete task"
        >
          🗑
        </button>
      </div>
    </li>
  );
};

export default TaskItem;


