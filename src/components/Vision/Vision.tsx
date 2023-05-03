import React from 'react'
import ContactForm from '../ContactForm/ContactForm'

const Vision: React.FC = () => {
  return (
    <div className="section !h-min">
      <div className="sectionWrapper justify-between flex-row flex-1 items-start gap-16">
        <div className="w-[30%] font-tabletgothic flex flex-col gap-4">
          <div className="flex flex-col gap-2 font-medium">
            <span>
              Nevíme, zda dokážeme řídit dopravu tak, aby byla vždy zcela
              plynulá.
            </span>
            <span>
              Nevíme, jestli budou lidé vlastnit automobily a budou je chtít
              řídit.
            </span>
            <span>
              Nevíme, jestli budeme dopravovat zboží či lidi leteckými drony.
            </span>
            <span className="font-semibold">
              Jedno ale víme: když nové nápady neuchopíme a nepodpoříme, nikdy
              se nezrealizují
            </span>
          </div>
        </div>
        <div className="w-[70%] relative flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-tabletgothic">Plzeň 2050</h3>
            <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[1] "></div>
            <h2 className="font-campton text-3xl font-semibold">
              Plzeň budoucnosti funguje na souladu autonomní a klasické dopravy
              v harmonii s přirozeným pohybem lidí. Je zdrojem řešení pro mnohá
              podobná města ve světě.
            </h2>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Vision
