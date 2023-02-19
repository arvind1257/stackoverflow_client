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

const AllRoutes = ({searchData}) => {
    return(
        <Routes>
            <Route path='/Auth' element={<Auth/>}/>
            <Route path='/' element={<Home searchData={searchData}/>}/>            
            <Route path='/Questions' element={<Questions searchData={searchData}/>}/>   
            <Route path='/AskQuestion' element={<AskQuestion/>}/>  
            <Route path='/Questions/:id' element={<DisplayQuestion/>}/>  
            <Route path='/Posts' element={<Posts/>}/>   
            <Route path='/ChatBot' element={<ChatBot />}/>  
            <Route path='/Users' element={<Users searchData={searchData}/>}/>  
            <Route path='/Users/:id' element={<UserProfile/>}/>
        </Routes>
    )
}
export default AllRoutes