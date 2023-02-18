import React from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import { useSelector } from "react-redux"
import Message from "./Message"; 

import "./chatBot.css";


const ChatBot = () =>{
    
    const Chat = JSON.parse(localStorage.getItem('chat'));
    const User = useSelector(state => state.currentUserReducer)

    return (
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2">
                {
                    User && <Message chat={Chat} user={User}/>
                }
            </div>
        </div>
    )
}

export default ChatBot