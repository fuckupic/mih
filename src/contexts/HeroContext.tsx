import { createContext, RefObject } from 'react'

const HeroContext = createContext<RefObject<HTMLDivElement> | null>(null)

export default HeroContext
