import React, { useState, useEffect } from 'react'

import Train from './Components/Train'
import LineCode from './Constants/LineCode';
import ServiceType from './Constants/ServiceType'

import './App.css';

const url = 'https://api.wmata.com/TrainPositions/TrainPositions?contentType=json&api_key='
const key = '22f8223e857443068960c35709839e67'
const timeInterval = 10000

const App = () => {
  const [trainPositions, setTrainPositions] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filter, setFilter] = useState({
    carCount: '',
    lineCode: null,
    serviceType: null
  })

  useEffect(() => {
    getData()
    const interval = setInterval(() => getData(), timeInterval)
    return () => clearInterval(interval)
  }, [filter.carCount, filter.lineCode, filter.serviceType])

  const getData = () => {
    return fetch(url + key)
      .then(response => response.json())
      .then(data => {
        setTrainPositions(data.TrainPositions)
        setFilteredData(filterTrains(data.TrainPositions, filter))
      })
  }

  const filterTrains = (trains, filter) => trains.filter(train => {
    const { carCount, lineCode, serviceType } = filter
    const sameCarCount = carCount === '' || train.CarCount === parseInt(carCount)
    const sameLineCode = !lineCode || train.LineCode === lineCode
    const sameServiceType = !serviceType || train.ServiceType === serviceType
    return sameCarCount && sameLineCode && sameServiceType
  })

  const handleFilter = item => {
    setFilter({ ...filter, ...item })
    setFilteredData(filterTrains(trainPositions, { ...filter, ...item }))
  }

  const renderTrains = () => {
    return filteredData.map(({TrainId, CarCount, LineCode, ServiceType}) => (
      <Train
        key={TrainId}
        carCount={CarCount}
        lineCode={LineCode}
        serviceType={ServiceType}
      />)
    )
  }

  return (
    <div className="App">
      <label>Car Count:</label>
      <input type={'number'} onChange={e => handleFilter({ carCount: e.target.value || '' })} />
      <label>Line Code</label>
      <select onChange={e => handleFilter({ lineCode: e.target.value })}>
        <option value="">-</option>
        {Object.keys(LineCode).map(code => <option key={code} value={code}>{code}</option>)}
      </select>
      <label>Service Type</label>
      <select onChange={e => handleFilter({ serviceType: e.target.value })}>
        <option value="">-</option>
        {Object.entries(ServiceType).map(([key, title]) => <option key={key} value={key}>{title}</option>)}
      </select>
      {renderTrains()}
    </div>
  );
}

export default App;
