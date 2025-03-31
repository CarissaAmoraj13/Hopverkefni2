const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

// ✅ Fetch all tasks
export async function fetchTasks(token?: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch tasks");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching tasks:", error);
    throw error;
  }
}

// ✅ Login user
export async function loginUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json(); // returns { token }
  } catch (error) {
    console.error("❌ Login error:", error);
    throw error;
  }
}

// ✅ Register user
export async function registerUser(email: string, password: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Register error:", error);
    throw error;
  }
}

// ✅ Get a single task by ID
export async function getTaskById(id: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch task");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching task by ID:", error);
    throw error;
  }
}

// ✅ Create a new task
export async function createTask(title: string, description: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create task");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Create task error:", error);
    throw error;
  }
}

// ✅ Update an existing task
export async function updateTask(id: string, title: string, completed: boolean, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        status: completed ? "complete" : "incomplete",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update task");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Update task error:", error);
    throw error;
  }
}

// ✅ Toggle Complete Task (NEW FUNCTION ADDED)
export async function toggleCompleteTask(id: string, completed: boolean, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: completed ? "complete" : "incomplete" }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update task status");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Toggle Complete Error:", error);
    throw error;
  }
}

// ✅ Delete a task
export async function deleteTask(id: string, token: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete task");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Delete task error:", error);
    throw error;
  }
}

