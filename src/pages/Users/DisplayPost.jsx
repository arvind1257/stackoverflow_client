import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { postDelete, setPostlikes } from "../../actions/posts";
const DisplayPost = ({post}) =>{
    const currentUser = useSelector((state)=>state.currentUserReducer)
    const dispatch = useDispatch()

    const handleLikes = (id,type) => {
        dispatch(setPostlikes({_id:id,type:type,userId:currentUser._id}))
    }

    const handleDelete = (id) => {
        dispatch(postDelete(id))
    }

    return (
        <div className="Post-container">
            <div className="image-container">{post.file}</div>
            <div className="text-container">{post.content}</div>
            <div className="control-container">
            <div className="control-container-2">
                <div className="post-controls">
                    <div className="post-count">{
                        post.like.length ? <>{post.like.length}</>:<>0</>
                    }</div>&nbsp;
                    <button onClick={()=>handleLikes(post._id,"like")} className="post-like-button">
                        <FontAwesomeIcon color="green" 
                        icon={
                            post.like.filter((id) =>{return id===currentUser._id}).length!==0 ? solid.faThumbsUp : regular.faThumbsUp
                        }/>
                        </button>
                </div>
                <div className="post-controls">
                    <div className="post-count">{
                        post.disLike.length ? <>{post.disLike.length}</>:<>0</>
                    }</div>&nbsp;
                    <button onClick={()=>handleLikes(post._id,"disLike")} className="post-like-button">
                        <FontAwesomeIcon color="red" 
                        icon={
                            post.disLike.filter((id) =>{return id===currentUser._id}).length!==0 ? solid.faThumbsDown : regular.faThumbsDown
                        }/>
                    </button>
                </div>
                <button className="post-controls post-delete-button">
                    <FontAwesomeIcon color="#009dff" icon={solid.faShareAlt} />&ensp;Share
                </button>
                {
                    post.userId===currentUser._id && 
                    <button onClick={()=>handleDelete(post._id)} className="post-controls post-delete-button">
                        <FontAwesomeIcon color="red" icon={regular.faTrashAlt}/>&ensp;Delete
                    </button>
                }
                
            </div>
            <div>posted&nbsp;{moment(post.postedOn).fromNow()}</div>
            </div>
        </div>
    )
}

export default DisplayPost; 