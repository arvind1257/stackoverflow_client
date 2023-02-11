import * as api from "../api"

export const Ask = (questionData,navigate) => async (dispatch) => {
    try{
        const {data} = await api.postQuestion(questionData)
        dispatch({type:"POST_QUESTION",payload:data});
        dispatch(fetchAllQuestions())
        navigate('/')
    }
    catch(err){
        console.log(err)
    }
}

export const fetchAllQuestions = () => async(dispatch) =>{
    try{
        const {data} = await api.getQuestion();
        dispatch({type:"FETCH_ALL_QUESTIONS",payload:data})
    }
    catch(err){
        console.log(err)
    }
}
