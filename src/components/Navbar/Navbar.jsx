import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assests/blacklogo.png"
import search from '../../assests/search-solid.svg'
import Avatar from "../../components/Avatar/Avatar"
//import Button from "../../components/Button/Button"
import "./Navbar.css"

const Navbar = () => {

    var user = null

    return (
        <nav className="main-nav">
            <div className="navbar">
                <Link to='/' className="nav-item nav-logo">
                    <img src={logo} alt="logo" width="160"/>
                </Link>
                <Link to='/' className="nav-item nav-btn">About</Link>
                <Link to='/' className="nav-item nav-btn">Products</Link>
                <Link to='/' className="nav-item nav-btn">For Teams</Link>
                <form>
                    <input type="text" placeholder="Search..."/>
                    <img src={search} alt="search" width="18" className="search-icon"/>
                </form>
                {
                    user===null ?
                        <Link to='/Auth' className="nav-item nav-links">Log in</Link> :
                        <>
                            <Avatar><Link to='/' style={{color:"white",textDecoration:"none"}}>M</Link></Avatar>
                            <button className="nav-item nav-links">Log out</button>
                        </>
                }
            </div>
        </nav>
    )
}

export default Navbar;