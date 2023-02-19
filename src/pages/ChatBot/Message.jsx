import React, {useState}  from "react";
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import ReactScrollableFeed from "react-scrollable-feed"
import { useDispatch, useSelector } from "react-redux";
import { chatbot } from "../../actions/chatbot.js"
const Message = ({user}) =>{
    const [message , setMessage] = useState('');
    const dispatch = useDispatch();
    const [Chat,setChat] = useState(JSON.parse(localStorage.getItem('chat')))
    const botAnswer = useSelector((state)=> state.chatbotReducer)
    const User = user;
    if(Chat===null)
    {
        setChat({
            id:user._id,
            message:[{
                no:1,
                status:"welcome",
                type:"bot",
                mess:"Welcome to StackOverflow ChatBot.",
            },{
                no:2,
                status:"otp code",
                type:"bot",
                mess:"An OTP is send to your registered mail id", 
            }],
        })
    }
    if(!localStorage.getItem('otp')){
        localStorage.setItem('otp',Math.floor(Math.random() * (999999 - 100000 + 1) + 100000))
    }
    const handleSubmit = () =>{
        let content = Chat
        if(Chat.message[Chat.message.length-1].type==="bot" && Chat.message[Chat.message.length-1].status==="otp code"){
            content.message.push({
                no:Chat.message.length+1,
                status:"otp code",
                type:"user",
                mess:message
            })
            setChat(content)
            localStorage.setItem('chat',JSON.stringify(content))
        }
        if(Chat.message[Chat.message.length-1].type==="bot" && Chat.message[Chat.message.length-1].status==="questions"){
            content.message.push({
                no:Chat.message.length+1,
                status:"questions",
                type:"user",
                mess:message
            })
            setChat(content)
            localStorage.setItem('chat',JSON.stringify(content))
            dispatch(chatbot({input:message}))
        }
        setMessage('');
    }

    if(Chat!==null && Chat.message[Chat.message.length-1].type==="user" && Chat.message[Chat.message.length-1].status==="otp code"){
        let content = Chat
        if(Chat.message[Chat.message.length-1].mess===localStorage.getItem('otp')){
            content.message.push({
                no:Chat.message.length+1,
                status:"questions",
                type:"bot",
                mess:"Thank You for verifing, Now you can ask me the questions"
            })
        }
        else{
            content.message.push({
                no:Chat.message.length+1,
                status:"otp code",
                type:"bot",
                mess:"Invalid OTP, Try Again"
            })
        }
        setChat(content)
        localStorage.setItem('chat',JSON.stringify(content))
    }
    if(botAnswer!==null && Chat!==null && Chat.message[Chat.message.length-1].type==="user" && Chat.message[Chat.message.length-1].status==="questions")
    {
        let content = Chat
        content.message.push({
            no:Chat.message.length+1,
            status:"questions",
            type:"bot",
            mess:botAnswer.bot.trim()
        })
        dispatch({type:"CLEAR_ANSWER",payload:null})
        setChat(content)
        localStorage.setItem('chat',JSON.stringify(content))
    }
    console.log(botAnswer)
    return (
        <div className="chatbot-container-1">
            <form>
            <div id="chatbot-container-2" className="chatbot-container-2">
            <ReactScrollableFeed>
            { 
            Chat!==null && Chat.message.map((message) => ( 
                <ChatMessage message={message} User={User}/>     
            ))
            }
            </ReactScrollableFeed>
            </div>
            <div className="chatbot-input">
                <textarea name="input" value={message} onChange={(e) => setMessage(e.target.value)} rows="1" cols="50" className="chatbot-input"></textarea>
                <button type="button" onClick={handleSubmit}>
                    <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </div>
            </form>
        </div>
    )
}

export default Message