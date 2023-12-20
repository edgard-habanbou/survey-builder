import axios from "axios";
import React, { useState } from "react";
import Question from "../../../../components/Question";

function Survey({ survey: { _id, title } }) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [oneSurvey, setOneSurvey] = useState({});

  const answers = [];
  const handleView = () => {
    getSurvey();
  };

  const getSurvey = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "survey/" + _id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        setOneSurvey(res.data);
      })
      .then(() => {
        setShowSurvey(!showSurvey);
      });
  };

  const handleSubmit = () => {
    console.log(answers);
    axios
      .post(
        process.env.REACT_APP_API_URL + "user_answer/",
        {
          surveyId: _id,
          answers: answers,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        setOneSurvey(res.data);
      })
      .then(() => {
        setShowSurvey(!showSurvey);
      });
  };
  return (
    <div className="margin survey">
      <div className="flex question-title gap">
        <div>
          <p>
            <b>Title:</b> {title}
          </p>
        </div>
        <div className="flex gap">
          <div>
            <button className="btn" onClick={handleView}>
              {showSurvey ? "Hide" : "Fill Survey"}
            </button>
          </div>
        </div>
      </div>

      {showSurvey && (
        <div>
          <div className="flex space-between gap">
            <h3>Questions</h3>
          </div>
          <div className="flex column gap">
            {oneSurvey.questions?.map((question, index) => {
              return (
                <Question
                  key={index}
                  question={question}
                  index={index}
                  isUser={true}
                  answers={answers}
                />
              );
            })}
          </div>
          <div className="flex center margin padding">
            <button className="btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Survey;
