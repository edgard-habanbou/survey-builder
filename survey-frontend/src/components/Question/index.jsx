import React from "react";
import CheckBoxQuestion from "../CheckboxQuestion";
import RadioQuestion from "../RadioQuestion";
import TextQuestion from "../TextQuestion";
import "./index.css";

function Question({ question, onDelete, onEdit, isUser, index, answers }) {
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
          <RadioQuestion question={question} answers={answers} index={index} />
        ) : question.typeId === "657f052bf4aaced6b5b8d7b0" ? ( // Checkbox
          <CheckBoxQuestion
            question={question}
            answers={answers}
            index={index}
          />
        ) : question.typeId === "657f0553f4aaced6b5b8d7b1" ? ( // Text
          <TextQuestion question={question} answers={answers} index={index} />
        ) : null}
      </div>
      {!isUser && (
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
      )}
    </div>
  );
}

export default Question;
