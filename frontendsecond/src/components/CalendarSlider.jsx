import React, { useEffect, useState } from "react";
import "../styles/CalendarSlider.css";

export default function CalendarSlider() {
  const slides = [
    [
      { class: "Nursery", date: "12 Feb 2026", activity: "Color Day Activity" },
      { class: "LKG", date: "18 Feb 2026", activity: "Story Telling Competition" }
    ],
    [
      { class: "UKG", date: "25 Feb 2026", activity: "Rhyme Recitation" },
      { class: "1st", date: "28 Feb 2026", activity: "Creative Writing Activity" }
    ],
    [
      { class: "2nd", date: "03 March 2026", activity: "Solo Dance Performance" },
      { class: "3rd", date: "08 March 2026", activity: "Maths Quiz Round 1" }
    ],
    [
      { class: "4th", date: "12 March 2026", activity: "Science Model Activity" },
      { class: "5th", date: "20 March 2026", activity: "English Speech Competition" }
    ],
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const openFullTable = () => {
    window.open("/activities-table", "_blank");
  };

  return (
    <div className="calendar-container">
      <div className="slider-wrapper">
        {slides.map((pair, i) => (
          <div
            key={i}
            className={`slide ${i === index ? "active" : ""}`}
          >
            {pair.map((item, j) => (
              <div className="activity-card" key={j}>
                <h3 className="class-heading">{item.class}</h3>

                <div className="scroll-content">
                  <h4 className="date">{item.date}</h4>
                  <p className="activity">{item.activity}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <button className="view-all-btn" onClick={openFullTable}>
        View All
      </button>
    </div>
  );
}

