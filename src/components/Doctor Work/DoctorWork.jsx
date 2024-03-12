import React from "react";
import "./DoctorWorkStyles.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import docImage from "../../assets/doc-image.png";

function DoctorWork() {
  const [Appointments, setAppointments] = useState(null);
  const [date, setDate] = useState(new Date());

  const onChange = (date) => {
    setDate(date);
  };

  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  }

  const patientList = async () => {
    try {
      const response = await axios.get(
        "https://digitilize-pragun.onrender.com/server2/getdata"
      );
      setAppointments(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    patientList();
  }, []);

  function extractTimeFromDate(dateString) {
    return dateString ? dateString.split("T")[1].substring(0, 5) : "";
  }

  const tileDisabled = ({ date }) => {
    return date > new Date();
  };

  return (
    <>
      <div className="MainContainer">
        <div className="innerContainer">
          <div className="subContainer1">
            <h2>
              Good Morning,{" "}
              <span
                style={{
                  color: "#007E85",
                  fontSize: "35px",
                  fontWeight: "900",
                }}
              >
                {"Sahil!"}
              </span>
            </h2>
            <div className="doctor-header">
              <div className="visit-for-today">
                <h2>
                  Visit for today
                  <p style={{ fontSize: "35px", paddingTop: "5px", color: "" }}>
                    100
                  </p>
                </h2>
                <h2 style={{ paddingTop: "15px" }}>
                  Hospital Name
                  <p style={{ fontSize: "35px", paddingTop: "5px", color: "" }}>
                    IGMC, Shimla
                  </p>
                </h2>
              </div>
              <div className="doc-img">
                <img src={docImage} alt="docImage" />
              </div>
            </div>
          </div>
          <div className="subContainer2">
            <div className="calender">
              <Calendar
                className="custom-calendar"
                onChange={onChange}
                value={date}
                tileDisabled={tileDisabled}
              />
            </div>
          </div>
        </div>

        <div className="PatientList">
          <h2 style={{ padding: "20px" }}>Patient List</h2>
          <div className="Table-container">
            <table className="table" style={{ minWidth: "100%" }}>
              <thead
                style={{ position: "sticky", top: 0, background: "aliceblue" }}
              >
                <tr>
                  <th style={{ fontSize: "1.5em" }}>Name</th>
                  <th style={{ fontSize: "1.5em" }}>Age(In Years)</th>
                  <th style={{ fontSize: "1.5em" }}>Sex</th>
                  <th style={{ fontSize: "1.5em" }}>Time</th>
                  <th style={{ fontSize: "1.5em" }}>Session</th>
                </tr>
              </thead>
              <tbody>
                {Appointments?.map((singleAppointment, index) => (
                  <tr key={index}>
                    <td>{capitalizeFirstLetter(singleAppointment.name)}</td>
                    <td>{singleAppointment.age}</td>
                    <td>{capitalizeFirstLetter(singleAppointment.sex)}</td>
                    <td>
                      {extractTimeFromDate(singleAppointment.allocated_time)}
                    </td>
                    <td>{capitalizeFirstLetter(singleAppointment.time)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorWork;
