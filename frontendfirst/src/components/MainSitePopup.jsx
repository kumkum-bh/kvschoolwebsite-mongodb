import React, { useEffect, useState } from "react";
import api, { API } from "../api";
import "../styles/MainSitePopup.css"; // styling file

export default function MainSitePopup() {
  const [popupData, setPopupData] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchPopup = async () => {
      try {
        const res = await api.get(`${API.MAIN_POPUP.GET}?schoolId=1`);
        console.log("POPUP API RAW RESPONSE:", res.data);
        const data = res.data?.data;
        console.log("POPUP DATA RECEIVED:", data);
        if (data && data.status === true) {
          setPopupData(data);
          setVisible(true);
        }
      } catch (err) {
        console.error("Failed to fetch popup data", err);
      }
    };
    fetchPopup();
  }, []);

  if (!visible || !popupData) return null;

  return (
    <div className="main-popup-overlay">
      <div className="main-popup-box" style={{ backgroundImage: `url(http://localhost:5000${popupData.image})` }}>
        <button className="main-popup-close" onClick={() => setVisible(false)}>
          &times;
        </button>
        <h2>{popupData.heading}</h2>
        <p>{popupData.description}</p>
      </div>
    </div>
  );
}

































