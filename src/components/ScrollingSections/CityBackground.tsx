import React, { useState, useEffect } from 'react'
import useDeviceType from '../../hooks/useDeviceType'

const CityBackground: React.FC = () => {
  const deviceType = useDeviceType()

  const cityBlockImage = (key: number) => {
    let src2 = './images/rightPart 3.svg'
    if (deviceType === 'mobile') {
      src2 = './images/rightPart.svg'
    } else if (deviceType === 'tablet') {
      src2 = './images/rightPart 2.svg'
    }
    return (
      <img
        key={key}
        src={src2}
        className="w-[100%] right-0 top-0 transform rotate-180"
        alt=""
      />
    )
  }

  const reversedCityBlockImage = (key: number) => {
    let src = './images/rightPart 3.svg'
    if (deviceType === 'mobile') {
      src = './images/rightPart.svg'
    } else if (deviceType === 'tablet') {
      src = './images/rightPart 2.svg'
    }
    return <img key={key} src={src} className="w-[100%] right-0 top-0" alt="" />
  }

  return (
    <div className="top-0 left-0 z-[0] absolute !w-[100%] !h-[100%] flex items-start justify-center overflow-hidden">
      <div className="!w-[100%] !h-[100%] relative flex flex-row gap-[2] z-10">
        <div className="w-[49%] h-[100%] flex flex-col items-start justify-start relative gap-2">
          {deviceType === 'mobile'
            ? Array.from({ length: 30 }, (_, i) => cityBlockImage(i))
            : Array.from({ length: 8 }, (_, i) => cityBlockImage(i))}
        </div>
        <div className="w-[2%] h-[100%] flex flex-col relative gap-12"></div>
        <div className="w-[49%] h-[100%] flex flex-col items-end justify-start relative gap-2">
          {deviceType === 'mobile'
            ? Array.from({ length: 30 }, (_, i) => reversedCityBlockImage(i))
            : Array.from({ length: 8 }, (_, i) => reversedCityBlockImage(i))}
        </div>
      </div>
    </div>
  )
}

export default CityBackground
