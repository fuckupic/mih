import React from 'react'
import ParticleImage, { forces, ParticleOptions } from 'react-particle-image'

const colors = [
  'rgba(0, 189, 199, 0.5)',
  'rgba(0, 189, 199, 1)',
  'rgba(123, 108, 230, 1)',
]

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y)
    return pixel.b > 50
  },
  color: () => colors[Math.floor(Math.random() * colors.length)],
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 20,
  friction: () => 0.15,
}

const motionForce = () => {
  return forces.entropy(100)
}

const HeroParticles = () => {
  const innerHeight = '1000'
  const innerWidth = '1000'

  return (
    <ParticleImage
      src="images/circle2.png" // Replace this with the image source you want to use
      width={Number(innerWidth)}
      height={Number(innerHeight)}
      scale={0.75}
      entropy={40}
      maxParticles={5000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      backgroundColor="transparent"
      className="z-0 absolute pointer-events-none md:pointer-events-auto"
    />
  )
}

export default HeroParticles
