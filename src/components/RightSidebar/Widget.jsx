import React from "react";
import message from "../../assests/message-solid.svg"
import pen from "../../assests/pen-solid.svg"
import blacklogo from "../../assests/blackicon.png"
import "./RightSidebar.css"

const Widget = () => {
    return (
        <div className="widget">
            <h4>The Overflow Blog</h4>
            <div className="right-sidebar-div-1">
                <div className="right-sidebar-div-2">
                    <img src={pen} alt="pen" width="15"/>
                    <p>Observability is key to the futture of software (and your DevOps career)</p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={pen} alt="pen" width="15"/>
                    <p>Podcast 374: How valuable is your screen name?</p>
                </div>
            </div>
            <h4>Featured on Meta</h4>
            <div className="right-sidebar-div-1">
                <div className="right-sidebar-div-2">
                    <img src={message} alt="message" width="15"/>
                    <p>Review queue workflows - Final release....</p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={message} alt="message" width="15"/>
                    <p>Please welcome Valued Associates: #958 - V2Blast #959 - SpencerG</p>
                </div>
                <div className="right-sidebar-div-2">
                    <img src={blacklogo} alt="blacklogo" width="15"/>
                    <p>Outdated Answers: accepted answer is now unpinned on Stack Overflow</p>
                </div>
            </div>
            

        </div>
    )
}

export default Widget;