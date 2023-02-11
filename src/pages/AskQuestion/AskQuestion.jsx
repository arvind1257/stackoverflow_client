import React from "react";
import "./AskQuestion.css"
const AskQuestion = () => {
    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>Ask a Public Question</h1>
                <form>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you’re asking a question to another person.</p>
                            <input type="text" id="ask-ques-title" placeholder="e.g. Is there an R function for finding the index of an element in a vector"/>
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea id="ask-ques-body" cols="30" rows="10"/>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 Tags to describe what your question is about</p>
                            <input type="text" id="ask-ques-tags" placeholder="e.g. (mongodb c node.js)"/>
                        </label>
                    </div>
                    <input className="review-btn" type="submit" value="Review your Question"/>
                </form>
            </div>

        </div>
    )
}

export default AskQuestion