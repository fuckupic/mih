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
import InnovationImage from './InnovationImage'

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
        '.mainLight',
        {
          opacity: 0,
          zIndex: -20,
          display: 'absolute !important',
        },
        {
          zIndex: 0,
          opacity: 1,
        }
      )
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
