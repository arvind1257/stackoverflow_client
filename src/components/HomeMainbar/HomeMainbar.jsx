import React from "react";
import {useLocation, useNavigate } from "react-router-dom";
import QuestionList from "./QuestionList.jsx";
import { useSelector } from "react-redux"

import "./HomeMainbar.css";

const HomeMainbar = ({searchData}) =>{
    const questionsList = useSelector(state => state.questionReducer);
    const location = useLocation()
    const user = useSelector(state => state.currentUserReducer)
    const navigate = useNavigate();

    const redirect = () =>{
        if(user===null){
            alert("login or signup to ask a question")
            navigate('/Auth')
        }
        else{
            if(user.Questions.noOfPost>0 || user.Questions.noOfPost===-1){
                navigate('/AskQuestion')
            }
            else{
                alert('You have crossed you limit today.\nYou can post the questions from tomorrow\nor else,You can subscribe to higher subscription\n')
            }
            
        }
        
    }
    return(
        <div className="main-bar">
            <div className="main-bar-header">
                { location.pathname==='/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>}
                
                <button onClick={() => redirect()} className="ask-btn">Ask Question</button>
            </div>
            <div>
                {
                    questionsList.data === null ?
                    <h1>Loading...</h1> : 
                    <>
                        <p>{ questionsList.data.filter((item)=> item.questionTitle.toLowerCase().includes(searchData.toLowerCase())).length } questions</p>
                        <QuestionList questionsList={questionsList.data.filter((item)=> item.questionTitle.toLowerCase().includes(searchData.toLowerCase()))} />
                    </>
                }
            </div>
        </div>
    )
}

export default HomeMainbar;