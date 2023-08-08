import { handleSmoothScroll } from '@/utils'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'ScrollTrigger'
import { SplitText } from 'SplitText'
import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'
import exp from 'constants'
import CityBackground from '../ScrollingSections/CityBackground'
import useDeviceType from '../../hooks/useDeviceType'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Hero() {
  const deviceType = useDeviceType()
  const headlineRef = useRef<HTMLDivElement>(null)
  const mainWrapper = useRef<HTMLDivElement>(null)
  const hookRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const introOrb = document.querySelector('.introOrb')
      const words = document.querySelectorAll('.word')

      words.forEach((word, index) => {
        // Setting up the unique hook for each word
        const hookClass = index === 0 ? 'sticky' : `${word.classList[1]}Wrapper`

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: `.${hookClass}`,
            start: `${index === 0 ? ' top bottom' : `top bottom`}`,
            end: 'bottom center',
            scrub: true,
          },
        })

        // Animation for each word
        tl.fromTo(
          word,
          {
            opacity: index === 0 ? 1 : 0,
            scale: index === 0 ? 1 : 1.2,
          },
          {
            opacity: 1,
            scale: index === 0 ? 0.8 : 1,
            duration: 1,
            ease: 'power2.inOut',
          },
          0
        )
        tl.to(
          word,
          {
            opacity: 0,
            scale: 1.2,
            duration: 1,
            ease: 'power2.inOut',
          },
          '>'
        )
      })
    }, mainWrapper)
    return () => ctx.revert()
  }, [])

  return (
    <div
      className=" max-w-[100vw] !w-[100vw] !h-[300vh] sm:!h-[500vh] !relative  z-[1]"
      id="hero"
      ref={mainWrapper}
    >
      <div className=" sticky z-[2] top-0 left-0 w-[100vw] !h-[100vh] flex intems-center overflow-hidden justify-center ">
        <button
          className="btn text-s btn-secondary btn-circle btn-sm btn-outline absolute bottom-[25%] z-[1000]"
          onClick={() => handleSmoothScroll('innovation')}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
            <path
              className="fill-current"
              d="M12 17.414 3.293 8.707l1.414-1.414L12 14.586l7.293-7.293 1.414 1.414L12 17.414z"
            />
          </svg>
        </button>

        {/* <div className="rounded-full fixed introOrb w-[10rem] z-[2] aspect-square !opacity-100 "></div> */}
        <h1
          className=" headline leading-tight sm:leading-none  text-6xl sm:text-8xl lg:text-[10rem] font-campton z-[2] pointer-events-auto"
          ref={headlineRef}
        >
          <span className="word future" style={{ opacity: 0 }}>
            Budoucnost
          </span>
          <span className="word city" style={{ opacity: 0 }}>
            městské
          </span>
          <span className="word mobility" style={{ opacity: 0 }}>
            mobility
          </span>
          <span className="word borns" style={{ opacity: 0 }}>
            vzniká
          </span>
          <span className="word pilsen" style={{ opacity: 0 }}>
            v Plzni
          </span>
        </h1>
      </div>
      <div
        ref={hookRef}
        className="hook cityWrapper overflow-hidden relative  flex justify-center items-center"
      ></div>
      <div className="hook mobilityWrapper !w-[100%] max-w-[100vw]   relative">
        <div
          className="light absolute !h-[5rem] max-w-[100vw] !w-[100vw]"
          style={{ top: '50%' }}
        >
          {/* <div className="rounded-full absolute headlightOrb !w-[3rem] z-[0] aspect-square !opacity-100 bg-red-500"></div>
          <div className="rounded-full absolute headlightOrb !w-[1rem] z-[0] aspect-square !opacity-80 bg-green-500"></div>
          <div className="rounded-full absolute headlightOrb !w-[4rem] z-[0] aspect-square !opacity-80 bg-green-500"></div>
          <div className="rounded-full absolute headlightOrb !w-[4rem] z-[0] aspect-square !opacity-80 bg-green-500"></div>
          <div className="rounded-full absolute headlightOrb !w-[6rem] z-[0] aspect-square !opacity-60 bg-blue-500"></div> */}
        </div>
      </div>
      <div className="hook bornsWrapper "></div>
      <div className="hook !h-[100vh] pilsenWrapper overflow-hidden relative "></div>
    </div>
  )
}
