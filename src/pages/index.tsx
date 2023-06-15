import Hero from '../components/Hero/Hero'
import CityBackground from '@/components/ScrollingSections/CityBackground'

import ScrollingSections from '../components/ScrollingSections/ScrollingSections'

const IndexPage: React.FC = () => {
  return (
    <>
      <Hero />
      <ScrollingSections />
      <CityBackground />
    </>
  )
}

export default IndexPage
