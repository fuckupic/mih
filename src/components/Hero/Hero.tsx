import { useRef, useState } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import CircleParticles from './CircleParticles'

import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const [progress, setProgress] = useState(0)
  const mainWrapper = useRef()
  const mainCircleRef = useRef()

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
            border: '10px solid rgba(0, 189, 199, 1)',
          },
          'start'
        )
    }, mainWrapper)
    return () => ctx.revert()
  }, [])

  return (
    <div
      className="section !h-[200vh] !pt-16 !relative !justify-start"
      id="hero"
      // @ts-ignore
      ref={mainWrapper}
    >
      <div className="heroSection p-8 lg:p-16 w-[100%] md:w-[70%] lg:w-1/2 sticky left-0 md:top-[13em] text-center flex flex-col items-center justify-center gap-4">
        <h3 className="introText font-tabletgothic z-[2] text-xl pointer-events-none">
          Mobility Innovation Hub Plzeň
        </h3>
        <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[2] pointer-events-none "></div>
        <h1 className="headline text-2xl lg:text-4xl font-campton font-bold z-[2] pointer-events-none">
          Budoucnost městské mobility vzniká v Plzni
        </h1>
        <button className="btn btn-sm btn-primary scrollDown z-[2]">
          Zjistit víc
        </button>
        <div
          // @ts-ignore
          ref={mainCircleRef}
          className="mainCircle bg-black flex justify-center items-center absolute centerAbsolute w-[100%] md:w-[80%] lg:w-[90%] z-[1] aspect-square rounded-full pointer-events-none"
        ></div>
        <CircleParticles width={3000} height={3000} progress={progress} />
      </div>
    </div>
  )
}
