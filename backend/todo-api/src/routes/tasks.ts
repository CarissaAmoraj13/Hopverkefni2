import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middleware/auth";

const app = new Hono();
const prisma = new PrismaClient();

// ✅ Define the expected user type
type UserPayload = {
  id: string;
  role: string;
};

// ✅ Extend Hono context to include "user"
declare module "hono" {
  interface ContextVariableMap {
    user: UserPayload;
  }
}

// 🔒 Apply authentication middleware to all routes
app.use("*", authMiddleware);

// ✅ Get tasks for the logged-in user
app.get("/", async (c) => {
  const user = c.get("user"); // ✅ Now TypeScript knows `user` is valid
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const tasks = await prisma.task.findMany({
    where: { userId: user.id },
  });

  return c.json(tasks);
});

// ✅ Create a new task (User must be logged in)
app.post("/", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const { title, description, categoryId } = await c.req.json();

  if (!title) {
    return c.json({ error: "Title is required" }, 400);
  }

  const task = await prisma.task.create({
    data: {
      title,
      description,
      status: "incomplete",
      userId: user.id,
      ...(categoryId && { categoryId }), // ✅ only include categoryId if it was sent
    },
  });
  
  
  return c.json(task);
});

// ✅ Update a task (Only the owner can update)
app.put("/:id", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const taskId = c.req.param("id");
  const { title, description, status } = await c.req.json();

  const task = await prisma.task.updateMany({
    where: { id: taskId, userId: user.id },
    data: { title, description, status },
  });

  return task.count ? c.json({ message: "Task updated!" }) : c.json({ error: "Task not found" }, 404);
});

// ✅ Delete a task (Only the owner can delete)
app.delete("/:id", async (c) => {
  const user = c.get("user");
  if (!user) return c.json({ error: "Unauthorized" }, 401);

  const taskId = c.req.param("id");

  const task = await prisma.task.deleteMany({
    where: { id: taskId, userId: user.id },
  });

  return task.count ? c.json({ message: "Task deleted!" }) : c.json({ error: "Task not found" }, 404);
});

export default app;
