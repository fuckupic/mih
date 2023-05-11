import React from 'react'

const Services: React.FC = () => {
  return (
    <div className="section pointer-events-none">
      <div className="sectionWrapper relative flex-col flex-1 items-center justify-center text-center gap-16">
        <div className="w-[70%] justify-center relative flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-tabletgothic">Naše služby</h3>
            <h2 className="font-campton text-3xl font-semibold">
              Co nabízí MIH Plzeň
            </h2>
            <div className="font-tabletgothic ">
              Inspirujeme mladou generaci k inovacím a experimentování a zároveň
              je propojujeme s mentory, podnikately, renomovanými firmami v
              regionu a investory. Inovativní Plzeň je kolébkou budoucích řešení
              městské mobility.
            </div>
          </div>
        </div>
        <div className="w-[100%] flex flex-col sm:flex-row  gap-8 place-items-start">
          <div className="cardCarousel sm:aspect-square ">
            <div className="from-primary to-lightblue cardGradient !opacity-10"></div>
            <h3 className="text-xl font-semibold">
              Hledání dodavatelů nových řešení
            </h3>
            <p className="text-md">
              Dokážeme propojit inovátory s realizátory.
            </p>
          </div>
          <div className="cardCarousel sm:aspect-square">
            <div className="from-lightblue to-secondary cardGradient !opacity-10"></div>
            <h3 className="text-xl font-semibold">
              Přenos nových řešení do komerční praxe
            </h3>
            <p className="text-md">Pomáháme inovacím dostat se na trh.</p>
          </div>
          <div className="cardCarousel sm:aspect-square">
            <div className=" from-secondary to-transparent cardGradient !opacity-10"></div>
            <h3 className="text-xl font-semibold">
              Komunikace s investory a mentory
            </h3>
            <p className="text-md">
              Pomáháme inovativním startupům definovat a rozvíjet své produkty a
              získávat financování.
            </p>
          </div>
        </div>
        <button className="btn btn-primary pointer-events-auto">
          Spojte se s námi
        </button>
      </div>
    </div>
  )
}

export default Services
