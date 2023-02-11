import React from "react";
import { Link } from "react-router-dom";

const Question = ({question}) => {
    console.log("hi")
    console.log(question)

    return (
        <div className="display-ans-container">
            <div className="display-votes-ans">
                <p>{ question.votes }</p>
                <p>votes</p>
            </div>
            <div className="display-votes-ans">
                <p>{ question.noOfAnswers }</p>
                <p>answers</p>
            </div>
            <div className="display-questions-details">
                <Link to={`/Questions/${question.id}`} className="question-title-link">{question.questionTitle}</Link>
                <div className="display-tags-time">
                    <div className="display-tags">
                        {
                            question.questionTags.map((tag) => (
                                <p key={tag}>{tag}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Question;