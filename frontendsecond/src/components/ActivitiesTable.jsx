
import React, { useEffect, useState } from "react";
import api from "../api"; // tumhara axios instance
import "../styles/ActivitiesTable.css";

export default function ActivitiesTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await api.get("/api/activities");  // route
      if (res.data.success) {
        setRows(res.data.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="table-wrapper">
      <h2>Activities Planner (Nursery – 12th)</h2>
      <table className="activity-table">
        <thead>
          <tr>
            <th>Class</th>
            <th>Date</th>
            <th>Activity</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r._id}>
              <td>{r.className}</td>
              <td>{r.date}</td>
              <td>{r.activity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
