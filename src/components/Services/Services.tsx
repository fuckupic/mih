import { BlockData } from '../../types/dataTypes'

interface ServiceProps {
  blockData: BlockData
}

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Service {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  _links?: {
    'wp:featuredmedia'?: [
      {
        media_details?: {
          sizes?: {
            full?: {
              source_url?: string
            }
          }
        }
        source_url?: string
        href?: string
      }
    ]
  }
  imageUrl?: string
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

  const imageUrl =
    service._links &&
    service._links['wp:featuredmedia'] &&
    service._links['wp:featuredmedia'][0] &&
    service._links['wp:featuredmedia'][0].media_details &&
    service._links['wp:featuredmedia'][0].media_details.sizes &&
    service._links['wp:featuredmedia'][0].media_details.sizes.full &&
    service._links['wp:featuredmedia'][0].media_details.sizes.full.source_url
      ? service._links['wp:featuredmedia'][0].media_details.sizes.full
          .source_url
      : ''

  console.log('This is an image url', imageUrl)

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
        <div className="w-[100%] gap-4 flex flex-row items-end">
          <div className="w-[50%] max-w-[50%] flex flex-col gap-1">
            <h5>Název:</h5>
            <h3 className="text-2xl sm:text-4xl font-semibold">
              {service.title.rendered}
            </h3>
          </div>
          {service.imageUrl && (
            <img
              src={service.imageUrl}
              alt="Featured Media"
              className="w-[150%] max-w-[150%] sm:w-[50%] sm:max-w-[50%] rounded-md modalCarousel"
            />
          )}
        </div>
        <div className="w-[100%] h-[1px] bg-primary opacity-20"></div>
        <div className="w-[100%] flex flex-col sm:flex-row relative gap-8">
          <div className="flex flex-col gap-2 w-[100%] sm:w-[70%] max-w-[100%]  sm:max-w-[70%]">
            <h5>Popis:</h5>
            <div
              className="text-md leading-relaxed p-0 modal-insight"
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

const Services: React.FC<ServiceProps> = ({ blockData }) => {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    const fetchServiceData = async () => {
      const response = await fetch(
        'https://mih-admin.plzen.eu/wp-json/wp/v2/services'
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const servicesData = await response.json()
      console.log('Services data:', servicesData)

      const updatedServicesData = await Promise.all(
        servicesData.map(async (service: Service) => {
          if (
            service._links &&
            service._links['wp:featuredmedia'] &&
            service._links['wp:featuredmedia'][0] &&
            service._links['wp:featuredmedia'][0].href
          ) {
            console.log('Single service data:', service)
            console.log(
              'Service media details:',
              service._links['wp:featuredmedia'][0]
            )
            const mediaResponse = await fetch(
              service._links['wp:featuredmedia'][0].href
            )
            if (!mediaResponse.ok) {
              throw new Error(`HTTP error! status: ${mediaResponse.status}`)
            }
            const mediaData = await mediaResponse.json()
            if (
              mediaData.media_details &&
              mediaData.media_details.sizes &&
              mediaData.media_details.sizes.full &&
              mediaData.media_details.sizes.full.source_url
            ) {
              const imageUrl = mediaData.media_details.sizes.full.source_url
              console.log('Image URL:', imageUrl)
              return { ...service, imageUrl } // Attach the imageUrl to each service
            }
          }
          return service
        })
      )

      setServices(updatedServicesData)
    }

    fetchServiceData().catch((error) =>
      console.error('Error fetching services:', error)
    )
  }, [])

  return (
    <div className="section pointer-events-auto z-[3]">
      <div className="sectionWrapper relative flex-col flex-1 items-center justify-center text-center gap-8">
        <div className="w-[70%] justify-center relative flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-tabletgothic">{blockData.subtitle}</h3>
            <h2 className="font-campton text-3xl font-semibold">
              {blockData.title}
            </h2>
            <div className="font-tabletgothic ">{blockData.description}</div>
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
                onClick={() => {
                  setSelectedService(service)
                  console.log('Selected service:', service)
                }}
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
