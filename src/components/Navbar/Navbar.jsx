import React, { useEffect, useState } from "react"
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

const Navbar = ({searchValue}) => {
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
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile')).result))
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

    return (
        <nav className="main-nav">
            <div className="navbar">
                <Link to='/' className="nav-item nav-logo">
                    <img src={logo} alt="logo" width="160"/>
                </Link>
                <Link to='/' className="nav-item nav-btn">About</Link>
                {
                    user!==null ? <>
                    <Link to='/ChatBot' className="nav-item nav-btn">ChatBot</Link>
                    <Link to='/Subscription' className="nav-item nav-btn">Subscription</Link>
                    </>
                    :
                    <>
                    <button onClick={() => alert('Kindly Login First')} className="nav-item nav-btn nav-btn1">ChatBot</button>
                    <button onClick={() => alert('Kindly Login First')} className="nav-item nav-btn nav-btn1">Subscription</button>
                    </>
                }
                {

                }
                
                <form>
                    <input value={search1} onChange={(e)=>handleChange(e)} type="text" placeholder="Search..."/>
                    <img src={search} alt="search" width="18" className="search-icon"/>
                </form>
                {
                    user===null ?
                        <Link to='/Auth' className="nav-item nav-links">Log in</Link> :
                        <>
                            <Avatar><Link to={`/Users/${user._id}`} style={{color:"white",textDecoration:"none"}}>{user.name.charAt(0).toUpperCase()}</Link></Avatar>
                            <button className="nav-item nav-links" onClick={handleLogin}>Log out</button>
                        </>
                }
            </div>
        </nav>
    )
}
export default Navbar;