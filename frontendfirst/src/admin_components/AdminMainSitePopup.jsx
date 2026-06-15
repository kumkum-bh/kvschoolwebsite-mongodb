
import React, { useState, useEffect } from "react";
import api, { API, showAlert, showToast } from "../api";
import "../admin_styles/AdminMainSitePopup.css";

export default function AdminMainPopup() {
  const [popup, setPopup] = useState({
    heading: "",
    description: "",
    backgroundImage: "",
    status: true,
    schoolId: 1
  });

  const fetchPopup = async () => {
    try {
      const res = await api.get(API.ADMIN_MAINSITEPOPUP.GET(1));

      if (res.data.success && res.data.data) {
        setPopup(res.data.data);
      }

      showToast("Popup loaded successfully!");
    } catch (err) {
      console.log("Fetch popup error", err);
      showAlert({
        icon: "error",
        title: "Failed!",
        text: "Could not load popup data."
      });
    }
  };

  useEffect(() => {
    fetchPopup();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put(API.ADMIN_MAINSITEPOPUP.UPDATE(popup._id), popup);

      showToast("Popup updated successfully!");

      showAlert({
        icon: "success",
        title: "Updated!",
        text: "Popup updated successfully."
      });
    } catch (err) {
      console.error("Update failed", err);

      showAlert({
        icon: "error",
        title: "Update Failed!",
        text: "Could not update popup."
      });
    }
  };

  return (
    <div className="admin-popup-wrapper">
      <h2>Manage Main Site Popup</h2>

      <label>Heading</label>
      <input
        type="text"
        value={popup.heading}
        onChange={(e) => setPopup({ ...popup, heading: e.target.value })}
      />

      <label>Description</label>
      <textarea
        value={popup.description}
        onChange={(e) => setPopup({ ...popup, description: e.target.value })}
      />

      <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const imageURL = URL.createObjectURL(file);
              setPopup({ ...popup, backgroundImage: imageURL, imageFile: file });
            }
          }}
        />

      <label>Status</label>
      <select
        value={popup.status}
        onChange={(e) =>
          setPopup({ ...popup, status: e.target.value === "true" })
        }
      >
        <option value="true">Show</option>
        <option value="false">Hide</option>
      </select>

      <button onClick={handleUpdate}>Save Popup</button>
    </div>
  );
}
