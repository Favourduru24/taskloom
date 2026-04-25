'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { signInSchema, signInSchemaType } from '@/utility/validation/auth'
import { useState } from 'react'
import { signInApi } from '@/utility/api/auth'
import {useRouter} from 'next/navigation'

 const SignIn = () => {

      const [loading, setLoading] = useState(false)
      const router = useRouter()

      const form = useForm<signInSchemaType>({
         resolver: zodResolver(signInSchema),
         defaultValues: {
          email: '',
          password: ''
         }
      })

      async function onSubmit(data: signInSchemaType) {
          if (loading) return;
                  setLoading(true);
          
                  try {
                    await signInApi(data);
          
                    toast.success("Login Successfully!");
                    router.push('/create-workspace')
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
                    <p className='text-xl font-semibold leading-6'>Welcome Back! Let's Get Things Done.</p>

                    <p className='text-sm text-muted-foreground'>Don't have an account? <Link href='/sign-up'><span className='text-primary font-semibold cursor-pointer'>Register Now</span></Link> </p>
                  </div>

                 <CardContent>
                   <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
                     <FieldGroup>
                       <Controller
                       name='email'
                       control={form.control}
                       render={({field, fieldState}) => (
                         <Field data-invalid={fieldState.invalid}>
                             <FieldLabel htmlFor="form-rhf-demo-title" className='text-md'>
                               Email
                             </FieldLabel>
                             <Input
                              {...field}
                               aria-invalid={fieldState.invalid}
                               id="form-rhf-demo-title"
                               placeholder="Enter Your Email"
                               autoComplete="off"
                               className='h-10 px-2 outline-none focus:ring-0 rounded-sm'
                             />
                             {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                          )}
                           </Field>
                       )}
                       />

                       <Controller
                          name='password'
                          control={form.control}
                          render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                             <FieldLabel htmlFor="form-rhf-demo-title" className='text-md'>
                               Password
                             </FieldLabel>
                             <Input
                              {...field}
                              aria-invalid={fieldState.invalid}
                               id="form-rhf-demo-title"
                               placeholder="Enter Your Password"
                               autoComplete="off"
                               className='h-10 px-2 outline-none focus:ring-0 rounded-sm'
                             />
                           </Field>
                          )}
                       />

                        <div className='flex items-center w-full justify-between'>
                          <div className='flex items-center gap-2'>
                             <Checkbox className='size-5'/>
                           <p className='text-sm text-muted-foreground leading-tight'>Remember Me</p>
                          </div>

                          <Link href='/forget-password'>
                           <p className='text-[1rem] leading-tight font-semibold text-primary cursor-pointer'>Forgot Password?</p>
                          </Link>
                        </div>
                        
                        <Button className='h-10 rounded-sm mt-2'>
                           <p className='text-[1rem] leading-tight font-semibold text-white-100'>{loading ? 'Loading...' : 'Sign In'}</p>
                        </Button>

                        <div className='flex items-center gap-2'>
                           <div className='w-full h-[0.5px] bg-gray-200'/>
                           <p className='whitespace-nowrap text-muted-foreground'>Or login with</p>
                           <div className='w-full h-[0.5px] bg-gray-200'/>
                        </div>

                        <div className='flex items-center gap-2 w-full'>
                           <Button className='h-10 rounded-sm mt-2 flex-1 bg-white-100 shadow border border-muted-foreground/25 cursor-pointer flex items-center'>
                            <div className="w-6 h-6 overflow-hidden rounded-full"> 
                                                                      <Image
                                                                        src="/images/google.png"
                                                                        width={32}
                                                                        height={32}
                                                                        alt="user1"
                                                                        className="object-cover w-full" 
                                                                      />
                                                          </div>
                           <p className='text-[1rem] leading-tight font-semibold text-muted-foreground'>Google</p>
                        </Button>
                        </div>
                     </FieldGroup>
                   </form>
                 </CardContent>
               </Card>

               <div className="relative">
                      <div className="w-full h-screen overflow-hidden shadow-sm"> 
                                     <Image
                                       src='/images/image3.jpg'
                                       width={700}
                                       height={700}
                                       alt='signIn-image'
                                       className="object-cover" 
                                     />
                                   </div>
                                   </div>
        </div>
    )
 }
 
 export default SignIn