const currentUserReducer = (state=null,action) =>{
    switch(action.type)
    {
        case 'CHATBOT_ANSWER': 
            return action.payload;
        default : 
            return state;
    }
}
export default currentUserReducer