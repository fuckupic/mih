import React, { useEffect, useState, useRef } from 'react'

import useWindowSize from '@rooks/use-window-size'
import ParticleImage, { ParticleOptions, forces } from 'react-particle-image'

const motionForce = (x: number, y: number) => {
  return forces.disturbance(x, y, 30)
}

const clickForce = () => {
  return forces.entropy(50)
}

// const colorPairs = [
//   { mainColor: [45, 214, 135], secondColor: [0, 189, 199] },
//   { mainColor: [123, 108, 230], secondColor: [0, 189, 199] },
//   { mainColor: [123, 108, 230], secondColor: [47, 65, 202] },
//   { mainColor: [47, 65, 202], secondColor: [123, 108, 230] },
//   { mainColor: [47, 65, 202], secondColor: [0, 189, 199] },
// ]

// const getColorPair = (excludeIndex: number) => {
//   let index
//   do {
//     index = Math.floor(Math.random() * colorPairs.length)
//   } while (index === excludeIndex)
//   return colorPairs[index]
// }

const ForegroundOrb = () => {
  return (
    <div className="top-0 left-0 z-[0] fixed w-[100%] h-[100%] flex items-center justify-center">
      <div className=" rounded-full secondaryOrb w-[0%] aspect-square opacity-40"></div>
      <div className=" rounded-full absolute logoOrb w-[50%] aspect-square"></div>
    </div>
  )
}

export default ForegroundOrb
