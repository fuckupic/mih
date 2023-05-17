import React, { useEffect, useState } from 'react'
import ParticleImage, { forces, ParticleOptions } from 'react-particle-image'

const colors = ['rgba(0, 189, 199, 0.5)', 'rgba(0, 189, 199, 1)']

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined as unknown as number,
    height: undefined as unknown as number,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}

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

const motionForce = () => {
  return forces.entropy(100)
}

const HeroParticles = () => {
  const { width, height } = useWindowSize()
  console.log(width, height)

  return (
    <ParticleImage
      src="images/circle2.png" // Replace this with the image source you want to use
      width={Number(width)}
      height={width > 480 ? Number(width) : Number(height)}
      scale={width / 1500 + 0.15}
      entropy={40}
      maxParticles={4000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      touchMoveForce={motionForce}
      backgroundColor="transparent"
      className="z-0 absolute pointer-events-none md:pointer-events-auto"
    />
  )
}

export default HeroParticles
