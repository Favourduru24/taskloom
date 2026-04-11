import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { ArrowDown, Edit, Image as Media, Link2Icon, X, Plus, Rocket, Check, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


 const ForgetPassword = () => {
  // ring-0 border-none
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
                    <p className='text-xl font-semibold leading-6'>Forget Your Password? Don't Worry!</p>

                    <p className='text-sm text-muted-foreground'>Remember Your Password? <Link href='/sign-up'><span className='text-primary font-semibold cursor-pointer'>Sign In here</span></Link> </p>
                  </div>

                 <CardContent>
                   <form id="form-rhf-demo">
                     <FieldGroup>
                       <div>
                           <Field>
                             <FieldLabel htmlFor="form-rhf-demo-title" className='text-md'>
                               Email
                             </FieldLabel>
                             <Input
                               id="form-rhf-demo-title"
                               placeholder="Enter Your Email"
                               autoComplete="off"
                               className='h-10 px-2 outline-none focus:ring-0 rounded-sm'
                             />
                           </Field>
                       </div>


                        
                        <Button className='h-10 rounded-sm mt-2'>
                           <p className='text-[1rem] leading-tight font-semibold text-white-100'>Reset Password</p>
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