import React, { useRef, useContext, useState } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'ScrollTrigger'
import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'
import Innovation from '../Innovation/Innovation'
import Projects from '../Projects/Projects'
import Services from '../Services/Services'
import Vision from '../Vision/Vision'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'
import BackgroundOrb from './BackgroundOrb'
import CityBackground from './CityBackground'
import ForegroundOrb from './ForegroundOrb'
// import InnovationImage from './InnovationImage'

export default function ScrollingSections() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#innovation',
          markers: false,
          scrub: 1,
          start: 'bottom bottom',
          end: 'bottom bottom',
          endTrigger: '#projects bottom',
        },
      })

      timeline.fromTo(
        '.mainOrb',
        {
          opacity: 0,
          width: '5%',
        },
        {
          opacity: 1,
          width: '40%',
        }
      )

      timeline.fromTo(
        '.secondaryOrb',
        {
          width: '10%',
        },
        {
          opacity: 0.2,
          width: '30%',
        }
      )
    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className="relative h-min overflow-visible" ref={wrapperRef}>
        {/* <InnovationImage /> */}
        <BackgroundOrb />
        <CityBackground />
        <ForegroundOrb />
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
