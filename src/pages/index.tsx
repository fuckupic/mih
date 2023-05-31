import React, { useContext } from 'react'
import Hero from '../components/Hero/Hero'

// import ScrollSmoother from 'ScrollSmoother'
import ScrollingSections from '../components/ScrollingSections/ScrollingSections'
import gsap from 'gsap'
// import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'
// import InteractiveBackground from '../components/InteractiveBackground'

const IndexPage: React.FC = () => {
  return (
    <>
      {/* <InteractiveBackground /> */}
      <Hero />
      <ScrollingSections />
    </>
  )
}

export default IndexPage
