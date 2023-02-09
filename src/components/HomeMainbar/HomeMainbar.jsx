import React from "react";
import {Link, useLocation } from "react-router-dom";

import "./HomeMainbar.css";

const HomeMainbar = () =>{

    var questionsList = [{
        id:1,
        votes:3,
        noOfAnswers:2,
        questionTitle: "What is a function?",
        questionBody:"It meant to be",
        questionTags:["java","node js","react js","mongoose"],
        userPosted:"Arvind",
        askedOn:"Feb 1"
    },{
        id:2,
        votes:0,
        noOfAnswers:0,
        questionTitle: "What is a function?",
        questionBody:"It meant to be",
        questionTags:["javascript","python","R"],
        userPosted:"Arvind",
        askedOn:"Feb 1"
    },{
        id:1,
        votes:1,
        noOfAnswers:0,
        questionTitle: "What is a function?",
        questionBody:"It meant to be",
        questionTags:["angular","node js","express","mongoose"],
        userPosted:"Arvind",
        askedOn:"Feb 1"
    }]

    const location = useLocation()

    return(
        <div className="main-bar">
            <div className="main-bar-header">
                { location.pathname==='/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>}
                <Link to='AskQuestion' className="ask-btn">Ask Question</Link>
            </div>
            <div>
                {
                    questionsList === null ?
                    <h1>Loading...</h1> : 
                    <>
                    <p>{ questionsList.length } questions</p>
                    </>
                }
            </div>
        </div>
    )
}

export default HomeMainbar;