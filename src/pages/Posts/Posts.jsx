import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Post.css"
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import DisplayPost from "../Users/DisplayPost";
const Posts = () =>{

    const posts = useSelector((state)=>state.postsReducer)
    
    return (
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2" style={{marginTop:"40px"}}>
                <div className="post-container-1">
                {
                    posts && posts!==null ? 
                    posts.map((item)=>(
                        <div key={item._id} className="post-message-2">
                            <div className="post-avatar">
                                <Link to={`/Users/${item.userId}`} style={{textDecoration:"none",color:"white"}}><h2>{item.userName.charAt(0).toUpperCase()}</h2></Link>
                            </div>
                            <DisplayPost post={item}/>
                        </div>
                    )) 
                    :
                    <h1>Loading...</h1>
                }    
                    
                </div>
            </div>
        </div>
    )
}

export default Posts