// import React, { useEffect, useState } from "react";
// import api, {API, showAlert, showToast} from "../api";
// import { useNavigate, useParams } from "react-router-dom";
// import "../admin_styles/AdminEditTeacher.css";

// export default function EditTeacher() {
//   const { id } = useParams(); // undefined for Add
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     schoolId: 1,
//     name: "", fatherName: "", motherName: "",
//     phone: "", email: "", address: "",
//     classCategory: "", subjects: [], qualification: "", experience: 0,
//     imageUrl: ""
//   });
//   const [imageFile, setImageFile] = useState(null);

//   useEffect(() => {
//     if (id) {
//       api.get(API.ADMIN_EDIT_TEACHERS.GET(id)).then(res => {
//         if (res.data.success) setForm(res.data.data);
//       }).catch(console.error);
//     }
//   }, [id]);

//   const handleImageUpload = async () => {
//     if (!imageFile) return;

//     const fd = new FormData();
//     fd.append("image", imageFile);  // or "photo" if backend not changed

//     const res = await api.post(API.ADMIN_EDIT_TEACHERS.UPLOAD_IMAGE, fd, {
//       headers: { "Content-Type": "multipart/form-data" }
//     });

//     if (res.data.success) {
//       setForm(f => ({
//         ...f,
//         imageUrl: res.data.filePath
//       }));
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       let teacherData = { ...form };
//       if (imageFile) {
//         const fd = new FormData();
//         fd.append("image", imageFile);
//         const res = await api.post(API.ADMIN_EDIT_TEACHERS.SAVE_NEW, teacherData, fd, {
//           headers: { "Content-Type": "multipart/form-data" }
//         });
//         if (res.data.success) teacherData.imageUrl = res.data.filePath;
//       }

//       if (id) await api.put(API.ADMIN_EDIT_TEACHERS.SAVE_UPDATE(id), teacherData);
//       else await api.post(`/api/teachers/add`, teacherData);

//       alert("Saved");
//       navigate("/admin/manage-teachers");
//     } catch (err) {
//       console.error(err);
//       alert("Save failed");
//     }
//   };


//   // helper for subjects input (comma separated)
//   const handleSubjectsChange = (val) => setForm({ ...form, subjects: val.split(",").map(s => s.trim()).filter(Boolean) });

//   return (
//     <div className="edit-teacher-page">
//       <h2>{id ? "Edit Teacher" : "Add Teacher"}</h2>
//       <form onSubmit={handleSubmit} className="teacher-form">
//         <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
//         <input placeholder="Father Name" value={form.fatherName} onChange={e => setForm({...form, fatherName: e.target.value})} />
//         <input placeholder="Mother Name" value={form.motherName} onChange={e => setForm({...form, motherName: e.target.value})} />
//         <input placeholder="Phone" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
//         <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
//         <select value={form.classCategory} onChange={e => setForm({...form, classCategory: e.target.value})}>
//           <option value="">Select Class Category</option>
//           <option value="1-5">1-5</option>
//           <option value="6-9&11">6-9 & 11</option>
//           <option value="10&12">10 & 12</option>
//         </select>
//         <input placeholder="Subjects (comma separated)" value={form.subjects?.join(", ")} onChange={e => handleSubjectsChange(e.target.value)} />
//         <input placeholder="Qualification" value={form.qualification} onChange={e => setForm({...form, qualification: e.target.value})} />
//         <input type="number" placeholder="Experience (years)" value={form.experience} onChange={e => setForm({...form, experience: Number(e.target.value)})} />
//         <textarea placeholder="Address" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />

//         <div className="image-row">
//             <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
//             {form.imageUrl && (
//                 <img
//                     src={form.imageUrl ? `http://localhost:5000${form.imageUrl}` : "/assets/default-teacher.png"}
//                     alt="Teacher_img"
//                     className="preview"
//                 />

//             )}
//         </div>


//         <div className="form-actions">
//           <button type="submit">Save</button>
//           <button type="button" onClick={() => navigate(-1)}>Cancel</button>
//         </div>
//       </form>
//     </div>
//   );
// }





import React, { useEffect, useState } from "react";
import api, { API, showAlert, showToast } from "../api";
import { useNavigate, useParams } from "react-router-dom";
import "../admin_styles/AdminEditTeacher.css";

export default function EditTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    schoolId: 1,
    name: "",
    fatherName: "",
    motherName: "",
    phone: "",
    email: "",
    address: "",
    classCategory: "",
    subjects: [],
    qualification: "",
    experience: 0,
    imageUrl: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // ----------------------
  // Fetch teacher (Edit)
  // ----------------------
  useEffect(() => {
    if (id) {
      api
        .get(API.ADMIN_EDIT_TEACHERS.GET(id))
        .then((res) => {
          if (res.data.success) setForm(res.data.data);
        })
        .catch((err) => console.error(err));
    }
  }, [id]);

  // ----------------------
  // Submit Form
  // ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let teacherData = { ...form };

      // If image selected → upload first
      if (imageFile) {
        const fd = new FormData();
        fd.append("image", imageFile);

        const uploadRes = await api.post(
          API.ADMIN_EDIT_TEACHERS.UPLOAD_IMAGE,
          fd,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        if (uploadRes.data.success) {
          teacherData.imageUrl = uploadRes.data.filePath;
        }
      }

      if (id) {
        await api.put(API.ADMIN_EDIT_TEACHERS.UPDATE(id), teacherData);
        showToast("Teacher updated successfully");
      } else {
        await api.post(API.ADMIN_EDIT_TEACHERS.ADD, teacherData);
        showToast("Teacher added successfully");
      }

      navigate("/admin/manage-teachers");
    } catch (err) {
      console.error(err);
      showAlert("Saving failed!", "error");
    }
  };

  // ----------------------
  // Subjects Input Helper
  // ----------------------
  const handleSubjectsChange = (val) =>
    setForm({
      ...form,
      subjects: val.split(",").map((s) => s.trim()).filter(Boolean),
    });

  return (
    <div className="edit-teacher-page">
      <h2>{id ? "Edit Teacher" : "Add Teacher"}</h2>

      <form onSubmit={handleSubmit} className="teacher-form">
        <input placeholder="Name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} required />

        <input placeholder="Father Name" value={form.fatherName}
          onChange={(e) => setForm({ ...form, fatherName: e.target.value })} />

        <input placeholder="Mother Name" value={form.motherName}
          onChange={(e) => setForm({ ...form, motherName: e.target.value })} />

        <input placeholder="Phone" value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })} />

        <input placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <select value={form.classCategory}
          onChange={(e) => setForm({ ...form, classCategory: e.target.value })}>
          <option value="">Select Class Category</option>
          <option value="1-5">1-5</option>
          <option value="6-9&11">6-9 & 11</option>
          <option value="10&12">10 & 12</option>
        </select>

        <input placeholder="Subjects (comma separated)"
          value={form.subjects?.join(", ")}
          onChange={(e) => handleSubjectsChange(e.target.value)} />

        <input placeholder="Qualification" value={form.qualification}
          onChange={(e) => setForm({ ...form, qualification: e.target.value })} />

        <input type="number" placeholder="Experience (years)"
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: Number(e.target.value) })
          } />

        <textarea placeholder="Address" value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })} />

        {/* IMAGE */}
        <div className="image-row">
          <input type="file" accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])} />

          {form.imageUrl && (
            <img
              src={`http://localhost:5000${form.imageUrl}`}
              className="preview"
              alt="Teacher"
            />
          )}
        </div>

        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate(-1)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}














































