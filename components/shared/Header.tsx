import { ArrowDown, Bell, Search } from 'lucide-react'
import Image from 'next/image'

const Header = () => {
  return (
    <header className='px-4 h-16 z-50 flex items-center justify-between bg-white-100 border-b-2 border-gray-200 sticky top-0 w-full'>
         <div className='flex justify-between items-center w-full'>
            <form  
             className='flex-1 max-w-72 px-2'
            >
              <div className='w-full flex h-9 ring-2 ring-gray-200 focus-within:border-primary items-center rounded-sm shadow-sm'>
              <input className='w-full outline-none p-2 placeholder:leading-tight text-[0.9rem] font-medium' placeholder='Search Tasks...'/>
              <Search className='text-gray-400 size-5'/>
              </div>
            </form>

            <div className='flex gap-4 items-center'>
                 <div>
                  <Bell className="text-primary size-5"/>
                </div>

                   <div className='flex items-end justify-center gap-1'>
                      <div className="w-8 h-8 overflow-hidden rounded-full">
                      <Image
                        src="/images/user1.png"
                        width={32}
                        height={32}
                        alt="user1"
                        className="object-contain ring-2 ring-gray-400 shadow-sm rounded-full"
                      />
                    </div>
                      <ArrowDown className='text-gray-400 size-5'/>
                   </div>

                   <button className='bg-primary w-20 p-2 rounded-sm flex items-center justify-center h-9 cursor-pointer '>
                     <p className='text-white-100 leading-tight'>Share</p>
                   </button>
            </div>
         </div>
    </header>
  )
}

export default Header
