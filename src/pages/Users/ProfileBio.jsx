import React from "react";
import { useSelector } from "react-redux"
import "./Users.css"
import DisplayPost from "../Posts/DisplayPost"

const ProfileBio = ({currentProfile}) =>{
    const posts = useSelector((state)=>state.postsReducer)
    return (
        <div>
            <div>
            {
                currentProfile.tags.length>0 ? (
                    <>
                        <h4>Tags Watched</h4>
                        {
                            currentProfile.tags.map((tag) => (
                                <p key={tag}>{tag}</p>
                            ))
                        }
                    </>
                ) : (
                    <p>0 Tags Watched</p>
                )
            }
            </div>
            <div>
            {
                currentProfile.about ? (
                    <>
                        <h4>About</h4>
                        <p>{currentProfile.about}</p>
                    </>
                ) : (
                    <p>No bio found</p>
                )
            }
            </div>
            <div>
            <h4>Posts</h4>
            {
                posts && posts!==null ? Object.values(posts).filter((item)=>item.userId===currentProfile._id).length>=1 ? (
                    <>{
                        Object.values(posts).filter((item)=> item.userId===currentProfile._id).map((item)=>(
                            <DisplayPost key={item._id} post={item}/>
                        ))
                    }</>
                ) : (
                    <p>No Post Found</p>
                )
                :
                <h1>Loading....</h1>
            }
                
            </div>
        </div>
    )
}

export default ProfileBio