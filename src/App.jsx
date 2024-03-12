import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import { Toaster } from "react-hot-toast";
import GtDoctorsDetails from "./components/Doctors Details/GetDoctorsDetail";
import BookParchi from "./components/Book Appointment/BookParchi";
import DoctorPortol from "./components/DoctorSignUp/DoctorPortol";
import DoctorWork from "./components/Doctor Work/DoctorWork";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="getDoctorsDetails" element={<GtDoctorsDetails />} />
          <Route path="/bookparchi" element={<BookParchi />} />
          <Route path="/adminDoctor" element={<DoctorPortol />} />
          <Route path="/doctorWork" element={<DoctorWork />} />
          <Route path="*" element={<pageNotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
