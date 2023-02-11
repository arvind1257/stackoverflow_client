import React from "react";
import { useParams,Link } from "react-router-dom";
import upVote from "../../assests/caret-up.svg"
import downVote from "../../assests/caret-down.svg"
import "./Questions.css"
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from "./DisplayAnswer";
import { useSelector } from "react-redux";
const QuestionDetails = () => {

    const { id } = useParams()
    const questionsList = useSelector(state => state.questionReducer);
    /*var questionsList = [{
        id:'1',
        upVotes:3,
        downVotes:1,
        noOfAnswers:2,
        questionTitle: "What is a function?",
        questionBody:"It meant to be",
        questionTags:["java","node.js","react.js","mongoose"],
        userPosted:"Arvind",
        userId:1,
        askedOn:"Feb 1",
        answer: [{
            answerBody:"Answer1",
            userAnswered:"Kumar",
            answeredOn:"Feb 4",
            userId:"2",
        },{
            answerBody:"Answer2",
            userAnswered:"Kumar",
            answeredOn:"Feb 4",
            userId:"2",
        }]
    },{
        id:'2',
        upVotes:3,
        downVotes:2,
        noOfAnswers:2,
        questionTitle: "What is a function?",
        questionBody:"It meant to be",
        questionTags:["javascript","python","R"],
        userPosted:"Arvind",
        userId:1,
        askedOn:"Feb 1",
        answer: [{
            answerBody:"Answer1",
            userAnswered:"Kumar",
            answeredOn:"Feb 4",
            userId:"2",
        },{
            answerBody:"Answer2",
            userAnswered:"Kumar",
            answeredOn:"Feb 4",
            userId:"2",
        }]
    },{
        id:'3',
        upVotes:3,
        downVotes:0,
        noOfAnswers:2,
        questionTitle: "What is a function?",
        questionBody:"It meant to be",
        questionTags:["angular","node.js","express","mongoose"],
        userPosted:"Arvind",
        userId:1,
        askedOn:"Feb 1",
        answer: [{
            answerBody:"Answer1",
            userAnswered:"Kumar",
            answeredOn:"Feb 4",
            userId:"2",
        },{
            answerBody:"Answer2",
            userAnswered:"Kumar",
            answeredOn:"Feb 4",
            userId:"2",
        }]
    }]*/
    return (
        <div className="question-details-page">
            {
                questionsList.data === null ? 
                <h1>Loading....</h1> : 
                <>
                {

                    questionsList.data.filter((question) => question._id === id ).map((question) => (
                        <div key={id}>
                            <section className="question-details-container">
                                <h1>{question.questionTitle}</h1>
                                <div className="question-details-container-2">
                                    <div className="question-votes">
                                        <img src={upVote} alt="upVote" width="30" className="votes-icon"/>
                                        <p>{question.upVotes - question.downVotes}</p>
                                        <img src={downVote} alt="downVote" width="30" className="votes-icon"/>
                                    </div>
                                    <div style={{width:"100%"}}>
                                        <p className="question-body">{question.questionBody}</p>
                                        <div className="question-details-tags">
                                            {
                                                question.questionTags.map((tags) => (
                                                    <p key={tags}>{tags}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="question-actions-user">
                                            <div>
                                                <button type="button">Share</button>
                                                <button type="button">Delete</button>
                                            </div>
                                            <div>
                                                <p>asked {question.askedOn}</p>
                                                <Link to={`/User/${question.userId}`} className="user-link" style={{color:"#0086d8"}}>
                                                    <Avatar>{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section>
                            {
                                question.noOfAnswers !==0 && (
                                    <section>
                                        <h3>{question.noOfAnswers} answers</h3>
                                        <DisplayAnswer key={question._id} question={question}/>
                                    </section>
                                )
                            }
                            </section>
                            <section className="post-ans-container">
                                <h3>Your Answer</h3>
                                <form>
                                    <textarea cols="30" rows="10"></textarea><br/>
                                    <input type="submit" className="post-ans-btn" value="Post Your Answer"/>
                                </form>
                                <p>Browser other questions tagged 
                                    {
                                    question.questionTags.map((tag)=>(
                                        <Link to='/Tags' key={tag} className="ans-tags"> {tag} </Link>
                                    ))}
                                    or&ensp;
                                    <Link to="/AskQuestion" style={{textDecoration:"none",color:"#009dff"}}>ask your own question.</Link></p>
                            </section>
                        </div>
                    ))
                }
                </>
            }
        </div>
    )
}

export default QuestionDetails