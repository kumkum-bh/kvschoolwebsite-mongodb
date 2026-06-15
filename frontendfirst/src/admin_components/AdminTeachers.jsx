// import React, { useEffect, useState } from "react";
// import api, {API, showAlert, showToast} from "../api";
// import "../admin_styles/AdminTeachers.css";
// import { useNavigate } from "react-router-dom";

// export default function ManageTeachers() {
//   const [teachers, setTeachers] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const navigate = useNavigate();

//   const fetchTeachers = async () => {
//     try {
//       const res = await api.get(API.ADMIN_TEACHERS.GET_ALL(1));
//       if (res.data.success) setTeachers(res.data.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => { fetchTeachers(); }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this teacher?")) return;
//     try {
//       await api.delete(API.ADMIN_TEACHERS.DELETE(id));
//       await fetchTeachers();
//       setSelected(null);
//     } catch (err) { console.error(err); }
//   };

//   const openEdit = (id) => {
//     navigate(`/admin/edit-teacher/${id}`, { state: { id } });
//     // or window.open(`/admin/edit-teacher/${id}`, "_blank");
//   };

//   return (
//     <div className="teachers-container">
//       <div className="left-panel">
//         <div className="left-header">
//           <h3>Teachers</h3>
//           <button className="add-btn" onClick={() => navigate("/admin/add-teacher")}>Add Teacher</button>
//         </div>

//         <ul className="teacher-list">
//           {teachers.map(t => (
//             <li key={t._id} className={selected?._id === t._id ? "active" : ""} onClick={() => setSelected(t)}>
//               {/* For teacher list (left panel) */}
//               <img 
//                 src={t.imageUrl ? `http://localhost:5000${t.imageUrl}` : "/assets/default-teacher.png"} 
//                 alt={t.name} 
//               />
//               <div className="meta">
//                 <div className="name">{t.name}</div>
//                 <div className="sub">{t.classCategory} • {t.subjects?.slice(0,3).join(", ")}</div>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="right-panel">
//         {!selected ? (
//           <div className="placeholder">Select a teacher to view details</div>
//         ) : (
//           <div className="details-box">
//             <div className="details-top">
//               {/* For selected teacher (right panel) */}
//               <img 
//                 className="big-photo" 
//                 src={selected.imageUrl ? `http://localhost:5000${selected.imageUrl}` : "/assets/default-teacher.png"} 
//                 alt={selected.name} 
//               />
//               <div className="info">
//                 <h2>{selected.name}</h2>
//                 <p><strong>Contact:</strong> {selected.phone}</p>
//                 <p><strong>Email:</strong> {selected.email}</p>
//                 <p><strong>Class:</strong> {selected.classCategory}</p>
//                 <p><strong>Subjects:</strong> {selected.subjects?.join(", ")}</p>
//                 <p><strong>Qualification:</strong> {selected.qualification}</p>
//               </div>
//             </div>

//             <div className="details-bottom">
//               <p><strong>Father:</strong> {selected.fatherName}</p>
//               <p><strong>Mother:</strong> {selected.motherName}</p>
//               <p><strong>Address:</strong> {selected.address}</p>
//               <p><strong>Experience:</strong> {selected.experience || 0} years</p>

//               <div className="actions">
//                 <button onClick={() => openEdit(selected._id)}>Edit</button>
//                 <button className="delete" onClick={() => handleDelete(selected._id)}>Delete</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import api, { API, showAlert, showToast } from "../api";
import "../admin_styles/AdminTeachers.css";
import { useNavigate } from "react-router-dom";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const fetchTeachers = async () => {
    try {
      const res = await api.get(API.ADMIN_TEACHERS.GET_ALL(1));
      if (res.data.success) {
        setTeachers(res.data.data);
        showToast("Teachers loaded successfully!");
      }
    } catch (err) {
      console.error(err);
      showAlert("Failed to load teachers", "error");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleDelete = async (id) => {
    // SweetAlert confirmation
    const confirm = await showAlert("Are you sure you want to delete?", "warning");

    if (!confirm) return;

    try {
      await api.delete(API.ADMIN_TEACHERS.DELETE(id));
      showToast("Teacher deleted!");
      await fetchTeachers();
      setSelected(null);
    } catch (err) {
      console.error(err);
      showAlert("Delete failed!", "error");
    }
  };

  const openEdit = (id) => {
    navigate(`/admin/edit-teacher/${id}`);
  };

  return (
    <div className="teachers-container">
      <div className="left-panel">
        <div className="left-header">
          <h3>Teachers</h3>
          <button className="add-btn" onClick={() => navigate("/admin/add-teacher")}>
            Add Teacher
          </button>
        </div>

        <ul className="teacher-list">
          {teachers.map((t) => (
            <li
              key={t._id}
              className={selected?._id === t._id ? "active" : ""}
              onClick={() => setSelected(t)}
            >
              <img
                src={
                  t.imageUrl
                    ? `http://localhost:5000${t.imageUrl}`
                    : "/assets/default-teacher.png"
                }
                alt={t.name}
              />

              <div className="meta">
                <div className="name">{t.name}</div>
                <div className="sub">
                  {t.classCategory} • {t.subjects?.slice(0, 3).join(", ")}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        {!selected ? (
          <div className="placeholder">Select a teacher to view details</div>
        ) : (
          <div className="details-box">
            <div className="details-top">
              <img
                className="big-photo"
                src={
                  selected.imageUrl
                    ? `http://localhost:5000${selected.imageUrl}`
                    : "/assets/default-teacher.png"
                }
                alt={selected.name}
              />

              <div className="info">
                <h2>{selected.name}</h2>
                <p>
                  <strong>Contact:</strong> {selected.phone}
                </p>
                <p>
                  <strong>Email:</strong> {selected.email}
                </p>
                <p>
                  <strong>Class:</strong> {selected.classCategory}
                </p>
                <p>
                  <strong>Subjects:</strong> {selected.subjects?.join(", ")}
                </p>
                <p>
                  <strong>Qualification:</strong> {selected.qualification}
                </p>
              </div>
            </div>

            <div className="details-bottom">
              <p>
                <strong>Father:</strong> {selected.fatherName}
              </p>
              <p>
                <strong>Mother:</strong> {selected.motherName}
              </p>
              <p>
                <strong>Address:</strong> {selected.address}
              </p>
              <p>
                <strong>Experience:</strong> {selected.experience} years
              </p>

              <div className="actions">
                <button onClick={() => openEdit(selected._id)}>Edit</button>

                <button className="delete" onClick={() => handleDelete(selected._id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}








































