import { ArrowDown, Bell, Moon, Plus, Search } from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <header className='px-5 h-16 z-50 flex items-center bg-white-100 border-b-2 border-gray-200 sticky top-0 w-full'>
         <div className='flex items-center w-full justify-between'>
             
             <div className='max-w-2xl w-full flex items-center justify-center'>

            <form  
             className='flex-1 px-2 flex justify-center items-center max-w-96'
            >
              <div className='w-full flex h-10 ring-2 ring-gray-300 items-center rounded-md shadow-sm px-2'>
              <input className='w-full outline-none p-2 placeholder:leading-tight text-[0.9rem] font-medium' placeholder='Search Tasks...'/>
              <Search className='text-gray-400 size-5'/>
              </div>
            </form>
             </div>

            <div className='flex gap-4 items-center'>
                 <div className='h-10 w-10 rounded-full flex items-center justify-center bg-muted-foreground/10'>
                  <Bell className="text-primary size-5"/>
                </div>

                <div className='h-10 w-10 rounded-full flex items-center justify-center bg-muted-foreground/10'>
                  <Moon className="text-muted-foreground size-5"/>
                </div>

                   <div className='flex items-end justify-center gap-1'>
                    <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm"> 
                                          <Image
                                            src="/images/user1.png"
                                            width={32}
                                            height={32}
                                            alt="user1"
                                            className="object-cover w-full" 
                                          />
                                        </div>
                      <ArrowDown className='text-gray-400 size-5'/>
                   </div>

                   <Button className='bg-primary px-4 py-5 rounded-sm flex items-center justify-center h-10 cursor-pointer w-fit'>
                     <Plus className='size-5 text-white-100'/>
                     <p className='text-white-100 leading-tight text-sm'>Create Task</p>
                   </Button>
            </div>
         </div>
    </header>
  )
}

export default Header
