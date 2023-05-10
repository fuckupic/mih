// pages/index.tsx
import React from 'react'
import Hero from '../components/Hero/Hero'
import ScrollingSections from '../components/ScrollingSections/ScrollingSections'
import InteractiveBackground from '../components/InteractiveBackground'

const IndexPage: React.FC = () => {
  return (
    <>
      <InteractiveBackground />
      <Hero />
      <ScrollingSections />
    </>
  )
}

export default IndexPage
