import React, { useState } from "react";
import api, { API, showToast, showAlert } from "../api";
import "../admin_styles/AdminLogin.css";
export default function AdminLogin() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      showToast("Please enter username & password", "error");
      return;
    }

    try {
      const res = await api.post(API.ADMIN.LOGIN, form);

      // Save token
      localStorage.setItem("adminToken", res.data.token);

      // Popup success
      await showAlert({
        title: "Login Successful!",
        text: "Welcome Admin",
        icon: "success",
      });

      // Redirect
      window.location.href = "/admin";
    } catch (err) {
      showToast(
        err.response?.data?.message || "Invalid credentials",
        "error"
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Login</h2>

      <input
        type="text"
        name="username"
        placeholder="Enter Username"
        value={form.username}
        onChange={handleChange}
        style={styles.input}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={form.password}
        onChange={handleChange}
        style={styles.input}
      />

      <button onClick={handleLogin} style={styles.button}>
        Login
      </button>
    </div>
  );
}


// -- STYLES --
const styles = {
  container: {
    width: "350px",
    margin: "80px auto",
    padding: "25px",
    borderRadius: "10px",
    background: "#f8f8f8",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#1E90FF",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};





