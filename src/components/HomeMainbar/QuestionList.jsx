import React from "react";
import Question from "../HomeMainbar/Question.jsx"

const QuestionList = (props) => {
    return (
        <>
            {
                props.questionsList.map((questions) => (
                    <Question question={questions} key={questions._id}/>
                ))
            }
        </>
    )
}

export default QuestionList