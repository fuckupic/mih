import React, { useRef, useContext, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'ScrollTrigger'
import Hero from '../Hero/Hero'
import ScrollSmoother from 'ScrollSmoother'
import { SmootherContext } from '../../pages/SmootherContext'
import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'
import Innovation from '../Innovation/Innovation'
import Projects from '../Projects/Projects'
import Services from '../Services/Services'
import Vision from '../Vision/Vision'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'
import InnovationImage from './InnovationImage'
// import InteractiveBackground from '../InteractiveBackground'

export default function ScrollingSections() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '.mainLight',
          markers: true,
          scrub: 0.5,
          start: '#innovation',
          end: 'bottom bottom',
          endTrigger: '#projects',
        },
      })

      // Opacity 100 when entering the ScrollingSections
      timeline.to('.mainLight', { opacity: 1, duration: 1 })
    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className="relative h-min overflow-visible" ref={wrapperRef}>
        <InnovationImage />
        <Innovation />
        <Projects />
        <Services />
        <Vision />
        <ContactForm />
        <Footer />
      </div>
    </>
  )
}
