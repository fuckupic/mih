import React from 'react'

const Innovation: React.FC = () => {
  return (
    <div className="section !mt-[14em]" id="innovation">
      <div className="sectionWrapper justify-start flex-col flex-1 items-start gap-16">
        <div className="!h-[min] flex justify-center lg:justify-between flex-col md:flex-row flex-1 items-start gap-16 z-[1] pointer-events-none">
          <div className="w-full lg:w-[30%] font-tabletgothic flex flex-col gap-4 z-[1] pointer-events-none">
            <h3 className="headline font-semibold text-lg font-tabletgothic">
              V jakých oblastech chceme rozvíjet naše inovace?
            </h3>
            <ul className="font-medium">
              <li>• nové koncepty dopravních prostředků</li>
              <li>• autonomní mobilita</li>
              <li>• nabíjecí systémy pro elektromobilitu</li>
              <li>• modelování a plánování dopravy</li>
              <li>• monitoring a řízení dopravy</li>
              <li>• sdílená doprava</li>
            </ul>
          </div>
          <div className="w-full lg:w-[70%] relative flex flex-col gap-8 z-[1] pointer-events-none">
            <div className="flex flex-col gap-2 pointer-events-none">
              <h3 className="text-lg font-tabletgothic">
                Inovace v městské a regionální dopravě
              </h3>
              <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[1] "></div>
              <h2 className="font-campton text-3xl font-semibold">
                Díváme se do vzdálenější budoucnosti, kdy inovativní řešení
                přinášejí lidem vyšší kvalitu života ve městech
              </h2>
            </div>
            <div className="w-[100%] flex flex-row gap-4 justify-end items-center pointer-events-auto">
              <button className="btn btn-primary btn-sm">Proč Plzeň?</button>
              <button className="btn btn-primary btn-outline btn-sm">
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
