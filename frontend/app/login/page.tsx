"use client"; // Ensures it runs only on the client-side

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Fix router import
import { loginUser } from "../utils/api"; // ✅ Ensure `utils/api.ts` exists

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // ✅ Fix TypeScript error type

  const handleLogin = async () => {
    try {
      const { token } = await loginUser(email, password);
      console.log("✅ Login successful, token:", token); // 👈 Add this
      localStorage.setItem("token", token);
      router.push("/tasks"); // 👈 This should trigger
    } catch (error) {
      console.error("Login failed:", error);
      setError("⚠️ Invalid credentials, please try again.");
    }
  };
  
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">🔐 Login</h1>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}

