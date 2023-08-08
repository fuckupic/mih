import { copyLinkToClipboard } from '@/utils'
import { BlockData } from '../../types/dataTypes'
import { handleSmoothScroll } from '@/utils'
import { useRouter } from 'next/router'

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

const Modal: React.FC<{
  project: Project
  onClose: () => void
  setSelectedProject: (project: Project) => void
  projects: Project[]
}> = ({ project, onClose, setSelectedProject, projects }) => {
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
    const currentIndex = projects.findIndex(
      (currentProject) => currentProject.id === project.id
    )
    const nextIndex = (currentIndex + 1) % projects.length
    setSelectedProject(projects[nextIndex])
    router.push(`/?project_id=${projects[nextIndex].id}`, undefined, {
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
        <div className="p-8 py-4  border-[0.1px] rounded-t-lg border-primary bg-gradient-to-b from-black via-black  to-black project w-[100%] relative md:sticky md:top-0 z-[4]">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row justify-between ">
              <div className="flex flex-row gap-2 justify-start items-center">
                <button
                  onClick={() => copyLinkToClipboard(project.id)}
                  className="btn btn-primary btn-outline btn-sm copy_link"
                >
                  Copy 🔗
                </button>
                <h4>MIH Projekt</h4>
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
        <div className="relative p-8 max-w-[100%] flex flex-col gap-4 sm:flex-row items-center sm:justify-center justify-between ">
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
          <div className="flex flex-col gap-2 m-0 sm:w-[40%]">
            <h5>Název:</h5>
            <h3 className="text-3xl sm:text-4xl font-semibold">
              {project.title.rendered}
            </h3>
          </div>
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt="Featured Media"
              className="sm:w-[40%] sm:max-w-[40%] rounded-md modalCarousel"
            />
          )}
        </div>

        <div className="border-t rounded-b-lg border-primary p-8  w-[100%] flex flex-col relative gap-8">
          <div className=" flex flex-col gap-2 w-[100%]  max-w-[100%] ">
            <h5>Popis:</h5>
            <div
              className="text-md leading-relaxed p-0 modal-insight"
              dangerouslySetInnerHTML={{ __html: project.content.rendered }}
            />
          </div>
        </div>
        <div className="px-8 pb-8  relative flex flex-col sm:flex-row gap-4 w-[100%] max-w-[100%]">
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
  )
}

const Projects: React.FC<ProjectProps> = ({ blockData }) => {
  const router = useRouter()
  const RouterIdFromUrl = router.query.project_id

  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)

  useEffect(() => {
    if (RouterIdFromUrl) {
      handleSmoothScroll('projects') // Scroll to Projects section
      // ... Fetch projects if necessary ...
    }
  }, [RouterIdFromUrl])

  useEffect(() => {
    if (RouterIdFromUrl && projects.length > 0) {
      const projectToSelect = projects.find(
        (project) => project.id === parseInt(RouterIdFromUrl as string)
      )
      if (projectToSelect) {
        setSelectedProject(projectToSelect) // Open the modal with the proper project
      }
    }
  }, [projects, RouterIdFromUrl])

  useEffect(() => {
    const fetchProjectData = async () => {
      const response = await fetch(
        'https://mih-admin.plzen.eu/wp-json/wp/v2/projects'
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const projectsData = await response.json()
      console.log('Projects data:', projectsData)

      const updatedProjectsData = await Promise.all(
        projectsData.map(async (project: Project) => {
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
      console.error('Error fetching projects:', error)
    )
  }, [])

  return (
    <div className="section pointer-events-auto" id="projects">
      <div className="sectionWrapper flex-col flex-1 items-start gap-16">
        <div className="z-[2] w-full md:w-[70%] relative flex flex-col gap-8 z-[1]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center justify-start">
              <h3 className="text-lg font-tabletgothic">
                {blockData.subtitle}
              </h3>
              <div className="badge badge-primary badge-outline">
                Aktuální projekty
              </div>
            </div>
            <div className="separator w-[90%] bg-primary border-1 border-solid h-1 "></div>
            <h2 className="font-campton text-3xl font-semibold">
              {blockData.title}
            </h2>
            <div className="font-tabletgothic ">{blockData.description}</div>
          </div>
        </div>

        <div className="w-full lg:w-[100%] relative flex flex-col lg:flex-col gap-8 !pointer-events-auto">
          {projects
            .slice(0)
            .reverse()
            .map((project) => (
              <div
                className="project projectCarousel gap-5 pointer-events-auto"
                key={project.id}
                onClick={() => {
                  setSelectedProject(project)
                  router.push(`/?project_id=${project.id}`, undefined, {
                    shallow: true,
                  })
                  console.log('Selected project:', project)
                }}
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
