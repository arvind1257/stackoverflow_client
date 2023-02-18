import React from "react";
import chatbot from '../../assests/chatbot1.jpg'

const ChatMessage = ({message,User}) =>{
    const mess1 = message.mess.split('\n');
    return (
        <>
        {
                message.type==="bot" ? 
                <div key={message.no} className="chatbot-message-1">
                    <div className="bot-avatar">
                        <img src={chatbot} alt="" width="55"/>
                    </div>
                    <div className="bot-message">
                        {
                            mess1.length>=1 && mess1.map((item)=>(
                                <>{item}<br/></>
                            )
                        )}
                    </div>
                </div> : 
                <div key={message.no} className="chatbot-message-2">
                    <div className="user-message">
                        <p>{message.mess}</p>
                    </div>
                    <div className="user-avatar">
                        <h2>{User.name.charAt(0).toUpperCase()}</h2>
                    </div>
                </div>
        }
        </>
    )
}

export default ChatMessage