import React, { useEffect, useState } from "react";
// import ReactQuill, { Quill } from "react-quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import api, { API, showToast, showAlert } from "../api";
import "../admin_styles/AdminAdmissions.css"



export default function AdminAdmissions() {
  const [form, setForm] = useState({
    formContent: "",
    onlineContent: "",
    feeStructure: ""
  });

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ header: [1, 2, 3, false] }],
      ["link"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
      allowed: true,
      keepSelection: true,
      sanitize: false
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await api.get(API.ADMIN_ADMISSION.GET_ALL, { params: { schoolId: 1 } });
      showToast("Admissions loaded successfully!");

      if (res.data.success && res.data.data) {
        setForm(res.data.data);
      }
    } catch (err) {
      console.error(err);
      showAlert({
        icon: "error",
        title: "Error",
        text: "Failed to load admissions."
      });
    }
  };

  const handleChange = (value, field) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const saveAdmissionPage = async () => {
    try {
      await api.put(API.ADMIN_ADMISSION.UPDATE(1), form);
      showToast("Admissions Page Updated Successfully!");
    } catch (err) {
      console.error(err);
      showAlert({
        icon: "error",
        title: "Update Failed",
        text: "Could not update admissions page."
      });
    }
  };

  return (
    <div className="admin-admissions-editor">
      <h2>Admin Admissions Page Editor</h2>

      <label>Application Form Content</label>
      <ReactQuill
        value={form.formContent}
        onChange={(v) => handleChange(v, "formContent")}
        modules={modules}
      />

      <label>Online Apply Content</label>
      <ReactQuill
        value={form.onlineContent}
        onChange={(v) => handleChange(v, "onlineContent")}
        modules={modules}
      />

      <label>Fee Structure Table</label>
      <ReactQuill
        value={form.feeStructure}
        onChange={(v) => handleChange(v, "feeStructure")}
        modules={modules}
      />

      <button onClick={saveAdmissionPage}>Save Changes</button>
    </div>
  );
}

