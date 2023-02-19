import React from "react"
import "../../App.css"
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"; 
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";

const Questions = ({searchData}) => {
    return(
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2">
                <HomeMainbar searchData={searchData}/>
            </div>
        </div>
    )
}

export default Questions;