import React from 'react'
import Hero from '../components/Hero/Hero'
import Innovation from '../components/Innovation/Innovation'
import Projects from '../components/Projects/Projects'
import Services from '../components/Services/Services'
import Vision from '../components/Vision/Vision'
import ContactForm from '../components/ContactForm/ContactForm'
import Footer from '../components/Footer/Footer'
import InteractiveBackground from '../components/InteractiveBackground'

const IndexPage: React.FC = () => {
  return (
    <>
      <InteractiveBackground />
      <Hero />
      <Innovation />
      <Projects />
      <Services />
      <Vision />
      <ContactForm />
      <Footer />
    </>
  )
}

export default IndexPage
