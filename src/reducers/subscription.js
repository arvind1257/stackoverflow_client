const subscriptionReducer = (state={data:null},action) =>{
    switch(action.type)
    {
        case 'POST_SUBSCRIPTION': 
            return action.payload;
        default : 
            return state;
    }
}
export default subscriptionReducer