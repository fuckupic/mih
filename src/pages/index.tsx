import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero/Hero'
import CityBackground from '@/components/ScrollingSections/CityBackground'
import BackgroundOrb from '@/components/ScrollingSections/BackgroundOrb'
import ForegroundOrb from '@/components/ScrollingSections/ForegroundOrb'
import Cursor from '@/components/Cursor/Cursor'
import ScrollingSections from '../components/ScrollingSections/ScrollingSections'

const IndexPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [renderKey, setRenderKey] = useState(Date.now())

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      setRenderKey(Date.now()) // Set new render key to force re-render
    }

    handleResize() // Check initial screen size
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div key={renderKey}>
      {!isMobile && <Cursor />}
      <Hero />
      <BackgroundOrb />
      <ForegroundOrb />
      <ScrollingSections />
      <CityBackground />
    </div>
  )
}

export default IndexPage
