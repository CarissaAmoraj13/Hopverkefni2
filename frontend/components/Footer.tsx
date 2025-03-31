"use client";
export function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center text-sm">
      &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
    </footer>
  );
}