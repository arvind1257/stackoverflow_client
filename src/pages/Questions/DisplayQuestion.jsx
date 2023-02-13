import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import QuestionDetails from "./QuestionDetails"

const DisplayQuestion = () =>{
    return (
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2">
                <QuestionDetails/>
            </div>
        </div>
    )
}

export default DisplayQuestion