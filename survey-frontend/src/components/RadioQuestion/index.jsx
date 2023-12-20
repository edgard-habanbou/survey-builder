import React, { useState } from "react";

function RadioQuestion({ question, index, answers }) {
  const [radioSelectedAnswer, setRadioSelectedAnswer] = useState();

  return (
    <div>
      {question.answers?.map((answer, i) => (
        <div className="flex gap" key={i}>
          <input
            type="radio"
            value={i}
            id={i}
            checked={radioSelectedAnswer === i}
            onChange={() => {
              const checked = document.getElementById(i).checked;
              setRadioSelectedAnswer(i);
              answers[index] = {
                questionId: question._id,
                answers: checked ? i : null,
              };
            }}
          />
          <label htmlFor={i}>{answer.answer}</label>
        </div>
      ))}
    </div>
  );
}

export default RadioQuestion;
