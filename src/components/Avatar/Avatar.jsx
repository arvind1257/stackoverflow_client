import React from "react";

const Avatar = ({children,backgroundColor,px,py,color,borderRadius,fontSize,cursor,fontWeight}) =>{
    return (
        <div style={{backgroundColor,padding:`${py} ${px}`,color,borderRadius,fontSize,textAlign:"center",cursor,textDecoration:"none",fontWeight}}>
            {children}
        </div>
    )
}

export default Avatar

