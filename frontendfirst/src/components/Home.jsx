import React, { useEffect, useState, useRef } from "react";
import api, { API, showToast, showAlert } from "../api";
// import { decryptData } from "../utils/encryption";
import "../styles/Home.css";
import MainSitePopup from "./MainSitePopup";

const SERVER_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Home() {
  const [data, setData] = useState(null);
  const [activityIndex, setActivityIndex] = useState(0);
  const [bannerIndex, setBannerIndex] = useState(0);
  const activityInterval = useRef(null);
  const bannerInterval = useRef(null);

  useEffect(() => {
    api.get(API.HOME.GET, {
      params: {
        schoolId: 1, // <-- put the actual schoolId here
      },
    })

      .then(res => {
        const f = res.data;

        const decrypted = {
          ...f,
          // welcomeText: f.welcomeText ? decryptData(f.welcomeText) : "",
          // threeColumnSection: {
          //   ...f.threeColumnSection,
          //   latestNewsHeading: f.threeColumnSection?.latestNewsHeading
          //     ? decryptData(f.threeColumnSection.latestNewsHeading)
          //     : "",
          //   latestNewsParagraph: f.threeColumnSection?.latestNewsParagraph
          //     ? decryptData(f.threeColumnSection.latestNewsParagraph)
          //     : "",
          //   video: f.threeColumnSection?.video || "",
          //   activityCalendar: f.threeColumnSection?.activityCalendar || "",
          // },
          welcomeText: f.welcomeText || "",
          threeColumnSection: {
            ...f.threeColumnSection,
            latestNewsHeading: f.threeColumnSection?.latestNewsHeading || "",
            latestNewsParagraph: f.threeColumnSection?.latestNewsParagraph || "",
            video: f.threeColumnSection?.video || "",
            activityCalendar: f.threeColumnSection?.activityCalendar || "",
          },

        };

        setData(decrypted);
        showToast("Home data loaded successfully!");
      })
      .catch(err => {
        console.error("Home fetch error:", err);
        showAlert({
          icon: "error",
          title: "Error",
          text: "Failed to load home data.",
        });
      });
  }, []);

  useEffect(() => {
    if (data?.activities?.length > 1) {
      activityInterval.current = setInterval(() => {
        setActivityIndex((prev) =>
          prev === data.activities.length - 1 ? 0 : prev + 1
        );
      }, 3000);
    }
    return () => clearInterval(activityInterval.current);
  }, [data?.activities]);

  useEffect(() => {
    if (data?.bannerVideos?.length > 1) {
      bannerInterval.current = setInterval(() => {
        setBannerIndex((prev) =>
          prev === data.bannerVideos.length - 1 ? 0 : prev + 1
        );
      }, 5000);
    }
    return () => clearInterval(bannerInterval.current);
  }, [data?.bannerVideos]);

  if (!data) return <p>Loading...</p>;

  const togglePlayPause = (e) => {
    const video = e.currentTarget;
    if (video.paused) video.play();
    else video.pause();
  };

  const getEmbedUrl = (url) => {
    if (!url) return "";
    if (url.includes("embed")) return url;
    const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : "";
  };

  return (
    <>
      <MainSitePopup />
      <main className="home-container" style={{ margin: "0 auto" }} >
        {/* Banner Section */}
        {data.bannerVideos?.length > 0 && (
          <section className="banner-section">
            <video
              key={bannerIndex}
              className="banner-video"
              src={`${SERVER_URL}${data.bannerVideos[bannerIndex]}`}
              autoPlay
              muted
              loop
              onClick={togglePlayPause}
            />
          </section>
        )}

        {/* Welcome + Activities */}
        <section>
          <div className="welcome-activities-container">

            {/* Welcome Text Card */}
            <div className="home-card">
              <div className="welcome-text-area">
                <div dangerouslySetInnerHTML={{ __html: data.welcomeText }} />
              </div>
            </div>

           {/* Activity Image Card */}
           <div className="home-card">
            <h3 className="activity-title">School Activities</h3>

            <div className="activity-image-box">
              <img
                src={`${SERVER_URL}${data.activities[activityIndex]}`}
                alt="activity"
              />
            </div>
          </div>

         </div>

        </section>

        {/* 3-Column Section */}
        {data.threeColumnSection && (
          <section className="three-column-section">
            <div className="column">
              <h2>Latest News</h2>
              <h3 dangerouslySetInnerHTML={{ __html: data.threeColumnSection?.latestNewsHeading || "Latest News" }} />
              <p
                dangerouslySetInnerHTML={{
                  __html: data.threeColumnSection?.latestNewsParagraph || "News description goes here."
                }}
              ></p>

            </div>

            <div className="column">
              <h2>Activity Calendar</h2>
              {data.threeColumnSection.activityCalendar && (
                <>
                  <img
                    src={`${data.threeColumnSection.activityCalendar}`} alt="Calendar"
                  />
                  <button className="view-calender-btn"
                    onClick={() =>
                      window.open(
                        `${data.threeColumnSection.activityCalendar}`,
                        "_blank"
                      )
                    }
                  >
                    View Full Calendar
                  </button>
                </>
              )}
            </div>

            <div className="column">
              <h2>KV Videos</h2>
              {data.threeColumnSection.video && (
                <iframe
                  width="100%"
                  height="200"
                  src={getEmbedUrl(data.threeColumnSection.video)}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </section>
        )}

        {/* Testimonials */}
        {data.testimonialVideos?.length > 0 && (
          <section className="testimonials">
            <h2 style={{color: "#0078d4", fontSize:"30px"}}>Student Testimonials</h2>
            <div className="testimonial-grid">
              {data.testimonialVideos.map((vid, i) => (
                <video
                  key={i}
                  src={`${SERVER_URL}${vid}`}
                  controls
                  className="testimonial-video"
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}














































