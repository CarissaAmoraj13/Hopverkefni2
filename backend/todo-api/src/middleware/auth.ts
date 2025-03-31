import { MiddlewareHandler } from "hono";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "default_secret";

// Define the expected structure of the JWT payload
type UserPayload = {
  id: string;
  role: string;
};

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized: Missing token" }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as UserPayload; // ✅ Ensure TypeScript recognizes it
    c.set("user", decoded); // ✅ Attach `user` to the context
    return next();
  } catch (error) {
    return c.json({ error: "Unauthorized: Invalid token" }, 401);
  }
};


