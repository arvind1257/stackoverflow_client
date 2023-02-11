import * as api from "../api"
import { setCurrentUser }  from "./currentUser.js"
export const signUp = (authData,navigate) => async (dispatch) => {
    try{
        const { data } = await api.signUp(authData)
        data.message && data.status==="Error" ?  dispatch({type:"AUTH_ERROR",payload:data}) : dispatch({type:"Auth",data})
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
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
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('profile'))))
        data.message && data.status==="Error" ?  navigate('/Auth') : navigate('/')
    }
    catch(err){
        console.log(err)
    }
}
