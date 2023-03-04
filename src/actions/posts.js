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

export const uploadMedia = (postData,formData,head) => async(dispatch) =>{
    try{
        const {data} = await api.uploadMedia(formData,head)
        if(data===""){
            postData.file=data
            dispatch(uploadPosts(postData))
        }
        else{
            alert(data)
        }
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
        await api.setPostlikes(postData)
        dispatch(getPosts())
    }
    catch(err){
        console.log(err)
    }
}

export const postDelete = (id) => async(dispatch) =>{
    try{
        await api.postDelete(id)
        dispatch(getPosts())
    }
    catch(err){
        console.log(err)
    }
}
