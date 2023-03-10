import * as api from "../api"
import { setCurrentUser }  from "./currentUser.js"
import { requestGet } from "./request"
export const signUp = (authData,navigate) => async (dispatch) => {
    try{
        const { data } = await api.signUp(authData)
        data.message && data.status==="Error" ?  dispatch({type:"AUTH_ERROR",payload:data}) : dispatch({type:"Auth",data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile')).result))
        dispatch(getUsers())
        data.message && data.status==="Error" ?  navigate('/Auth') : navigate('/')
    }
    catch(err)
    {
        console.log(err)
    }
}

export const logIn = (authData,navigate) => async (dispatch) => {
    try{
        const { data } = await api.logIn(authData)
        data.message && data.status==="Error" ?  dispatch({type:"AUTH_ERROR",payload:data}) : dispatch({type:"Auth",data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile')).result))
        dispatch(requestGet(JSON.parse(localStorage.getItem('profile')).result))
        data.message && data.status==="Error" ?  navigate('/Auth') : navigate('/')
    }
    catch(err){
        console.log(err)
    }
}

export const getUsers = () => async(dispatch) =>{
    try{
        const {data} = await api.getUsers();
        dispatch({type:"FETCH_ALL_USERS",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const updateUser = (id,updateData) => async(dispatch) =>{
    try{
        await api.updateUser(id,updateData);
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile')).result))
    }
    catch(err){
        console.log(err)
    }
}