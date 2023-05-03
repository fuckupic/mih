import React from 'react'

const ContactForm: React.FC = () => {
  return (
    <div className="section !h-min">
      <div className="sectionWrapper flex-col !justify-center flex-1 items-center gap-16">
        {/* just 3 white logos in flex-row justify-between items-center */}
        <div className="flex flex-row justify-between items-center w-[50%]">
          <div className="flex flex-col gap-4">
            <img className="w-[100px]" src="/whiteLogo.svg" alt="logo" />
          </div>
          <div className="flex flex-col gap-4">
            <img className="w-[100px]" src="/whiteLogo.svg" alt="logo" />
          </div>
          <div className="flex flex-col gap-4">
            <img className="w-[100px]" src="/whiteLogo.svg" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
