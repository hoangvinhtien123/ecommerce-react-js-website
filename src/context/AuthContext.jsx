import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  // Fix: Initialize as an object { email: "..." } instead of a raw string
  // If it's a raw string, `user.email` in Navbar will crash the app on refresh!
  const [user, setUser] = useState(() => {
    const savedEmail = localStorage.getItem("currentUserEmail");
    return savedEmail ? { email: savedEmail } : null;
  });

  const [mode, setMode] = useState("login");

  // Helper to safely get users from local storage
  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      return [];
    }
  };

  function signUp(email, password) {
    const users = getUsers();

    if (users.find((u) => u.email === email)) {
      return {
        success: false,
        message: "An account with this email already exists.",
        type: "email",
      };
    }

    const newUser = { email, password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", email);

    setUser({ email });
    return { success: true };
  }

  function login(email, password) {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password. Please try again.",
        type: "login",
      };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });
    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ mode, setMode, user, signUp, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}