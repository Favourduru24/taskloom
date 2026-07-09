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
import {useEffect, useRef, useState } from 'react'
import { useRouter, usePathname, useParams} from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { getProfile, uploadProfilePics } from '@/utility/api/auth'

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
  const [user, setUser] = useState<any>([])
  const router = useRouter();
  const pathname = usePathname();
   const params = useParams()
   const {workspaceId} = params

  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const createTaskLink = `/workspace/${workspaceId}/task/create`

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
        const user = await getProfile();

        setWorkspace(data);
        setUser(user);

      } catch (error: any) {
        console.log(error, "Workspace error");
        toast.error(error.message || "Failed to fetch workspace");
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

      const handleUploadProfilePics = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
      
        if (!file) return;
      
        try {
          setUploading(true);
      
          const profileFormData = new FormData();
          
          profileFormData.append("file", file); 
      
          const profileRes = await uploadProfilePics(profileFormData);
      
          return profileRes?.url;
      
        } catch (error: any) {
          toast.error(error.message);
        } finally {
          setUploading(false);
        }
      };      

  return (
    <header className='px-5 h-16 z-50 flex items-center bg-white-100 border-b border-gray-200 sticky top-0 w-full'>
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
                                           className="object-center object-cover" 
                                         />
                                       </div>
                          <div className='md:flex flex-col justify-center hidden '>
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
               
             <div className='max-w-2xl w-full md:flex items-center justify-center hidden'>
            <form  
             className='flex-1 px-2 flex justify-center items-center max-w-96'
            >
              <div className='w-full flex h-10 border-gray-200 border items-center rounded-md px-2'>
              <input className='w-full outline-none p-2 placeholder:leading-tight text-[0.9rem] font-medium border-gray-200' placeholder='Search Tasks...'/>
              <Search className='text-gray-400 size-5'/>
              </div>
            </form>
             </div>

             <div className='h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center border md:hidden'>
                  <Search className="text-black size-4 md:size-5"/>
                </div>


            <div className='flex gap-3 items-center'>
               <div className='h-8 w-8 md:h-9 md:w-9 rounded-md flex items-center justify-center border cursor-pointer'>
                  <Clock className="text-muted-foreground size-4 md:size-5"/>
                </div>

                 <div className='h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center border cursor-pointer'>
                  <Bell className="text-muted-foreground size-4 md:size-5"/>
                </div>

                <div className='h-8 w-8 md:h-9 md:w-9 rounded-full flex items-center justify-center border cursor-pointer'>
                  <Moon className="text-muted-foreground size-4 md:size-5"/>
                </div>

                   
                   <Link href={createTaskLink}>
                   <Button className='bg-primary px-4 py-3 rounded-sm flex items-center justify-center h-10 cursor-pointer w-fit'>
                     <Plus className='size-5 text-white-100'/>
                     <p className='text-white-100 leading-tight text-sm hidden sm:block'>Create Task</p>
                   </Button>
                   </Link>

                   <div className='flex items-end justify-center gap-1'>
                    <div className="h-8 w-8 md:h-9 md:w-9 overflow-hidden rounded-full shadow-sm" onClick={() => fileInputRef.current?.click()}> 
                    {!uploading ? <Image
                                            src={getAvatar(user?.avatarUrl, user?.email)}
                                            width={32}
                                            height={32}
                                            alt={'profile'}
                                            className="object-center object-cover w-full" 
                                          /> : <p>Loading..</p>}

                                          <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleUploadProfilePics}
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
            </div>
         </div>
    </header>
  )
}

export default Header
