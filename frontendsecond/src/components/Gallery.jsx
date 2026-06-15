import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import api, { API, showToast, showAlert } from "../api";
import "../styles/Gallery.css";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await api.get(API.GALLERY.GET_ALL, { params: { schoolId: 1 } });
        if (res.data.length === 0) {
          showAlert({
            icon: "info",
            title: "No Images",
            text: "Gallery is currently empty.",
          });
        }
        setImages(res.data);
        showToast("Gallery updated!");
      } catch (err) {
        console.error(err);
        showAlert({
          icon: "error",
          title: "Error",
          text: "Failed to load gallery images",
        });
      }
    };

    fetchImages(); 
    const interval = setInterval(fetchImages, 5000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <>
      <Banner />
      <div className="gallery-page" style={{ margin: "0 auto" }}>
        <h2>Gallery</h2>
        <div className="gallery-grid">
          {images.map((img, idx) => (
            <div className="gallery-card" key={idx}>
              <img
                src={img.url}
                alt={`Gallery ${idx + 1}`}
                onError={(e) => (e.target.src = "/assets/placeholder.jpg")}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;



























