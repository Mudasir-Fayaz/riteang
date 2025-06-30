'use client'
import React, { useEffect } from 'react'

const Wrapper = ({ children }:{children: React.ReactNode}) => {
    useEffect(() => {
      // Perform any necessary setup or cleanup here
      window.scrollTo(0, 0)
      return () => {
        // Cleanup logic if needed
      }
    }, [])
  return (
    <>
      {children}
    </>
  )
}

export default Wrapper
