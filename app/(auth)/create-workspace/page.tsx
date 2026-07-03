'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { getAvatar } from '@/lib/utils'
import { createWorspaceApi, getWorkspaceApi } from '@/utility/api/workspace'
import { createWorkSpaceSchema, createWorkspaceType } from '@/utility/validation/workspace'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, usePathname, } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface WorkspaceList {
  id: string
  name: string
  logoUrl: string | null
  logoPublicId: string | null
  createdAt?: Date
  updatedAt?: Date
}
 const ForgetPassword = () => {

   const [workspace, setWorkspace] = useState<WorkspaceList[]>([])
   const [loading, setLoading] = useState(false)
   const router = useRouter()
   const pathname = usePathname()
   const [selectedWorkspace, setSelectedWorkspace] = useState<WorkspaceList | null>(workspace[0] || null);
     
    const form = useForm<createWorkspaceType>({
      resolver: zodResolver(createWorkSpaceSchema),
      defaultValues: {
        name: ''
      }
    })
    
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
  
        } catch (error: any) {
          toast.error(error.message || "Failed to fetch workspace");
        } finally {
          setLoading(false);
        }
      }
    
      fetchWorkspace();
    }, []);

    async function onSubmit(data: createWorkspaceType) {
              if (loading) return;
                      setLoading(true);
              
                      try {
                       const workpsace =  await createWorspaceApi(data);
              
                        toast.success(`Workspace ${data.name} Successfully!`);
                        router.push(`/workspace/${workpsace.workspace[0]?.id}/dashboard`)
                      } catch (error: any) {
                        toast.error(error.message || "SignIn failed");
                      } finally {
                        setLoading(false);
                      }
          }

          const handleSwitchWorkspace = (workspaceId: string) => {
            const ws = workspace.find(w => w.id === workspaceId);
              if (ws) {
                setSelectedWorkspace(ws);
                localStorage.setItem('selectedWorkspace', JSON.stringify(ws))
              }
    
            const newPath = `/workspace/${workspaceId}/dashboard`
          
            router.push(newPath);
          };
    

    return (
        <div className="w-full max-w-6xl mx-auto px-8 py-4 flex flex-1 gap-8 items-center">
           <Card className="w-full max-w-sm"> 
                  <div className='flex flex-col gap-5 justify-center w-full items-center'>
                        <div className='flex justify-start items-center w-full h-6 overflow-visible py-2'>
                                  <Image
                                    src="/images/logo1.png"
                                    width={200}
                                    height={200}
                                    alt="logo"
                                    className="object-cover"
                                  />
                                </div>
                    <p className='text-xl font-semibold leading-3'>Create Your Workspace!</p>

                    <p className='text-sm text-muted-foreground text-center leading-6'>Set up your workspace and <br/><span className='text-primary font-semibold'>start collaborating with your team.</span></p>
                  </div>

                 <CardContent>
                   <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                     <FieldGroup>
                       <Controller
                         name='name'
                         control={form.control}
                         render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                             <FieldLabel htmlFor="form-rhf-demo-title" className='text-md'>
                             Workspace Name
                             </FieldLabel>
                             <Input
                              {...field}
                              aria-invalid={fieldState.invalid}
                               id="form-rhf-demo-title"
                               placeholder="Enter Your Workspace Name"
                               autoComplete="off"
                               className='h-10 px-2 outline-none focus:ring-0 rounded-sm'
                             />
                           </Field>
                         )}
                           
                       />


                        
                        <Button className='h-10 rounded-sm mt-2 cursor-pointer'>
                           <p className='text-[1rem] leading-tight font-semibold text-white-100'>{loading ? 'Loading...' : 'Create Workspace'}</p>
                        </Button>

                                               <div className='flex items-center gap-2'>
                                                   <div className='w-full h-[0.5px] bg-gray-200'/>
                                                   <p className='whitespace-nowrap text-muted-foreground'>Or Switch</p>
                                                   <div className='w-full h-[0.5px] bg-gray-200'/>
                                                </div>
                        
                <div className='flex  gap-2 w-full border p-1 rounded-md shaddow-sm'>
                                <DropdownMenu>
                      <DropdownMenuTrigger asChild>
             
                          <div className='flex items-start gap-x-3 justify-between cursor-pointer w-full '>
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
                                <p className='text-foreground-muted text-lg font-medium  break-all'>{loading ? 'Loading..' : selectedWorkspace? `${selectedWorkspace?.name}`.slice(0, 15) : 'No WS'}</p>
                                {/* <p className='text-gray-500 text-xs'>select</p> */}
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
                         <DropdownMenuItem key={ws.id} onClick={() => handleSwitchWorkspace(ws.id)} className='cursor-pointer'>
                        {ws.name}
                      </DropdownMenuItem>
                        ))
                      }
                      
                    </DropdownMenuContent>
                  </DropdownMenu>
                      </div>
                     </FieldGroup>
                   </form>
                 </CardContent>
               </Card>

               <div className="relative">
                      <div className="w-full h-screen overflow-hidden shadow-sm"> 
                                     <Image
                                       src='/images/forget-password.jpg'
                                       width={700}
                                       height={700}
                                       alt='forgetPassword-image'
                                       className="object-cover" 
                                     />
                                   </div>
                                   </div>
        </div>
    )
 }
 
 export default ForgetPassword