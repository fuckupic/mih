import React, { useEffect, useState, useRef } from 'react'

import useWindowSize from '@rooks/use-window-size'
import ParticleImage, { ParticleOptions, forces } from 'react-particle-image'

const BackgroundOrb = () => {
  return (
    <div className="top-0 left-0 overflow-hidden z-[0] fixed !max-w-[100vw] w-[100%] !h-[100vh] flex items-center justify-center">
      <div className="rounded-full centerAbsolute mainOrb absolute !w-[80%] lg:!w-[40%] aspect-square "></div>
    </div>
  )
}

export default BackgroundOrb
