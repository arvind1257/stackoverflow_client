import React from "react";
import { Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./pages/Questions/DisplayQuestion";
import Users from "./pages/Users/Users";
import UserProfile from "./pages/Users/UserProfile";

const AllRoutes = () => {
    return(
        <Routes>
            <Route path='/Auth' element={<Auth/>}/>
            <Route path='/' element={<Home/>}/>            
            <Route path='/Questions' element={<Questions/>}/>   
            <Route path='/AskQuestion' element={<AskQuestion/>}/>  
            <Route path='/Questions/:id' element={<DisplayQuestion/>}/>  
            <Route path='/Posts' element={<Home/>}/>   
            <Route path='/Users' element={<Users/>}/>  
            <Route path='/Users/:id' element={<UserProfile/>}/>
        </Routes>
    )
}
export default AllRoutes