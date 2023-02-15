import React from "react";
import { useSelector } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { Link } from "react-router-dom";
import "./Users.css"
const Users = () =>{
    const Users = useSelector((state) => state.authReducer)
    return (
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2" style={{marginTop:"40px"}}>
                <h1 style={{fontWeight:"500"}}>Users</h1>
                <div className="userList-container">
                {
                    Users.data ? Users.data.map((user) => (
                        <Link to={`/Users/${user._id}`} className="user-profile-link">
                            <h3>{user.name.charAt(0).toUpperCase()}</h3>
                            <h5>{user.name}</h5>
                        </Link>
                    )) : <h1>Loading....</h1>
                }
                </div>
            </div>
        </div>
    )
}

export default Users