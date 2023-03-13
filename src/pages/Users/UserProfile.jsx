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
import { requestSend,requestDelete, requestAccept,requestRemove } from "../../actions/request";
import { HOME2 } from "../../components/StyledComponent";


const UserProfile = ({sideBar}) =>{
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

    const handleRemove = (fromId) =>{
        dispatch(requestRemove({fromId,toId:id}));         
    }
    
    return(
        <div className="home-container-1">
            <LeftSidebar sideBar={sideBar}/>
            <HOME2 className="home-container-2">
                {
                Users.data!==null && Users.data.filter((user)=>{return user._id===id}).map((user) =>(
                    <section key={user._id}>
                        <div className="user-details-container">
                        <div className="user-details">
                            <Avatar backgroundColor="purple" color="white" fontSize="50px" px="40px" py="25px" borderRadius="0%">
                                {user.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div className="user-name">
                                <h1 style={{fontWeight:"bold",fontSize:"1.5em",marginTop:"revert",marginBottom:"revert"}}>{user.name}</h1>
                                <p><FontAwesomeIcon icon={faBirthdayCake} /> joined {moment(user.joinedOn).fromNow()}</p>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column"}}>
                            {
                            currentUser!==null && currentUser._id===id && (
                              
                                        <button onClick={() => {Switch ? setSwitch(false) : setSwitch(true)}} className="edit-profile-btn">
                                            <FontAwesomeIcon icon={Switch ? faTimes : faPen}/>&nbsp;{
                                                Switch ? <>Cancel Edit</> : <>Edit Profile</>
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
                                        <button onClick={() => handleRemove(currentUser._id)} className="edit-profile-btn">
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
                            Switch ? <EditProfileForm currentUser={currentUser}/>
                            : <ProfileBio currentProfile={user}/>
                        }
                        </>
                    </section>
                )) 
                }
                
            </HOME2>
        </div>
    )
}

export default UserProfile