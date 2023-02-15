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

export const postAnswer = (id,answerData,navigate) => async(dispatch) =>{
    try{
        const { data } = await api.postAnswer(id,answerData);
        dispatch({type:"POST_ANSWER",payload:data})
        dispatch(fetchAllQuestions())
        navigate(`/Questions/${id}`)
    }
    catch(err){
        console.log(err)
    }
}

export const deleteQuestion = (id,navigate) => async(dispatch) =>{
    try{
        const { data } = await api.deleteQuestion(id);
        dispatch({type:"DELETE_QUESTION",payload:data})
        dispatch(fetchAllQuestions())
        navigate('/Questions')
    }
    catch(err){
        console.log(err)
    }
}

export const deleteAnswer = (deleteData,navigate) => async(dispatch) =>{
    try{
        const { data } = await api.deleteAnswer(deleteData);
        dispatch({type:"DELETE_QUESTION",payload:data})
        dispatch(fetchAllQuestions())
    }
    catch(err){
        console.log(err)
    }
}

export const voteQuestion = (voteData,navigate) => async(dispatch) =>{
    try{
        const { data } = await api.voteQuestion(voteData);
        dispatch(fetchAllQuestions())
    }
    catch(err){
        console.log(err)
    }
}