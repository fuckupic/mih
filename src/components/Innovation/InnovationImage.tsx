import React from 'react'
import useWindowSize from '@rooks/use-window-size'
import ParticleImage, {
  ParticleOptions,
  Vector,
  forces,
  ParticleForce,
  ParticleImageProps,
} from 'react-particle-image'

const colors = [
  'rgba(0, 189, 199, 0.5)',
  'rgba(0, 189, 199, 1)',
  'rgba(0, 189, 199, 0.75)',
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
  return forces.entropy(50)
}

const InnovationImage = () => {
  const innerHeight = '600'
  const innerWidth = Number(innerHeight) * 1.5

  return (
    <ParticleImage
      src="images/train.png"
      width={Number(innerWidth)}
      height={Number(innerHeight)}
      scale={0.75}
      entropy={0}
      maxParticles={5000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      backgroundColor="transparent"
      className="absolute top-[20%] right-[40%] z-0"
    />
  )
}

export default InnovationImage
