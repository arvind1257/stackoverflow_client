import React from "react";
import Question from "../HomeMainbar/Question.jsx"

const QuestionList = (props) => {
    console.log(props.questionsList.length)
    return (
        <>
            {
                props.questionsList.map((questions) => (
                    <Question question={questions} key={questions.id}/>
                ))
            }
        </>
    )
}

export default QuestionList