import React from 'react'

import LineCode from '../Constants/LineCode'

import './Car.css'

const Car = ({lineCode}) => {
  return (
    <div className='car' style={{ backgroundColor: LineCode[lineCode] || 'black' }} />
  )
}

export default Car