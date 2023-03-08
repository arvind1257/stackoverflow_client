import React from "react";
import { NavLink } from "react-router-dom"
import {useSelector} from "react-redux"
import "./LeftSidebar.css";
import Globe from "../../assests/favicon.ico";
import post from "../../assests/POSTS.png"
import userIcon from "../../assests/users_icon.png"
import { LEFTBAR } from "../StyledComponent";
const LeftSidebar = () =>{

    const currentUser = useSelector((state)=>state.currentUserReducer)

    return(
        <LEFTBAR id="left-main" className="left-sidebar">
            <div className="side-nav">
                <NavLink to='/' className='side-nav-links' activeclass="active">
                    <p>Home</p>
                </NavLink>
                {
                    currentUser!==null ? 
                    <NavLink to='/Friends' className='side-nav-links' activeclass="active"> 
                        <p>Friends</p>
                    </NavLink>
                    :<></>
                }
                
                <div className="side-nav-div">
                    <div><p>Public</p></div>
                    <NavLink to="/Questions" className='side-nav-links' activeclass="active">
                        <img src={Globe} alt="Globe" width="30"/>
                        <p style={{paddingLeft:"10px"}}> Questions</p>
                    </NavLink>
                    <NavLink to='/Posts' className='side-nav-links' style={{paddingLeft:"15px"}} activeclass="active">
                        <img src={post} alt="Globe" width="20"/>
                        <p style={{paddingLeft:"15px"}}> Posts</p>
                    </NavLink>
                    <NavLink to='/Users' className='side-nav-links' style={{paddingLeft:"15px"}} activeclass="active">
                        <img src={userIcon} alt="Globe" width="20"/> 
                        <p style={{paddingLeft:"15px"}}> Users</p>
                    </NavLink>
                </div>
            </div>
        </LEFTBAR>
    )
}

export default LeftSidebar;