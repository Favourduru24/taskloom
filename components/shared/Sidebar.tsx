'use client'
import Image from 'next/image'
import { LayoutDashboard, LucideIcon, CheckSquare, SendIcon, Image as Images, History, Plus} from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';

const Sidebar = () => {

    interface SidebarProp {
      id: number
      label: string,
      href: string,
      icons: LucideIcon
    }
   
   const SidebarContent: SidebarProp[] = [
    {
      id: 1,
      label: "Dashboard",
      href: "/dashboard",
      icons: LayoutDashboard
    },
    {
      id: 2,
      label: "Task",
      href: "/task",
      icons: CheckSquare
    },
    {
      id: 3,
      label: "Messages",
      href: "/message",
      icons: SendIcon 
    },
    {
      id: 4,
      label: "Files",
      href: "/files",
       icons: Images
    },
    {
      id: 5,
      label: "Timeline",
      href: "/timeline",
      icons: History
    },
   ]

   const pathname = usePathname()
       
  return (
    <aside className='w-64  bg-white px-2 py-2 border-r-2 border-gray-200  sticky top-0 h-screen'>
       <div className='flex flex-col h-full gap-4 py-2'>
          <div className='flex justify-center items-center w-full h-13 overflow-visible'>
          <Image
            src="/images/logo1.png"
            width={500}
            height={500}
            alt="logo"
            className="object-cover"
          />
        </div>
         
         <div className='flex flex-col h-full justify-between'>

          <ul className='h-full flex flex-col gap-3 p-2'>
             {SidebarContent.map((item: SidebarProp) => {
                 const Icons = item.icons
                 
                 return (
                  <Link href={item.href} key={item.id}>
                   <li className={`flex px-2 py-4 items-center hover:text-black justify-start gap-2 rounded-md ${pathname === item.href ? 'bg-primary text-white cursor-pointer leading-tight' : 'text-gray-600 leading-tight hover:bg-secondary cursor-pointer'}`} >
                      <Icons className="size-5"/>
                      <p className='text-[1rem] font-semibold'>{item.label}</p>
                  </li> 
                  </Link>
                )
             })}
          </ul>
           
           <Link href="/task/create">
          <li className="flex px-2 py-3 items-center justify-center gap-2 rounded-md bg-primary text-white cursor-pointer">
                      <Plus className='text-white size-5'/>
                      <p className='text-[1rem] leading-tight font-semibold'>New Task</p>
                  </li> 
           </Link>
        </div>
       </div>
    </aside>
  )
}

export default Sidebar
