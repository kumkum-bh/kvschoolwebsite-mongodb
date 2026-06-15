
import React, { useEffect, useState } from "react";
import api, { API, showAlert, showToast } from "../api";
import "../styles/Notices.css";
import Swal from "sweetalert2";

export default function AdminNotice() {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);

  const fetchNotices = async () => {
    try {
      const res = await api.get(API.ADMIN_NOTICE.GET_ALL);
      setNotices(res.data);
      showToast("Notices loaded successfully!");
    } catch (err) {
      console.error(err);
      showToast("Failed to fetch notices", "error");
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleAdd = async () => {
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      if (file) fd.append("file", file);

      await api.post(API.ADMIN_NOTICE.ADD, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      showToast("Notice added successfully", "success");
      setForm({ title: "", description: "" });
      setFile(null);
      fetchNotices();
    } catch (err) {
      console.error(err);
      showAlert("Error", "Failed to add notice");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This notice will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel"
    });

    if (!confirm.isConfirmed) return;

    try {
      await api.delete(API.ADMIN_NOTICE.DELETE(id));
      showToast("Notice deleted", "success");
      fetchNotices();
    } catch (err) {
      console.error(err);
      showAlert("Error", "Failed to delete notice");
    }
  };

  return (
    <div className="notice-container">
      <h2 className="notice-title">Manage Notices (Admin)</h2>

      <input
        type="text"
        className="notice-input"
        placeholder="Notice Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="notice-textarea"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      ></textarea>

      <input
        type="file"
        className="notice-file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button className="btn-blue" onClick={handleAdd}>
        Add Notice
      </button>

      <div className="divider"></div>

      <h3 className="notice-title">All Notices</h3>

      {notices.map((n) => (
        <div className="notice-card" key={n._id}>
          <h3>{n.title}</h3>
          <p>{n.description}</p>

          {n.fileUrl && (
            <a
              className="notice-download"
              href={`http://localhost:5000${n.fileUrl}`}
              download
            >
              Download
            </a>
          )}

          <button
            className="btn-blue btn-delete"
            onClick={() => handleDelete(n._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
