import React, { useState, useEffect } from 'react'

const CityBackground: React.FC = () => {
  const [windowHeight, setWindowHeight] = useState<number>(0)
  const [windowWidth, setWindowWidth] = useState<number>(0)

  return (
    <div className="top-0 left-0 z-[0] absolute w-[100%] h-[100%] flex items-start justify-center overflow-hidden">
      <div className="w-[100%] h-[100%] relative flex flex-row gap-[2] z-10">
        <div className="w-[49%] h-[100%] flex flex-col items-start justify-start relative gap-2">
          {/* svg image */}
          <img
            src="./images/cityGroup.svg"
            className="w-[100%] absolute right-0 top-0"
            alt=""
          />
        </div>
        <div className="w-[2%] h-[100%] flex flex-col relative gap-12"></div>
        <div className="w-[49%] h-[100%] flex flex-col items-end justify-start relative gap-2">
          {/* svg image vertically and horizontally flipped in tailwind*/}
          <img
            src="./images/cityGroup.svg"
            className="w-[100%] absolute left-0 top-0 transform rotate-180"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}

export default CityBackground
