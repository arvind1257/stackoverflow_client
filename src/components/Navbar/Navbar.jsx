import React, { useEffect, useState, useRef } from "react"
import { Link,useNavigate } from "react-router-dom"
import logo from "../../assests/blacklogo.png"
import search from '../../assests/search-solid.svg'
import Avatar from "../../components/Avatar/Avatar"
import { useDispatch, useSelector } from "react-redux"
//import Button from "../../components/Button/Button"
import "./Navbar.css"
import { setCurrentUser } from "../../actions/currentUser"
import decode from "jwt-decode"
import { getUsers } from "../../actions/auth"

const Navbar = ({searchValue,forms}) => {
    const form = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search1,setSearch] = useState('')
    const user = useSelector(state => state.currentUserReducer)
    useEffect(()=>{
        const token = user?.token
        if(token){
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 <new Date().getTime()){
                handleLogin()
            }
        }
        if(JSON.parse(localStorage.getItem('profile'))){
            dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile')).result))
        }
        dispatch(getUsers());
        // eslint-disable-next-line
    },[dispatch])

    const handleLogin = () =>{
        dispatch({type:'LOGOUT'});
        navigate('/')
        dispatch({type:"FETCH_CURRENT_USER",payload:null})
    }

    const handleChange =(e) =>{
        setSearch(e.target.value)
        searchValue(e.target.value)
    }

    const handleClick = (e) =>{
        e.preventDefault();
        forms(form.current)
        navigate('/ChatBot')
    }
    return (
        <nav className="main-nav">
            {
                user!==null &&
            <form id="otpform" ref={form} onSubmit={handleClick}>
                        <input type="hidden" name="user_name" value={user.name}/>
                        <input type="hidden" name="user_email" value={user.email}/>
                        <input type="hidden" name="otp" id='otp' value={user.otp}/>
                        
                    </form>
                }
            <div className="navbar">
                <Link to='/' className="nav-item nav-logo">
                    <img src={logo} alt="logo" width="160"/>
                </Link>
                <Link to='/' className="nav-item nav-btn">About</Link>
                {
                    user!==null ? <>
                    <button form="otpform" type="submit" className="nav-item nav-btn nav-btn1">ChatBot</button>
                    </>
                    :
                    <>
                    <button onClick={() => alert('Kindly login to access the chatbot')} className="nav-item nav-btn nav-btn1">ChatBot</button>
                    </>
                }
                <Link to='/Subscription' className="nav-item nav-btn">Subscription</Link>
                <form>
                    <input value={search1} onChange={(e)=>handleChange(e)} type="text" placeholder="Search..."/>
                    <img src={search} alt="search" width="18" className="search-icon"/>
                </form>
                {
                    user===null ?
                        <Link to='/Auth' className="nav-item nav-links">Log in</Link> :
                        <>
                            <Avatar backgroundColor="#009dff" px="10px" py="7px" color="white" borderRadius="50%" cursor="pointer"><Link to={`/Users/${user._id}`} style={{color:"white",textDecoration:"none"}}>{user.name.charAt(0).toUpperCase()}</Link></Avatar>
                            <button className="nav-item nav-links" onClick={handleLogin}>Log out</button>
                        </>//backgroundColor:"#009dff",padding:"7px 10px",color:"white",borderRadius:"50%",fontSize:"",textAlign:"center",cursor:"pointer",textDecoration:"none"
                }
            </div>
        </nav>
    )
}
export default Navbar;