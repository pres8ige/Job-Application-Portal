import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Apply from "./components/Apply";
import Signin from "./components/Signin";
import ContactUs from "./components/ContactUs";
import ApplicantsPortal from "./components/ApplicantsPortal";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign" element={<Signin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply/:id" element={<Apply />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/applications" element={<ApplicantsPortal />} />
      </Routes>
    </Router>
  );
}

export default App;
