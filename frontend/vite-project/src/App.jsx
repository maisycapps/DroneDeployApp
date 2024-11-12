import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

import DroneData from './components/DroneData';
import QueryForm from './components/QueryForm';

function App() {

  //store drone dataset from backend
  const [data, setData] = useState([]);

  //fetch drone dataset from backend
  useEffect(() => {
    
    const getDroneData = async() => {
      console.log("getDroneData initialized")
      try {
        const response = await axios.get('http://localhost:3000/drone-data')
        console.log("response", response)
        const result = await response.data
        setData(result)
      } catch (error) {
        console.error("Error retrieving Drone Data:", error.message)
      }
    }
    getDroneData()

  }, []);



  return (
    <>
      <div className="card">

        <DroneData data={data}/>

        <QueryForm />


      </div>
    </>
  )
}

export default App
