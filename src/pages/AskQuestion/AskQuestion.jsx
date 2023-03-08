import React, { useState } from "react";
import "./AskQuestion.css"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { Ask } from "../../actions/question";
 
const AskQuestion = () => {

    const [questionTitle,setQuestionTilte] = useState('')
    const [questionBody,setQuestionBody] = useState('')
    const [questionTags,setQuestionTags] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => (state.currentUserReducer))

    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(Ask({questionTitle,questionBody,questionTags,userPosted:user.name,userId:user._id},navigate))
    }



    const handleEnter = (e) =>{
        if(e.key==='Enter'){
            setQuestionBody(questionBody + "\n")
        }
    }

    return (
        <div className="ask-question">
            <div className="ask-ques-container">
                <h1>
                    Ask a Public Question
                    {
                        user!==null && user.type!=='Gold' && <span className="remainder"><br/>({user.Questions.noOfPost}<span style={{color:"transparent"}}>_</span>question remaining for today)</span>
                    }
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="ask-form-container">
                        <label htmlFor="ask-ques-title">
                            <h4>Title</h4>
                            <p>Be specific and imagine you’re asking a question to another person.</p>
                            <input onChange={(e) => setQuestionTilte(e.target.value)} type="text" id="ask-ques-title" placeholder="e.g. Is there an R function for finding the index of an element in a vector"/>
                        </label>
                        <label htmlFor="ask-ques-body">
                            <h4>Body</h4>
                            <p>Include all the information someone would need to answer your question</p>
                            <textarea onChange={(e) => setQuestionBody(e.target.value)} onKeyDown={handleEnter} id="ask-ques-body" cols="30" rows="10"/>
                        </label>
                        <label htmlFor="ask-ques-tags">
                            <h4>Tags</h4>
                            <p>Add up to 5 Tags to describe what your question is about</p>
                            <input onChange={(e) => setQuestionTags(e.target.value.split(" "))} type="text" id="ask-ques-tags" placeholder="e.g. (mongodb c node.js)"/>
                        </label>
                    </div>
                    <input className="review-btn" type="submit" value="Review your Question"/>
                </form>
            </div>

        </div>
    )
}

export default AskQuestion