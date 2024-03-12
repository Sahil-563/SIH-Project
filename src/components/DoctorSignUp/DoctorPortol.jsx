import React, { useState, useEffect } from "react";
import axios from "axios";
import { BiSolidShow, BiHide } from "react-icons/bi";
import SignUpImg from "../../assets/signIn.jpg";
import "./DoctorPortalStyles.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function DoctorPortal() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  console.log(userData, "userData");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://digitilize-pragun.onrender.com/get/status/doctor"
        );
        setUserData(res.data.data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userFound = false;
    userData?.forEach((user) => {
      if (
        user.registration_id.toString() === formData.password &&
        user.name === formData.name
      ) {
        userFound = true;
        toast.success("Signed In Successfully");
        navigate("/doctorWork");
      }
    });

    if (!userFound) {
      toast.error("Invalid registration ID");
    }
  };

  return (
    <>
      <div className="mainContainer">
        <div className="content">
          <div className="form-container">
            <p className="welcome-text">Welcome Back</p>
            <p className="login-text">Login into your account</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-field">
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  value={formData.id}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter Your Name"
                />
              </div>
              <div className="input-field">
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Enter Registration ID"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <BiSolidShow size={"30px"} />
                  ) : (
                    <BiHide size={"30px"} />
                  )}
                </button>
              </div>
              <div className="btn-container">
                <button type="submit" className="login-button">
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="image-container">
          <img className="image" src={SignUpImg} alt="SignUp img" />
        </div>
      </div>
    </>
  );
}

export default DoctorPortal;
