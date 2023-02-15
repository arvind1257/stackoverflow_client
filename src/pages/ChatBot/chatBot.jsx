import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"
 
const ChatBot = () =>{
    
    return (
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2">
                
            </div>
        </div>
    )
}

export default ChatBot