import React,{useEffect} from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import { BrowserRouter as Router } from 'react-router-dom';
import AllRoutes from './AllRoutes';
import { useDispatch } from "react-redux"
import { fetchAllQuestions } from './actions/question';
import { getUsers } from './actions/auth';
function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllQuestions())
    dispatch(getUsers())
  },[dispatch])

  return (
    <div>
      <Router>
        <Navbar />
        <AllRoutes />
      </Router>
    </div>
  );
}

export default App;
