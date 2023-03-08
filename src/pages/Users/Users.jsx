import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { Link } from "react-router-dom";
import { getUsers } from "../../actions/auth";
import "./Users.css"
import Avatar from "../../components/Avatar/Avatar";
import randomColor from "randomcolor";
import { HOME2 } from "../../components/StyledComponent";

const Users = ({searchData,sideBar}) =>{
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUsers())
    },[dispatch])
    const users = useSelector((state) => state.authReducer)
    var colors = []
    if(users.data!==null && colors.length===0){
        users.data.map((items)=>{
            if(colors.length===0){
            colors.push({
                id:items._id,
                color:randomColor({luminosity: 'light'})
            })}
            else if(colors.filter((item)=>item.id===items._id).length===0){
                colors.push({
                    id:items._id,
                    color:randomColor({luminosity: 'light'})
                })
            }
            return true;
        })
    }
    return (
        <div className="home-container-1">
            <LeftSidebar sideBar={sideBar}/>
            <HOME2 className="home-container-2" style={{marginTop:"40px"}}>
                <h1 style={{fontWeight:"500",fontSize:"2em",marginTop:"revert",marginBottom:"revert"}}>Users</h1>
                <div className="userList-container">
                {
                    users.data ? users.data.filter((item)=> item.name.toLowerCase().includes(searchData.toLowerCase())).map((user) => (
                        colors.filter((items) => items.id===user._id ).map((items)=>(
                        <Link key={user._id} to={`/users/${user._id}`} className="user-profile-link">
                            <Avatar backgroundColor={items.color} px="13px" py="10px" color="black" borderRadius="50%" cursor="pointer" fontSize="18px" fontWeight="bolder">{user.name.charAt(0).toUpperCase()}</Avatar>
                            <h4>{user.name}</h4>
                        </Link>))
                    )) : <h1>Loading....</h1>
                }
                </div>
            </HOME2>
        </div>
    )
}

export default Users