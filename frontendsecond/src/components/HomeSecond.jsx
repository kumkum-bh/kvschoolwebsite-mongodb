import React, { useEffect, useState } from "react";
import CalendarSlider from "../components/CalendarSlider";
import api, { API, showToast, showAlert } from "../api";
import "../styles/HomeSecond.css";
import MainSitePopup from "./MainSitePopup";

export default function HomeSecond() {
  const [data, setData] = useState(null);
  const [index, setIndex] = useState(0);
  

  useEffect(() => {
    if (!data) return; // Wait for data
    const interval = setInterval(() => {
      // Each slide contains 2 cards, so total slides = ceil(classes.length / 2)
      const totalSlides = Math.ceil(data.welcomeSection.right.classes.length / 2);
      setIndex(prev => (prev + 1) % totalSlides);
    }, 4000); // every 4 seconds
    return () => clearInterval(interval);
  }, [data]);


  useEffect(() => {
    fetchHomeSections();
  }, []);

  const fetchHomeSections = async () => {
    try {
      const res = await api.get(API.ADMIN_HOMESECOND.GET + "?schoolId=1");
      if (res.data.success) {
        setData(res.data.data);
        showToast("Home Data fetched successfully");
      }
    } catch (error) {
      console.error("Error fetching home data", error);
      showAlert("Error fetching data");
    }
  };

  const slides = [];
  if (data) {
    const classes = data.welcomeSection.right.classes;
    for (let i = 0; i < classes.length; i += 2) {
      slides.push(classes.slice(i, i + 2));
    }
  };


  if (!data) return <p>Loading...</p>;

  return (
    <>
    <MainSitePopup />
    <div className="home-root">
      {/* ------------ MAIN CONTENT START (No Header Here!) ------------ */}

      <main className="home-main container">

        {/* ---------- LEFT CARD + RIGHT ACTIVITY ---------- */}
        <section className="hero-cards">
          <div
            className="card left-card"
            style={{
              backgroundImage: `url(http://localhost:5000${data.welcomeSection.left.bgImage})`,
            }}
          >
            <div className="card-overlay">
              <h1>{data.welcomeSection.left.heading}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: data.welcomeSection.left.paragraph }}
              ></div>

            </div>
          </div>

          <div className="card right-card">
            <CalendarSlider />
          </div>
        </section>

        {/* ---------- 5 Gradient Feature Boxes ---------- */}
        <section className="feature-row">
          {data.activitySection.activities.map((item, index) => (
            <div className="feature-box" key={index}>
              <div className="feature-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <div
                dangerouslySetInnerHTML={{ __html: item.description }}
              ></div>
              
            </div>
          ))}
        </section>

        {/* ---------- Special Moments ---------- */}
        <section className="special-moments">
          <h2>Special Moments</h2>

          <div className="moments-row">
            {data.specialMomentsSection.moments.map((m, i) => (
              <div className="moment" key={i}>
                <div
                  className="moment-img"
                  style={{ backgroundImage: `url(http://localhost:5000${m.image})` }}
                />
                <div
                  dangerouslySetInnerHTML={{ __html: m.description }}
                ></div>

              </div>
            ))}
          </div>
        </section>

        {/* ---------- Two Info Cards (Image Left + Text Right) ---------- */}
        <section className="two-info-cards">
          <div className="principal-wrapper">
            {data.principalMessageSection.messages.map((msg, i) => (
              <div className="principal-box" key={i}>
                <div className="principal-img">
                  <img src={`http://localhost:5000${msg.image}`} alt={msg.title} />
                </div>

                <div className="principal-text">
                  <h3>{msg.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: msg.description }}
                  ></div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- Vice Principals ---------- */}
        <section className="vice-principals">
          <h2>{data.vicePrincipalMessageSection.title}</h2>

          <div className="vp-cards">
            {data.vicePrincipalMessageSection.vicePrincipals.map((vp, i) => (
              <div className="vp" key={i}>
                <div className="vp-img">
                  <img src={`http://localhost:5000${vp.image}`} alt={`Vice Principal ${i}`} />
                </div>

                <h3>{vp.subheading}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: vp.description }}
                ></div>

              </div>
            ))}
          </div>
        </section>

      </main>

      <div style={{ height: 28 }} />
    </div>
    </>
  );

}


















































