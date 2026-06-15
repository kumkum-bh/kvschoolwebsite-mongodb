import React, { useRef, useEffect, useState } from "react";
import api, { API, showToast } from "../api";  
import Banner from "./Banner";
import '../styles/Admission.css';
import { useNavigate } from "react-router-dom";



export default function Admissions() {
  const formRef = useRef(null);
  const onlineRef = useRef(null);
  const feeRef = useRef(null);

  const [admissionData, setAdmissionData] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmissions = async () => {
      try {
        const res = await api.get(API.ADMISSIONS_PAGE.GET, { params: { schoolId: 1 } });

        if (res.data.success) {
          setAdmissionData(res.data.data); // <-- unwrap the data here
          showToast("Admissions data loaded");
        } else {
          showToast("No admissions data found", "error");
        }

      } catch (err) {
        console.error(err);
        showToast("Error loading admissions data", "error");
      }
    };

    fetchAdmissions();
  }, []);


  const scrollToSection = (ref, sectionName) => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`Scrolling to ${sectionName}`);
  };

  return (
    <>
      <Banner /> 
      <div className="admissions-page">
        <div className="left-column">
          <h2>Admissions</h2>
          <div className="info-box">
            <p onClick={() => scrollToSection(formRef, "Application Form")} style={{ cursor: "pointer" }}>Application Form</p>
            <p onClick={() => scrollToSection(onlineRef, "Apply Online")} style={{ cursor: "pointer" }}>Apply Online</p>
            <p onClick={() => scrollToSection(feeRef, "Fee Structure")} style={{ cursor: "pointer" }}>Fee Structure</p>
          </div>
        </div>

        <div className="right-column">
          <div ref={formRef}>
            <h2>Application Form</h2>
            <div dangerouslySetInnerHTML={{ __html: admissionData.formContent || "" }} />
          </div>

          <div ref={onlineRef} style={{ marginTop: "50px" }}>
            <h2>Apply Online</h2>
            <div dangerouslySetInnerHTML={{ __html: admissionData.onlineContent || "" }} />
            {/* Replace the link dynamically */}
            {admissionData.onlineContent && (
              <button
                className="apply-btn"
                onClick={() => navigate("/admission-form")}
                style={{ marginTop: "20px" }}
              >
                Apply Now
              </button>
          )}
          </div>

          <div ref={feeRef} style={{ marginTop: "50px" }}>
            <h2>Fee Structure</h2>
            <div className="fee-table-container">
              <div dangerouslySetInnerHTML={{ __html: admissionData.feeStructure }} />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

























