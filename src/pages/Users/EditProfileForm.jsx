import React, { useState } from "react";
import { useDispatch } from "react-redux"
import { updateUser } from "../../actions/auth";
import "./Users.css"
const EditProfileForm = ({currentUser}) =>{

    const dispatch = useDispatch();
    const [name,setName] = useState(currentUser.name);
    const [about,setAbout] = useState(currentUser.about);
    const [tags,setTags] = useState(currentUser?.tags.join(' '));

    const handleSubmit = () => {
        if(!name){
            alert("name can't be empty");
        }
        else{
            dispatch(updateUser(currentUser._id,{ name, about,tags:tags.split(' ') }))
        }
    }

    return (
        <div>
                <h1 className="edit-profile-title">
                    Edit Your Profile
                </h1>
                <h2 className="edit-profile-title-2">
                    Public information
                </h2>
                <form className="edit-profile-form" onSubmit={handleSubmit}>
                    <label htmlFor="name">
                        <h3>Display Name</h3>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}/>
                    </label>
                    <label htmlFor="about">
                        <h3>About Me</h3>
                        <textarea id="about" value={about} onChange={(e) => setAbout(e.target.value)} cols="30" rows="10" />
                    </label>
                    <label htmlFor="tags">
                        <h3>Watched Tags</h3>
                        <p>Add tags separated by 1 space</p>
                        <input type="text" id="tags" value={tags} onChange={(e) => setTags(e.target.value)} />
                    </label><br/>
                    <input type="submit" value="Save Profile" className="user-submit-btn"/>
                </form>
            
        </div>
    )
}

export default EditProfileForm