import React from "react";
import { Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./pages/Questions/DisplayQuestion";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/Users/UserProfile";
import ChatBot from "./pages/ChatBot/chatBot"
import Posts from "./pages/Posts/Posts"
import Subscription from "./pages/Subscription/Subscription";
import Friends from "./pages/friends/Friends";
import ViewPost from "./pages/Posts/ViewPost";

const AllRoutes = ({searchData,forms,sideBar}) => {
    return(
        <Routes>
            <Route path='/Auth' element={<Auth/>}/>
            <Route path='/' element={<Home searchData={searchData} sideBar={sideBar}/>}/>            
            <Route path='/Questions' element={<Questions searchData={searchData} sideBar={sideBar}/>}/>   
            <Route path='/AskQuestion' element={<AskQuestion/>}/>  
            <Route path='/Questions/:id' element={<DisplayQuestion sideBar={sideBar}/>}/>  
            <Route path='/Posts' element={<Posts sideBar={sideBar}/>}/>   
            <Route path='/ChatBot' element={<ChatBot forms={forms} sideBar={sideBar}/>}/>  
            <Route path='/Users' element={<Users searchData={searchData} sideBar={sideBar}/>}/>  
            <Route path='/Users/:id' element={<UserProfile sideBar={sideBar}/>}/>
            <Route path='/Subscription' element={<Subscription sideBar={sideBar}/>}/>
            <Route path='/Friends' element={<Friends sideBar={sideBar}/>}/>
            <Route path='/Post/:id' element={<ViewPost/>}/>
        </Routes>
    )
}
export default AllRoutes