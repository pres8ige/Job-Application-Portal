import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const companies = [
  { id: 1, name: "Google", position: "Software Engineer" },
  { id: 2, name: "Amazon", position: "Data Scientist" },
  { id: 3, name: "Microsoft", position: "AI Engineer" },
  { id: 4, name: "Facebook", position: "Backend Developer" },
  { id: 5, name: "Apple", position: "iOS Developer" },
  { id: 6, name: "Netflix", position: " DevOps Engineer" },
  { id: 7, name: "Tesla", position: "Embedded Systems Engineer" },
  { id: 8, name: "Adobe", position: "UI/UX Designer" },
  { id: 9, name: "Intel", position: "Hardware Engineer" }
];

function Apply() {
  const { id } = useParams();
  const company = companies.find((c) => c.id === parseInt(id));
  const navigate = useNavigate();

  const [applicantName, setApplicantName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [applicantId, setApplicantId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!company || !applicantName || !email || !mobile || !dob || !applicantId) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/apply", {
        companyId: company.id,
        companyName: company.name,
        applicantName,
        email,
        mobile,
        dob,
        applicantId,
      });

      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      console.error("Error submitting application:", error.response?.data || error.message);
      alert("Error submitting application. Please try again.");
    }
  };

  return (
    <div>
      <style>
        {`
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: rgb(233, 237, 246);
            margin: 0;
          }
          .form-box {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 500px;
            text-align: center;
          }
          .form-box h1 {
            font-size: 2rem;
            margin-bottom: 10px;
            color: #111827;
          }
          .form-box p {
            margin-bottom: 20px;
            color: #6b7280;
          }
          .form-group {
            margin-bottom: 16px;
            text-align: left;
          }
          .form-group label {
            display: block;
            font-weight: 500;
            margin-bottom: 6px;
            color: #374151;
          }
          .form-group input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 1rem;
          }
          .form-actions {
            display: flex;
            justify-content: space-between;
            margin-top: 24px;
          }
          .form-actions button {
            padding: 10px 16px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            border: none;
          }
          .cancel-btn {
            background-color: #e5e7eb;
            color: #374151;
          }
          .submit-btn {
            background-color: #2563eb;
            color: white;
          }
          .submit-btn:hover {
            background-color: #1d4ed8;
          }
          .cancel-btn:hover {
            background-color: #d1d5db;
          }
        `}
      </style>

      <div className="form-box">
        <h1>Job Application</h1>
        <p>Apply to <strong>{company?.name}</strong></p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              value={applicantName}
              onChange={(e) => setApplicantName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              required
            />
          </div>

          <div className="form-group">
            <label>Mobile Number *</label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Your Mobile Number"
              required
            />
          </div>

          <div className="form-group">
            <label>Date of Birth *</label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Applicant ID *</label>
            <input
              type="text"
              value={applicantId}
              onChange={(e) => setApplicantId(e.target.value)}
              placeholder="Your ID (e.g., SSN, Passport)"
              required
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Apply;
