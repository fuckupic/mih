import { toast } from 'react-toastify'

export const handleSmoothScroll = (targetId: string) => {
  const element = document.getElementById(targetId)
  if (element) {
    const offset = -80 // Define the offset
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = element.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition + offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export const copyLinkToClipboard = (serviceId: number) => {
  const url = `${window.location.origin}/?service_id=${serviceId}`
  navigator.clipboard.writeText(url).then(() => {
    // You can display a message to the user that the link has been copied.
    toast('🔗 Link byl zkopírován', {
      type: 'success',
    })
  })
}
