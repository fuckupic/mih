import React, { useState, FormEvent } from 'react'
import useContactForm from '../../hooks/useContactForm'
import sendEmail from '../../lib/sendEmail'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface ResponseMessage {
  isSuccessful: boolean
  message: string
}

const ContactForm: React.FC = () => {
  const { values, handleChange, resetForm } = useContactForm()
  const [responseMessage, setResponseMessage] = useState<ResponseMessage>({
    isSuccessful: false,
    message: '',
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const date = new Date().toString()
    if (!validateForm()) {
      return
    }
    try {
      const { status } = await sendEmail({ ...values, date })
      if (status === 200) {
        setResponseMessage({
          isSuccessful: true,
          message: 'Thank you for your message.',
        })
        resetForm()
        toast.success('Zpráva odeslána!') // success toast here
      }
    } catch (e) {
      console.log(e)
      setResponseMessage({
        isSuccessful: false,
        message: 'Něco se pokazilo. Zkuste to znovu.',
      })
      toast.error('Něco se pokazilo. Zkuste to znovu.') // error toast here
    }
  }

  const validateForm = () => {
    let errorsFound = false
    let newErrors = { name: '', email: '' }

    if (!values.name) {
      newErrors.name = 'Jméno je povinné.'
      errorsFound = true
    }

    if (!values.email) {
      newErrors.email = 'Emailová adresa je povinná.'
      errorsFound = true
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Emailová adresa není správně napsaná.'
      errorsFound = true
    }

    setErrors(newErrors)
    return !errorsFound
  }

  return (
    // your form code here with some modifications to the form controls
    <div className="section !h-min">
      <div className="sectionWrapper flex-col !justify-start flex-1 items-start gap-16">
        <div className=" w-full sm:w-[70%] justify-start relative flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="font-campton text-3xl font-semibold text-primary">
              Co se v Plzni vymyslí a vyzkouší, bude fungovat úspěšně i jinde.
            </h2>
            <div className="font-tabletgothic text-xl">
              Spojte se s námi a podílejte se na rozvoji mobility
            </div>
            {/* form with name, email, choose one, additional note */}
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-tabletgothic text-md">
                * Jméno
              </label>
              <input
                required
                id="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                className="inputField"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-tabletgothic text-md">
                * Emailová adresa
              </label>
              <input
                required
                id="email"
                value={values.email}
                onChange={handleChange}
                type="email"
                className="inputField"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mobility" className="font-tabletgothic text-md">
                Zajímá mě
              </label>
              <select
                required
                id="mobility"
                value={values.mobility}
                onChange={handleChange}
                className="select inputField"
              >
                <option value="">Select an option...</option>
                <option value="partnership">Partnerství</option>
                <option value="personalMobility">Osobní mobilita</option>
                <option value="cargoMobility">Nákladní mobilita</option>
                <option value="futureInnovations">
                  Budoucí inovace v mobilitě
                </option>
                <option value="startups">Startupy</option>
                <option value="events">Události</option>
              </select>
              <div className="flex flex-col gap-2">
                <label htmlFor="note" className="font-tabletgothic text-md">
                  Poznámka
                </label>
                <textarea
                  id="note"
                  value={values.note}
                  onChange={handleChange}
                  className="textarea inputField"
                  rows={8}
                />
              </div>
              <button className="btn btn-primary w-28" type="submit">
                Odeslat
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
