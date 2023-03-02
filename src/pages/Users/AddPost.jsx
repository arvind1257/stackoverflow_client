import React, { useState } from "react";
import { useDispatch } from "react-redux"
import "./Users.css"
import {uploadPosts} from "../../actions/posts"
const AddPost = ({currentUser,back}) =>{

    const dispatch = useDispatch();
    const [text,setText] = useState(currentUser.text);
    const [userInfo, setuserInfo] = useState({
        file:[],
        filepreview:null,
    });

    const handleInputChange = (event) => {
        setuserInfo({
        ...userInfo,
        file:event.target.files[0],
        filepreview:URL.createObjectURL(event.target.files[0]),
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!userInfo.file) alert("Media is required")
        else{
            dispatch(uploadPosts({_id:currentUser._id,name:currentUser.name,content:text,fileType:userInfo.file.type,file:userInfo.file.name}))
            back()
        }
    }
    console.log(userInfo.file)


    return (
            <div>
                <h1 className="edit-profile-title">
                    Add Your Post
                </h1>
                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <label htmlFor="media">
                        <h3>Media</h3>
                        <div className="form-row">
                            <label className="text-white">Select Media :&emsp;</label>
                            <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                        </div>
                        {
                        userInfo.filepreview !== null && userInfo.file.type!=="video/mp4" && <img style={{maxWidth:"100%"}} className="previewimg"  src={userInfo.filepreview} alt="UploadImage" />
                        }
                        {
                        userInfo.filepreview !== null && userInfo.file.type==="video/mp4" &&
                        <video preload="auto" controls style={{maxWidth:"100%"}} >
                            <source src={userInfo.filepreview}></source>
                        </video>    
                        }
                    </label>

                    <label htmlFor="text">
                        <h3>Content</h3>
                        <textarea id="text" value={text} onChange={(e) => setText(e.target.value)} cols="30" rows="2" />
                    </label>
                    <br/>
                    <input type="submit" value="Add Post" className="user-submit-btn"/>
                </form>
            
            </div>
    )
}

export default AddPost