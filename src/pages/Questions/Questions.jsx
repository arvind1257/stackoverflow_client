import React from "react"
import "../../App.css"
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"; 
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";
import { HOME2 } from "../../components/StyledComponent";

const Questions = ({searchData,sideBar}) => {
    return(
        <div className="home-container-1">
            <LeftSidebar sideBar={sideBar}/>
            <HOME2 className="home-container-2">
                <HomeMainbar searchData={searchData}/>
            </HOME2>
        </div>
    )
}

export default Questions;