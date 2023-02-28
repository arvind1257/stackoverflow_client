import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBirthdayCake, faPen, faTimes, faCheck } from "@fortawesome/free-solid-svg-icons"
import moment from "moment";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";
import { requestSend,requestDelete, requestAccept } from "../../actions/request";



const UserProfile = () =>{
    const {id} = useParams() 
    const Users = useSelector((state) => state.authReducer)
    const currentUser = useSelector((state) => state.currentUserReducer)
    const requestList = useSelector((state) => state.friendRequestReducer)
    const [Switch,setSwitch] = useState(false)
    const dispatch = useDispatch()

    const handleFriend = (fromId,toId) => {
        dispatch(requestSend({fromId,toId,status:"Request"}))
    }

    const handleRequest = () =>{
        requestList.data.filter((item) => item.toId===id).map((item) => {
            dispatch(requestDelete(item._id));   
            return true;
        })  
    }

    const handleRequest1 = () =>{
        requestList.data.filter((item) => item.fromId===id).map((item) => {
            dispatch(requestDelete(item._id));   
            return true;
        })      
    }

    const handleAccept = () =>{
        requestList.data.filter((item) => item.fromId===id).map((item) => {
            dispatch(requestAccept({_id:item._id,fromId:item.fromId,toId:item.toId}));   
            return true;
        })      
    }
    
    return(
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2">
                {
                Users.data!==null && Users.data.map((user) =>(
                    user._id===id ? 
                    <section>
                        <div className="user-details-container">
                        <div className="user-details">
                            <Avatar>
                                {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1>{user.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> joined {moment(user.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            {
                            currentUser!==null && currentUser._id===id && (
                                <button onClick={() => setSwitch(!Switch)} className="edit-profile-btn">
                                    {
                                        Switch ? (<>
                                            <FontAwesomeIcon icon={faTimes}/> Cancel Edit
                                        </>) : (<>
                                            <FontAwesomeIcon icon={faPen}/> Edit Profile
                                        </>)
                                    }
                                </button>
                            )    
                            }
                            {
                                currentUser!==null && currentUser._id!==id && (
                                    <>
                                    {
                                        requestList!==null && requestList.data.filter((item) => item.fromId===id).length >=1 ? 
                                        <><button onClick={() => handleAccept()} className="edit-profile-btn">
                                            <FontAwesomeIcon icon={faCheck}/> Accept Request
                                        </button>
                                        <button onClick={() => handleRequest1()} className="edit-profile-btn">
                                            <FontAwesomeIcon icon={faTimes}/> Reject Request
                                        </button></>    
                                        :   
                                        <>
                                        {
                                        requestList!==null && requestList.data.filter((item) => item.toId===id).length >=1 ? 
                                        <button onClick={() => handleRequest()} className="edit-profile-btn">
                                            <FontAwesomeIcon icon={faTimes}/> Cancel Request
                                        </button>
                                        :   
                                        <>
                                        {
                                        currentUser.friends.filter((user) => user.userId===id).length>=1 ? <>{
                                        <button onClick={() => handleFriend(currentUser._id,user._id)} className="edit-profile-btn">
                                            <FontAwesomeIcon icon={faTimes}/> Remove Friend
                                        </button>
                                        }
                                        </>
                                        :
                                        <button onClick={() => handleFriend(currentUser._id,user._id)} className="edit-profile-btn">
                                            <FontAwesomeIcon icon={faPen}/> Add Friend
                                        </button>
                                        }
                                        
                                        </>
                                    }</>
                                }
                                    </>
                                )    
                            }
                        </div>
                        </div>
                        <>
                        {
                            Switch ? (
                                <EditProfileForm currentUser={currentUser}/>
                            ) : (
                                <ProfileBio currentProfile={user}/>
                            )
                        }
                        </>
                    </section>
                    : <></>
                )) 
                }
                
            </div>
        </div>
    )
}

export default UserProfile