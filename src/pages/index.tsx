import React, { useEffect, useState } from 'react'
import Hero from '../components/Hero/Hero'
import CityBackground from '@/components/ScrollingSections/CityBackground'
import BackgroundOrb from '@/components/ScrollingSections/BackgroundOrb'
import ForegroundOrb from '@/components/ScrollingSections/ForegroundOrb'
import { useIsomorphicLayoutEffect } from '../../helpers/isomorphicEffect'

import Cursor from '@/components/Cursor/Cursor'

import ScrollingSections from '../components/ScrollingSections/ScrollingSections'

const IndexPage: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize() // Check initial screen size
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      {!isMobile && <Cursor />}
      <Hero />
      <BackgroundOrb />
      <ForegroundOrb />
      <ScrollingSections />
      <CityBackground />
    </>
  )
}

export default IndexPage
