import { useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import CircleParticles from './CircleParticles'

import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const mainWrapper = useRef<HTMLDivElement | null>(null)
  const mainCircleRef = useRef<HTMLDivElement | null>(null)

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

  return (
    <div
      className="section max-w-[100vw] !w-[100vw] !h-[200vh] !pt-16 !relative !justify-start"
      id="hero"
      ref={mainWrapper}
    >
      <div className="heroSection p-8 lg:p-16 w-full max-w-[50%] lg:max-w-[50%] xl:max-w-[50%] 2xl:max-w-[40%] centerAbsolute sticky mx-auto text-center flex flex-col items-center justify-center gap-4">
        <div className="absolute centerAbsolute z-[3] w-[100%] md:w-[80%] flex flex-col items-center justify-center gap-2 md:gap-4">
          <h3 className="introText font-tabletgothic z-[2] text-sm sm:text-xl pointer-events-none">
            Mobility Innovation Hub Plzeň
          </h3>
          <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[2] pointer-events-none "></div>
          <h1 className="headline leading-tight sm:leading-normal text-lg sm:text-2xl lg:text-4xl font-campton font-bold z-[2] pointer-events-none">
            Budoucnost městské mobility vzniká v Plzni
          </h1>
          <button className="btn btn-sm btn-primary scrollDown z-[2]">
            Zjistit víc
          </button>
        </div>
        <div
          ref={mainCircleRef}
          className="mainCircle max-w-[100vw] bg-black flex justify-center items-center absolute centerAbsolute w-[200%] md:w-[100%] lg:w-[90%] z-[1] aspect-square xl:aspect-square rounded-full pointer-events-none"
        ></div>
        <CircleParticles />
      </div>
    </div>
  )
}
