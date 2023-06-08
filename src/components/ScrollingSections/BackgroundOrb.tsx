import React, { useEffect, useState, useRef } from 'react'

import useWindowSize from '@rooks/use-window-size'
import ParticleImage, { ParticleOptions, forces } from 'react-particle-image'

const BackgroundOrb = () => {
  return (
    <div className="top-0 left-0 z-[0] fixed w-[100%] h-[100%] flex items-center justify-center">
      <div className=" rounded-full mainOrb w-[200%] lg:w-[40%] aspect-square "></div>
    </div>
  )
}

export default BackgroundOrb
