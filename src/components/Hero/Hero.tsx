import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'ScrollTrigger'
import { CSSPlugin } from 'gsap/CSSPlugin'

import CircleParticles from './CircleParticles'

import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const mainWrapper = useRef<HTMLDivElement | null>(null)
  const mainCircleRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fadeInTl = gsap.timeline()
    gsap.set(['.introText', '.headline', 'canvas', '.btn'], { opacity: 0 })
    gsap.set('.separator', { width: 0 })
    fadeInTl.to('.separator', {
      width: '100%',
      duration: 2,
      ease: 'power3.inOut',
    })

    fadeInTl.fromTo(
      '.introText',
      { opacity: 0, transform: 'translateY(10px)' },
      {
        opacity: 1,
        duration: 1,
        transform: 'translateY(0)',
        ease: 'power3.Out',
      }
    )
    fadeInTl.fromTo(
      '.headline',
      { opacity: 0, transform: 'translateY(-10px)' },
      {
        opacity: 1,
        transform: 'translateY(0)',
        duration: 1,
        ease: 'power4.Out',
      },
      '-=1'
    )
    fadeInTl.fromTo(
      'canvas',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.inOut' }
    )
    fadeInTl.fromTo(
      '.btn',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power3.inOut' },
      '-=1'
    )
  }, [])

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          markers: false,
          scrub: true,
          pin: true,
          start: 'top top',
          endTrigger: '#innovation',
        },
      })
      tl.add('start')
        .fromTo(
          'canvas',
          {
            transform: 'scale(1) rotate(0deg)',
          },
          { transform: 'scale(0) rotate(90deg)' },
          'start'
        )

        .fromTo(
          '.mainCircle',
          {
            boxShadow: 'none',
            backgroundColor: 'black',
            border: '2px solid rgba(0, 189, 199, 0)',
          },
          {
            boxShadow: '0px 0px 100px rgba(0, 189, 199, 1)',
            backgroundColor: 'black',
            backdropFilter: 'blur(10px)',
            border: '6px solid rgba(0, 189, 199, 1)',
          },
          'start'
        )
    }, mainWrapper)
    return () => ctx.revert()
  }, [])

  const handleScrollToInnovation = () => {
    const innovationSection = document.getElementById('innovation')
    if (innovationSection) {
      innovationSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div
      className="section max-w-[100vw] !w-[100vw] !h-[200vh] !pt-16 !relative !justify-start"
      id="hero"
      ref={mainWrapper}
    >
      <div className="heroSection !z-10 p-8 lg:p-16 w-full max-w-[50%] lg:max-w-[50%] xl:max-w-[50%] 2xl:max-w-[40%] centerAbsolute sticky mx-auto text-center flex flex-col items-center justify-center gap-4">
        <div className="absolute centerAbsolute z-[3] w-[100%] md:w-[80%] flex flex-col items-center justify-center gap-2 md:gap-4">
          <h3 className="introText font-tabletgothic z-[2] text-sm sm:text-xl pointer-events-none">
            Mobility Innovation Hub Plzeň
          </h3>
          <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[2] pointer-events-none "></div>
          <h1 className="headline leading-tight sm:leading-normal text-lg sm:text-2xl lg:text-4xl font-campton font-bold z-[2] pointer-events-none">
            Budoucnost městské mobility vzniká v Plzni
          </h1>
          <a
            onClick={handleScrollToInnovation}
            className="btn btn-sm btn-primary scrollDown z-[2] opacity-100"
          >
            Zjistit víc
          </a>
        </div>
        <div
          ref={mainCircleRef}
          className="mainCircle max-w-[100vw] bg-black flex justify-center items-center absolute centerAbsolute w-[175%] sm:w-[133%] md:w-[125%] lg:w-[90%] z-[1] aspect-square xl:aspect-square rounded-full pointer-events-none"
        ></div>
        <CircleParticles />
      </div>
    </div>
  )
}
