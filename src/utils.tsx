import { toast } from 'react-toastify'

export const handleSmoothScroll = (targetId: string) => {
  const element = document.getElementById(targetId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
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
