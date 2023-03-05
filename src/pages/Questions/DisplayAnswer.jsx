import React from "react";
import { useParams,Link, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar"
import "./Questions.css"
import moment from "moment";
import copy from "copy-to-clipboard"
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnswer } from "../../actions/question.js"; 

const DisplayAnswer = ({colors,question}) =>{
    
    const { id } = useParams()
    const dispatch = useDispatch() 
    const navigate = useNavigate()
    const location = useLocation()
    const url = location.pathname
    const User = useSelector(state => state.currentUserReducer)

    const handleShare = () => {
        copy("http://localhost:3000"+url)
        alert("Copied Url : http://localhost:3000"+url)
    }

    const handleDelete = (answerId,noOfAnswers) => {
        dispatch(deleteAnswer({id,answerId,noOfAnswers:noOfAnswers-1}),navigate)
    }

    return (
        <div>
            {
                question.answer.map((ans) => (
                    <div className="display-ans" key={ans._id}>
                        <p>{ans.answerBody}</p>
                        <div className="question-actions-user">
                            <div>
                                <button type="button" onClick={handleShare}> Share</button>
                                {
                                User?._id === ans?.userId && (
                                     <button type="button" onClick={() => handleDelete(ans._id,question.noOfAnswers)}>Delete</button>
                                )}
                            </div>
                            <div>
                                <p>answered {moment(ans.answeredOn).fromNow()}</p>
                                {
                                colors!==null && colors.filter((item) => item.id===ans.userId).map((item)=>(   
                                <Link to={`/Users/${ans.userId}`} className="user-link" style={{color:"#0086d8"}}>
                                    <Avatar backgroundColor={item.color} px="10px" py="7px" color="white" borderRadius="50%" cursor="pointer">{ans.userAnswered.charAt(0).toUpperCase()}</Avatar>
                                    <div>
                                        {ans.userAnswered}
                                    </div>
                                </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayAnswer