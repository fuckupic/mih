import React, { useEffect, useState, useRef } from 'react'

import useWindowSize from '@rooks/use-window-size'
import ParticleImage, { ParticleOptions, forces } from 'react-particle-image'

const motionForce = (x: number, y: number) => {
  return forces.disturbance(x, y, 5)
}

const clickForce = () => {
  return forces.entropy(50)
}

const colorPairs = [
  { mainColor: [45, 214, 135], secondColor: [0, 189, 199] },
  { mainColor: [123, 108, 230], secondColor: [0, 189, 199] },
  { mainColor: [123, 108, 230], secondColor: [47, 65, 202] },
  { mainColor: [47, 65, 202], secondColor: [123, 108, 230] },
  { mainColor: [47, 65, 202], secondColor: [0, 189, 199] },
]

const getColorPair = (excludeIndex: number) => {
  let index
  do {
    index = Math.floor(Math.random() * colorPairs.length)
  } while (index === excludeIndex)
  return colorPairs[index]
}

const InnovationImage = () => {
  const [colorPair, setColorPair] = useState(getColorPair(-1))
  const [imageIndex, setImageIndex] = useState(1)
  const innerHeight = '800'
  const innerWidth = Number(innerHeight) * 1.5

  const particleOptions: ParticleOptions = {
    filter: ({ x, y, image }) => {
      const pixel = image.get(x, y)
      return pixel.b > 50
    },
    color: ({ x, y, image }) => {
      const pixel = image.get(x, y)
      const intensity = (pixel.r + pixel.g + pixel.b) / (3 * 255)

      const { mainColor, secondColor } = colorPair

      // Calculate the color based on the intensity
      const r = mainColor[0] * intensity + secondColor[0] * (1 - intensity)
      const g = mainColor[1] * intensity + secondColor[1] * (1 - intensity)
      const b = mainColor[2] * intensity + secondColor[2] * (1 - intensity)
      const a = 1 - intensity

      return `rgba(${r}, ${g}, ${b}, ${a})`
    },
    radius: () => Math.random() * 1.5 + 0.5,
    mass: () => 20,
    friction: () => 0.15,
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex % 8) + 1)
      setColorPair(getColorPair(colorPairs.indexOf(colorPair)))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <ParticleImage
      src={`images/vehicles${imageIndex}.png`}
      width={Number(innerWidth)}
      height={Number(innerHeight)}
      scale={0.75}
      entropy={10}
      maxParticles={10000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={clickForce}
      backgroundColor="transparent"
      className={`mainLight opacity-0 w-[40%] h-auto !z-0 fixed centerAbsolute pointer-events-none md:pointer-events-auto`}
    />
  )
}

export default InnovationImage
