import { BlockData } from '../../types/dataTypes'

interface VisionProps {
  blockData: BlockData
}

import React from 'react'
import ContactForm from '../ContactForm/ContactForm'

const Vision: React.FC<VisionProps> = ({ blockData }) => {
  return (
    <div className="section !h-min pointer-events-auto z-[2]">
      <div className="sectionWrapper justify-between flex-col sm:flex-row  flex-1 items-start gap-16">
        <div className="w-full sm:w-[30%] font-tabletgothic flex flex-col gap-4">
          <div className="flex flex-col gap-2 font-medium">
            <div dangerouslySetInnerHTML={{ __html: blockData.left_col }} />
          </div>
        </div>
        <div className="w-full sm:w-[70%] relative flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-tabletgothic">{blockData.subtitle}</h3>
            <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[2] "></div>
            <h2 className="font-campton text-3xl font-semibold">
              {blockData.title}
            </h2>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Vision
