import axios from "axios";
import React, { useEffect, useState } from "react";

function AddQuestion({ surveyId, getSurvey, EditSurvey, editQuestion }) {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]);
  const [typeId, setTypeId] = useState("0");

  useEffect(() => {
    if (editQuestion) {
      setQuestion(editQuestion.question);
      setAnswers([editQuestion.answers]);
      setTypeId(editQuestion.typeId);
    }
  }, [editQuestion]);

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
      });
  };
  const handleEditQuestion = (question, typeId, surveyId, answers) => {
    axios
      .put(
        process.env.REACT_APP_API_URL + "question/" + editQuestion._id,
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
        EditSurvey();
      });
  };

  const AddAnswer = () => {
    const answers = document.getElementById("answers");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "answerInput input";
    answers.appendChild(input);
  };

  return (
    <div>
      <div className="flex gap column">
        <div>
          <h3>New Question</h3>
        </div>
        <div>
          <form
            className=" flex column gap margin center"
            onSubmit={(e) => {
              const answerInputs = document.querySelectorAll(".answerInput");
              const answers = Array.from(answerInputs).map((input) => ({
                answer: input.value,
              }));

              if (editQuestion) {
                handleEditQuestion(question, typeId, surveyId, answers);
              } else handleAddQuestion(question, typeId, surveyId, answers);
            }}
          >
            <div className="flex gap center column">
              <div>
                <p>Question</p>
              </div>
              <div>
                <input
                  type="text"
                  className="input"
                  id="question"
                  value={question}
                  onChange={(e) => {
                    setQuestion(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="flex gap column center">
              <div>
                <p>Answers Type</p>
              </div>
              <div>
                <select
                  id="typeId"
                  className="select"
                  value={typeId}
                  onChange={(e) => {
                    setTypeId(e.target.value);
                  }}
                >
                  <option value="0" disabled>
                    Select a type
                  </option>
                  <option value="657f0445f4aaced6b5b8d7af">Radio</option>
                  <option value="657f052bf4aaced6b5b8d7b0">Checkbox</option>
                  <option value="657f0553f4aaced6b5b8d7b1">Text</option>
                </select>
              </div>
            </div>
            <div className="flex column gap center">
              <p>Answers</p>
              <div id="answers" className="flex gap column">
                {editQuestion ? (
                  editQuestion.answers?.map((answer, index) => (
                    <input
                      type="text"
                      className="answerInput input"
                      key={index}
                      value={answer.answer}
                      onChange={(e) => {
                        const answers = [...editQuestion.answers];
                        answers[index].answer = e.target.value;
                        setAnswers(answers);
                      }}
                    />
                  ))
                ) : (
                  <input type="text" className="answerInput input" />
                )}
              </div>
              <div>
                <a href="#" className="btn right" onClick={AddAnswer}>
                  Add Answer
                </a>
              </div>
            </div>
            <div className="flex right">
              <button className="btn" type="submit">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddQuestion;
