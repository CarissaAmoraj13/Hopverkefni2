import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const app = new Hono();
const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "default_secret";

// ✅ Register a new user
app.post("/register", async (c) => {
  const { email, password, role } = await c.req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || "user",
      },
    });

    return c.json({ message: "User registered successfully!", user });
  } catch (error: any) {
    console.error("❌ Registration error:", error);

    // Check for Prisma unique constraint violation
    if (error.code === "P2002") {
      return c.json({ error: "Email already registered. Please use a different one." }, 400);
    }

    return c.json({ error: "Something went wrong during registration." }, 500);
  }
});

// ✅ Login user
app.post("/login", async (c) => {
  const { email, password } = await c.req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1h" });
  return c.json({ message: "Login successful!", token });
});

export default app;


