 import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
  
  const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <div className='m-auto max-w-7xl w-full h-screen'>
        <div className='w-full flex flex-col'>
            <Header />
            <div className='flex'>
             <Sidebar />
            {children}
            </div>
        </div>
      </div>
    )
  }
  
  export default DashboardLayout
  