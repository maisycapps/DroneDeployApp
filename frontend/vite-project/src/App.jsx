import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

import DroneData from './components/DroneData';
import QueryForm from './components/QueryForm';

function App() {

  //store drone dataset from backend
  const [data, setData] = useState([]);

  return (
    <>
      <div className="card">

        <DroneData />

        <QueryForm />


      </div>
    </>
  )
}

export default App
