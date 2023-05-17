import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface Project {
  id: number
  title: { rendered: string }
  content: { rendered: string }
}

// Create a simple Modal component
const Modal: React.FC<{ project: Project; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close the modal when escape key is pressed
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

  // Close the modal when user clicks outside of the modal
  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose()
    }
  }

  // Add fadeIn animation with GSAP
  useEffect(() => {
    gsap.fromTo(
      modalRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.3 }
    )
  }, [])

  return (
    <div
      onClick={handleOutsideClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
      }}
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()} // Prevent event bubbling up to the outside click handler
        className="modalCarousel flex flex-col gap-8 "
        style={{
          backgroundColor: 'black',
          padding: '20px',
          maxWidth: '90%',
          maxHeight: '90%',
          overflow: 'auto',
        }}
      >
        <h3 className="text-xl font-semibold">{project.title.rendered}</h3>
        <p
          className="text-md leading-relaxed"
          dangerouslySetInnerHTML={{ __html: project.content.rendered }}
        />
        <button onClick={onClose} className="btn btn-success btn-sm">
          Zavřít
        </button>
      </div>
    </div>
  )
}

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [selectedProject, setSelectedProject] = useState<any>(null)

  useEffect(() => {
    fetch('https://mihplzen.k8s-dev.plzen.eu/wp-json/wp/v2/projects')
      .then((response) => response.json())
      .then((data) => setProjects(data))
  }, [])

  return (
    <div className="section pointer-events-none" id="projects">
      {/* ... */}
      <div className="w-full lg:w-[90%] relative flex flex-col lg:flex-row gap-8 z-[1] !pointer-events-auto">
        {projects
          .slice(0)
          .reverse()
          .map((project) => (
            <div
              className="cardWrapper cardCarousel lg:aspect-video"
              key={project.id}
              onClick={() => setSelectedProject(project)}
            >
              <h3 className="text-2xl font-semibold">
                {project.title.rendered}
              </h3>
              <p className="text-md">
                {/* Trim the content to the first 100 characters */}
                {project.content.rendered
                  .replace(/<[^>]*>/g, '')
                  .substr(0, 100) + '...'}
              </p>
            </div>
          ))}
      </div>

      {selectedProject && (
        <Modal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  )
}

export default Projects
