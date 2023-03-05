import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/auth";
import { useNavigate } from "react-router-dom";

import "./Auth.css";

const OTPVerification = ({otp,name,email,password}) =>{

    const [OTP,setOTP] = useState();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!OTP){
            alert('Enter the OTP!')
        }
        // eslint-disable-next-line
        else if(OTP!=otp){
            alert('Invalid OTP')
        }
        else{
            dispatch(signUp({name:name,email:email,password:password},navigate));
        }
    }
    
    return (
        <div className="auth-container-2">
            <h1>Email Confirmation</h1>
            
            <form onSubmit={handleSubmit}>
            <p style={{color: "rgb(102, 103, 103)",fontSize: "13px"}}>We sent the OTP mail to {email} <br/>Check your inbox to activate your account.<br/>And kindly don't refresh this page</p>
                <label htmlFor="user">
                    <h4>Enter the OTP</h4>
                    <input type="number" name="otp" onChange={(e) => setOTP(e.target.value)}/>
                </label>
                <button type="submit" className="auth-btn">Verify</button>
            </form>
        </div>
    )
}

export default OTPVerification