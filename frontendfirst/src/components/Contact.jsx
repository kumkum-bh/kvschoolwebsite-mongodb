import React, { useEffect, useState } from "react";
import api, { API, showToast, showAlert } from "../api";
import Banner from "./Banner";
import "../styles/Contact.css";

export default function Contact() {
  const [content, setContent] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    schoolId: 1
  });

  useEffect(() => {
    api.get(`${API.CONTACT.GET}?schoolId=1`)
    .then(res => {
      const data = res.data?.data?.content || [];

      if (!data) {
        setContent([]);
        return;
      }

      // अगर content string है, तो array में convert कर दो
      if (typeof data === "string") {
        setContent([{ type: "text", value: data }]);
      } else if (Array.isArray(data)) {
        setContent(data);
      } else {
        // object format को array में convert करना
        setContent(
          Object.keys(data).map(key => {
            const item = data[key];
            if (item.href && item.label) {
              return { type: "link", label: item.label, href: item.href };
            }
            return { type: "text", value: item.value || item.info || "" };
          })
        );
      }
    })
    .catch(err => {
      console.error(err);
      showToast("Failed to load contact information!");
    });
  }, []);


  const decodeHTML = (str) => {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/api/registrar-form", form);
      if (res.data.success) {
        showToast("Your message has been sent successfully! The Registrar's office will respond shortly.", "success");
        setForm({ name: "", email: "", phone: "", message: "", schoolId: 1 });
      } else {
        showToast("Failed to send message. Please try again.", "error");
      }
    } catch (err) {
      console.error(err);
      showAlert({
        icon: "error",
        title: "Submission Failed",
        text: "We could not submit your message at this time. Please try again later."
      });
    }
  };

  return (
    <>
      <Banner /> 
      <main className="main-container">
        <div className="two-column">
          {/* Left Column */}
          <div className="left-column">
            <h2>Contact Us</h2>

            {content.map((item, idx) => {
              if (item.type === "text") {
                return <p key={idx}>{item.value}</p>;
              }
              if (item.type === "link") {
                return (
                  <p key={idx}>
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      {item.label}
                    </a>
                  </p>
                );
              }
              return null;
            })}


            <button onClick={() => window.open('https://forms.gle/exampleFormLink', '_blank')}>
              Contact School Registrar
            </button>
          </div>



          {/* Right Column - Registrar Form */}
          <div className="right-column" id="registrar-form">
            <h2>Registrar Contact Form</h2>
            <form onSubmit={handleSubmit} className="registrar-form">
              <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email Address" value={form.email} onChange={handleChange} required />
              <input name="phone" placeholder="Phone Number" value={form.phone} onChange={handleChange} required />
              <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
































