import React, { useEffect, useState } from "react";
import api, { API, showToast, showAlert } from "../api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function AdminAcademics() {
  const [form, setForm] = useState({
    schoolId: 1,
    pedagogy: "",
    annualCalendar: "",
    result: "",
    curriculum: "",
    subjects: "",
    faculty: "",
    examination: "",
    examinationResult: ""
  });

  const sections = [
    { label: "Pedagogy", key: "pedagogy" },
    { label: "Annual Calendar", key: "annualCalendar" },
    { label: "Result", key: "result" },
    { label: "Curriculum", key: "curriculum" },
    { label: "Subjects", key: "subjects" },
    { label: "Faculty", key: "faculty" },
    { label: "Examination", key: "examination" },
    { label: "Examination Result", key: "examinationResult" }
  ];

  // LOAD DATA FROM DB
  const loadData = async () => {
    try {
      const res = await api.get(API.ADMIN_ACADEMICS.GET, {
        params: { schoolId: 1 },
      });

      console.log("API Response:", res.data);

      if (res.data) {
        setForm(prev => ({
          ...prev,
          ...res.data
        }));
      }


    } catch (err) {
      console.error(err);
      showAlert({
        icon: "error",
        title: "Failed",
        text: "Failed to load academics data",
      });
    }
  };




  useEffect(() => {
    loadData();
  }, []);

  // SAVE CHANGES
  const handleSave = async () => {
    try {
      await api.post(`${API.ADMIN_ACADEMICS.UPDATE}/${form.schoolId}`, form);
      showToast("Academics Updated Successfully!");
    } catch (err) {
      console.error(err);
      showAlert({
        icon: "error",
        title: "Error",
        text: "Update failed.",
      });
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Admin — Academics Page</h2>

      {sections.map((section) => (
        <div key={section.key} style={{ marginBottom: "40px" }}>
          <h3>{section.label}</h3>

          <ReactQuill
            theme="snow"
            value={form[section.key] || ""}
            onChange={(value) =>
              setForm(prev => ({ ...prev, [section.key]: value }))
            }
          />


        </div>
      ))}

      <button
        onClick={handleSave}
        style={{
          padding: "12px 25px",
          backgroundColor: "#1d4ed8",
          color: "white",
          borderRadius: "5px",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Save Changes
      </button>
    </div>
  );
}










