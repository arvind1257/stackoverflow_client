import React,{ useRef } from "react";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import { useSelector } from "react-redux"
import Message from "./Message"; 
import { useLocation } from "react-router-dom"

import "./chatBot.css";


const ChatBot = () =>{
    const form = useRef();
    const location = useLocation()
    const User = useSelector(state => state.currentUserReducer)
    console.log(User)
    return (
        <div className="home-container-1">
            <LeftSidebar/>
            { User!==null && <>
            <form ref={form}>
                <input type="hidden" name="user_name" value={User.name}/>
                <input type="hidden" name="user_email" value={User.email}/>
                <input type="hidden" name="otp" id='otp' value={location.state.otp}/>
            </form>
            <div className="home-container-2">
                {
                    User && <Message user={User} form={form.current}/>
                }
            </div>
            </>}
            
        </div>
    )
}

export default ChatBot