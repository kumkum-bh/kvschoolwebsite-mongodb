import React from "react";
import "../styles/FooterSecond.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">

        {/* Links Column */}
        <div className="col">
          <h2>Our Links</h2>
          <ul>
            <li><a href="/">Admissions</a></li>
            <li><a href="/academics">Academics</a></li>
            <li><a href="/extracurricular">ExtraCurricular</a></li>
            <li><a href="/mandatory-disclosure">Mandatory Disclosure</a></li>
            <li><a href="/downloads">Downloads</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="col">
          <h2>Contact Us</h2>
          <p>Address: Expressway, Sector 126, Noida, UP 201313</p>
          <p>Phone: 9910952225/6/7, For Admissions: 9971707953</p>
          <p>Email: info@lotusvalley.com</p>
          <p>Opens: Mon - Sat</p>

          <div className="social">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-square-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-square-twitter"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-square-youtube"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <i class="fa-brands fa-linkedin"></i>
            </a>
            <a href="https://www.lotusvalley.com/home.html" target="_blank" rel="noopener noreferrer">
              <i class="fa-solid fa-trophy"></i>
            </a>
          </div>
        </div>

        {/* Location Column with Google Map */}
        <div className="col">
          <h2>Location</h2>
          <div className="map">
            <iframe
              title="LV School Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.123456789!2d77.313456!3d28.576789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x123456789abcdef!2sLotus%20Valley%20School!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

      </div>

      <div className="copyright">
        © {new Date().getFullYear()} LV School — All rights reserved.
      </div>
    </footer>
  );
}





