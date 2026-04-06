 import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
  
  const DashboardLayout = ({children}: {children: React.ReactNode}) => {
    return (
      <div className='w-full min-h-screen relativ'>
        <div className='w-full flex flex-col h-full'>
            <div className='flex w-full flex-1 min-h-0'>
             <Sidebar />
             <div className='flex flex-col flex-1 min-h-0'>
            <Header />
            {children}
             </div>
            </div>
        </div>
      </div>
    )
  }
  
  export default DashboardLayout
  