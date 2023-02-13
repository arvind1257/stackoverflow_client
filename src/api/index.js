import axios from "axios"
const API = axios.create({baseURL:'http://localhost:5000'})

export const logIn = (authData) => API.post('/user/login',authData);
export const signUp = (authData) => API.post('/user/signup',authData);
export const postQuestion = (questionData) => API.post('/questions/Ask',questionData);
export const getQuestion = () => API.get('/questions/get');
export const postAnswer = (id,answerData) => API.patch(`/answer/post/${id}`,answerData);
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`);
export const deleteAnswer = (deleteData) => API.patch('/answer/delete',deleteData);
export const voteQuestion = (voteData) => API.patch('/questions/vote',voteData);