import Hero from '../components/Hero/Hero'
import CityBackground from '@/components/ScrollingSections/CityBackground'
import BackgroundOrb from '@/components/ScrollingSections/BackgroundOrb'
import ForegroundOrb from '@/components/ScrollingSections/ForegroundOrb'

import ScrollingSections from '../components/ScrollingSections/ScrollingSections'

const IndexPage: React.FC = () => {
  return (
    <>
      <Hero />
      <BackgroundOrb />
      <ForegroundOrb />
      <ScrollingSections />
      <CityBackground />
    </>
  )
}

export default IndexPage
