import axios from "axios";
import React, { useState } from "react";

function Survey({ survey: { _id, userId, title } }) {
  const [showSurvey, setShowSurvey] = useState(false);
  const [radioSelectedAnswer, setRadioSelectedAnswer] = useState(null);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  const [survey, setSurvey] = useState({});

  const getSurvey = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "survey/" + _id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setSurvey(res.data);
      })
      .then(() => {
        setShowSurvey(!showSurvey);
      });
  };

  const handleDelete = () => {
    axios
      .delete(process.env.REACT_APP_API_URL + "survey/" + _id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
      .then(() => {
        window.location.reload();
      });
  };

  const handleView = () => {
    getSurvey();
    if (showAddQuestion) setShowAddQuestion(false);
  };

  const handleAddQuestionButton = () => {
    setShowAddQuestion(!showAddQuestion);
  };

  const handleAddQuestion = (question, typeId, surveyId, answers) => {
    axios
      .post(
        process.env.REACT_APP_API_URL + "question",
        {
          question: question,
          typeId: typeId,
          surveyId: surveyId,
          answers: answers,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(() => {
        getSurvey();
        setShowAddQuestion(false);
      });
  };

  const AddAnswer = () => {
    const answers = document.getElementById("answers");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "answerInput";
    answers.appendChild(input);
  };
  return (
    <div className="flex column gap">
      <div className="flex  gap">
        <div>
          <h2>{title}</h2>
        </div>
        <div>
          <button onClick={handleView}>{showSurvey ? "Hide" : "View"}</button>
        </div>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

      {showSurvey && (
        <div>
          <div className="flex gap">
            <h3>Questions</h3>
            <div>
              <button onClick={handleAddQuestionButton}>Add Question</button>
            </div>
          </div>
          {survey.questions?.map((question, index) => {
            return (
              <div key={index}>
                <h4>{question.question}</h4>
                <div>
                  {question.typeId === "657f0445f4aaced6b5b8d7af" ? ( // Radio
                    <div>
                      {question.answers?.map((answer, index) => (
                        <div className="flex gap" key={index}>
                          <input
                            type="radio"
                            value={index}
                            id={index}
                            checked={radioSelectedAnswer === index}
                            onChange={() => setRadioSelectedAnswer(index)}
                          />
                          <label htmlFor={index}>{answer.answer}</label>
                        </div>
                      ))}
                    </div>
                  ) : question.typeId === "657f052bf4aaced6b5b8d7b0" ? ( // Checkbox
                    <div>
                      {question.answers?.map((answer, index) => (
                        <div className="flex gap" key={index}>
                          <input type="checkbox" value={index} id={index} />
                          <label htmlFor={index}>{answer.answer}</label>
                        </div>
                      ))}
                    </div>
                  ) : question.typeId === "657f0553f4aaced6b5b8d7b1" ? ( // Checkbox
                    <div className="flex gap" key={index}>
                      <input type="text" id={index} />
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {showAddQuestion && (
        <div>
          <div className="flex gap">
            <h3>Add Question</h3>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                const question = e.target.question.value;
                const typeId = e.target.typeId.value;
                const answerInputs = document.querySelectorAll(".answerInput");
                const answers = Array.from(answerInputs).map((input) => ({
                  answer: input.value,
                }));
                handleAddQuestion(question, typeId, _id, answers);
              }}
            >
              <div className="flex gap ">
                <label htmlFor="question">Question</label>
                <input type="text" id="question" />
              </div>
              <div className="flex gap ">
                <label htmlFor="typeId">Answers Type</label>
                <select id="typeId">
                  <option value="657f0445f4aaced6b5b8d7af">Radio</option>
                  <option value="657f052bf4aaced6b5b8d7b0">Checkbox</option>
                  <option value="657f0553f4aaced6b5b8d7b1">Text</option>
                </select>
              </div>
              <div>
                <p>Answers</p>
                <div id="answers" className="flex gap column">
                  <input type="text" className="answerInput" />
                </div>
                <a href="#" onClick={AddAnswer}>
                  Add Answer
                </a>
              </div>
              <div>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Survey;
