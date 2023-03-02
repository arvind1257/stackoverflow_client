import * as api from "../api"

export const uploadPosts = (postData) => async(dispatch) =>{
    try{
        const {data} = await api.uploadPosts(postData)
        dispatch({type:"USER_UPLOAD_POST",payload:data})
        dispatch(getPosts())
    }
    catch(err){
        console.log(err)
    }
}

export const getPosts = () => async(dispatch) =>{
    try{
        const {data} = await api.getPosts()
        dispatch({type:"FETCH_USER_POST",payload:data})
    }
    catch(err){
        console.log(err)
    }
}

export const setPostlikes = (postData) => async(dispatch) =>{
    try{
        const {data} = await api.setPostlikes(postData)
        dispatch(getPosts())
    }
    catch(err){
        console.log(err)
    }
}

export const postDelete = (id) => async(dispatch) =>{
    try{
        const {data} = await api.postDelete(id)
        console.log(data)
        dispatch(getPosts())
    }
    catch(err){
        console.log(err)
    }
}
