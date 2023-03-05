import React, {useState}  from "react";
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import ReactScrollableFeed from "react-scrollable-feed"
import { useDispatch, useSelector } from "react-redux";
import { chatbot } from "../../actions/chatbot.js"
import emailjs from '@emailjs/browser';

const Message = ({user,forms}) =>{
    const [message , setMessage] = useState('');
    const dispatch = useDispatch();
    const [Chat,setChat] = useState(JSON.parse(localStorage.getItem('chat')))
    const botAnswer = useSelector((state)=> state.chatbotReducer)
    const User = user;
    const otp = User.otp
    var status = null
    if(forms && Chat===null && status===null)
    {
        var content = {
            id:user._id,
            message:[{
                no:1,
                status:"welcome",
                type:"bot",
                mess:"Welcome to StackOverflow ChatBot.",
                time:Date(),
            },{
                no:2,
                status:"otp code",
                type:"bot",
                mess:"An OTP is send to your registered mail id", 
                time:Date(),
            }],
        }
        emailjs.sendForm('service_tk3cy9c', 'template_1uu9lqq', forms, 'AQ9a1JbB6NtWIgVHd')
        .then((result) => {
            console.log(result.text);
            status=result.text;
        }, (error) => {
            alert(error.text);
        });
        console.log("EMAIL SENT")
        localStorage.setItem('chat',JSON.stringify(content))
        setChat(content)
    }
    const handleSubmit = () =>{
        let content = Chat
        if(Chat.message[Chat.message.length-1].type==="bot" && Chat.message[Chat.message.length-1].status==="otp code"){
            content.message.push({
                no:Chat.message.length+1,
                status:"otp code",
                type:"user",
                mess:message,
                time:Date(),
            })
            setChat(content)
            localStorage.setItem('chat',JSON.stringify(content))
        }
        if(Chat.message[Chat.message.length-1].type==="bot" && Chat.message[Chat.message.length-1].status==="questions"){
            content.message.push({
                no:Chat.message.length+1,
                status:"questions",
                type:"user",
                mess:message,
                time:Date(),
            })
            setChat(content)
            localStorage.setItem('chat',JSON.stringify(content))
            dispatch(chatbot({input:message}))
        }
        setMessage('');
    }
    if(Chat!==null && Chat.message[Chat.message.length-1].type==="user" && Chat.message[Chat.message.length-1].status==="otp code"){
        let content = Chat
        if(Chat.message[Chat.message.length-1].mess==otp){
            content.message.push({
                no:Chat.message.length+1,
                status:"questions",
                type:"bot",
                mess:"Thank You for verifing, Now you can ask me the questions",
                time:Date(),
            })
        }
        else{
            content.message.push({
                no:Chat.message.length+1,
                status:"otp code",
                type:"bot",
                mess:"Invalid OTP, Try Again",
                time:Date(),
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
            mess:botAnswer.bot.trim(),
            time:Date(),
        })
        dispatch({type:"CLEAR_ANSWER",payload:null})
        setChat(content)
        localStorage.setItem('chat',JSON.stringify(content))
    }
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