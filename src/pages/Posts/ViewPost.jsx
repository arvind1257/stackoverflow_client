import React from "react";
import { useSelector } from "react-redux";
import {useParams} from "react-router-dom"
const ViewPost = () => {
    const {id} = useParams();
    const posts = useSelector((state)=>state.postsReducer)
    return (
        <div style={{width:"100%",marginTop:"60px",display:"flex",justifyContent:"center"}}>
        <div className="Post-container" style={{width:"70%"}}>
            {
                posts!==null && posts.filter((item)=>{return item._id===id}).length===1 && <>
                {
                     posts.filter((item)=>{return item._id===id}).map((post)=>(
                        post.fileType!=="video/mp4" ? 
                        
                            <img style={{maxWidth:"100%",WebkitUserSelect:"none",display:"block",margin:"auto",backgroundColor:"hsl(0, 0%, 90%)",transition:"background-color 300ms"}} className="previewimg" src={require('../../assests/posts/'+post.file)} alt="UploadImage" /> 
                            :
                            <video preload="auto" controls style={{maxHeight:"80vh",maxWidth:"100%"}} >
                                <source src={require('../../assests/posts/'+post.file)}></source>
                            </video>
                     ))
                }
                
                </>
            }
            {/*display: block;
    -webkit-user-select: none;
    margin: auto;
    background-color: hsl(0, 0%, 90%);
    transition: background-color 300ms; */}
        </div>
        </div>
    )
}

export default ViewPost