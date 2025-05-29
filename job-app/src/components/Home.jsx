import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import home_1 from "../assets/home_1.jpg";
import home_2 from "../assets/home_2.jpg";
import FANG from "../assets/FANG.jpg";

const companies = [
  { id: 1, name: "Google", position: "Software Engineer", location: "Remote", openings: 12, website: "https://careers.google.com" },
  { id: 2, name: "Amazon", position: "Data Scientist", location: "Seattle, WA", openings: 8, website: "https://www.amazon.jobs" },
  { id: 3, name: "Microsoft", position: "AI Engineer", location: "Redmond, WA", openings: 5, website: "https://careers.microsoft.com" },
  { id: 4, name: "Facebook", position: "Backend Developer", location: "Menlo Park, CA", openings: 6, website: "https://www.metacareers.com" },
  { id: 5, name: "Apple", position: "iOS Developer", location: "Cupertino, CA", openings: 4, website: "https://jobs.apple.com" },
  { id: 6, name: "Netflix", position: "DevOps Engineer", location: "Los Gatos, CA", openings: 3, website: "https://jobs.netflix.com" },
  { id: 7, name: "Tesla", position: "Embedded Systems Engineer", location: "Palo Alto, CA", openings: 7, website: "https://www.tesla.com/careers" },
  { id: 8, name: "Adobe", position: "UI/UX Designer", location: "San Jose, CA", openings: 5, website: "https://www.adobe.com/careers.html" },
  { id: 9, name: "Intel", position: "Hardware Engineer", location: "Santa Clara, CA", openings: 6, website: "https://jobs.intel.com" },
];

function Home() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
    setAppliedJobs(storedJobs);
  }, []);

  return (
    <>
      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow-x: hidden;
          }
          .home-container {
            width: 100vw;
            padding: 0 10%;
            padding-top: 100px;
          }
          .company-card {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 15px;
          }
          .navbar {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 1000;
          }
        `}
      </style>
     
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/home">JobPortal</Link>
          
          <div className="d-flex">
            
            <Link className="btn btn-outline-primary me-2" to="/">Logout</Link>
            <Link className="btn btn-primary" to="/contact">Contact</Link>
           
          </div>
        </div>
      </nav>

      <div className="container-fluid home-container">
        <div className="text-center mt-5">
          <h1 className="text-primary fw-bold">Job Application Portal</h1>
          <p className="text-muted">Find your dream job and apply today</p>
        </div>


        <div id="jobCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src= {home_1} className="d-block w-100" alt="Office 1" />
            </div>
            <div className="carousel-item">
              <img src={home_2} className="d-block w-100" alt="Office 2" />
            </div>
            <div className="carousel-item">
              <img src={FANG} className="d-block w-100" alt="Office 3" />
              
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#jobCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#jobCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>






        <div className="container">
          <h2 className="text-primary fw-bold mt-4">Featured Companies</h2>
          <div className="row justify-content-center">
            {companies.map((company) => (
              <div key={company.id} className="col-lg-3 col-md-4 col-sm-6 p-3">
                <div className="card company-card">
                  <div className="card-body text-center">
                    <h5 className="card-title fw-bold">{company.name}</h5>
                    <p className="text-muted">{company.location}</p>
                    <p className="fw-bold">Position: <span className="text-dark">{company.position}</span></p>
                    <p className="text-primary fw-bold">{company.openings} open positions</p>
                    <div className="d-flex justify-content-between">
                      {appliedJobs.includes(company.id) ? (
                        <button className="btn btn-secondary w-50 me-2" disabled>Applied</button>
                      ) : (
                        <button 
                          className="btn btn-success w-50 me-2"
                          onClick={() => navigate(`/apply/${company.id}`)}
                        >
                          Apply
                        </button>
                      )}
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="btn btn-outline-primary w-50"
                      >
                        Details
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
    