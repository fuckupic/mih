import React, { useRef, useContext, useState, useEffect } from 'react'
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
import axios from 'axios'

// import InnovationImage from './InnovationImage'

export default function ScrollingSections() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  const [data, setData] = useState<any>(null)

  useIsomorphicLayoutEffect(() => {
    axios
      .get('https://mih-admin.plzen.eu/wp-json/wp/v2/pages/2')
      .then((response) => {
        setData(response.data.acf)
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })

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
          opacity: 0.5,
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

  if (data === null) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="relative h-min overflow-visible" ref={wrapperRef}>
        <Innovation blockData={data.block_1} />
        <Projects blockData={data.block_2} />
        <Services blockData={data.block_3} />
        <Vision blockData={data.block_4} />
        <ContactForm />
        <Footer />
      </div>
    </>
  )
}
