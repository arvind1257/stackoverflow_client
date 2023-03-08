import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import QuestionDetails from "./QuestionDetails"
import { HOME2 } from "../../components/StyledComponent";

const DisplayQuestion = () =>{
    return (
        <div className="home-container-1">
            <LeftSidebar/>
            <HOME2 className="home-container-2">
                <QuestionDetails/>
            </HOME2>
        </div>
    )
}

export default DisplayQuestion