import * as api from "../api"

export const setCurrentUser = (userData) => async(dispatch) =>{
    console.log(userData)
    try{
        const {data} = await api.getCurrentUser(userData);
        console.log(data)
        dispatch({type:'FETCH_CURRENT_USER',payload:data})
    }
    catch(err){
        console.log(err)
    }
   
    
}
