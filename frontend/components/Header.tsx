// components/Header.tsx - Navigation Bar
"use client";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex items-center justify-between">
      <Link href="/">
        <Image src="/logo.svg" alt="Logo" width={50} height={50} priority />
      </Link>
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/tasks/new">Create Task</Link>
        <Link href="/upload">Upload</Link>
        <Link href="/login">Login</Link>
      </nav>
    </header>
  );
}
