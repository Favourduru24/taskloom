'use client'
import Image from 'next/image'
import { LayoutDashboard, LucideIcon, CheckSquare, Users2, Calendar, Sparkles, History} from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { useParams } from 'next/navigation'

const Sidebar = () => {

  const params = useParams()

  const {workspaceId} = params

  const pathname = usePathname()
   const createContactLink = `/workspace/${workspaceId}/contacts/create`

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
      href: `/workspace/${workspaceId}/dashboard`,
      icons: LayoutDashboard
    },
    {
      id: 2,
      label: "Contacts",
      href: `/workspace/${workspaceId}/contacts`,
      icons: Users2 
    },
    {
      id: 3,
      label: "Tasks",
      href: `/workspace/${workspaceId}/task`,
      icons: CheckSquare
    },
    // {
    //   id: 3,
    //   label: "Messages",
    //   href: `/workspace/${workspaceId}/message`,
    //   icons: SendIcon 
    // },
    
    {
      id: 4,
      label: "Calender",
      href: `/workspace/${workspaceId}/calendar`,
      icons: Calendar
    },
    {
      id: 5,
      label: "Timeline",
      href: `/workspace/${workspaceId}/timeline`,
       icons: History
    },
   ]
       
  return (
    <aside className='w-64  bg-white px-2 py-2 border-r border-gray-200  sticky top-0 h-screen md:block hidden'>
       <div className='flex flex-col h-full gap-4 py-2'>
          {/* <div className='flex items-center w-full overflow-visible'> */}
          {/* <Image
            src="/images/logo1.png"
            width={500}
            height={500}
            alt="logo"
            className="object-cover "
          /> */}

          <div className="w-full h-10 overflow-hidden p-0"> 
                                                            <Image
                                                              src={'/images/logo1.png'}
                                                              width={500}
                                                              height={500}
                                                              alt={'user-img'}
                                                              className="object-cover size-full p-0" 
                                                            />
                                                          </div>
         
         
         <div className='flex flex-col h-full justify-between'>

          <ul className='h-full flex flex-col gap-3 p-2'>
             {SidebarContent.map((item: SidebarProp) => {
                 const Icons = item.icons
                 
                 return (
                  <Link href={item.href} key={item.id}>
                   <li className={`flex px-2 py-2 items-center text-black justify-start gap-2 rounded-sm ${pathname === item.href ? 'bg-primary  cursor-pointer text-white leading-tight' : 'text-black leading-tight hover:bg-secondary cursor-pointer'}`} >
                      <Icons className="size-5" strokeWidth={1.5}/>
                      <p className='text-[0.9rem] font-medium '>{item.label}</p>
                  </li> 
                  </Link>
                )
             })}
          </ul>
           
           <Link href={createContactLink}>
          <li className="flex px-2 py-2 items-center justify-center gap-2 rounded-md bg-primary text-white cursor-pointer">
                      <Users2  className='text-white size-5'/>
                      <p className='text-[1rem] leading-tight font-semibold'>Add Contact</p>
                  </li> 
           </Link>
        </div>
       </div>
    </aside>
  )
}

export default Sidebar
