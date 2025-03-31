"use client";
export function Button({ text, onClick }: { text: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white p-2 rounded">
      {text}
    </button>
  );
}