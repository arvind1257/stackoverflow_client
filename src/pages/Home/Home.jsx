import React from "react"
import "../../App.css"
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"; 
import HomeMainbar from "../../components/HomeMainbar/HomeMainbar";
const Home = () => {  

    return(
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2">
                <HomeMainbar/>
                <RightSidebar/>
            </div>
        </div>
    )
}

export default Home;