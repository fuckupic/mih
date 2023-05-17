import React from 'react'
import useWindowSize from '@rooks/use-window-size'
import ParticleImage, { ParticleOptions, forces } from 'react-particle-image'

const particleOptions: ParticleOptions = {
  filter: ({ x, y, image }) => {
    const pixel = image.get(x, y)
    return pixel.b > 50
  },
  color: ({ x, y, image }) => {
    const pixel = image.get(x, y)
    const intensity = (pixel.r + pixel.g + pixel.b) / (3 * 255)

    return `rgba(123, 108, 230, ${1 - intensity})`
  },
  radius: () => Math.random() * 1.5 + 0.5,
  mass: () => 20,
  friction: () => 0.15,
}

const motionForce = (x: number, y: number) => {
  return forces.disturbance(x, y, 5)
}

const ProjectsImage = () => {
  const innerHeight = '600'
  const innerWidth = Number(innerHeight) * 1.5
  const { innerWidth: windowWidth } = useWindowSize()
  const leftPercentage =
    ((Number(windowWidth) / 2 + 10) / Number(windowWidth)) * 100

  return (
    <ParticleImage
      src="images/drone.png"
      width={Number(innerWidth)}
      height={Number(innerHeight)}
      scale={0.75}
      entropy={10}
      maxParticles={3000}
      particleOptions={particleOptions}
      mouseMoveForce={motionForce}
      backgroundColor="transparent"
      className={`absolute max-w-[100%] bottom-[0%] left-[${Number(
        leftPercentage
      )}%] z-0 pointer-events-none md:pointer-events-auto`}
    />
  )
}

export default ProjectsImage
