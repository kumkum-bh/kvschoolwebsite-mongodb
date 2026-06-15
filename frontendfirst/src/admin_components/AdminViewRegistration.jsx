import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api, { API } from "../api";
import "../admin_styles/AdminView.css";

export default function AdminViewRegistration() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`${API.ADMIN_REGISTRATIONS.GET_ONE}${id}`);
        if (res.data.success) {
          setData(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    load();
  }, [id]);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="view-container">
      <h2>Registration Details</h2>

      <div className="view-box">
        <div className="photo-sec">
          {data.studentPhoto ? (
            <img
              src={`http://localhost:5000${data.studentPhoto}`}
              alt="student"
            />
          ) : (
            <p>No Photo</p>
          )}
        </div>

        <div className="info-sec">
          <p><strong>Admission No:</strong> {data.admissionNo}</p>
          <p><strong>Name:</strong> {data.studentName}</p>
          <p><strong>DOB:</strong> {new Date(data.dob).toLocaleDateString()}</p>
          <p><strong>Class Applied:</strong> {data.classApplied}</p>
          <p><strong>Father:</strong> {data.fatherName}</p>
          <p><strong>Mother:</strong> {data.motherName}</p>
          <p><strong>Guardian:</strong> {data.guardianName}</p>
          <p><strong>Address:</strong> {data.address}</p>
          <p><strong>Contact:</strong> {data.phone}</p>
          <p><strong>Email:</strong> {data.email}</p>
        </div>
      </div>

      <Link to="/admin/registrations" className="back-link">
        ⬅ Back to Registrations
      </Link>
    </div>
  );
}
