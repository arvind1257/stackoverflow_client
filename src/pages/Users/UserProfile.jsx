import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../../components/Avatar/Avatar";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBirthdayCake, faPen, faTimes } from "@fortawesome/free-solid-svg-icons"
import moment from "moment";
import EditProfileForm from "./EditProfileForm";
import ProfileBio from "./ProfileBio";

const UserProfile = () =>{
    const {id} = useParams() 
    const Users = useSelector((state) => state.authReducer)
    const currentUser = useSelector((state) => state.currentUserReducer)
    const [Switch,setSwitch] = useState(false)
    
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