import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

import DroneData from './components/DroneData';
import QueryForm from './components/QueryForm';

function App() {

  //store drone dataset from backend
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")

  //fetch drone dataset from backend
  useEffect(() => {
    const getDroneData = async() => {
      try {
        const response = await axios.get('http://localhost:3000/drone-data')
        const result = await response.data
        setData(result)
      } catch (error) {
        console.error("Error retrieving Drone Data:", error.message)
      }
    }
    getDroneData()
  }, []);

  //handle user queries
  const handleQueries = async(query) => {
    try {
      console.log("handleQueries reached", query)
      
    } catch (error) {
      console.error("Error processing User Query", error.message)
    }
  }



  return (
    <>
      <div className='frame'>

        <div className='queryForm'>
          <QueryForm query={query} setQuery={setQuery} handleQueries={handleQueries}/>
        </div>

        <div className='dataCards'>
          <DroneData data={data}/>
        </div>
        
      </div>
    </>
  )
}

export default App
