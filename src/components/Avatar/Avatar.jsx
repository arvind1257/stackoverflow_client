import React from "react";

const Avatar = ({children}) =>{
    return (
        <div style={{backgroundColor:"#009dff",padding:"7px 10px",color:"white",borderRadius:"50%",fontSize:"",textAlign:"center",cursor:"pointer",textDecoration:"none"}}>
            {children}
        </div>
    )
}

export default Avatar