// import React, { useEffect, useState } from "react";
// import api, { API, showToast, showAlert } from "../api";
// import '../admin_styles/AdminContact.css';

// export default function AdminContact() {
//   const [content, setContent] = useState([]);
//   const schoolId = 1;

//   useEffect(() => {
//     fetchContent();
//   }, []);

//   const fetchContent = async () => {
//     try {
//       const res = await api.get(`${API.ADMIN_CONTACT.GET}?schoolId=${schoolId}`);
//       if (res.data.success) {
//         setContent(res.data.data.content || []);
//       }
//     } catch (err) {
//       console.error(err);
//       showAlert({ icon: "error", title: "Error", text: "Failed to load contact content." });
//     }
//   };

//   const handleChange = (index, value) => {
//     const updated = [...content];
//     updated[index].value = value;
//     setContent(updated);
//   };

//   const handleAddText = () => {
//     setContent([...content, { type: "text", value: "" }]);
//   };

//   const handleAddLink = () => {
//     setContent([...content, { type: "link", label: "", href: "" }]);
//   };

//   const handleDelete = (index) => {
//     const updated = [...content];
//     updated.splice(index, 1);
//     setContent(updated);
//   };

//   const handleSave = async () => {
//     try {
//       const res = await api.post(`${API.ADMIN_CONTACT.UPDATE}`, { schoolId, content });
//       if (res.data.success) {
//         showToast("Contact content updated!");
//         fetchContent();
//       }
//     } catch (err) {
//       console.error(err);
//       showAlert({ icon: "error", title: "Error", text: "Failed to update content." });
//     }
//   };

//   return (
//     <div className="admin-contact-page" style={{ padding: "20px" }}>
//       <h2>Admin Contact Manager</h2>

//       <div>
//         <button className="btn btn-success me-2" onClick={handleAddText}>
//           Add Text
//         </button>
//         <button className="btn btn-primary" onClick={handleAddLink}>
//           Add Link
//         </button>
//       </div>

//       <div style={{ marginTop: "20px" }}>
//         {content.map((item, idx) => (
//           <div
//             key={idx}
//             style={{
//               marginBottom: "15px",
//               padding: "10px",
//               border: "1px solid #ccc",
//               borderRadius: "8px",
//             }}
//           >
//             {item.type === "text" && (
//               <input
//                 type="text"
//                 placeholder="Text content"
//                 value={item.value}
//                 onChange={(e) => handleChange(idx, e.target.value)}
//                 style={{ width: "80%", marginRight: "10px" }}
//               />
//             )}
//             {item.type === "link" && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Label"
//                   value={item.label}
//                   onChange={(e) => {
//                     const updated = [...content];
//                     updated[idx].label = e.target.value;
//                     setContent(updated);
//                   }}
//                   style={{ width: "35%", marginRight: "5px" }}
//                 />
//                 <input
//                   type="text"
//                   placeholder="URL"
//                   value={item.href}
//                   onChange={(e) => {
//                     const updated = [...content];
//                     updated[idx].href = e.target.value;
//                     setContent(updated);
//                   }}
//                   style={{ width: "40%", marginRight: "5px" }}
//                 />
//               </>
//             )}
//             <button className="btn btn-danger" onClick={() => handleDelete(idx)}>
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       <button className="btn btn-primary mt-3" onClick={handleSave}>
//         Save Changes
//       </button>
//     </div>
//   );
// }










import React, { useEffect, useState } from "react";
import api, { API, showToast, showAlert } from "../api";
import '../admin_styles/AdminContact.css';

export default function AdminContact() {
  const [content, setContent] = useState([]);
  const schoolId = 1;

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await api.get(`${API.ADMIN_CONTACT.GET}?schoolId=${schoolId}`);
      if (res.data.success) {
        setContent(res.data.data.content || []);
      }
    } catch (err) {
      console.error(err);
      showAlert({ icon: "error", title: "Error", text: "Failed to load contact content." });
    }
  };

  const handleChange = (index, value) => {
    const updated = [...content];
    updated[index].value = value;
    setContent(updated);
  };

  const handleAddText = () => {
    setContent([...content, { type: "text", value: "" }]);
  };

  const handleAddLink = () => {
    setContent([...content, { type: "link", label: "", href: "" }]);
  };

  const handleDelete = (index) => {
    const updated = [...content];
    updated.splice(index, 1);
    setContent(updated);
  };

  const handleSave = async () => {
    try {
      const res = await api.post(`${API.ADMIN_CONTACT.UPDATE}`, { schoolId, content });
      if (res.data.success) {
        showToast("Contact content updated!");
        fetchContent();
      }
    } catch (err) {
      console.error(err);
      showAlert({ icon: "error", title: "Error", text: "Failed to update content." });
    }
  };

  return (
    <div className="admin-contact-page">
      <h2 className="title">Admin Contact Manager</h2>

      {/* Add Buttons */}
      <div className="add-buttons">
        <button className="btn btn-success me-2 contact-btn" onClick={handleAddText}>
          Add Text
        </button>
        <button className="btn btn-primary me-2 contact-btn" onClick={handleAddLink}>
          Add Link
        </button>
      </div>

      {/* Content List */}
      <div className="content-list">
        {content.map((item, idx) => (
          <div key={idx} className="content-box">
            {item.type === "text" && (
              <input
                type="text"
                className="input-text"
                placeholder="Text content"
                value={item.value}
                onChange={(e) => handleChange(idx, e.target.value)}
              />
            )}

            {item.type === "link" && (
              <div className="link-fields">
                <input
                  type="text"
                  className="input-label"
                  placeholder="Label"
                  value={item.label}
                  onChange={(e) => {
                    const updated = [...content];
                    updated[idx].label = e.target.value;
                    setContent(updated);
                  }}
                />
                <input
                  type="text"
                  className="input-url"
                  placeholder="URL"
                  value={item.href}
                  onChange={(e) => {
                    const updated = [...content];
                    updated[idx].href = e.target.value;
                    setContent(updated);
                  }}
                />
              </div>
            )}

            <button className="btn btn-danger delete-btn" onClick={() => handleDelete(idx)}>
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button className="btn btn-primary save-btn" onClick={handleSave}>
        Save Changes
      </button>
    </div>
  );
}






