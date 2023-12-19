import React, { useEffect, useState } from "react";
import Survey from "../components/Survey";
import axios from "axios";
function Landing() {
  const [Surveys, setSurveys] = useState([]);
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
          console.log(Surveys);
        });
    };
    fetchSurveys();
  }, []);
  return (
    <div>
      <h1>Surveys</h1>
      {Surveys.map((survey, index) => {
        return <Survey key={index} survey={survey} />;
      })}
    </div>
  );
}

export default Landing;
