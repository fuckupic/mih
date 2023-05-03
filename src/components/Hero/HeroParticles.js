import React, { useRef, useEffect, useState, useMemo } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Points } from '@react-three/drei'
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

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

const HeroParticles = () => {
  const canvasRef = (useRef < HTMLDivElement) | (null > null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect()
      setSize({ width: rect.width, height: rect.height })
    }
  }, [])

  return (
    <div
      className="absolute w-full h-full aspect-square inset-0 z-0"
      ref={canvasRef}
    >
      <Canvas>
        <Particles size={size} />
      </Canvas>
    </div>
  )
}

export default HeroParticles

const Particles = ({ size }) => {
  const particlesRef = (useRef < THREE.Points) | (null > null)
  const { scene } = useThree()

  const { geometry, material } = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const particleCount = 1000000

    const aspectRatio = size.width / size.height
    const circleRadius = (size.width * 0.9) / 2

    // Generate particles
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = circleRadius * Math.sqrt(Math.random())
      const x = Math.cos(angle) * radius - size.width / 2
      const y = (Math.sin(angle) * radius) / aspectRatio - size.height / 2
      const z = 0

      vertices.push(x, y, z)
    }

    // Add position attribute
    const positionAttribute = new THREE.Float32BufferAttribute(vertices, 3)
    geometry.setAttribute('position', positionAttribute)

    // Set sizes attribute
    const sizes = new Float32Array(particleCount)
    for (let i = 0; i < particleCount; i++) {
      sizes[i] = Math.random() * 0.5
    }
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    // Set color attribute
    const colors = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount * 3; i++) {
      colors[i] = Math.random()
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const texture = createOrbTexture(
      'rgba(255, 255, 255, 1)',
      'rgba(123, 108, 230, 1)',
      'rgba(123, 108, 230, 0)'
    )

    const material = new THREE.PointsMaterial({
      size: 0.2,
      sizeAttenuation: true,
      vertexColors: true,
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    })

    return { geometry, material }
  }, [size])

  useEffect(() => {
    if (particlesRef.current) {
      scene.add(particlesRef.current)
    }
    return () => {
      if (particlesRef.current) {
        scene.remove(particlesRef.current)
      }
    }
  }, [scene])

  return <points ref={particlesRef} args={[geometry, material]} />
}
