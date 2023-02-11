export const setCurrentUser = (data) =>{
    if(data){
        return{
            type:'FETCH_CURRENT_USER',
            payload:data.result
        }
    }
    else{
        return{
            type:'FETCH_CURRENT_USER',
            payload:data
        }
    }
    
}
