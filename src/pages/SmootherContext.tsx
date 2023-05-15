import React, { createContext } from 'react'
import ScrollSmoother from 'ScrollSmoother'

// A default smoother instance or null can be passed.
export const SmootherContext = createContext<ScrollSmoother | null>(null)
