const authReducer = (state={data:null}, actions ) => {
    switch(actions.type) {
        case "Auth" : 
            localStorage.setItem('profile',JSON.stringify({ ...actions?.data}))
            return { ...state,data: actions?.data}
        case "AUTH_ERROR" :
            return { ...state,data: actions.payload}   
        default :
            return state;
    }
}

export default authReducer