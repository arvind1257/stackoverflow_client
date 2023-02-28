import * as api from "../api"
import {setCurrentUser} from "./currentUser"
export const requestSend = (requestData) => async(dispatch) =>{
    console.log(requestData)
    try{
        const {data} = await api.requestSend(requestData)
        dispatch({type:"FRIEND_REQUEST_SEND",payload:data})
        dispatch(requestGet(JSON.parse(localStorage.getItem('profile')).result))
    }
    catch(err){
        console.log(err)
    }
}

export const requestGet = (id) => async(dispatch) =>{
    try{
        const {data} = await api.requestGet(id)
        dispatch({type:"FRIEND_REQUEST_GET",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const requestDelete = (id) => async(dispatch) =>{
    try{
        const {data} = await api.requestDelete(id)
        dispatch({type:"FRIEND_REQUEST_DELETE",payload:data})
        dispatch(requestGet(JSON.parse(localStorage.getItem('profile')).result))
    }
    catch(err){
        console.log(err)
    }
}

export const requestAccept = (requestData) => async(dispatch) =>{
    console.log(requestData)
    try{
        const {data} = await api.requestAccept(requestData)
        console.log(data)
        dispatch({type:"FRIEND_REQUEST_ACCEPT",payload:data})
        dispatch(requestGet(JSON.parse(localStorage.getItem('profile')).result))
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile')).result))
    }
    catch(err){
        console.log(err)
    }
}