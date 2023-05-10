// components/ScrollingSections.tsx
import React, { useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'ScrollTrigger'
import Innovation from '../Innovation/Innovation'
import Projects from '../Projects/Projects'
import Services from '../Services/Services'
import Vision from '../Vision/Vision'
import ContactForm from '../ContactForm/ContactForm'
import Footer from '../Footer/Footer'
import InnovationImage from './InnovationImage'
import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollingSections() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          markers: false,
          scrub: 0.5,
          start: 'top center',
          end: 'bottom bottom',
        },
      })

      // Opacity 0 when leaving and not yet entered ScrollingSections
      timeline.to('.mainLight', { opacity: 0, duration: 0.5 })

      // Opacity 100 when entering the ScrollingSections
      timeline.to('.mainLight', { opacity: 1, duration: 2 })

      // Move and grow the .mainLight element
      timeline.to(
        '.mainLight',
        { xPercent: -50, yPercent: -50, scale: 1.5, duration: 1 },
        'Innovation+=1'
      )
      timeline.to('.mainLight', { xPercent: -25, duration: 1 }, 'Projects+=1')
      timeline.to(
        '.mainLight',
        { xPercent: 0, yPercent: 0, scale: 1, duration: 1 },
        'Services+=1'
      )
      timeline.to(
        '.mainLight',
        { xPercent: -15, yPercent: -25, duration: 1 },
        'Vision+=1'
      )
    }, wrapperRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="relative h-min" ref={wrapperRef}>
      <Innovation />
      <Projects />
      <Services />
      <Vision />
      <ContactForm />
      <Footer />
      <InnovationImage />
    </div>
  )
}
