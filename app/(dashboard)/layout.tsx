 import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'
import { cookies } from 'next/headers';
import SocketProvider from '@/components/shared/SocketProvider';
  
  const DashboardLayout = async({children}: {children: React.ReactNode}) => {

    const token =
    (await cookies()).get('accessToken')?.value;
 
    return (
      <SocketProvider token={token}>
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
      </SocketProvider>
    )
  }
  
  export default DashboardLayout
  