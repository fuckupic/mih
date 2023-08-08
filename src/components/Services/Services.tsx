import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { copyLinkToClipboard } from '@/utils'
import { useRouter } from 'next/router'
import { handleSmoothScroll } from '@/utils'
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
  const router = useRouter()

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
    router.push(`/?service_id=${services[nextIndex].id}`, undefined, {
      shallow: true,
    })
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
      className="fixed top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center !z-[10]  backdrop:blur-[20px]"
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="modalCarousel2 overflow-auto flex flex-col max-w-[90%] sm:max-w-[60%] max-h-[90%]  text-left"
      >
        <div className="p-8 py-4  border-[0.1px] rounded-t-lg border-primary bg-gradient-to-b from-black via-black  to-black service w-[100%] relative sticky top-0 z-[4]">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-row gap-2 justify-start items-center">
                <button
                  onClick={() => copyLinkToClipboard(service.id)}
                  className="btn btn-primary btn-outline btn-sm copy_link"
                >
                  Copy 🔗
                </button>
                <h4>MIH Služba</h4>
              </div>
              <button
                onClick={onClose}
                className="close btn btn-error btn-circle text-base !capitalize "
              >
                X
              </button>
            </div>
          </div>
        </div>
        <div className="relative p-8 max-w-[100%] flex flex-col gap-4 sm:flex-row items-center justify-start ">
          <svg
            className="absolute left-0 top-0 z-[-1]"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="smallGrid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 8 0 L 0 0 0 8"
                  fill="none"
                  stroke="rgba(45,214,135,0.4)"
                  stroke-width="0.5"
                />
              </pattern>
              <pattern
                id="grid"
                width="80"
                height="80"
                patternUnits="userSpaceOnUse"
              >
                <rect width="80" height="80" fill="url(#smallGrid)" />
                <path
                  d="M 80 0 L 0 0 0 80"
                  fill="none"
                  stroke="rgba(45,214,135,0.2)"
                  stroke-width="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="flex flex-col gap-2 m-0">
            <h5>Název:</h5>
            <h3 className="text-3xl sm:text-4xl font-semibold">
              {service.title.rendered}
            </h3>
          </div>
        </div>

        <div className="border-t rounded-b-lg border-primary p-8  w-[100%] flex flex-col relative gap-4">
          <div className=" flex flex-col gap-2 w-[100%]  max-w-[100%] ">
            <h5>Popis:</h5>
            <div
              className="text-md leading-relaxed p-0 modal-insight"
              dangerouslySetInnerHTML={{ __html: service.content.rendered }}
            />
          </div>
          <div className=" flex flex-col gap-2 w-[100%]  max-w-[100%] ">
            {service.imageUrl && (
              <img
                src={service.imageUrl}
                alt="Featured Media"
                className="sm:w-[75%] sm:max-w-[100%] aspect-video rounded-md modalCarousel"
              />
            )}
          </div>
        </div>
        <div className="px-8 pb-16 sm:pb-8  relative flex flex-col sm:flex-row gap-4 w-[100%] max-w-[100%]">
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
  )
}

const Services: React.FC<ServiceProps> = ({ blockData }) => {
  const router = useRouter()
  const serviceIdFromUrl = router.query.service_id

  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  useEffect(() => {
    if (serviceIdFromUrl) {
      handleSmoothScroll('services') // Scroll to Services section
      // ... Fetch services if necessary ...
    } else {
      handleSmoothScroll('hero')
    }
  }, [serviceIdFromUrl])

  useEffect(() => {
    if (serviceIdFromUrl && services.length > 0) {
      const serviceToSelect = services.find(
        (service) => service.id === parseInt(serviceIdFromUrl as string)
      )
      if (serviceToSelect) {
        setSelectedService(serviceToSelect) // Open the modal with the proper service
      }
    }
  }, [services, serviceIdFromUrl])

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
    <div className="section pointer-events-auto" id="services">
      <div className="sectionWrapper relative flex-col flex-1 items-center justify-center text-center gap-8">
        <div className="z-[2]  w-[70%] justify-center relative flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-tabletgothic">{blockData.subtitle}</h3>
            <h2 className="font-campton text-3xl font-semibold">
              {blockData.title}
            </h2>
            <div className="font-tabletgothic ">{blockData.description}</div>
          </div>
        </div>
        <div className="z-[2] w-[100%] flex flex-col sm:flex-row gap-8 place-items-start">
          {services.length > 3 ? (
            <Slider
              slidesToShow={3}
              slidesToScroll={1}
              infinite
              dots
              arrows
              responsive={[
                {
                  breakpoint: 768,
                  settings: { slidesToShow: 1 },
                },
              ]}
            >
              {services
                .slice(0)
                .reverse()
                .map((service) => (
                  <div
                    className="service cardCarousel sm:aspect-square max-w-[100%] sm:max-w-[30%] pointer-events-auto"
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service)
                      router.push(`/?service_id=${service.id}`, undefined, {
                        shallow: true,
                      })
                      console.log('Selected service:', service)
                    }}
                  >
                    <div className="from-primary to-lightblue cardGradient !opacity-10 pointer-events-none"></div>
                    <h5 className="text-white pointer-events-none">
                      MIH Služba
                    </h5>
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
            </Slider>
          ) : (
            services
              .slice(0)
              .reverse()
              .map((service) => (
                <div
                  className="service cardCarousel sm:aspect-square max-w-[100%] sm:max-w-[30%] pointer-events-auto"
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service)
                    router.push(`/?service_id=${service.id}`, undefined, {
                      shallow: true,
                    })
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
              ))
          )}
        </div>

        {selectedService && (
          <Modal
            service={selectedService}
            onClose={() => {
              setSelectedService(null)
              router.push('/', undefined, { shallow: true })
            }}
            setSelectedService={setSelectedService}
            services={services}
          />
        )}
        <button
          className="z-[2] btn btn-primary"
          onClick={() => handleSmoothScroll('contact_form')}
        >
          Spojte se s námi
        </button>
      </div>
    </div>
  )
}

export default Services
