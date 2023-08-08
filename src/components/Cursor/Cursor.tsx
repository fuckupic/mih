import React, { useRef, MouseEvent, RefObject } from 'react'
import { gsap } from 'gsap'
import { useIsomorphicLayoutEffect } from '../../../helpers/isomorphicEffect'

interface CursorType extends HTMLElement {
  offsetWidth: number
  offsetHeight: number
  querySelector: (selector: string) => HTMLElement | null
}

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cursor: CursorType | null = cursorRef.current
      const follower = followerRef.current

      let posX = 0,
        posY = 0,
        mouseX = 0,
        mouseY = 0

      let isCursorInsideElement = false

      if (cursor) {
        gsap.set(cursor, {
          scale: 0.1,
          opacity: 1,
        })
      }

      gsap.set('.cursor, .cursor-follower', {
        xPercent: 0,
        yPercent: 0,
      })

      gsap.to(
        {},
        {
          duration: 0.016,
          repeat: -1,
          onRepeat: function () {
            posX += (mouseX - posX) / 9
            posY += (mouseY - posY) / 9

            // Shift the custom cursor to the right and down if it is hovering over an element
            const shiftX = isCursorInsideElement ? -15 : 0 // You can adjust this value
            const shiftY = isCursorInsideElement ? -15 : 0 // You can adjust this value

            if (follower) {
              gsap.set(follower, {
                x: posX - follower.offsetWidth / 2 + shiftX,
                y: posY - follower.offsetHeight / 2 + shiftY,
              })
            }

            if (cursor) {
              gsap.set(cursor, {
                x: mouseX - cursor.offsetWidth / 2 + shiftX,
                y: mouseY - cursor.offsetHeight / 2 + shiftY,
              })
            }
          },
        }
      )

      const scaleUp = gsap.timeline({ paused: true }).to(cursor!, {
        scale: 0.8,
        transformOrigin: 'center',
        backgroundColor: '#00BDC7',
      })

      const scaleButtonUp = gsap.timeline({ paused: true }).to(cursor!, {
        scale: 0.8,
        transformOrigin: 'center',
        backgroundColor: '#2DD687',
      })

      const textReveal = gsap.timeline({ paused: true }).to('.piu', {
        opacity: 1,
        duration: 0.1,
      })

      const textShrink = gsap.timeline({ paused: true }).to('.piu', {
        opacity: 0,
        duration: 0.1,
      })

      const scaleDown = gsap.timeline({ paused: true }).to(cursor!, {
        scale: 0.1,
        transformOrigin: 'center',
        backgroundColor: '#2DD687',
      })

      const handleMouseMove = (e: MouseEvent<Element, MouseEvent>) => {
        mouseX = e.clientX
        mouseY = e.clientY

        const target = e.target as HTMLElement

        if (cursor && target) {
          const isInsideService = target.classList.contains('service')
          const isInsideProject = target.classList.contains('project')
          const isInsideSend = target.classList.contains('send')
          const isInsideCopy = target.classList.contains('copy_link')
          const isInsideClose = target.classList.contains('close')
          const isInsideButton = target.classList.contains('btn')

          if (isInsideService || isInsideProject) {
            if (!isCursorInsideElement) {
              scaleUp.play(0)
              textReveal.play(0)
              isCursorInsideElement = true
              cursor.querySelector('.piu')!.textContent = isInsideService
                ? 'Zobrazit službu'
                : 'Zobrazit projekt'
            }
          } else if (isInsideSend) {
            if (!isCursorInsideElement) {
              scaleUp.play(0)
              textReveal.play(0)
              isCursorInsideElement = true
              cursor.querySelector('.piu')!.textContent = 'Odeslat formulář'
            }
          } else if (isInsideCopy) {
            if (!isCursorInsideElement) {
              scaleUp.play(0)
              textReveal.play(0)
              isCursorInsideElement = true
              cursor.querySelector('.piu')!.textContent = 'Zkopírovat odkaz'
            }
          } else if (isInsideClose) {
            if (!isCursorInsideElement) {
              scaleUp.play(0)
              textReveal.play(0)
              isCursorInsideElement = true
              cursor.querySelector('.piu')!.textContent = 'Zavřít'
            }
          } else if (isInsideButton) {
            if (!isCursorInsideElement) {
              scaleButtonUp.play(0)
              textReveal.play(0)
              isCursorInsideElement = true
              cursor.querySelector('.piu')!.textContent = 'Zobrazit více'
            }
          } else if (isCursorInsideElement) {
            scaleDown.play(0)
            textShrink.play(0)
            isCursorInsideElement = false
            cursor.querySelector('.piu')!.textContent = ''
          }
        }
      }

      document.addEventListener(
        'mousemove',
        handleMouseMove as unknown as EventListener
      )

      return () => {
        document.removeEventListener(
          'mousemove',
          handleMouseMove as unknown as EventListener
        )
      }
    }, cursorRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <div className="cursor bg-primary" ref={cursorRef}>
        <span className="piu p-8 text-black font-tabletgothic text-xl text-center z-[99999]"></span>
      </div>
      <div className="cursor-follower" ref={followerRef}></div>
    </>
  )
}

export default Cursor
