import React from "react";
import "./index.css";
import { useNavigate } from "react-router-dom";
function Nav({ setShowSurvey, setShowProfile }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/");
  };

  const handleShowSurvey = () => {
    setShowSurvey(true);
    setShowProfile(false);
  };

  const handleShowProfile = () => {
    setShowProfile(true);
    setShowSurvey(false);
  };
  return (
    <div className="nav full-width center">
      <div className="flex gap center">
        <div className="logo" onClick={handleShowSurvey}>
          <h3>Survey App</h3>
        </div>
        <div>
          <button className="btn" onClick={handleShowSurvey}>
            Surveys
          </button>
        </div>
        <div>
          <button className="btn" onClick={handleShowProfile}>
            Profile
          </button>
        </div>
      </div>
      <div>
        <button className="btn danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Nav;
