import React, { useEffect, useState } from "react";
import api, { API, showToast, showAlert } from "../api";
import '../admin_styles/AdminGallery.css';

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [newUrl, setNewUrl] = useState("");

  // Fetch Gallery Images
  const fetchImages = async () => {
    try {
      const res = await api.get(API.ADMIN_GALLERY.GET_ALL, { params: { schoolId: 1, t: Date.now() } });
      console.log("Gallery GET response:", res.data);
      // if (res.data.success) {
      //   setImages(res.data.data);
      // }
      const galleryData = Array.isArray(res.data) ? res.data : res.data.data;
      setImages(galleryData);
    } catch (err) {
      console.error(err);
      showAlert({
        icon: "error",
        title: "Error",
        text: "Failed to load gallery images.",
      });
    }
  };

  useEffect(() => {
    console.log("Images state:", images);
  }, [images]);


  useEffect(() => {
    fetchImages();
  }, []);

  // Add new image
  const handleAdd = async () => {
    if (!newUrl.trim()) {
      showAlert({ icon: "warning", title: "Missing URL", text: "Please enter image URL!" });
      return;
    }

    try {
      const res = await api.post(API.ADMIN_GALLERY.ADD, {
        schoolId: 1,
        url: newUrl,
      });

      showToast("Image added!");
      setNewUrl("");
      fetchImages();
    } catch (err) {
      console.error(err);
      showAlert({ icon: "error", title: "Error", text: "Failed to add image." });
    }
  };

  // Delete image
  const handleDelete = async (id) => {
    try {
      await api.delete(`${API.ADMIN_GALLERY.DELETE}/${id}`);
      showToast("Image deleted!");
      fetchImages();
    } catch (err) {
      console.error(err);
      showAlert({ icon: "error", title: "Error", text: "Failed to delete image." });
    }
  };

  return (
    <div className="admin-gallery-page" style={{ padding: "20px" }}>
      <h2>Admin Gallery Manager</h2>

      {/* Add Image Box */}
      <div className="add-image-box">
        <h4>Add New Image</h4>
        <input
          type="text"
          placeholder="Enter Image URL"
          className="form-control gallery-input"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <button className="btn gallery-add-btn" onClick={handleAdd}>
          Add Image
        </button>
      </div>

      <hr />

      {/* Gallery List */}
      <h4>Existing Images</h4>
      <div className="gallery-grid">
        {images.map((img) => (
          <div
            key={img._id}
            className="gallery-card"
          >
            <img
              src={img.url}
              alt="Gallery"
              className="gallery-img"
            />
            <button
              className="btn gallery-delete-btn"
              onClick={() => handleDelete(img._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}






































