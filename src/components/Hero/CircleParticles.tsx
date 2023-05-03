import React, { useEffect, useRef } from 'react'
import canvasSketch from 'canvas-sketch'
import random from 'canvas-sketch-util/random'
import { createNoise2D } from 'simplex-noise'
import { lerp } from 'canvas-sketch-util/math'

const CircleParticles = ({ width, height, progress }) => {
  const canvasRef = useRef()

  const particles = []
  const noise2D = createNoise2D(random.value)
  const scaleFactor = 0.005
  const cursor = { x: 9999, y: 9999 }

  const onMouseMove = (e) => {
    const x =
      (e.offsetX / canvasRef.current.offsetWidth) * canvasRef.current.width
    const y =
      (e.offsetY / canvasRef.current.offsetHeight) * canvasRef.current.height

    cursor.x = x
    cursor.y = y
  }

  const onMouseUp = () => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)

    cursor.x = 9999
    cursor.y = 9999
  }

  const sketch = ({ context }) => {
    const numParticles = 10000

    class Particle {
      constructor(x, y, radius) {
        this.x = x
        this.y = y
        this.radius = radius
        this.baseRadius = radius // Store the initial radius
        this.color = this.getColor()
        this.ax = 0
        this.ay = 0
        this.minDist = 1000
        this.pushFactor = 0.1
        this.destination = { x: width / 2, y: height / 2 }
        this.delay = random.range(0, 1)
      }

      getColor() {
        const noiseValue =
          (noise2D(this.x * scaleFactor, this.y * scaleFactor) + 1) / 2
        const color1 = 'rgba(0, 189, 199, 1)'
        const color2 = 'rgba(0, 189, 199, 1)'
        const color3 = 'rgba(123, 108, 230, 1)'

        if (noiseValue < 0.5) {
          return lerpColor(color1, color2, noiseValue * 2)
        } else {
          return lerpColor(color2, color3, (noiseValue - 0.5) * 2)
        }
      }

      update() {
        let dx, dy, dd, distDelta

        dx = this.x - cursor.x
        dy = this.y - cursor.y
        dd = Math.sqrt(dx * dx + dy * dy)

        distDelta = this.minDist - dd

        if (dd < this.minDist) {
          // Calculate the distance ratio, which will be used to grow and enlighten the particles
          distDelta = 1 - dd / this.minDist

          // Grow the particle's radius based on the distance ratio
          this.radius = this.baseRadius * (1 + distDelta)

          // Update the particle's color by increasing the alpha value based on the distance ratio
        } else {
          // Reset the particle's radius and color when it's not affected by the cursor
          this.radius = this.baseRadius
        }

        this.x += this.ax
        this.y += this.ay

        // Reset acceleration values for the next update
        this.ax = 0
        this.ay = 0
      }

      draw(context) {
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        context.fillStyle = this.color
        context.fill()
      }
    }

    const lerpColor = (color1, color2, t) => {
      const c1 = parseColor(color1)
      const c2 = parseColor(color2)
      const r = lerp(c1[0], c2[0], t)
      const g = lerp(c1[1], c2[1], t)
      const b = lerp(c1[2], c2[2], t)
      const a = lerp(c1[3], c2[3], t)
      return `rgba(${r},${g},${b},${a})`
    }

    const parseColor = (color) => {
      const match = color.match(
        /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/
      )
      return match.slice(1).map(Number)
    }

    for (let i = 0; i < numParticles; i++) {
      const radius = random.range(1, 10)
      const angle = random.range(0, Math.PI * 2)
      const distanceFromCenter = random.range(0, Math.min(width, height) / 2)
      const noise = noise2D(
        (width / 2 + distanceFromCenter * Math.cos(angle)) * scaleFactor,
        (height / 2 + distanceFromCenter * Math.sin(angle)) * scaleFactor
      )
      const deformation = lerp(0.8, 1.2, (noise + 1) / 2)
      const x = width / 2 + distanceFromCenter * deformation * Math.cos(angle)
      const y = height / 2 + distanceFromCenter * deformation * Math.sin(angle)

      const particle = new Particle(x, y, radius)
      particles.push(particle)
    }

    return (props) => {
      context.fillStyle = 'black'
      context.fillRect(0, 0, width, height)

      particles.forEach((particle) => {
        particle.draw(context)
        particle.update()
      })
    }
  }

  useEffect(() => {
    const settings = {
      dimensions: [width, height],
      animate: true,
      canvas: canvasRef.current,
    }

    canvasSketch(sketch, settings)

    canvasRef.current.addEventListener('mousemove', onMouseMove)

    return () => {
      canvasRef.current.removeEventListener('mousemove', onMouseMove)
    }
  }, [width, height])

  return (
    <canvas
      style={{ position: 'absolute', zIndex: 0, transformOrigin: 'center' }}
      ref={canvasRef}
      width={width}
      height={height}
    />
  )
}

export default CircleParticles
