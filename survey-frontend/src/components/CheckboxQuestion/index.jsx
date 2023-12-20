import React from "react";

function CheckboxQuestion({ question, index, answers }) {
  const checkboxSelectedAnswer = { questionId: question._id, answers: [] };
  return (
    <div>
      {question.answers?.map((answer, i) => (
        <div className="flex gap" key={i}>
          <input
            type="checkbox"
            value={i}
            id={i}
            onChange={(e) => {
              if (e.target.checked) {
                checkboxSelectedAnswer.answers.push(e.target.value);
              } else {
                const indexofTarget = checkboxSelectedAnswer.answers.indexOf(
                  e.target.value
                );
                checkboxSelectedAnswer.answers.splice(indexofTarget, 1);
              }
              answers[index] = checkboxSelectedAnswer;
            }}
          />
          <label htmlFor={index}>{answer.answer}</label>
        </div>
      ))}
    </div>
  );
}

export default CheckboxQuestion;
