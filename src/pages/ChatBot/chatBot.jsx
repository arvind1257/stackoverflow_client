import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import { useSelector } from "react-redux"
import Message from "./Message"; 
import { HOME2 } from "../../components/StyledComponent";
import "./chatBot.css";

const ChatBot = ({forms}) =>{
    const User = useSelector(state => state.currentUserReducer)
    return (
        <div className="home-container-1">
            <LeftSidebar/>  
            { 
            User!==null &&
            <HOME2 className="home-container-2">
            {
                User && <Message user={User} forms={forms}/>
            }
            </HOME2>
            }
            
        </div>
    )
}

export default ChatBot