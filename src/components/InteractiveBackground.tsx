import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Points } from '@react-three/drei'
import * as THREE from 'three'
import { createNoise3D } from 'simplex-noise'

function createOrbTexture(startColor, endColor, endColorTransparent) {
  if (typeof document !== 'undefined') {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256

    const context = canvas.getContext('2d')

    if (context) {
      // Create a circular clipping path
      context.beginPath()
      context.arc(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2,
        0,
        2 * Math.PI
      )
      context.closePath()
      context.clip()

      // Main gradient
      const mainGradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      )

      // Add colors to the main gradient
      mainGradient.addColorStop(0, startColor)
      mainGradient.addColorStop(0.7, endColor)
      mainGradient.addColorStop(0.9, endColorTransparent)

      context.fillStyle = mainGradient
      context.fillRect(0, 0, canvas.width, canvas.height)

      // Glow gradient
      const glowGradient = context.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2 - 10,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      )

      // Add colors to the glow gradient
      glowGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
      glowGradient.addColorStop(1, endColor.slice(0, -2) + '0.5)') // Add a color stop with higher alpha

      context.fillStyle = glowGradient
      context.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Load the gradient texture
    return new THREE.CanvasTexture(canvas)
  }
}

const greenOrbTexture = createOrbTexture(
  'rgba(255, 255, 255, 1)',
  'rgba(45, 214, 135, 1)',
  'rgba(45, 214, 135, 0)'
)
const blueOrbTexture = createOrbTexture(
  'rgba(255, 255, 255, 1)',
  'rgba(0, 189, 199, 1)',
  'rgba(0, 189, 199, 0)'
)
const lightBlueOrbTexture = createOrbTexture(
  'rgba(255, 255, 255, 1)',
  'rgba(47, 65, 202, 1)',
  'rgba(47, 65, 202, 0)'
)
const purpleOrbTexture = createOrbTexture(
  'rgba(255, 255, 255, 1)',
  'rgba(123, 108, 230, 1)',
  'rgba(123, 108, 230, 0)'
)

const Particles = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<THREE.Points | null>(null)
  const { scene } = useThree()

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  const noise = createNoise3D()
  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const particleCount = 2000

    const sizes = new Float32Array(particleCount)

    // Generate particles
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * 100 - 50
      const y = Math.random() * 100 - 50
      const z = Math.random() * 100 - 50
      vertices.push(x, y, z)
    }

    // Set sizes attribute
    for (let i = 0; i < particleCount; i++) {
      sizes[i] = Math.random() * 1
    }
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Set color attribute
    const colors = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      colors[i] = Math.random()
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Set position attribute
    geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(vertices, 3)
    )

    const orbTexture = createOrbTexture(
      'rgba(255, 255, 255, 1)',
      'rgba(0, 255, 255, 1)',
      'rgba(0, 255, 255, 0)'
    )

    // Create Points object with custom PointsMaterial
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.3,
      sizeAttenuation: true,
      vertexColors: true,
      map: orbTexture, // Add the gradient texture here
      transparent: true,
      alphaTest: 0.5,
    })

    return { geometry, material }
  }, [])

  const updateParticles = () => {
    const time = Date.now() * 0.0001
    const positions = geometry.getAttribute('position') as THREE.BufferAttribute

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i)
      const y = positions.getY(i)
      const z = positions.getZ(i)

      const noiseFactor = noise(x * 0.1, y * 0.1, z * 0.1 + time)

      positions.setXYZ(i, x + noiseFactor, y + noiseFactor, z + noiseFactor)
    }

    positions.needsUpdate = true
  }

  const animateParticles = () => {
    const time = Date.now() * 0.0001
    const colors = geometry.getAttribute('color') as THREE.BufferAttribute
    const sizes = geometry.getAttribute('size') as THREE.BufferAttribute

    for (let i = 0; i < colors.count; i++) {
      const colorValue = (1 + noise(i, 0, time)) / 2
      const intensity = Math.pow(colorValue, 4)
      colors.setXYZ(i, intensity, intensity, intensity)
      sizes.setX(i, 5 + intensity * 15)
    }

    colors.needsUpdate = true
    sizes.needsUpdate = true
  }

  useEffect(() => {
    const points = new THREE.Points(geometry, material)
    particlesRef.current = points
    scene.add(points)
    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      // Update particles position
      updateParticles()

      // Animate particles color and intensity
      animateParticles()

      // Schedule the next frame
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      scene.remove(points)
    }
  }, [])

  return <Points ref={particlesRef} args={[geometry, material]} />
}

const InteractiveBackground = () => {
  return (
    <Canvas
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block',
        position: 'fixed',
        zIndex: '0',
      }}
    >
      <Particles />
    </Canvas>
  )
}

export default InteractiveBackground
