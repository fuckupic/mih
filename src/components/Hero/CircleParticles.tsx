import React, { useEffect, useState } from 'react'
import ParticleImage, { forces, ParticleOptions } from 'react-particle-image'
import useWindowDimensions from '../../hooks/getWindowDimensions'

const colors = ['rgba(0, 189, 199, 0.5)', 'rgba(0, 189, 199, 1)']

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y)
    return pixel.b > 50
  },
  color: () => colors[Math.floor(Math.random() * colors.length)],
  radius: () => Math.random() * 1 + 0.5,
  mass: () => 20,
  friction: () => 0.15,
}

const motionForce = (x: number, y: number) => {
  return forces.disturbance(x, y, 30)
}

const CircleParticles = () => {
  const { width = 0, height = 0 } = useWindowDimensions()

  const calculatedHeight =
    width && height
      ? width > 1000
        ? width > 1500
          ? Number(width) * 0.5
          : Number(width) * 0.8
        : Number(width)
      : undefined

  const calculatedScale = calculatedHeight
    ? (calculatedHeight / 900) * 0.8 + 0.05
    : 1

  return (
    <ParticleImage
      src="images/circle2.png" // Replace this with the image source you want to use
      width={Number(width) > 1000 ? Number(width) * 0.8 : Number(width)}
      height={Number(height)}
      scale={calculatedScale}
      entropy={20}
      maxParticles={4000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      backgroundColor="transparent"
      className="z-0 absolute pointer-events-none md:pointer-events-auto"
    />
  )
}

export default CircleParticles
