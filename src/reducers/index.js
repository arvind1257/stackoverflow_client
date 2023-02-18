import { combineReducers } from "redux";
import authReducer from "./auth.js";
import currentUserReducer from "./currentUser.js";
import questionReducer from "./questions.js"
import chatbotReducer from "./chatbot.js"
export default combineReducers({
    authReducer,currentUserReducer,questionReducer,chatbotReducer
})