import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((r) => r.json())
    .then((questions) => setQuestions(questions))
  }, []);

  function handleUpdate(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "correctIndex": correctIndex
      })
    })
    .then((r) => r.json())
    .then((question) => {
      const updatedQuestions = questions.map((q) => {
        if(q.id == question.id){
          return question
        }else{
          return q
        }})
        setQuestions(updatedQuestions)
    })
  }

  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion);
    setQuestions(updatedQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => (
        <QuestionItem 
          key={question.id}
          question={question}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdate={handleUpdate}
        />
      ))}</ul>
    </section>
  );
}

export default QuestionList;
