import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import moment from "moment"
import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"
import { useDispatch, useSelector } from "react-redux";
import { postDelete, setPostlikes } from "../../actions/posts";
import copy from "copy-to-clipboard"
import { CONTROL } from "../../components/StyledComponent";

const DisplayPost = ({post}) =>{
    const currentUser = useSelector((state)=>state.currentUserReducer)
    const dispatch = useDispatch()

    const handleLikes = (id,type) => {
        if(currentUser!==null)
        dispatch(setPostlikes({_id:id,type:type,userId:currentUser._id}))
        else
        alert('Kindly login first to like or dislike the post')
    }

    const handleDelete = (id) => {
        dispatch(postDelete(id))
    }

    const handleShare = () => {
        //copy("http://localhost:3000/post/"+post._id)
        //alert("Copied Url : http://localhost:3000/post/"+post._id)
        copy("https://my-stackoverflow-clone.netlify.app/post/"+post._id)
        alert("Copied Url : https://my-stackoverflow-clone.netlify.app/post/"+post._id)
    }

    return (
        <div className="Post-container">
            <div className="image-container">
                {
                post.fileType!=="video/mp4" ? 
                <img style={{maxWidth:"100%"}} className="previewimg" src={`https://drive.google.com/uc?export=view&id=${post.file}`} alt="UploadImage" /> 
                :
                <video preload="auto" controls style={{maxWidth:"100%"}} >
                    <source src={`https://drive.google.com/uc?export=view&id=${post.file}`}></source>
                </video>
                }
            </div>
            <div className="text-container">{post.content}</div>
            <CONTROL className="control-container">
                <div className="control-container-2">
                    <div className="post-controls">
                        <div className="post-count">{
                            post.like.length ? <>{post.like.length}</>:<>0</>
                        }</div>&nbsp;
                        <button onClick={()=>handleLikes(post._id,"like")} className="post-like-button">
                            <FontAwesomeIcon color="green" 
                            icon={
                                currentUser!==null && post.like.filter((id) =>{return id===currentUser._id}).length!==0 ? solid.faThumbsUp : regular.faThumbsUp
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
                                currentUser!==null && post.disLike.filter((id) =>{return id===currentUser._id}).length!==0 ? solid.faThumbsDown : regular.faThumbsDown
                            }/>
                        </button>
                    </div>
                    <button onClick={handleShare} className="post-controls post-delete-button">
                        <FontAwesomeIcon color="#009dff" icon={solid.faShareAlt} />&ensp;Share
                    </button>
                    {
                        currentUser!==null && post.userId===currentUser._id && 
                        <button onClick={()=>handleDelete(post._id)} className="post-controls post-delete-button">
                            <FontAwesomeIcon color="red" icon={regular.faTrashAlt}/>&ensp;Delete
                        </button>
                    }
                </div>
                <div>
                    posted&nbsp;{moment(post.postedOn).fromNow()}
                </div>
            </CONTROL>
        </div>
    )
}

export default DisplayPost; 