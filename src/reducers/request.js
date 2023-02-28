const friendRequestReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'FRIEND_REQUEST_SEND': 
            return state;
        case 'FRIEND_REQUEST_GET': 
            return {...state,data:action.payload};
        case 'FRIEND_REQUEST_DELETE':
            return state;
        case 'FRIEND_REQUEST_ACCEPT':
            return state;
        default : 
            return state;
    }
}
export default friendRequestReducer