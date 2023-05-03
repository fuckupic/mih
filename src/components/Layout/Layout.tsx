import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <header className="z-[1000] fixed w-[100%] h-[60px] flex justify-center items-center p-4 bg-gradient-to-b from-black to-transparent">
        <div className="relative top-0 left-0 w-[100%] h-[100%] max-w-[1000px] flex justify-start items-start">
          <img
            src="logoWhite_circle.svg"
            alt="Logo"
            style={{ height: '50px' }}
          />
        </div>
      </header>
      <main style={{ paddingTop: '60px' }}>{children}</main>{' '}
      {/* Add paddingTop to prevent content from being hidden behind the header */}
    </div>
  )
}

export default Layout
