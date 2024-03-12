import React from "react";
import "./DoctorWorkStyles.css";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import docImage from "../../assets/doc-image.png";
import { GoDotFill } from "react-icons/go";
import { useLocation } from "react-router-dom";
function DoctorWork() {
  const location = useLocation();
  const name = location.state?.name;
  const [Appointments, setAppointments] = useState(null);
  console.log(Appointments, "Appointments");
  const [date, setDate] = useState(new Date());
  const onChange = (date) => {
    setDate(date);
  };
  const formatDate = (date) => {
    const formattedDate = date
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");
    return formattedDate;
  };
  function capitalizeFirstLetter(string) {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  }

  const patientList = async () => {
    try {
      const response = await axios.get(
        `https://digitilize-pragun.onrender.com/server2/getdata/${formatDate(
          date
        )}`
      );

      const sortedAppointments = response.data.data.sort((a, b) => {
        if (a.emergency === 1 && b.emergency === 0) {
          return -1;
        } else if (a.emergency === 0 && b.emergency === 1) {
          return 1;
        } else {
          return 0;
        }
      });

      setAppointments(sortedAppointments);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    patientList();
  }, [date]);

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
              Welcome,{" "}
              <span
                style={{
                  color: "#007E85",
                  fontSize: "35px",
                  fontWeight: "900",
                }}
              >
                {`${name}!`}
              </span>
            </h2>
            <div className="doctor-header">
              <div className="visit-for-today">
                <h2>
                  Visit for today
                  <p style={{ fontSize: "35px", paddingTop: "5px", color: "" }}>
                    {Appointments?.length}
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
          <div className="table-header">
            <h2 style={{ padding: "20px" }}>Patient List </h2>
            <div className="emergency">
              <h2>Emergency</h2>
              <GoDotFill style={{ color: "red" }} size={"30px"} />
            </div>
          </div>

          <div className="Table-container">
            {Appointments?.length === 0 ? (
              <h1
                style={{ textAlign: "center", marginTop: "60px", color: "red" }}
              >
                {`No Appointments on ${formatDate(date)}`}
              </h1>
            ) : (
              <table className="table" style={{ minWidth: "100%" }}>
                <thead
                  style={{
                    position: "sticky",
                    top: 0,
                    background: "aliceblue",
                  }}
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
                      {singleAppointment.emergency === 0 ? (
                        <td>{capitalizeFirstLetter(singleAppointment.name)}</td>
                      ) : (
                        <td>
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <GoDotFill style={{ color: "red" }} size={"25px"} />
                            {capitalizeFirstLetter(singleAppointment.name)}
                          </div>
                        </td>
                      )}

                      <td>{singleAppointment.age}</td>
                      <td>{capitalizeFirstLetter(singleAppointment.sex)}</td>
                      <td>
                        {singleAppointment.allocated_time === null
                          ? "will update soon..."
                          : extractTimeFromDate(
                              singleAppointment.allocated_time
                            )}
                      </td>
                      <td>{capitalizeFirstLetter(singleAppointment.time)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorWork;
