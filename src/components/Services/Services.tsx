import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Service {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  _embedded?: {
    'wp:featuredmedia'?: [
      {
        media_details?: {
          sizes?: {
            medium?: {
              source_url?: string
            }
          }
        }
        source_url?: string
      }
    ]
  }
}

const Modal: React.FC<{
  service: Service
  onClose: () => void
  setSelectedService: (service: Service) => void
  services: Service[]
}> = ({ service, onClose, setSelectedService, services }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleContactClick = () => {
    onClose()
    const formElement = document.getElementById('contact_form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNextClick = () => {
    const currentIndex = services.findIndex(
      (currentService) => currentService.id === service.id
    )
    const nextIndex = (currentIndex + 1) % services.length
    setSelectedService(services[nextIndex])
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3 }
    )
  }, [])

  const featuredMedia = service._embedded?.['wp:featuredmedia']?.[0] ?? null
  const mediaUrl =
    featuredMedia?.media_details?.sizes?.medium?.source_url ||
    featuredMedia?.source_url ||
    ''

  console.log(mediaUrl)

  return (
    <div
      onClick={handleOutsideClick}
      className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center !z-[9999] backdrop:blur-[5px]"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="modalCarousel flex flex-col gap-6 bg-black p-8 max-w-[90%] max-h-[90%] overflow-auto  text-left"
      >
        <div className="service w-[100%] flex flex-row justify-between">
          <h4>MIH Služba</h4>
          <button
            onClick={onClose}
            className="btn btn-error btn-sm !capitalize"
          >
            Zavřít
          </button>
        </div>
        <div className="w-[100%] h-[1px] bg-primary opacity-20"></div>
        <div className="w-[100%] flex flex-row items-end">
          <div className="w-[50%] max-w-[50%] flex flex-col gap-1">
            <h5>Název:</h5>
            <h3 className="text-2xl sm:text-4xl font-semibold">
              {service.title.rendered}
            </h3>
          </div>
          {mediaUrl && (
            <img
              src={mediaUrl}
              alt="Featured Media"
              className="w-[50%] max-w-[50%] rounded-lg modalCarousel"
            />
          )}
        </div>
        <div className="w-[100%] h-[1px] bg-primary opacity-20"></div>
        <div className="w-[100%] flex flex-col sm:flex-row relative gap-8">
          <div className="flex flex-col gap-2 w-[100%] sm:w-[70%] max-w-[100%]  sm:max-w-[70%]">
            <h5>Popis:</h5>
            <div
              className="text-md leading-relaxed p-0"
              dangerouslySetInnerHTML={{ __html: service.content.rendered }}
            />
          </div>
          <div className="flex flex-col gap-4 w-[100%] sm:w-[30%] max-w-[100%] sm:max-w-[30%]">
            <button
              id="modal_contact"
              className="btn btn-primary"
              onClick={handleContactClick}
            >
              Kontaktujte nás
            </button>
            <button
              id="modal_next"
              className="btn btn-white btn-outline"
              onClick={handleNextClick}
            >
              Další služba
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    fetch('https://mihplzen.k8s-dev.plzen.eu/wp-json/wp/v2/services?_embed')
      .then((response) => response.json())
      .then((data) => setServices(data))
  }, [])
  return (
    <div className="section pointer-events-auto z-[3]">
      <div className="sectionWrapper relative flex-col flex-1 items-center justify-center text-center gap-8">
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
          {services
            .slice(0)
            .reverse()
            .map((service) => (
              <div
                className="service cardCarousel sm:aspect-square max-w-[100%] sm:max-w-[30%] pointer-events-auto"
                key={service.id}
                onClick={() => setSelectedService(service)}
              >
                <div className="from-primary to-lightblue cardGradient !opacity-10 pointer-events-none"></div>
                <h5 className="text-white pointer-events-none">MIH Služba</h5>
                <div className="flex flex-col gap-4 pointer-events-none">
                  <div className="flex flex-col">
                    <h5>Služba:</h5>
                    <h3 className="text-xl font-semibold">
                      {service.title.rendered}
                    </h3>
                  </div>
                  <div className="flex flex-col pointer-events-none">
                    <h5>Popis:</h5>
                    <p className="text-md">
                      {service.content.rendered
                        .replace(/<[^>]*>/g, '')
                        .substr(0, 100) + '...'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {selectedService && (
          <Modal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            setSelectedService={setSelectedService}
            services={services}
          />
        )}
        <button className="btn btn-primary pointer-events-auto">
          Spojte se s námi
        </button>
      </div>
    </div>
  )
}

export default Services
