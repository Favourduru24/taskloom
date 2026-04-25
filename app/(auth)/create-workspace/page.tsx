'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { createWorspaceApi } from '@/utility/api/workspace'
import { createWorkSpaceSchema, createWorkspaceType } from '@/utility/validation/workspace'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDown, Edit, Image as Media, Link2Icon, X, Plus, Rocket, Check, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'


 const ForgetPassword = () => {

   const [loading, setLoading] = useState(false)
   const router = useRouter()
     
    const form = useForm<createWorkspaceType>({
      resolver: zodResolver(createWorkSpaceSchema),
      defaultValues: {
        name: ''
      }
    })

    async function onSubmit(data: createWorkspaceType) {
              if (loading) return;
                      setLoading(true);
              
                      try {
                        await createWorspaceApi(data);
              
                        toast.success(`Workspace ${data.name} Successfully!`);
                        router.push('/dashboard')
                      } catch (error: any) {
                        toast.error(error.message || "SignIn failed");
                      } finally {
                        setLoading(false);
                      }
          }
    

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

                    <p className='text-sm text-muted-foreground text-center leading-6'>Set up your workspace and <br/><span className='text-primary font-semibold cursor-pointer'>start collaborating with your team.</span></p>
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

                        <div className='flex items-center gap-2 w-full'>
                            <Link href='/sign-in' className='flex-1 w-full flex'>
                           <Button className='h-10 rounded-sm flex-1 bg-white-100 shadow border border-muted-foreground/25 cursor-pointer flex items-center'>
                            <ArrowLeft className='size-5 text-muted-foreground' strokeWidth={1.5}/>
                           <p className='text-[1rem] leading-tight font-semibold text-muted-foreground'>Back In Login</p>
                        </Button>
                            </Link>
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