import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/contact", formData);
      alert("Message sent successfully!");
      setFormData({ fullName: "", email: "", subject: "", message: "" });
    } catch (err) {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <style>
      {`
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
          }

          .contact-page {
            padding-top: 100px;
            padding-bottom: 50px;
          }

          .contact-info i {
            font-size: 1.5rem;
            margin-right: 10px;
            color: #0d6efd;
          }

          .contact-form {
            border-radius: 8px;
            border: 1px solid #e0e0e0;
            padding: 30px;
            background-color: #fff;
          }

          .form-control {
            border-radius: 6px;
          }

          .btn-dark {
            background-color: #000;
            border: none;
          }

          @media (max-width: 768px) {
            .contact-cols {
              flex-direction: column;
            }
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/home">JobPortal</Link>
          <div className="d-flex">
            <Link className="btn btn-outline-primary me-2" to="/signin">Sign In</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </div>
        </div>
      </nav>

      <div className="container contact-page">
        <div className="row contact-cols d-flex align-items-start">
          <div className="col-md-6 mb-4">
            <h2 className="fw-bold">Contact Us</h2>
            <p className="text-muted">Have questions? Fill out the form and we’ll help you.</p>
            <div className="contact-info mt-4">
              <p><i className="bi bi-person-lines-fill"></i> <strong>Career Support</strong><br /><span className="text-muted">Here to help with your job application</span></p>
              <p><i className="bi bi-geo-alt-fill"></i> <strong>Office Location</strong><br /><span className="text-muted">PCCOE, Akurdi</span></p>
              <p><i className="bi bi-telephone-fill"></i> <strong>Phone</strong><br /><span className="text-muted">999999999</span></p>
              <p><i className="bi bi-envelope-fill"></i> <strong>Email</strong><br /><span className="text-muted">support@jobportal.example</span></p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="contact-form shadow-sm">
              <h4 className="fw-bold mb-2">Send us a message</h4>
              <p className="text-muted">We'll respond within 24 hours.</p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="fullName" value={formData.fullName} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input type="text" className="form-control" id="subject" value={formData.subject} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea className="form-control" id="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-dark w-100">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
