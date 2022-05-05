import React from 'react'

import Car from './Car'
import ServiceType from '../Constants/ServiceType'

import './Train.css'

const Train = ({carCount, serviceType, lineCode}) => {

  const renderCars = () => {
    if (carCount) {
      return [...Array(carCount)].map(_ => <Car lineCode={lineCode} />)
    } else {
      return 'No Cars Available'
    }
  }

  return (
    <div className='train'>
      <span className='service-type'>{ServiceType[serviceType]}</span>
      {renderCars()}
    </div>
  )
}

export default Train