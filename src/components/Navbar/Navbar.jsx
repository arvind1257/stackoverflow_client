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
import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
//import * as solid from "@fortawesome/free-solid-svg-icons"
import * as regular from "@fortawesome/free-regular-svg-icons"
import { NAVBAR } from "../StyledComponent"
import menuIcon from "../../assests/menu-bar-icon.svg"

const Navbar = ({searchValue,forms}) => {
    const form = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [search1,setSearch] = useState('')
    const user = useSelector(state => state.currentUserReducer)
    var Status = "open"
    var Status1 = "open"
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

    const handleNavbar = (status) =>{
        console.log(status)
        if(status==="open"){
            document.getElementById('sub-1').className="navbar-sub-11"
            document.getElementById('sub-2').className="navbar-sub-12"
            Status="close"
        }
        else{
            document.getElementById('sub-1').className="navbar-sub-1"
            document.getElementById('sub-2').className="navbar-sub-1"
            Status="open"
        }
        document.getElementById('nav1').classList.toggle('change1')
    }

    const handleNavbar1 = (status1) =>{
        document.getElementById('left-main').classList.toggle('left-nav')
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
            <NAVBAR className="navbar" id="nav1">
                
                <div className="nav-sub-main">
                    <div className="navbar-menu-btn">
                        <button className="menu-btn" onClick={()=>handleNavbar1(Status1)}>
                            <img src={menuIcon} alt="no img" width={35}/>
                        </button>
                        <Link to='/' className="nav-item nav-logo">
                            <img src={logo} alt="logo" width="160"/>
                        </Link>
                    </div>
                    <div id="sub-btn" className="navbar-sub-btn">
                        <button onClick={()=>handleNavbar(Status)}>
                            <FontAwesomeIcon icon={regular.faSquarePlus}/>
                        </button>
                    </div>
                </div>
                <div className="nav-sub">
                <div id="sub-1" className="navbar-sub-1">
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
                </div>
                <div id="sub-2" className="navbar-sub-2">
                <form>
                    <input value={search1} onChange={(e)=>handleChange(e)} type="text" placeholder="Search..."/>
                    <img src={search} alt="search" width="18" className="search-icon"/>
                </form>
                {
                    user===null ?
                        <Link to='/Auth' className="nav-item nav-links">Log in</Link> :
                        <>
                            <Avatar backgroundColor="#009dff" px="12px" py="7px" color="white" borderRadius="50%" cursor="pointer"><Link to={`/Users/${user._id}`} style={{color:"white",textDecoration:"none"}}>{user.name.charAt(0).toUpperCase()}</Link></Avatar>
                            <button className="nav-item nav-links" onClick={handleLogin}>Log out</button>
                        </>//backgroundColor:"#009dff",padding:"7px 10px",color:"white",borderRadius:"50%",fontSize:"",textAlign:"center",cursor:"pointer",textDecoration:"none"
                }
                </div>
                </div>
            </NAVBAR>
        </nav>
    )
}
export default Navbar;