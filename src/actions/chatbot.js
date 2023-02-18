import * as api from "../api"
export const chatbot = (chatbotData) => async(dispatch) =>{
    try{
        const {data} = await api.chatbotAnswer(chatbotData);
        dispatch({type:"CHATBOT_ANSWER",payload:data})
    }
    catch(err){
        console.log(err)
    }
}