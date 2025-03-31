import { Hono } from "hono";
import { serve } from "@hono/node-server";
import * as dotenv from "dotenv";
import { cors } from "hono/cors"; // ✅ Add this

import tasksRoutes from "./routes/tasks";
import categoriesRoutes from "./routes/categories";
import authRoutes from "./routes/auth";

dotenv.config();

const app = new Hono();

app.use("*", cors()); // ✅ Enable CORS

app.get("/", (c) => c.text("Welcome to the To-Do API!"));
app.route("/tasks", tasksRoutes);
app.route("/categories", categoriesRoutes);
app.route("/auth", authRoutes);

serve({
  fetch: app.fetch,
  port: 5000,
});

console.log("✅ Server is running on http://localhost:5000");

