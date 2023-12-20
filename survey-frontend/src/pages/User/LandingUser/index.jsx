import React, { useEffect, useState } from "react";
import Nav from "../../../components/Nav";
import Survey from "../components/Surveys";
import axios from "axios";
function Landing() {
  const [Surveys, setSurveys] = useState([]);

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
      <Nav />
      <div>
        {Surveys.map((survey, index) => (
          <Survey survey={survey} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Landing;
