"use client";
export function Input({ type, value, onChange, placeholder }: { type: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; placeholder: string }) {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="border p-2 rounded w-full" />
  );
}