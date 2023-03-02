const postsReducer = (state=null,action) =>{
    switch(action.type)
    {
        case "USER_UPLOAD_POST" :
            return {...state };
        case "UPDATE_POST_LIKE" :
            return {...state };    
        case "FETCH_USER_POST" :
            return action.payload;
        default : 
            return state;
    }
}
export default postsReducer