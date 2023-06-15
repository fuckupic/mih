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

  // const handleScrollToInnovation = () => {
  //   const innovationSection = document.getElementById('innovation')
  //   if (innovationSection) {
  //     innovationSection.scrollIntoView({ behavior: 'smooth' })
  //   }
  // }

  useIsomorphicLayoutEffect(() => {
    const mainOrb = document.querySelector('.mainOrb')
    const logoOrb = document.querySelector('.logoOrb')
    const introOrb = document.querySelector('.introOrb')
    const words = document.querySelectorAll('.word')

    const headlights = document.querySelectorAll('.headlightOrb')

    const moveLights = (headlight: gsap.TweenTarget) => {
      const timeline = gsap.timeline({
        repeat: -1,
        yoyo: true,
      })

      const randomDuration = Math.random() * 5 + 3 // Between 3 and 8 seconds
      const randomY = Math.random() * 300 - 100 // Between -100 and 100 pixels

      timeline
        .fromTo(
          headlight,
          {
            x: '0',
            opacity: 0,
            autoAlpha: 0,
          },
          {
            x: '100vw',
            y: randomY,
            opacity: 1,
            autoAlpha: 1,
            duration: randomDuration,
            ease: 'sine.inOut',
          }
        )
        .to(headlight, { opacity: 0 })
    }

    headlights.forEach(moveLights)

    const expectoAnimation = gsap.fromTo(
      introOrb,
      {
        bottom: '0',
        opacity: 1,
        autoAlpha: 1,
        scale: 0.5,
        y: -50,
      },
      {
        y: 10,
        scale: 0,
        repeat: 4,
        autoAlpha: 0,
        duration: 1,
        opacity: 0,
        yoyo: true,
        ease: 'power1.inOut',
        bottom: '0',
      }
    )

    expectoAnimation.play()

    const heroIntro = gsap.fromTo(
      '.future',
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power1.inOut',
        paused: true,
      }
    )

    heroIntro.play()

    words.forEach((word, index) => {
      // Setting up the unique hook for each word
      const hookClass = index === 0 ? 'sticky' : `${word.classList[1]}Wrapper`

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: `.${hookClass}`,
          start: `${index === 0 ? ' top' : `top bottom`}`,
          end: 'bottom center',
          scrub: true,
        },
      })

      // Creating a timeline for each word with its own ScrollTrigger
      // Unique animations for each word
      switch (index) {
        case 0:
          // expectoAnimation.play()
          tl.to(word, { autoAlpha: 1, y: 0, scale: 1.1 })
          tl.to(
            word,
            {
              autoAlpha: 0,
              y: () =>
                hookRef.current
                  ? `${hookRef.current.offsetHeight / 4 - 100}`
                  : '0',
              ease: 'power1.out',
            },
            '>'
          )
          break
        case 1:
          tl.from(
            word,
            {
              autoAlpha: 0,
              opacity: 0,
              y: () =>
                hookRef.current
                  ? `-${hookRef.current.offsetHeight / 4 - 100}`
                  : '0',
              duration: 0.5,
              ease: 'power1.out',
            },
            0
          )
          tl.to(word, { autoAlpha: 1, y: 0, ease: 'none' }, '<')
          tl.to(word, { y: 0, scale: 1.5, ease: 'power2.out' }, '>')
          tl.to(word, { autoAlpha: 0 }, '>')
          break
        case 2:
          tl.fromTo(
            word,
            {
              autoAlpha: 0,
              y: 0,
              scale: 1.5,
              ease: 'power1.inOut',
            },
            { autoAlpha: 1, scale: 1 }
          )
          tl.to(word, { autoAlpha: 1, y: 50, ease: 'power1.in' }, '>')
          tl.to(
            word,
            {
              autoAlpha: 1,
              y: () =>
                hookRef.current
                  ? `-${hookRef.current.offsetHeight / 4 - 100}`
                  : '0',
              ease: 'power1.out',
            },
            '>'
          )
          tl.to(word, { autoAlpha: 0 }, '>')

          break
        case 3:
          tl.fromTo(
            word,
            {
              autoAlpha: 0,
              opacity: 0,
              y: 100,
              ease: 'power1.inOut',
            },
            { autoAlpha: 1, opacity: 1, y: 0, scale: 1.1 }
          )
          tl.to(word, { autoAlpha: 1, y: 0, ease: 'power1.in' }, '>')
          tl.to(
            word,
            {
              autoAlpha: 0,
              y: () =>
                hookRef.current
                  ? `-${hookRef.current.offsetHeight / 4 - 100}`
                  : '0',
              ease: 'power1.out',
            },
            '>'
          )
          tl.to(logoOrb, { autoAlpha: 1, opacity: 1, ease: 'power1.in' }, '<')
          tl.to(logoOrb, { autoAlpha: 1, scale: 1, ease: 'power1.in' }, '>')

          break
        case 4:
          tl.to(word, { autoAlpha: 1, opacity: 1 }, 0)
          tl.to(
            mainOrb,
            {
              opacity: 1,
              scale: 0.5,
              ease: 'power3.inOut',
            },
            0 // Start at the same time as the word animation
          )
          tl.to(mainOrb, {
            opacity: 1,
            scale: 1,
            ease: 'power3.inOut',
          })
          tl.to(
            mainOrb,
            {
              opacity: 0.5,
              scale: 1,
              ease: 'power3.inOut',
            },
            '<'
          )
          tl.to(word, { autoAlpha: 0, opacity: 0 }, '>')
          break
      }

      // Fade-out
      tl.to(
        word,
        { autoAlpha: 0, ease: 'power2.inOut' },
        1 // starts at the end of the timeline
      )
    })
  }, [])

  return (
    <div
      className=" max-w-[100vw] !w-[100vw] !h-[500vh] !relative "
      id="hero"
      ref={mainWrapper}
    >
      <div className="hook sticky z-[2] top-0 left-0 w-[100vw] h-[100vh] flex intems-center justify-center">
        <div className="rounded-full fixed introOrb w-[10rem] z-[2] aspect-square !opacity-100"></div>
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
        className="hook cityWrapper overflow-hidden relative !h-[100vh] flex justify-center items-center"
      >
        {/* object svg */}
        <div className="rounded-full absolute cityOrb !w-[40rem] z-[0] aspect-square !opacity-100"></div>
        <img
          src="./images/cityFrontBackground.svg"
          className=" z-[0] !w-[200%] sm:w-![100vw] absolute bottom-0"
          alt=""
        />
      </div>
      <div className="hook mobilityWrapper !w-[100%] max-w-[100vw]  !h-[100vh] relative">
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
      <div className="hook bornsWrapper !h-[100vh]"></div>
      <div className="hook pilsenWrapper overflow-hidden relative !h-[100vh]">
        <div className="w-[100%] h-[100%] absolute flex flex-row gap-[2] !z-[1]">
          <div className="w-[49%] h-[100%] flex flex-col items-start justify-start relative gap-2">
            <img src="./images/rightPart 3.svg" alt="" />
          </div>
          <div className="w-[2%] h-[100%] flex flex-col relative gap-12"></div>
          <div className="w-[49%] h-[100%] flex flex-col items-end justify-start relative gap-2">
            <img
              src="./images/rightPart 3.svg"
              className="right-0 top-0 transform rotate-180"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
