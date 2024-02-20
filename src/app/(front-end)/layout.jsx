import Navbar from '@/components/frontend/Navbar'  
import React from 'react'

export default function Layout({children}) {
  return (
    <div>
        <Navbar /> 
        <div className="max-w-7xl mx-auto py-6">
        {children}
        </div>
    </div>
  )
}
