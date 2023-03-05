import React,{useEffect, useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './AllRoutes';
import { useDispatch } from "react-redux"
import { fetchAllQuestions } from './actions/question';
import { getUsers } from './actions/auth';
import { requestGet } from './actions/request';
import {getPosts} from "./actions/posts"
function App() {

  const [data,setData] = useState('')
  const [form,setForm] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(getUsers())
    dispatch(getPosts())
    if(JSON.parse(localStorage.getItem('profile'))){
      dispatch(requestGet(JSON.parse(localStorage.getItem('profile')).result))
    }
  },[dispatch])

  const searchValue = (data1) =>{
    setData(data1)
  }

  const forms = (forms) => {
    setForm(forms)
  }
  return (
    <div>
      <Router>
        <Navbar searchValue={searchValue} forms={forms}/>
        <AllRoutes searchData={data} forms={form}/>
      </Router>
    </div>
  );
}

export default App;
