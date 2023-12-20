import React, { useEffect, useState } from "react";
import Survey from "../components/Survey";
import Nav from "../components/Nav";
import Profile from "../components/Profile";
import axios from "axios";
function Landing() {
  const [Surveys, setSurveys] = useState([]);
  const [ShowSurvey, setShowSurvey] = useState(false);
  const [ShowProfile, setShowProfile] = useState(false);
  useEffect(() => {
    const fetchSurveys = () => {
      axios
        .get(process.env.REACT_APP_API_URL + "survey", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        })
        .then((res) => {
          setSurveys(res.data.surveys);
        });
    };
    fetchSurveys();
  }, []);
  return (
    <div>
      <Nav setShowProfile={setShowProfile} setShowSurvey={setShowSurvey} />
      <div>
        {ShowProfile && <Profile />}

        {ShowSurvey && (
          <div>
            <h1>Surveys</h1>
            {Surveys.map((survey, index) => {
              return <Survey key={index} survey={survey} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Landing;
