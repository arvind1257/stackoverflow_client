import React from "react";
import { Routes,Route} from "react-router-dom"
import Home from "./pages/Home/Home"
import Auth from "./pages/Auth/Auth"
import Questions from "./components/Questions/Questions";

const AllRoutes = () => {
    return(
        <Routes>
            <Route path='/Auth' element={<Auth/>}/>
            <Route path='/' element={<Home/>}/>            
            <Route path='/Questions' element={<Questions/>}/>   
            <Route path='/Tags' element={<Home/>}/>   
            <Route path='/Users' element={<Home/>}/>
        </Routes>
    )
}
export default AllRoutes