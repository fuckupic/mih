import { BlockData } from '../../types/dataTypes'

import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface ProjectProps {
  blockData: BlockData
}

interface Project {
  id: number
  title: { rendered: string }
  content: { rendered: string }
  imageUrl?: string
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
}

// Create a simple Modal component
const Modal: React.FC<{
  project: Project
  onClose: () => void
  setSelectedProject: (project: Project) => void
  projects: Project[]
}> = ({ project, onClose, setSelectedProject, projects }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleContactClick = () => {
    onClose()
    const formElement = document.getElementById('contact_form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleNextClick = () => {
    const currentIndex = projects.findIndex(
      (currentProject) => currentProject.id === project.id
    )
    const nextIndex = (currentIndex + 1) % projects.length
    setSelectedProject(projects[nextIndex])
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
    project._links &&
    project._links['wp:featuredmedia'] &&
    project._links['wp:featuredmedia'][0] &&
    project._links['wp:featuredmedia'][0].media_details &&
    project._links['wp:featuredmedia'][0].media_details.sizes &&
    project._links['wp:featuredmedia'][0].media_details.sizes.full &&
    project._links['wp:featuredmedia'][0].media_details.sizes.full.source_url
      ? project._links['wp:featuredmedia'][0].media_details.sizes.full
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
        <div className="project w-[100%] flex flex-row justify-between">
          <h4>MIH Projekt</h4>
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
              {project.title.rendered}
            </h3>
          </div>
          {project.imageUrl && (
            <img
              src={project.imageUrl}
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
              dangerouslySetInnerHTML={{ __html: project.content.rendered }}
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
              Další projekt
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const Projects: React.FC<ProjectProps> = ({ blockData }) => {
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await fetch(
        'https://mih-admin.plzen.eu/wp-json/wp/v2/projects'
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const servicesData = await response.json()
      console.log('Projects data:', servicesData)

      const updatedProjectsData = await Promise.all(
        servicesData.map(async (project: Project) => {
          if (
            project._links &&
            project._links['wp:featuredmedia'] &&
            project._links['wp:featuredmedia'][0] &&
            project._links['wp:featuredmedia'][0].href
          ) {
            console.log('Single project data:', project)
            console.log(
              'Project media details:',
              project._links['wp:featuredmedia'][0]
            )
            const mediaResponse = await fetch(
              project._links['wp:featuredmedia'][0].href
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
              return { ...project, imageUrl } // Attach the imageUrl to each project
            }
          }
          return project
        })
      )

      setProjects(updatedProjectsData)
    }

    fetchProjectData().catch((error) =>
      console.error('Error fetching services:', error)
    )
  }, [])

  return (
    <div className="section pointer-events-auto" id="projects">
      <div className="sectionWrapper flex-col flex-1 items-start gap-16">
        <div className="w-full md:w-[70%] relative flex flex-col gap-8 z-[1]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center justify-start">
              <h3 className="text-lg font-tabletgothic">
                {blockData.subtitle}
              </h3>
              <div className="badge badge-primary badge-outline">
                Aktuální projekty
              </div>
            </div>
            <div className="separator w-[90%] bg-primary border-1 border-solid h-1 z-[1] "></div>
            <h2 className="font-campton text-3xl font-semibold">
              {blockData.title}
            </h2>
            <div className="font-tabletgothic ">{blockData.description}</div>
          </div>
        </div>

        <div className="w-full lg:w-[100%] relative flex flex-col lg:flex-col gap-8 z-[1] !pointer-events-auto">
          {projects
            .slice(0)
            .reverse()
            .map((project) => (
              <div
                className="project projectCarousel gap-5 pointer-events-auto"
                key={project.id}
                onClick={() => setSelectedProject(project)}
              >
                <div className="from-primary to-lightblue cardGradient !opacity-10 pointer-events-none"></div>
                <h5 className="text-white pointer-events-none">MIH Projekt</h5>
                <div className="flex flex-col gap-2 pointer-events-none">
                  <div className="flex flex-col">
                    <h5>Projekt:</h5>
                    <h3 className="text-xl font-semibold">
                      {project.title.rendered}
                    </h3>
                  </div>
                  <div className="flex flex-col pointer-events-none">
                    <h5>Popis:</h5>
                    <p className="text-md">
                      {project.content.rendered
                        .replace(/<[^>]*>/g, '')
                        .substr(0, 100) + '...'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      {selectedProject && (
        <Modal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          setSelectedProject={setSelectedProject}
          projects={projects}
        />
      )}
    </div>
  )
}

export default Projects
