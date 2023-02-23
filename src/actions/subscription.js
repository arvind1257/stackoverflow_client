import * as api from "../api"
import {setCurrentUser} from "./currentUser"
export const postSubscription = (subscriptionData) => async(dispatch) =>{
    console.log(subscriptionData)
    try{
        const {data} = await api.postSubscription(subscriptionData);
        console.log(data)
        dispatch({type:"POST_SUBSCRIPTION",payload:data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile')).result))

    }
    catch(err){
        console.log(err)
    }
}

export const getSubscription = () => async(dispatch) =>{
    try{
        const {data} = await api.getSubscription();
        dispatch({type:"GET_SUBSCRIPTION",payload:data})
    }
    catch(err){
        console.log(err)
    }
}