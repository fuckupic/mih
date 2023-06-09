import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header className="z-[3] fixed w-[100%] h-[60px] flex justify-center items-center p-8 sm:p-8 lg:p-4 bg-gradient-to-b from-black ">
        <div className="relative top-0 left-0 w-[100%] h-[100%] max-w-[1000px] flex justify-start items-start">
          <img
            src="logoWhite_circle.svg"
            alt="Logo white"
            style={{ height: '50px' }}
            className="logo"
          />
        </div>
      </header>
      <main className="relative">{children}</main>{' '}
      {/* Add paddingTop to prevent content from being hidden behind the header */}
    </div>
  )
}

export default Layout
