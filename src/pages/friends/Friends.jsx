import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/auth";
import "./friends.css"
const Friends = ({searchData}) =>{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
      },[dispatch])
    const Users = useSelector((state) => state.authReducer)
    const requestList = useSelector((state) => state.friendRequestReducer)
    const currentUser = useSelector((state) => state.currentUserReducer)
    return (
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2" style={{marginTop:"40px"}}>
                <h1 style={{fontWeight:"500"}}>Friend Request : </h1>
                <div className="friendList-container">
                {
                    Users.data && requestList!==null &&<>
                    {
                        console.log(Users.data.filter((user) => { if(requestList.data.filter((item) => item.fromId===user._id).length) return true; else return false;  }).length)
                    }
                    </>
                }
                {
                    Users.data && requestList!==null && Users.data.filter((user) => { if(requestList.data.filter((item) => item.fromId===user._id).length) return true; else return false;  }).length>=1 ? 
                    Users.data.map((user) => (<>
                        {
                            requestList.data.map((item) => (
                                <>
                                {
                                    user._id===item.fromId && 
                                    <Link to={`/Users/${user._id}`} className="friend-profile-link">
                                        <h3>{user.name.charAt(0).toUpperCase()}</h3>
                                        <h5>{user.name}</h5>
                                    </Link>
                                }
                                </>
                            ))
                        }
                        </>)) : <h3 style={{fontWeight:"500"}}>No Request</h3>
                }    
                </div>
                <h1 style={{fontWeight:"500"}}>Friends : </h1>
                <div className="friendList-container">
                {
                    Users.data && currentUser!==null ? Users.data.map((user) => (<>
                        {
                            currentUser.friends && currentUser.friends.map((item) => (
                                <>
                                {
                                    user._id===item.userId && 
                                    <Link to={`/Users/${user._id}`} className="friend-profile-link">
                                        <h3>{user.name.charAt(0).toUpperCase()}</h3>
                                        <h5>{user.name}</h5>
                                    </Link>
                                }
                                </>
                            ))
                        }
                        </>)) : <h3 style={{fontWeight:"500"}}>No Friends</h3>
                }    
                </div>
            </div>
            
        </div>
    )
}

export default Friends