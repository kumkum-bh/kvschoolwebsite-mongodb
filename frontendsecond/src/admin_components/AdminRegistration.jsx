import React, { useEffect, useState } from "react";
import api, { API } from "../api";
import { Link } from "react-router-dom";
import "../admin_styles/AdminRegistration.css";

export default function AdminRegistrations() {
  const [list, setList] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(API.ADMIN_REGISTRATIONS.GET_ALL);
        if (res.data.success) {
          setList(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  return (
    <div className="admin-table-page">
      <h2>Student Registrations</h2>

      <table className="styled-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Admission No</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item) => (
            <tr key={item._id}>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
              <td>{item.admissionNo}</td>
              <td>{item.studentName}</td>
              <td>{item.classApplied}</td>
              <td>
                <Link
                  to={`/admin/registrations/${item._id}`}
                  target="_blank"
                  className="view-btn"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
