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
import randomColor from "randomcolor";

const QuestionDetails = () => {

    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [answer,setAnswer] = useState('')
    const User = useSelector(state => state.currentUserReducer);
    const questionsList = useSelector(state => state.questionReducer);
    var colors = []
    if(questionsList.data!==null && colors.length===0){
        questionsList.data.filter((question) => question._id===id).map((question)=>{
            colors.push({
                id:question.userId,
                color:randomColor({luminosity: 'dark'})
            })
            if(question.answer!==null){
                question.answer.map((items)=>{
                    if(colors.filter((item)=>item.id===items.userId).length===0){
                        colors.push({
                            id:items.userId,
                            color:randomColor({luminosity: 'dark'})
                        })
                    }
                    return true;
                })
            }
            return true;
        })
    }

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
        if(User!==null)
        dispatch(voteQuestion({id:id,vote:'upVote',userId:User._id},navigate))
        else
        alert("Kindly login first to vote the question")
    }

    const handleDownVote = () => {
        if(User!==null)
        dispatch(voteQuestion({id:id,vote:'downVote',userId:User._id},navigate))
        else
        alert("Kindly login first to vote the question")
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
                                                {
                                                colors.filter((item)=>item.id===question.userId).map((item)=>(    
                                                <Link to={`/Users/${question.userId}`} className="user-link" style={{color:"#0086d8"}}>
                                                    <Avatar backgroundColor={item.color} px="10px" py="7px" color="white" borderRadius="50%" cursor="pointer">
                                                        {question.userPosted.charAt(0).toUpperCase()}
                                                    </Avatar>
                                                    <div>
                                                        {question.userPosted}
                                                    </div>
                                                </Link>
                                                ))
                                                }
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
                                        <DisplayAnswer colors={colors} key={question._id} question={question}/>
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
                                        <Link key={tag} className="ans-tags"> {tag} </Link>
                                    ))}
                                    or&ensp;
                                    {
                                        User!==null ? 
                                    <Link to="/AskQuestion" style={{textDecoration:"none",color:"#009dff"}}>ask your own question.</Link>
                                    :
                                    <span style={{color:"#009dff",cursor:"pointer"}} onClick={()=>alert('Kindly login to ask questions')}>ask your own question.</span>
                                    }
                                </p>
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