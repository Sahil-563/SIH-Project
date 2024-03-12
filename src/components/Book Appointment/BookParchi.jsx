import React from "react";
import "./BookParchiStyles.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TypeAnimation } from "react-type-animation";
function BookParchi() {
  const [locations, setLocations] = useState([]);
  const [symptoms, setSymptoms] = useState([]);
  const [chosenDept, setChosenDept] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState();
  const [inputValues, setInputValues] = useState(["", "", "", ""]);
  const [matchedSymptoms, setMatchedSymptoms] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);

  const handleButtonClick = () => {
    setIsWebViewOpen((prevState) => !prevState);
  };
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    sex: "",
    location: "",
    symptoms: "",
    department: "",
    date: "",
    time: "",
  });
  const [response, setResponse] = useState();
  const dataSent = async (e) => {
    try {
      const { data } = await axios.post(
        `https://digitilize-pragun.onrender.com/predict/deptt`,
        symptomList,
        {}
      );

      setResponse(data.Department);
    } catch (error) {}
    try {
      const { data } = await axios.post(
        `https://digitilize-pragun.onrender.com/get_home_care_suggestions`,
        symptomList,
        {}
      );

      const homeCareSuggestions = data.home_care_suggestions;

      if (homeCareSuggestions) {
        Object.keys(homeCareSuggestions).forEach((property) => {
          const suggestion = homeCareSuggestions[property];
          toast.success(`${"Precaution"}: ${suggestion}`, {
            autoClose: 6000,
          });
        });
      } else {
        toast.error("No home care suggestions available", {
          autoClose: 16000,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      department: response,
    }));
  }, [response]);
  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await fetch(
          "https://digitilize-pragun.onrender.com/getsymptoms"
        );
        const data = await response.json();
        setSymptoms(data[0].symptoms);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
      }
    };

    fetchSymptoms();
  }, []);

  const handleInputChange = (value, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    const filteredSymptoms = symptoms.filter((symptom) =>
      symptom.toLowerCase().includes(value.toLowerCase())
    );
    setMatchedSymptoms(filteredSymptoms);

    setInputValues(newInputValues);
  };
  const handleSelectWord = (word, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = word;

    setInputValues(newInputValues);
    setMatchedSymptoms([]);
    setFocusedIndex(null);
    setSelectedSymptoms([...selectedSymptoms, word]);
  };

  const symptomList = { symptoms: selectedSymptoms };
  const handleFocusChange = (index) => {
    setFocusedIndex(index);
    setMatchedSymptoms([]);
  };

  const handleBackspace = (index) => {
    if (inputValues[index].length === 0 && index > 0) {
      setFocusedIndex(index - 1);
    }
  };

  useEffect(() => {
    axios
      .get(`https://digitilize-pragun.onrender.com/server2/location`, {})
      .then((res) => {
        setLocations(res.data.data);
      })
      .catch((error) => {
        toast.error("Internal Server Error");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "location") {
      setSelectedLocation(value);
    }

    const fetchDepartmentData = async () => {
      if (selectedLocation) {
        try {
          const response = await fetch(
            `https://digitilize-pragun.onrender.com/server2/department/${selectedLocation}`
          );
          const data = await response.json();
          setChosenDept(data.data);
          console.log("Department Data:", data);
        } catch (error) {
          console.error("Error fetching department data:", error);
        }
      }
    };

    fetchDepartmentData();
    console.log(formData);
    if (name === "date" && value) {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      console.log(formattedDate);
      setFormData((prevData) => ({
        ...prevData,
        [name]: formattedDate,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const parchiData = async (e) => {
    try {
      const { data } = await axios.post(
        `https://digitilize-pragun.onrender.com/server2/postdata`,
        formData,
        {}
      );
      console.log(data, "data");
      toast.success("Slip Genrated Succefully");
    } catch (error) {
      toast.error("Cannot generate a Slip...Please fill all the fields");
    }
  };

  return (
    <>
      <ToastContainer autoClose={6000} position="top-center" />
      <div className="wrapper">
        <div className="morphic">
          {" "}
          <div className="text-container">
            <p className="head">Meet the Best Hospital</p>
            <p className="desp">
              <TypeAnimation
                sequence={[
                  `We know how large objects will act, but things on a small scale.`,
                ]}
                wrapper="p"
                speed={20}
              />
            </p>
            <button
              style={{
                marginTop: "40px",
                fontSize: "24px",
                borderRadius: "30px",
                height: "60px",
                fontWeight: 600,
              }}
              className="button-sup"
            >
              Learn More . . .
            </button>
          </div>
        </div>
        <div className="from-wrapper">
          <div className="beautiful-form-container">
            <p
              style={{
                textAlign: "center",
                padding: "20px 20px 40px 20px",
                color: "#000",
                fontWeight: 900,
                fontSize: "30px",
              }}
            >
              Book Appointment
            </p>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  placeholder="Your Age"
                />
              </div>

              <div className="form-group">
                <label htmlFor="sex">Sex:</label>
                <select
                  id="sex"
                  name="sex"
                  value={formData.sex}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location:</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="option2" defaultValue="option">
                    Select
                  </option>
                  {locations.map((locationObj, index) => (
                    <option key={index} value={locationObj.Location}>
                      {locationObj.Location}
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleButtonClick}
                  type="button"
                  style={{ marginTop: "10px" }}
                  className="button-sup"
                >
                  {isWebViewOpen ? "Close Web View" : "Show Nearby Hospital"}
                </button>

                {isWebViewOpen && (
                  <iframe
                    title="Web View"
                    src="https://candid-dango-ac3a28.netlify.app/"
                    width="360"
                    height="400"
                  ></iframe>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="Symptoms">Symptoms:</label>
                <div>
                  {inputValues.map((inputValue, index) => (
                    <div key={index}>
                      {index === 0 || inputValues[index - 1].length > 0 ? (
                        <>
                          <input
                            type="text"
                            value={inputValue}
                            onChange={(e) =>
                              handleInputChange(e.target.value, index)
                            }
                            onFocus={() => handleFocusChange(index)}
                            onKeyDown={(e) =>
                              e.key === "Backspace" && handleBackspace(index)
                            }
                            placeholder={`Type in Symptom Field ${index + 1}`}
                          />
                          {focusedIndex === index &&
                            matchedSymptoms.length > 0 && (
                              <ul className="symptom-list">
                                {matchedSymptoms.map((symptom) => (
                                  <li
                                    key={symptom}
                                    onClick={() =>
                                      handleSelectWord(symptom, index)
                                    }
                                    className="symptom-item"
                                  >
                                    {symptom}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </>
                      ) : null}
                    </div>
                  ))}
                </div>
                <button
                  onClick={dataSent}
                  type="button"
                  className="button-sup"
                  style={{ marginTop: "10px" }}
                >
                  Get Department
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="department">Department:</label>
                <input
                  id="department"
                  name="department"
                  value={formData.department}
                  required
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="time">Time:</label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="morning">Morning</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
              <div className="btn-container">
                <button className="button" onClick={parchiData} type="button">
                  Book Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookParchi;
