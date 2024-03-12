import React from "react";
import "./homePageStyles.css";
import homemodel from "../../assets/hero1.png";
import { Link } from "react-router-dom";
import available from "../../assets/bg2.jpg";
import available1 from "../../assets/bg4.jpg";
import available3 from "../../assets/bg6.jpg";
import { TypeAnimation } from "react-type-animation";
function Home() {
  return (
    <>
      <div className="container">
        <div className="txt-container">
          <p className="heading">
            <span style={{}}>Book</span>{" "}
            <span style={{ color: "#007E85" }}>appointments</span>,{" "}
            <span style={{ color: "#6EAB36" }}>check</span>{" "}
            <span style={{ color: "#6EAB36" }}>doctor's</span>{" "}
            <span style={{ color: "#6EAB36" }}>availability</span>,{" "}
            <span style={{}}>and</span> <span style={{}}>more...</span>
          </p>
          <ul
            style={{
              paddingTop: "30px",
              paddingBottom: "30px",
              listStyle: "none",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "20px",
            }}
          >
            <li>Search for doctors by specialty, location, and availability</li>
            <li>Receive reminders for upcoming appointments</li>
            <li>Stay updated on your doctor's schedule and availability</li>
          </ul>
          <p
            style={{
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: "20px",
            }}
          >
            Our motive is simple yet profound: to empower individuals by
            offering seamless access to medical care. Through our platform, you
            can effortlessly check the availability of doctors and secure
            appointments with ease. By eliminating long queues and tedious wait
            times, we aim to redefine the healthcare experience. Join us in
            prioritizing your well-being and embracing a future where accessing
            quality care is simple and stress-free
          </p>
          <div class="glassmorphic-buttons">
            <div class="glassmorphic-button">
              <Link to="/bookparchi">
                <img src={available1} alt="Image 1" />
                <span>Book Appointment</span>
              </Link>
            </div>

            <div class="glassmorphic-button">
              <Link to="/adminDoctor">
                <img src={available3} alt="Image 3" />
                <span>Doctors Panel</span>
              </Link>
            </div>
            <div class="glassmorphic-button">
              <Link to="/getDoctorsDetails">
                <img src={available} alt="Image 2" />
                <span>Check Doctor's Availability</span>
              </Link>
            </div>
          </div>
          <div
            className="team-mention"
            style={{
              paddingTop: "40px",
              color: "#007E85",
              fontWeight: 700,
              fontSize: "30px",
            }}
          >
            <p>
              <TypeAnimation
                sequence={[`We Work For Betterment Of Society ~ Team Gradeint`]}
                wrapper="p"
                speed={30}
              />
            </p>
          </div>
        </div>
        <div className="img-container">
          <img src={homemodel} alt="" />
        </div>
      </div>
    </>
  );
}

export default Home;
