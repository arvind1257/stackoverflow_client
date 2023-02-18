import React, { useState } from "react";
import icon from "../../assests/favicon.ico"
import AboutAuth from "./AboutAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import {logIn} from "../../actions/auth.js"
import "./Auth.css";
import OTPVerification from "./OTPVerfication";
import { useRef } from "react";
//import emailjs from '@emailjs/browser';

const Auth = () => {

    const form = useRef();
    const [isSignup, setIsSignup] = useState(false)
    const [click, setClick] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [pass,setPass] = useState('')
    const [OTP,setOTP] = useState(0)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const sendEmail = () => {
        console.log(form.current)
        /*emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            alert(error.text);
            navigate('/Auth');
        });*/
        setClick(true)
    };

    const Users = useSelector(state => state.authReducer);
    if(document.getElementById('otp1'))
    document.getElementById('otp1').value=OTP
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(isSignup)
        {
            if(!name || !email || !pass){
                alert("Fill all the Details")
            }
            else{
                var flag=0;
                for(let i=0;Users && i<Users.data.length;i++)
                {
                    if(Users.data[i].email===email){
                        flag=1;
                        break;
                    }
                }
                if(flag===0){
                    setOTP(Math.floor(Math.random() * (999999 - 100000 + 1) + 100000))
                    sendEmail()
                }
                else{
                    alert("The Email ID is already exist!");
                }
                //dispatch(signUp({name:name,email:email,password:pass},navigate));
            }
        }
        else{
            if(!email || !pass){
                alert("Enter Email and Password!")
            }
            else{
                dispatch(logIn({email:email,password:pass},navigate));
            }
        }
    }
    return(
        <section className="auth-section">
        {
            click===false ? <>
            
            { isSignup && <AboutAuth/> }
            <div className="auth-container-2">
            { 
                !isSignup && 
                <img src={icon} alt="stack overflow" className="login-logo"/>
            }
            <form ref={form} onSubmit={handleSubmit}>
                {
                    isSignup && (
                        <label htmlFor="name">
                            <h4>Display Name</h4>
                            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </label>
                    )
                } 
                <label htmlFor="user">
                    <h4>Email</h4>
                    <input type="email" name="user" id="user" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </label>
                <label htmlFor="password">
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <h4>Password</h4>
                    { 
                        !isSignup &&
                        <h4 style={{color:"#007ac6",fontSize:"13px"}}>Forgot Password?</h4>
                    }
                    </div>
                    <input type="password" name="pass" id="pass" value={pass} onChange={(e) => setPass(e.target.value)} />
                    {
                        isSignup && 
                        <p style={{color:"#666767",fontSize:"13px"}}>Passwords must contain atleast eight <br/>characters, including atleast 1 letter and 1 number</p>
                    }
                </label>
                {
                    isSignup && (
                        <label htmlFor="check">
                            <input type="checkbox" id="check"/>
                            <p style={{fontSize:"13px"}}>Opt-in Receive occasional<br/>product updates, user research invitations,<br/>company announcements, and digests.</p>
                        </label>
                    )
                }
                <button type="submit" className="auth-btn">
                    { isSignup ? "Sign Up" : "Log In" }
                </button>
                {
                    isSignup && (
                        <p style={{color:"#666767",fontSize:"13px"}}>By clicking "Sign up", you agree to our <span style={{color:"#007ac6"}}>terms of <br/>service</span>, <span style={{color:"#007ac6"}}>privacy policy</span> and <span style={{color:"#007ac6"}}>cookie policy</span></p>
                    )
                }
                <input type="hidden" name="otp" id='otp1' value={OTP}/>
            </form>
            <p>
                { isSignup ? 'Already have an account?' : "Don't have an account?"}
                <button type="button" className="handle-switch-btn" onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Log In' : 'Sign Up'}</button>
            </p>
            </div>
            </> : 
            <OTPVerification otp={OTP} name={name} email={email} password={pass} />
        }
        </section>
    )
}

export default Auth;