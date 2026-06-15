import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import api, { API, showToast, showAlert } from "../api";

export default function AdminExtraCurricular() {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get(API.ADMIN_EXTRACURRICULAR.GET, { params: { schoolId: 1 } });
      setSections(res.data.data.sections || {});
      setLoading(false);
    } catch (err) {
      console.error(err);
      showAlert({ icon: "error", title: "Error", text: "Failed to load content" });
    }
  };

  const handleChange = (key, field, value) => {
    setSections((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const handleSave = async () => {
    try {
      await api.post(API.ADMIN_EXTRACURRICULAR.UPDATE, {
        schoolId: 1,  // make sure ye match kare backend ke liye
        sections  // sections state ya object
      });
      showToast("Extra Curricular updated!");
    } catch (err) {
      console.error(err);
      showAlert({
        icon: "error",
        title: "Error",
        text: "Update failed.",
      });
    }
  };


  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-extra-container">
      <h2>Admin Extra-Curricular Control Panel</h2>

      {Object.keys(sections).map((key) => (
        <div key={key} className="admin-section-box">
          
          <input
            type="text"
            className="input-title"
            value={sections[key].title}
            onChange={(e) => handleChange(key, "title", e.target.value)}
          />

          <ReactQuill
            value={sections[key].content}
            onChange={(value) => handleChange(key, "content", value)}
            theme="snow"
            style={{ height: "200px", marginBottom: "20px" }}
          />

          <button className="save-btn" onClick={() => handleSave(key)}>
            Save Changes
          </button>
        </div>
      ))}
    </div>
  );
}
