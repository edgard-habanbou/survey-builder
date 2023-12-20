function TextQuestion({ question, index, answers }) {
  return (
    <div className="flex gap" key={index}>
      <input
        className="input"
        type="text"
        id={index}
        onChange={(e) => {
          answers[index] = {
            questionId: question._id,
            answers: e.target.value,
          };
        }}
      />
    </div>
  );
}

export default TextQuestion;
