import React, { useState } from "react";
import { useParams,Link, useNavigate, useLocation } from "react-router-dom";
import upVote from "../../assests/caret-up.svg"
import downVote from "../../assests/caret-down.svg"
import "./Questions.css"
import moment from "moment"
import Avatar from "../../components/Avatar/Avatar"
import DisplayAnswer from "./DisplayAnswer";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuestion, postAnswer, voteQuestion } from "../../actions/question";
import copy from "copy-to-clipboard"

const QuestionDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [answer,setAnswer] = useState('')
    const User = useSelector(state => state.currentUserReducer);
    const questionsList = useSelector(state => state.questionReducer);

    const handleSubmit = (e,answerLength) =>{
        e.preventDefault();
        if(User !== null)
        {
            if(!answer){
                alert("Answer can't be empty");
            }
            else{
                dispatch(postAnswer(id,{noOfAnswers:answerLength+1,answerBody:answer,userAnswered: User.name,userId:User._id },navigate));
                setAnswer('');
            }
        }
        else{
            alert('Login or Signup to answer a question')
            navigate('/Auth')
        }
    }

    const location = useLocation()
    const url = location.pathname
    const handleShare = () => {
        copy("http://localhost:3000"+url)
        alert("Copied Url : http://localhost:3000"+url)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id,navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion({id:id,vote:'upVote',userId:User._id},navigate))
    }

    const handleDownVote = () => {
        dispatch(voteQuestion({id:id,vote:'downVote',userId:User._id},navigate))
    }

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
                                        <img src={upVote} alt="upVote" width="30" className="votes-icon" onClick={handleUpVote}/>
                                        {console.log(question.upVote.length - question.downVote.length)}
                                        <p>{question.upVote.length - question.downVote.length}</p>
                                        <img src={downVote} alt="downVote" width="30" className="votes-icon" onClick={handleDownVote}/>
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
                                                <button onClick={handleShare} >Share</button>
                                                {
                                                    User?._id === question?.userId && (
                                                        <button type="button" onClick={handleDelete}>Delete</button>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p>asked {moment(question.askedOn).fromNow()}</p>
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
                                <form onSubmit={(e) => handleSubmit(e,question.answer.length)}>
                                    <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} cols="30" rows="10"></textarea><br/>
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