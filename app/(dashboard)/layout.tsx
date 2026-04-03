 import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
  
  const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <div className='w-full h-screen'>
        <div className='w-full flex flex-col h-full'>
            <div className='flex w-full h-full'>
             <Sidebar />
             <div className='flex flex-col w-full'>
            <Header />
            {children}
             </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default DashboardLayout
  