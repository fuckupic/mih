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
    <div id="contact_form" className="section !h-min z-[2]">
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
          {/* link to email and phone */}
          <div className="flex flex-col gap-4">
            <div className="font-tabletgothic text-xl">
              <div className="font-tabletgothic text-xl text-primary">
                Ing. Luděk Šantora
              </div>
              <a
                href="mailto:santora@plzen.eu"
                className="hover:text-primary-light transition-colors underline"
              >
                santora@plzen.eu
              </a>
              {/* phone */}
              <a href="tel:+42602414111">
                <div className="font-tabletgothic text-xl underline">
                  +420 602 414 111
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
