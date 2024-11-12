import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

import DroneData from './components/DroneData';
import QueryForm from './components/QueryForm';
import AnswerQuery from './components/AnswerQuery';

function App() {

  //store drone dataset from backend
  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  const [answer, setAnswer] = useState("")

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

    //formatting data for AI query
    const formatData = data.map((x) => `Image ID: ${x.image_id}, Timestamp: ${x.timestamp}, Latitude: ${x.latitude}, Longitude: ${x.longitude}, Altitude: ${x.altitude_m} m., Heading: ${x.heading_deg} deg., File Name: ${x.file_name}, Camera Tilt: ${x.camera_tilt_deg} deg., Focal Length: ${x.focal_length_mm} mm., ISO: ${x.iso}, Shutter Speed: ${x.shutter_speed}, Aperture: ${x.aperture}, Color Temperature: ${x.color_temp_k} k., Image Format: ${x.image_format}, File Size: ${x.file_size_mb} mb., Drone Speed: ${x.drone_speed_mps} mps., Battery Level: ${x.battery_level_pct} pct., GPS Accuracy: ${x.gps_accuracy_m} m., Gimbal Mode: ${x.gimbal_mode}, Subject Detection: ${x.subject_detection}, Image Tags: ${x.image_tags[0]}, ${x.image_tags[1]}`)

    const queryData = formatData.join(". ")

    const prompt = `${query} ? Craft a relevant response based on this dataset: ${queryData}`
    
      const response = await axios.post('http://localhost:3000/ask-openAI', 
       { prompt }
      )
      const result = await response.data.answer
      setAnswer(result)
    } catch (error) {
      console.error("Error processing User Query", error.message)
    }
  }

  return (
    <>
      <div className='frame'>

        <div className='queryForm'>
          <QueryForm query={query} setQuery={setQuery} setAnswer={setAnswer} handleQueries={handleQueries}/>
        </div>

        <div className='answerField'>
          { answer && <AnswerQuery answer={answer} />}
        </div>

        <div className='dataCards'>
          <DroneData data={data}/>
        </div>
        
      </div>
    </>
  )
}

export default App
