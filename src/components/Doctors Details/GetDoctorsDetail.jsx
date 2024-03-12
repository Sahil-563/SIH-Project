import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import axios from "axios";
import toast from "react-hot-toast";
import "./GetDoctorsDetailsStyles.css";
import doc from "../../assets/bg6.jpg";
function GetDoctorsDetail() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      axios
        .get("https://digitilize-pragun.onrender.com/get/status/doctor")
        .then((res) => {
          setData(res.data.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("Internal Server Error");
        });
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 100000000);
    return () => clearInterval(interval);
  }, []);

  console.log(data, "data");
  return (
    <>
      <div className="background">
        <p className="headng">
          <span style={{ color: "#000" }}>Check</span>{" "}
          <span style={{ color: "#007E85" }}>doctors</span>,{" "}
          <span style={{ color: "#000" }}>are</span>{" "}
          <span style={{ color: "#6EAB36" }}>available</span>{" "}
          <span style={{ color: "#000" }}>or</span>{" "}
          <span style={{ color: "red" }}> not?</span>{" "}
        </p>
        <p style={{ color: "black" }} className="sub-heading">
          In this section you will get to know that wheather the doctors are
          present in their caboin or not . . .
        </p>
        <div className="cards-section">
          {isLoading ? (
            <ClipLoader
              color={"green"}
              loading={isLoading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            data?.map((item) => (
              <div class="card">
                <div class="imageContainer">
                  <img src={doc} alt="Image" class="image"></img>
                </div>
                <div class="textContainer">
                  <h2>{item.name}</h2>
                  <p className="text">
                    Status:{" "}
                    {item.status ? (
                      <span style={{ color: "green" }}>Available</span>
                    ) : (
                      <span style={{ color: "red" }}>Not Available</span>
                    )}
                  </p>
                  <p className="text">
                    Registration ID: {item.registration_id}
                  </p>
                  <p className="text">
                    Available In: {`${item.available_in} minutes`}
                  </p>
                  <p className="text">Reason: {item.reason}</p>
                  <p className="text">Hospital: {item.hospital}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default GetDoctorsDetail;
