import Link from 'next/link'
import React from 'react'

const ContactForm: React.FC = () => {
  return (
    <div id="footer" className="section !h-min !mb-0 z-[2]">
      <div className="sectionWrapper flex-col !justify-center flex-1 items-center gap-16">
        {/* just 3 white logos in flex-row justify-between items-center */}
        <div className="flex flex-row gap-4 justify-between items-center w-[50%]">
          <div className="flex flex-col gap-4">
            <Link
              href="https://www.bic.cz/"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="w-[80px]" src="/logoBic.svg" alt="logo" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link href="#hero">
              <img className="w-[100px]" src="/whiteLogo.svg" alt="logo" />
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Link
              href="https://www.plzeninovativni.eu/"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <img className="w-[100px]" src="/logoPine.svg" alt="logo" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm
