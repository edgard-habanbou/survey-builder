import React, { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import Survey from "../components/Surveys";
import Profile from "../../../components/Profile";
import axios from "axios";
function Landing() {
  const [Surveys, setSurveys] = useState([]);
  const [ShowProfile, setShowProfile] = useState(false);
  const [ShowSurvey, setShowSurvey] = useState(false);

  const fetchSurveys = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "survey/surveys", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setSurveys(res.data.surveys);
      });
  };
  useEffect(() => {
    fetchSurveys();
  }, []);
  return (
    <div>
      <Nav setShowProfile={setShowProfile} setShowSurvey={setShowSurvey} />
      <div>
        {ShowProfile && <Profile />}
        {ShowSurvey &&
          Surveys.map((survey, index) => (
            <Survey survey={survey} key={index} />
          ))}
      </div>
    </div>
  );
}

export default Landing;
