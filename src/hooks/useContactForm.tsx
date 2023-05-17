import { useState, ChangeEvent } from 'react'

interface Values {
  name: string
  email: string
  mobility: string
  note: string
}

const useContactForm = () => {
  const initialFormState = {
    name: '',
    email: '',
    mobility: '',
    note: '',
  }
  const [values, setValues] = useState<Values>(initialFormState)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target
    setValues((prev) => ({ ...prev, [id]: value }))
  }

  const resetForm = () => {
    setValues(initialFormState)
  }

  return { values, handleChange, resetForm }
}

export default useContactForm
