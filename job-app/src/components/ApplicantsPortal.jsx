import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function ApplicantsPortal() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/applications")
      .then((response) => {
        setApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching applications:", error);
      });
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/home">
            JobPortal
          </Link>
          <div className="d-flex">
            <Link className="btn btn-outline-primary me-2" to="/">
              Logout
            </Link>
            <Link className="btn btn-primary" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mt-5">
        <h2 className="text-primary fw-bold">Job Applications</h2>
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Applicant Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Date of Birth</th>
              <th>Applicant ID</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.company_name}</td>
                <td>{app.applicant_name}</td>
                <td>{app.email}</td>
                <td>{app.mobile}</td>
                <td>{app.dob}</td>
                <td>{app.applicant_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ApplicantsPortal;
