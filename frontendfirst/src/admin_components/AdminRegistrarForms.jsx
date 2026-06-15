import React, { useEffect, useState } from "react";
import api from "../api";
import "../admin_styles/AdminRegistrarForms.css";

export default function AdminRegistrarForms() {
  const [submissions, setSubmissions] = useState([]);

  const fetchForms = async () => {
    try {
      const res = await api.get(`/api/registrar-form?schoolId=1`);
      if (res.data.success) {
        setSubmissions(res.data.data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <div className="admin-registrar-wrapper">
      <h2>Registrar Contact Form Submissions</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Submitted At</th>
          </tr>
        </thead>

        <tbody>
          {submissions.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                No submissions yet.
              </td>
            </tr>
          ) : (
            submissions.map((row) => (
              <tr key={row._id}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.phone}</td>
                <td>{row.message}</td>
                <td>{new Date(row.submittedAt).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
