import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Post.css"
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import DisplayPost from "../Posts/DisplayPost";
import randomColor from "randomcolor"
import Avatar from "../../components/Avatar/Avatar";
import { HOME2 } from "../../components/StyledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import * as solid from "@fortawesome/free-solid-svg-icons"
import AddPost from "./AddPost";

const Posts = ({sideBar}) =>{

    const posts = useSelector((state)=>state.postsReducer)
    const currentUser = useSelector((state)=>state.currentUserReducer)
    const [edit,setEdit] = useState(false);
    var colors = []
    if(posts!==null && colors.length===0){
        posts.map((items)=>{
            if(colors.length===0){
            colors.push({
                id:items.userId,
                color:randomColor({luminosity: 'dark'})
            })}
            else if(colors.filter((item)=>item.id===items.userId).length===0){
                colors.push({
                    id:items.userId,
                    color:randomColor({luminosity: 'dark'})
                })
            }
            return true;
        })
    }

    const handleEdit = () =>{
        if(currentUser==null)
        alert("Kindly login to add the posts")
        else
        setEdit(!edit)
    }

    const back = () =>{
        setEdit(false);
    }
    return (
        <div className="home-container-1">
            <LeftSidebar sideBar={sideBar}/>
            <HOME2 className="home-container-2" style={{marginTop:"40px"}}>
                {
                !edit ?    
                <div className="post-container-1">
                {
                    colors!==null && posts && posts!==null ? 
                    posts.map((item)=>(
                        <div key={item._id} className="post-message-2" >
                                {
                                    colors.filter((items) =>items.id===item.userId).map((items)=>(
                                        <div key={items} className="post-avatar">
                                        <Link to={`/Users/${item.userId}`} style={{textDecoration:"none",color:"white"}}>
                                            <Avatar backgroundColor={items.color} px="14px" py="10px" color="white" borderRadius="50%" cursor="pointer" fontSize="25px" fontWeight="bolder">
                                                {item.userName.charAt(0).toUpperCase()}
                                            </Avatar>
                                        </Link>
                                        </div>
                                    ))
                                }
                            <DisplayPost post={item}/>
                        </div>
                    )) 
                    :
                    <h1>Loading...</h1>
                }    
                {
                    (posts===null || posts.length===0) && <h1 style={{textAlign:"center"}}>No Posts</h1>
                }   
                </div>
                :
                    currentUser!=null ? 
                    <AddPost currentUser={currentUser} back={()=>back()}/> 
                    :
                    <h1>error</h1>
                
                
                }
                <div className='add'>
                    <button className='abtn' onClick={handleEdit}>
                        <FontAwesomeIcon color="white" icon={!edit ? solid.faPlus : solid.faTimes} />
                        </button>
                </div>
            </HOME2>
        </div>
    )
}

export default Posts