import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Notices.css";

export default function Notice() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/notices")
      .then((res) => setNotices(res.data));
  }, []);

  return (
    <div className="notice-container">
      <h2 className="notice-title">Latest Notices</h2>

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
              Download Document
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
