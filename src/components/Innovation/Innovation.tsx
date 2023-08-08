import Link from 'next/link'
import { BlockData } from '../../types/dataTypes'
import { handleSmoothScroll } from '@/utils'

interface InnovationProps {
  blockData: BlockData
}

const Innovation: React.FC<InnovationProps> = ({ blockData }) => {
  return (
    <div className="section " id="innovation">
      <div className="sectionWrapper justify-start flex-col flex-1 items-start gap-16">
        <div className="!h-[min] flex justify-center lg:justify-between flex-col md:flex-row flex-1 items-start gap-16 z-[1] pointer-events-auto">
          <div className="w-full lg:w-[30%] font-tabletgothic flex flex-col gap-4 z-[1] pointer-events-auto innovation-text">
            <div dangerouslySetInnerHTML={{ __html: blockData.left_col }} />
          </div>
          <div className="w-full lg:w-[70%] relative flex flex-col gap-8 z-[1] pointer-events-auto">
            <div className="flex flex-col gap-2 pointer-events-auto">
              <h3 className="text-lg font-tabletgothic">
                {blockData.subtitle}
              </h3>
              <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[1] "></div>
              <h2 className="font-campton text-3xl font-semibold">
                {blockData.title}
              </h2>
            </div>
            <div className="w-[100%] flex flex-row gap-4 justify-start items-center pointer-events-auto">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleSmoothScroll('projects')}
              >
                Proč Plzeň?
              </button>
              <button
                className="btn btn-primary btn-outline btn-sm"
                onClick={() => handleSmoothScroll('services')}
              >
                Co nabízíme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Innovation
