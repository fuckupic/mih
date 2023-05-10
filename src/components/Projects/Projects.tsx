import React from 'react'
import ProjectsImage from './ProjectsImage'

const Projects: React.FC = () => {
  return (
    <div className="section">
      <div className="sectionWrapper flex-col flex-1 items-start gap-16">
        <div className="w-full md:w-[70%] relative flex flex-col gap-8 z-[1] pointer-events-none">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center justify-start">
              <h3 className="text-lg font-tabletgothic">Inovativní Plzeň</h3>
              <div className="badge badge-primary badge-outline">
                Aktuální projekty
              </div>
            </div>
            <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[1] "></div>
            <h2 className="font-campton text-3xl font-semibold">
              Plzeň pečuje o rozsáhlý inovační ekosystém
            </h2>
            <div className="font-tabletgothic ">
              Inspirujeme mladou generaci k inovacím a experimentování a zároveň
              je propojujeme s mentory, podnikately, renomovanými firmami v
              regionu a investory. Inovativní Plzeň je kolébkou budoucích řešení
              městské mobility.
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[90%] relative flex flex-row gap-8 z-[1] pointer-events-none">
          <div className="cardCarousel aspect-video">
            <div className="from-primary to-lightblue cardGradient"></div>
            <h3 className="text-xl font-semibold">Projekt 1</h3>
            <p className="text-md">
              Toto je popis projektu 1. Může být až takto dlouhý. Pokud bude
              delší...
            </p>
          </div>
          <div className="cardCarousel aspect-video">
            <div className="from-lightblue to-secondary cardGradient "></div>
            <h3 className="text-xl font-semibold">Projekt 2</h3>
            <p className="text-md">
              Toto je popis projektu 1. Může být až takto dlouhý. Pokud bude
              delší...
            </p>
          </div>
          <div className="cardCarousel aspect-video">
            <div className=" from-secondary to-black  cardGradient"></div>
            <h3 className="text-xl font-semibold">Projekt 3</h3>
            <p className="text-md">
              Toto je popis projektu 1. Může být až takto dlouhý. Pokud bude
              delší...
            </p>
          </div>
        </div>
      </div>
      <ProjectsImage />
    </div>
  )
}

export default Projects
