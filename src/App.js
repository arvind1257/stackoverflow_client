import React,{useEffect, useState} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './AllRoutes';
import { useDispatch } from "react-redux"
import { fetchAllQuestions } from './actions/question';
import { getUsers } from './actions/auth';
function App() {

  const [data,setData] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(getUsers())
  },[dispatch])

  const searchValue = (data1) =>{
    console.log("App.js="+data1)
    setData(data1)
  }

  return (
    <div>
      <Router>
        <Navbar searchValue={searchValue}/>
        <AllRoutes searchData={data}/>
      </Router>
    </div>
  );
}

export default App;
