import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/auth";
import "./friends.css"
import Avatar from "../../components/Avatar/Avatar";
import { HOME2 } from "../../components/StyledComponent";
const Friends = ({sideBar}) =>{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
      },[dispatch])
    const Users = useSelector((state) => state.authReducer)
    const requestList = useSelector((state) => state.friendRequestReducer)
    const currentUser = useSelector((state) => state.currentUserReducer)
    return (
        <div className="home-container-1">
            <LeftSidebar sideBar={sideBar}/>
            <HOME2 className="home-container-2" style={{marginTop:"40px"}}>
                <h1 style={{fontWeight:"500",fontSize:"2em",marginTop:"revert",marginBottom:"revert"}}>Friend Request : </h1>
                <div className="friendList-container">
                {
                    currentUser!=null && Users.data && requestList!==null && Users.data.filter((user) => { if(requestList.data.filter((item) => item.fromId===user._id && user._id!==currentUser._id).length) return true; else return false;  }).length>=1 ? 
                    Users.data.map((user) => (<>
                        {
                            requestList.data.map((item) => (
                                <>
                                {
                                    user._id===item.fromId && user._id!==currentUser._id &&
                                    <Link key={user._id} to={`/Users/${user._id}`} className="friend-profile-link">
                                        <Avatar backgroundColor="#d3d3d3" px="13px" py="10px" color="black" borderRadius="50%" cursor="pointer" fontSize="18px" fontWeight="bolder">{user.name.charAt(0).toUpperCase()}</Avatar>
                                        <h5>{user.name}</h5>
                                    </Link>
                                }
                                </>
                            ))
                        }
                        </>)) : <h3 style={{fontWeight:"500",fontSize:"1.17em",marginTop:"revert",marginBottom:"revert"}}>No Request</h3>
                }    
                </div>
                <h1 style={{fontWeight:"500",fontSize:"2em",marginTop:"revert",marginBottom:"revert"}}>Friends : </h1>
                <div className="friendList-container">
                {
                    Users.data && currentUser!==null && currentUser.friends && 
                    Users.data.filter((user,i) => { 
                        if(currentUser.friends.filter((item,i) =>{return item.userId===user._id}).length) return true; 
                        else return false; 
                    }).length>=1 ? 
                    Users.data.map((user) => (<>
                        {
                            currentUser.friends.map((item) => (
                                <>
                                {
                                    user._id===item.userId && 
                                    <Link key={user._id} to={`/Users/${user._id}`} className="friend-profile-link">
                                        <Avatar backgroundColor="#d3d3d3" px="13px" py="10px" color="black" borderRadius="50%" cursor="pointer" fontSize="18px" fontWeight="bolder">{user.name.charAt(0).toUpperCase()}</Avatar>
                                        <h5>{user.name}</h5>
                                    </Link>
                                }
                                </>
                            ))
                        }
                        </>)) : <h3 style={{fontWeight:"500"}}>No Friends</h3>
                }    
                </div>
            </HOME2>
            
        </div>
    )
}

export default Friends