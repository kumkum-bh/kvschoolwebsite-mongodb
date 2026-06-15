import React, { useEffect, useState, useRef } from "react";
import api, { API, showToast, showAlert } from "../api";
import Banner from "./Banner";
import "../styles/ExtraCurricular.css";

export default function ExtraCurricular() {
  const [sections, setSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await api.get(API.EXTRACURRICULAR.GET, { params: { schoolId: 1 } });
        setSections(res.data.data?.sections || {});
        showToast("Extra Curricular content loaded!");
      } catch (err) {
        console.error(err);
        showAlert({
          icon: "error",
          title: "Error",
          text: "Failed to fetch content",
        });
      }
    };
    fetchSections();
  }, []);

  const scrollToSection = (key) => {
    const ref = sectionRefs.current[key];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth" });
      showToast(`Scrolled to ${sections[key].title}`);
    } else {
      showAlert({
        icon: "info",
        title: "Section not found",
        text: `Could not scroll to ${sections[key]?.title || key}`,
      });
    }
  };

  function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  return (
    <>
      <Banner />
      <div className="extra-page">
        <div className="left-column">
          <h2>Extra Curricular</h2>
          <div className="info-box">
            {Object.keys(sections).map((key) => (
              <p
                key={key}
                onClick={() => scrollToSection(key)}
                style={{ cursor: "pointer" }}
              >
                {sections[key].title}
              </p>
            ))}
          </div>
        </div>

        <div className="right-column">
          {Object.keys(sections).map((key) => (
            <div
              key={key}
              ref={(el) => (sectionRefs.current[key] = el)}
              style={{ marginBottom: "30px" }}
            >
              <h3>{sections[key].title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: decodeHTML(sections[key].content),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
