import { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'ScrollTrigger'
import { MotionPathPlugin } from 'MotionPathPlugin'

import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

export default function Mobility() {
  const mainWrapper = useRef(null)

  useEffect(() => {
    const { set, timeline, to } = gsap
    const fadeInTl = timeline()

    set(['.introText', '.headline', '.heroSection canvas', '.btn'], {
      opacity: 0,
    })

    set('.separator', { width: 0 })

    fadeInTl.to('.separator', {
      width: '80%',
      duration: 1,
      ease: 'power3.inOut',
    })

    fadeInTl.fromTo(
      '.introText',
      { opacity: 0, y: 10 },
      { opacity: 1, duration: 1, y: 0, ease: 'power3.out' }
    )

    fadeInTl.fromTo(
      '.headline',
      { opacity: 0, y: -10 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
      '-=1'
    )

    fadeInTl.fromTo(
      '.heroSection canvas',
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power4.out' }
    )

    fadeInTl.fromTo(
      '.heroSection .btn',
      { opacity: 0 },
      { opacity: 1, duration: 0.1, ease: 'power4.out' },
      '-=1'
    )

    const orbAnimationConfig = {
      motionPath: {
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      ease: 'power1.inOut',
      repeat: -1,
      yoyo: true,
    }
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

      tl.add('start').fromTo(
        'canvas',
        { transform: 'scale(1) rotate(0deg)' },
        { transform: 'scale(0) rotate(90deg)' },
        'start'
      )
      // .fromTo(
      //   '.mainCircle',
      //   {
      //     boxShadow: 'none',
      //     backgroundColor: 'black',
      //     border: '2px solid rgba(0, 189, 199, 0)',
      //   },
      //   {
      //     boxShadow: '0px 0px 100px rgba(0, 189, 199, 1)',
      //     backgroundColor: 'black',
      //     backdropFilter: 'blur(10px)',
      //     border: '6px solid rgba(0, 189, 199, 1)',
      //   },
      //   'start'
      // )
    }, mainWrapper)
    return () => ctx.revert()
  }, [])

  return (
    <div
      className="section max-w-[100vw] !w-[100vw] !h-[100vh] !pt-16 !relative "
      id="hero"
      ref={mainWrapper}
    >
      <div className="heroSection !z-10 p-8 lg:p-16 w-full max-w-[90%]  2xl:max-w-[40%] sticky mx-auto text-center flex flex-col items-center justify-center gap-4">
        <div className="absolute centerAbsolute z-[3] w-[100%]  flex flex-col items-center justify-center gap-2 md:gap-4">
          <h1 className="headline  leading-tight sm:leading-normal sm:text-4xl lg:text-[10rem] font-campton z-[2] pointer-events-auto">
            mobility
          </h1>
        </div>
      </div>
    </div>
  )
}
