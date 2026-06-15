
import React, { useEffect, useState } from "react";
import api, {API, showToast, showAlert} from "../api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../admin_styles/AdminHome.css";

export default function AdminHome() {
  const [form, setForm] = useState({
    welcomeText: "",
    activities: [],
    bannerVideos: [],
    threeColumnSection: {
      latestNewsHeading: "",
      latestNewsParagraph: "",
      video: "",
      activityCalendar: "",
    },
    testimonialVideos: [],
  });

  const [newBannerVideo, setNewBannerVideo] = useState("");
  const [newActivity, setNewActivity] = useState("");
  const [newTestimonial, setNewTestimonial] = useState("");

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const res = await api.get(API.ADMIN_HOME.GET(1));
      if (res.data.success) showToast("Home loaded successfully!");
    } catch (err) {
      showAlert({ icon: "error", title: "Error", text: "Failed to load home data." });
    }
  };

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleThreeColumn = (name, value) => {
    setForm({
      ...form,
      threeColumnSection: {
        ...form.threeColumnSection,
        [name]: value,
      },
    });
  };

  const saveHome = async () => {
    try {
      await api.post(API.ADMIN_HOME.UPDATE(1), form);
      showToast("Home updated successfully!");
    } catch (err) {
      showAlert({ icon: "error", title: "Update Failed", text: "Could not update home." });
    }
  };

  const addBannerVideo = () => {
    if (!newBannerVideo) return;
    setForm({
      ...form,
      bannerVideos: [...form.bannerVideos, newBannerVideo],
    });
    setNewBannerVideo("");
  };

  const addActivity = () => {
    if (!newActivity) return;
    setForm({
      ...form,
      activities: [...form.activities, newActivity],
    });
    setNewActivity("");
  };

  const addTestimonial = () => {
    if (!newTestimonial) return;
    setForm({
      ...form,
      testimonialVideos: [...form.testimonialVideos, newTestimonial],
    });
    setNewTestimonial("");
  };

  const removeBannerVideo = (index) => {
    const arr = [...form.bannerVideos];
    arr.splice(index, 1);
    setForm({ ...form, bannerVideos: arr });
  };

  const removeActivity = (index) => {
    const arr = [...form.activities];
    arr.splice(index, 1);
    setForm({ ...form, activities: arr });
  };

  const removeTestimonial = (index) => {
    const arr = [...form.testimonialVideos];
    arr.splice(index, 1);
    setForm({ ...form, testimonialVideos: arr });
  };

  return (
    <div className="admin-home-editor">
      <h2>Admin Home Page Editor</h2>

      <label>Welcome Text</label>
      <ReactQuill
        value={form.welcomeText}
        onChange={(value) => handleChange("welcomeText", value)}
        theme="snow"
      />

      <h3>Banner Videos</h3>
      <div className="list-section">
        <input
          placeholder="Enter banner video URL"
          value={newBannerVideo}
          onChange={(e) => setNewBannerVideo(e.target.value)}
        />
        <button type="button" onClick={addBannerVideo}>Add Banner Video</button>

        <ul>
          {form.bannerVideos.map((video, index) => (
            <li key={index}>
              {video}
              <button className="remove-btn" onClick={() => removeBannerVideo(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <h3>Activities Images</h3>
      <div className="list-section">
        <input
          placeholder="Enter activity image URL"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
        />
        <button type="button" onClick={addActivity}>Add Activity</button>

        <ul>
          {form.activities.map((act, index) => (
            <li key={index}>
              {act}
              <button className="remove-btn" onClick={() => removeActivity(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <h3>Three Column Section</h3>

      <label>Latest News Heading</label>
      <ReactQuill
        value={form.threeColumnSection.latestNewsHeading}
        onChange={(value) => handleThreeColumn("latestNewsHeading", value)}
        theme="snow"
      />

      <label>Latest News Paragraph</label>
      <ReactQuill
        value={form.threeColumnSection.latestNewsParagraph}
        onChange={(value) => handleThreeColumn("latestNewsParagraph", value)}
        theme="snow"
      />

      <label>Video URL</label>
      <input
        value={form.threeColumnSection.video}
        onChange={(e) => handleThreeColumn("video", e.target.value)}
      />

      <label>Activity Calendar URL</label>
      <input
        value={form.threeColumnSection.activityCalendar}
        onChange={(e) => handleThreeColumn("activityCalendar", e.target.value)}
      />

      <h3>Testimonial Videos</h3>
      <div className="list-section">
        <input
          placeholder="Enter testimonial video URL"
          value={newTestimonial}
          onChange={(e) => setNewTestimonial(e.target.value)}
        />
        <button type="button" onClick={addTestimonial}>Add Testimonial Video</button>

        <ul>
          {form.testimonialVideos.map((video, index) => (
            <li key={index}>
              {video}
              <button className="remove-btn" onClick={() => removeTestimonial(index)}>X</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={saveHome}>Save Home</button>
    </div>
  );
}




