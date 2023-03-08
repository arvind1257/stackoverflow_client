import React from "react";
import chatbot from '../../assests/chatbot1.jpg'
import moment from "moment"
import copy from "copy-to-clipboard"
import Avatar from "../../components/Avatar/Avatar";

const ChatMessage = ({message,User}) =>{
    const mess1 = message.mess.split('\n');
    const handleCopy = (message) =>{
        copy(message)
    }
    return (
        <>
        {
                message.type==="bot" ? 
                <div key={message.no} className="chatbot-message-1">
                    <div className="bot-avatar">
                        <img src={chatbot} alt="" width="55"/>
                    </div>
                    <div className="bot-message">
                        <div>
                        {
                            mess1.length>=1 && mess1.map((item)=>(
                                <>{item}<br/></>
                            )
                        )}
                        </div>
                        <div className="bot-message-control">
                            <button onClick={()=>handleCopy(message.mess)} type="button" className="bot-control-btn">Copy</button>
                            <div>{moment(message.time).fromNow()}</div>
                        </div>
                    </div>
                </div> : 
                <div key={message.no} className="chatbot-message-2">
                    <div className="user-message">
                        <p style={{marginTop:"revert",marginBottom:"revert"}}>{message.mess}</p>
                    </div>
                    <div className="user-avatar">
                        <Avatar backgroundColor="orange" px="15px" py="5px" color="white" fontSize="30px" borderRadius="50%" cursor="pointer">{User.name.charAt(0).toUpperCase()}</Avatar>
                    </div>
                </div>
        }
        </>
    )
}

export default ChatMessage