const authReducer = (state={data:null}, actions ) => {
    switch(actions.type) {
        case "Auth" : 
            localStorage.setItem('profile',JSON.stringify({ ...actions?.data}))
            return {...state };
        case "AUTH_ERROR" :
            return {...state };   
        case "UPDATE_USER_DETAILS" :
            return {...state };
        case "FETCH_ALL_USERS" :
            return { ...state,data: actions.payload}  
        case "LOGOUT" : 
            localStorage.clear()
            return { ...state,data:null}    
        default :
            return state;
    }
}

export default authReducer