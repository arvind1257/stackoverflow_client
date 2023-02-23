import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSubscription } from "../../actions/subscription";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import "./Subscription.css"
const Subscription = () => {

    const User = useSelector((state)=>state.currentUserReducer)
    const dispatch = useDispatch()
    const handleClick = (click) =>{
        let amount = 0;
        let noOfQuestions = 1;
        if(click==='Silver'){ amount=100; noOfQuestions=5;}
        else if(click==='Gold'){ amount=1000;  noOfQuestions=-1;}
        
        if(User!==null){
            if(User.type===click){
            }
            else if(click==='FREE'){
                alert('You are already in '+User.type+' subscription')
            }
            else{
                var options = {
                    key: "rzp_test_bAIrFbR0Fe8s1T",
                    key_secret:"eFmI7HxL4IKCaENccFUfBBGe",
                    amount: amount*100,
                    currency:"INR",
                    name:click+" Subscription",
                    description:"StackOverflow "+click+"Subscription payment gatway",
                    handler: function(response){
                        alert(response.razorpay_payment_id);
                        dispatch(postSubscription({_id:User._id,type:click,receipt:response.razorpay_payment_id,noOfQuestions}))
                    },
                    prefill: {
                        name:User.name,
                        email:User.email,
                    },
                    notes:{
                        address:"Razorpay Corporate office"
                    },
                    theme: {
                        color:"#3399cc"
                    }
                };
                var pay = new window.Razorpay(options);
                pay.open();
            }
        }
        else{
            handleClick(click)
            alert('error')
        }
    }

    return (
        <div className="home-container-1">
            <LeftSidebar/>
            <div className="home-container-2">
                {
                User!==null && <>    
                <p className="subscription-note">Your currently using&nbsp;
                {
                    User.type==='FREE' && <>Free Subscription and you can post only one question </>
                }
                {
                    User.type==='Silver' && <>Silver Subscription and you can post only five questions </>
                }
                {
                    User.type==='Gold' && <>Gold Subscription and you can post any number of questions </>
                }
                    per day<br/>The following are the Subscription plans : 
                </p>
                <div className="subscription-plans">
                    <button onClick={() => handleClick('FREE')} className={User.type==="FREE" ?"subscription-plan free":"subscription-plan subscription-hower free"}>
                        <h2>FREE SUBSCRIPTION</h2>
                        <h3>FREE</h3>
                        <p>Free Plan can post only 1 question a day</p>
                    </button>
                    <button onClick={() => handleClick('Silver')} className={User.type==="Silver" ?"subscription-plan silver":"subscription-plan subscription-hower silver"}>
                        <h2>SILVER SUBSCRIPTION</h2>
                        <h3>₹100 per month</h3>
                        <p>Silver plan can post 5 questions a day</p>
                    </button>
                    <button onClick={() => handleClick('Gold')} className={User.type==="Gold" ?"subscription-plan gold":"subscription-plan subscription-hower gold"}>
                        <h2>GOLD SUBSCRIPTION</h2>
                        <h3>₹1000 per month</h3>
                        <p>Gold plan can post unlimited questions a day</p>
                    </button>
                </div>
                </>
                }

            </div>
        </div>
    )
}

export default Subscription