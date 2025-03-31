"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className="bg-blush text-white shadow-md w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide hover:text-white/80 transition"
          >
            📌 To-Do App
          </Link>

          {/* Links */}
          <div className="space-x-6 text-sm font-medium">
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-white text-blush font-semibold px-4 py-2 rounded-full hover:bg-pink-100 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:underline hover:text-white/80 transition"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="hover:underline hover:text-white/80 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
