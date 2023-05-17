import { useState, ChangeEvent } from 'react'

interface Values {
  name: string
  email: string
  mobility: string
  note: string
}

const useContactForm = () => {
  const [values, setValues] = useState<Values>({
    name: '',
    email: '',
    mobility: '',
    note: '',
  })

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  return { values, handleChange }
}

export default useContactForm
