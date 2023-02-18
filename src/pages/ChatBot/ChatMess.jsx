import React, { useRef } from "react";

import chatbot from '../../assests/chatbot1.jpg'


const ChatMess = ({message}) => {
    const div = useRef()
    var querySelector1
    function typeText(element, text) {
        let index = 0
        console.log(div)
        let interval = setInterval(() => {
            if (index < text.length) {
                element.innerHtml += text.charAt(index)
                index++
            } else {
                clearInterval(interval)
            }
        }, 20)
    }
    console.log(message.mess)
    return (
        <>
        <div key={message.no} className="chatbot-message-1">
            <div className="bot-avatar">
                <img src={chatbot} alt="" width="55"/>
            </div>
            <div rel={div} className="bot-message" id={"div"+message.no}></div>
        </div>
        {typeText(querySelector1, message.mess)}
        </>
    )
}

export default ChatMess