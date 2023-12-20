import React, { useState } from "react";
import "./index.css";

function Question({ question, index, onDelete, onEdit }) {
  const [radioSelectedAnswer, setRadioSelectedAnswer] = useState(null);

  const handleDelete = () => {
    onDelete(question);
  };
  const handleEdit = () => {
    onEdit(question);
  };
  return (
    <div className="question flex space-between center padding">
      <div>
        <h4>{question.question}</h4>

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
            <input className="input" type="text" id={index} />
          </div>
        ) : null}
      </div>
      <div className="flex gap">
        <div>
          <button onClick={handleDelete} className="btn danger">
            Delete
          </button>
        </div>
        <div>
          <button onClick={handleEdit} className="btn">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Question;
