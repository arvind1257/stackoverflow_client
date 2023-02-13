import React from "react";
import { NavLink } from "react-router-dom"
import "./LeftSidebar.css";
import Globe from "../../assests/favicon.ico";

const LeftSidebar = () =>{
    return(
        <div className="left-sidebar">
            <div className="side-nav">
                <NavLink to='/' className='side-nav-links' activeClassName="active">
                    <p>Home</p>
                </NavLink>
                <div className="side-nav-div">
                    <div><p>Public</p></div>
                    <NavLink to="/Questions" className='side-nav-links' activeClassName="active">
                        <img src={Globe} alt="Globe" width="30"/>
                        <p style={{paddingLeft:"10px"}}> Questions</p>
                    </NavLink>
                    <NavLink to='/Posts' className='side-nav-links' style={{paddingLeft:"40px"}} activeClassName="active">
                        <p style={{paddingLeft:"10px"}}> Posts</p>
                    </NavLink>
                    <NavLink to='/Users' className='side-nav-links' style={{paddingLeft:"40px"}} activeClassName="active"> 
                        <p style={{paddingLeft:"10px"}}> Users</p>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar;