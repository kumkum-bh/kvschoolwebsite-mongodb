import React, { useEffect, useState } from "react";
import api from "../api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../admin_styles/AdminActivityTable.css";

export default function AdminActivitiesTable() {
  const [rows, setRows] = useState([]);
  const [form, setForm] = useState({
    className: "",
    date: "",
    activity: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await api.get("/api/activities");
      if (res.data.success) {
        setRows(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.className || !form.date || !form.activity) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editId) {
        await api.put(`/api/activities/update/${editId}`, form);
        setEditId(null);
      } else {
        await api.post("/api/activities/add", form);
      }

      setForm({ className: "", date: "", activity: "" });
      fetchActivities();
    } catch (err) {
      console.log(err);
    }
  };

  const startEdit = (item) => {
    setForm({
      className: item.className,
      date: item.date,
      activity: item.activity,
    });
    setEditId(item._id);
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this activity?")) return;

    try {
      await api.delete(`/api/activities/delete/${id}`);
      fetchActivities();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="admin-activity-container">
      <h2>Admin – Manage Activities</h2>

      {/* FORM */}
      <form className="activity-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Class Name (Nursery, LKG...)"
          value={form.className}
          onChange={(e) =>
            setForm({ ...form, className: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Date (12 Feb 2026)"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        {/* REACT QUILL FIELD */}
        <ReactQuill
          value={form.activity}
          onChange={(value) =>
            setForm({ ...form, activity: value })
          }
          placeholder="Enter Activity Description..."
          className="quill-input"
        />

        <button type="submit">
          {editId ? "Update Activity" : "Add Activity"}
        </button>
      </form>

      {/* TABLE */}
      <table className="admin-activity-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Date</th>
            <th>Activity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((r) => (
            <tr key={r._id}>
              <td>{r.className}</td>
              <td>{r.date}</td>

              {/* SHOW HTML FROM QUILL */}
              <td>
                <div
                  dangerouslySetInnerHTML={{ __html: r.activity }}
                ></div>
              </td>

              <td>
                <button className="edit-btn" onClick={() => startEdit(r)}>
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteItem(r._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
