import React, { useEffect, useState } from "react";
import api, { API, showToast, showAlert } from "../api";
import "../admin_styles/AdminManageHeaderSecond.css";

export default function AdminHeaderSecond() {
  const [data, setData] = useState(null);
  const [saving, setSaving] = useState(false);
  const schoolId = 1;

  useEffect(() => {
    loadHeader();
  }, []);

  const loadHeader = async () => {
    try {
      const res = await api.get(API.ADMIN_MANAGE_HEADERSECOND.GET(schoolId));
      if (res.data.success) {
        setData(res.data.data);
        showToast("Header data loaded", "success");
      } else {
        showToast("Failed to load header data", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error fetching header data", "error");
    }
  };

  // ---------- Upload File ----------
  const uploadFile = async (file) => {
    const form = new FormData();
    form.append("file", file);
    const res = await api.post("/api/upload", form);
    return res.data.filePath;
  };

  // ---------- Save to DB ----------
  const saveHeader = async () => {
    try {
      setSaving(true);
      const res = await api.post(API.ADMIN_MANAGE_HEADERSECOND.UPDATE, {
        ...data,
        schoolId
      });
      if (res.data.success) {
        showToast("Header updated successfully", "success");
        await showAlert({
          icon: "success",
          title: "Success",
          text: "Header updated successfully"
        });
      } else {
        showToast("Update failed", "error");
        await showAlert({
          icon: "error",
          title: "Error",
          text: "Header update failed"
        });
      }
    } catch (err) {
      console.error(err);
      showToast("Server error", "error");
      await showAlert({
        icon: "error",
        title: "Error",
        text: "Server error while updating header"
      });
    } finally {
      setSaving(false);
    }

  };

  if (!data) return <p>Loading...</p>;

  // ---------- MENU FUNCTIONS ----------
  const addMenuItem = () => {
    setData({
      ...data,
      menuItems: [...data.menuItems, { name: "", link: "" }]
    });
  };

  const updateMenuItem = (i, field, value) => {
    const updated = [...data.menuItems];
    updated[i][field] = value;
    setData({ ...data, menuItems: updated });
  };

  const removeMenuItem = (index) => {
    const updated = data.menuItems.filter((_, i) => i !== index);
    setData({ ...data, menuItems: updated });
  };

  return (
    <div className="admin-header-wrapper">
      <h1>Header Management</h1>

      {/* LOGO */}
      <label>School Logo</label>
      <input
        type="file"
        onChange={async (e) => {
          const filePath = await uploadFile(e.target.files[0]);
          setData({ ...data, logo: filePath });
        }}
      />
      <img
        src={`http://localhost:5000${data.logo}`}
        alt="logo"
        className="preview-img"
      />

      {/* BACKGROUND VIDEO */}
      <label>Background Video</label>
      <input
        type="file"
        onChange={async (e) => {
          const filePath = await uploadFile(e.target.files[0]);
          setData({ ...data, backgroundVideo: filePath });
        }}
      />
      <video
        src={`http://localhost:5000${data.backgroundVideo}`}
        controls
        className="preview-video"
      ></video>

      {/* ADMIN BUTTON */}
      <h2>Admin Button</h2>

      <label>Text</label>
      <input
        type="text"
        value={data.adminButton.text}
        onChange={(e) =>
          setData({
            ...data,
            adminButton: { ...data.adminButton, text: e.target.value }
          })
        }
      />

      <label>Link</label>
      <input
        type="text"
        value={data.adminButton.link}
        onChange={(e) =>
          setData({
            ...data,
            adminButton: { ...data.adminButton, link: e.target.value }
          })
        }
      />

      {/* MENU ITEMS */}
      <h2>Menu Items</h2>

      {data.menuItems.map((item, index) => (
        <div className="menu-item-box" key={index}>
          <input
            type="text"
            placeholder="Name"
            value={item.name}
            onChange={(e) => updateMenuItem(index, "name", e.target.value)}
          />

          <input
            type="text"
            placeholder="Link"
            value={item.link}
            onChange={(e) => updateMenuItem(index, "link", e.target.value)}
          />

          <button
            className="delete-btn"
            onClick={() => removeMenuItem(index)}
          >
            Delete
          </button>
        </div>
      ))}

      <button className="add-btn" onClick={addMenuItem}>
        + Add Menu Item
      </button>

      {/* SAVE BUTTON */}
      <button className="save-btn" onClick={saveHeader}>
        Save Header
      </button>
    </div>
  );
}












































