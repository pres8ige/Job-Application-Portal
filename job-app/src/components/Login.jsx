  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import Carousel from "react-bootstrap/Carousel";
  import "bootstrap/dist/css/bootstrap.min.css";
  import midjourneyImage from "../assets/midjourney.png";
  import job from "../assets/job.jpg";
  import jobapp from "../assets/jobapp.jpg";
  import image from "../assets/image.png";

  function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
      if (username && password) {
        try {
          const response = await axios.post("http://localhost:8080/", {
            username,
            password,
          });

          if (response.status === 200) {
            alert("User inserted successfully!");
            navigate("/sign");
          } else {
            setError("An error occurred while logging in.");
          }
        } catch (err) {
          console.error("Error during login:", err);
          setError("An error occurred while logging in.");
        }
      } else {
        alert("Please enter both username and password.");
      }
    };

    return (
      <div
        style={{
          display: "flex",
          
          justifyContent: "center",
          height: "100vh",
          width: "100%",
          gap: "2rem",
          padding: "2rem",
        }}
      >
        {/* Login Card */}
        <div className="card shadow-lg" style={{ width: "25rem" }}>
          <div className="card-body">
            <h1 className="card-title text-center text-primary mb-4">Login</h1>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button onClick={handleLogin} className="btn btn-primary w-100">
              Login
            </button>
            <br />
            <br />
            <p>Already made an account? <a href="/sign">Sign In</a></p>
        
          </div>
        </div>

        {/* Image Slider (Carousel) */}
        <div style={{ width: "40rem" }}>
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={job}
                alt="First slide"
              />
              <Carousel.Caption>
                
                <p>Experience the best of our platform.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={midjourneyImage}
                alt="Second slide"
              />
              <Carousel.Caption>
              <h3 style={{ color: "black" }}>Secure Login</h3>
              <p style={{ color: "black" }}>Your data is safe with us.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={image}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3 style={{ color: "black" }}>Join Us</h3>
                <p style={{ color: "black" }}>Sign up and enjoy the journey.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }

  export default Login;
