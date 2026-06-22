'use client'
import {Bell, Moon, Plus, Search, Clock} from 'lucide-react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { getAvatar } from '@/lib/utils'
import { getWorkspaceApi } from '@/utility/api/workspace'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from 'react'
import { useRouter, usePathname, useParams} from 'next/navigation'
import Link from 'next/link'

interface WorkspaceList {
  id: string
  name: string
  logoUrl: string | null
  logoPublicId: string | null
  createdAt?: Date
  updatedAt?: Date
}

const Header = () => {
  
  const [workspace, setWorkspace] = useState<WorkspaceList[]>([])
  const router = useRouter();
  const pathname = usePathname();
   const params = useParams()
   const {workspaceId} = params

  const [loading, setLoading] = useState(false)

  const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceList | null>(workspace[0] || null);



  useEffect(() => {
    const saved = localStorage.getItem("selectedWorkspace");
  
    if (saved) {
      setSelectedWorkspace(JSON.parse(saved));
    }
  
    async function fetchWorkspace() {
      setLoading(true);
  
      try {
        const data = await getWorkspaceApi();
        setWorkspace(data);
      } catch (error) {
        console.log(error, "Workspace error");
      } finally {
        setLoading(false);
      }
    }
  
    fetchWorkspace();
  }, []);



      const handleSwitchWorkspace = (workspaceId: string) => {
        const ws = workspace.find(w => w.id === workspaceId);
          if (ws) {
            setSelectedWorkspace(ws);
            localStorage.setItem('selectedWorkspace', JSON.stringify(ws))
          }

        const newPath = pathname.replace(
          /\/workspace\/[^/]+/,
          `/workspace/${workspaceId}`
        );
      
        router.push(newPath);
      };

  return (
    <header className='px-5 h-16 z-50 flex items-center bg-white-100 border-b-2 border-gray-200 sticky top-0 w-full'>
         <div className='flex items-center w-full justify-between gap-2'>

            <DropdownMenu>
      <DropdownMenuTrigger asChild>
             
                          <div className='flex items-start gap-x-2 justify-center cursor-pointer w-full max-w-36'>
                             <div className="w-8 h-8 overflow-hidden rounded-md shadow-sm shrink-0"> 
                                         <Image
                                           src={getAvatar(null, selectedWorkspace?.name as string)}
                                           width={32}
                                           height={32}
                                           alt={'logo'}
                                           className="object-cover" 
                                         />
                                       </div>
                          <div className='flex flex-col justify-center'>
                                <p className='text-foreground-muted text-sm font-medium  break-all'>{loading ? 'Loading..' : selectedWorkspace? `${selectedWorkspace?.name}`.slice(0, 15) : 'No WS'}</p>
                                <p className='text-gray-500 text-xs'>Trial Plan</p>
                          </div>

                          <svg
                      className={`w-5 h-5 transition-transform duration-200 mt-1`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                    </div>
                        
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-1 cursor-pointer'>
                      {
                        workspace.map((ws: WorkspaceList) => (
                         <DropdownMenuItem key={ws.id} onClick={() => handleSwitchWorkspace(ws.id)}>
                        {ws.name}
                      </DropdownMenuItem>
                        ))
                      }
                      

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Link href={`/create-workspace`} className='text-primary flex items-center justify-center gap-1 cursor-pointer'>
                        <Plus/>
                        Create WS
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
               
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

            <div className='flex gap-3 items-center'>
               <div className='h-9 w-9 rounded-md flex items-center justify-center border'>
                  <Clock className="text-black size-5"/>
                </div>

                 <div className='h-9 w-9 rounded-full flex items-center justify-center bg-muted-foreground/10'>
                  <Bell className="text-primary size-5"/>
                </div>

                <div className='h-9 w-9 rounded-full flex items-center justify-center border'>
                  <Moon className="text-black size-5"/>
                </div>

                   <div className='flex items-end justify-center gap-1'>
                    <div className="h-9 w-9 overflow-hidden rounded-full shadow-sm"> 
                                          <Image
                                            src="/images/user1.png"
                                            width={32}
                                            height={32}
                                            alt="user1"
                                            className="object-cover w-full" 
                                          />
                                        </div>

                                        <svg
                      className={`w-5 h-5 transition-transform duration-200 cursor-pointer text-muted-foreground`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
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
