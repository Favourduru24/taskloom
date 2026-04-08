'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { getAvatar } from '@/lib/utils'
import { ArrowDown, Edit, Image as Media, Link2Icon, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const CreateTask = () => {

  const [position, setPosition] = useState("bottom")

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0 flex-col">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-4">
       <p className="text-2xl leading-tight font-bold">New Task</p>

    <div className="max-w-md w-full h-full flex flex-col gap-4">
    
              <Card className="w-full sm:max-w-md">
         
      <CardContent>
        <form id="form-rhf-demo">
          <FieldGroup>
            <div>
                <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-xl'>
                    Bug Title
                  </FieldLabel>
                  <Input
                    id="form-rhf-demo-title"
                    placeholder="Login button not working on mobile"
                    autoComplete="off"
                  />
                  
                </Field>
            </div>
            
                  <div>
                <Field>
                  <FieldLabel htmlFor="form-rhf-demo-description" className='text-xl'>
                    Description
                  </FieldLabel>
                  <InputGroup>
                     <InputGroupTextarea
                      id="form-rhf-demo-description"
                      placeholder="I'm having an issue with the login button on mobile."
                      rows={6}
                      className="min-h-24 resize-none"
                    />
                  </InputGroup>
                  <FieldDescription>
                    Include steps to reproduce, expected behavior, and what
                    actually happened.
                  </FieldDescription>
                  {/* {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )} */}
                </Field>
                      </div>

                  <div>
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-xl'>
                    Category
                  </FieldLabel>

                  <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant="outline">Open</Button> */}
                  <div className="flex items-center justify-between shadow border p-2 rounded-sm">
                    <p className="text-[1rem] text-gray-500 leading-tight">Select Status</p>
                    <ArrowDown className="size-5 text-gray-500"/>
                   </div>
                   
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-4">
                  <DropdownMenuGroup>
                    {/* <DropdownMenuLabel>Panel Position</DropdownMenuLabel> */}
                    <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                      <DropdownMenuRadioItem value="top">To Do</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="bottom">Completed</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="right">In Progress</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
                  
                </Field>
                  </div>

                <div className='flex items-center gap-2'>
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-lg'>
                    Due Date
                  </FieldLabel>
                  <Input
                    id="form-rhf-demo-title"
                    placeholder="03/6/2026"
                    autoComplete="off"
                  />
                  
                </Field>

                <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-lg'>
                    Attachment
                  </FieldLabel>
                    <div className='flex items-center gap-2 border rounded-sm px-2'>

                     <div className='w-full h-8'>

                     </div>
                    <Link2Icon className='size-5'/>
                    <Media className='size-5'/>
                    </div>
                </Field>
                </div>

                 <div className='flex items-center gap-2'>
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-lg'>
                    Add Collaboration
                  </FieldLabel>
                   
                 <div className='flex items-center gap-2'>
                      <div className='border border-gray-400 flex rounded-full items-center gap-x-2 p-1'>
                         <div className="w-5 h-5 rounded-full shadow-sm "> 
                           <Image
                           src={getAvatar(null, 'durupristine')}
                            width={42}
                            height={42}
                            alt='colaborator'
                            className="object-cover rounded-full" 
                            />
                            </div>

                          <p className='text-muted-foreground text-sm'>Angela</p>
                          <X className='size-4 cursor-pointer'/>
                      </div>

                       <div className='border border-gray-400 flex rounded-full items-center gap-x-2 p-1'>
                         <div className="w-5 h-5 rounded-full shadow-sm "> 
                           <Image
                           src={getAvatar(null, 'durupristine')}
                            width={42}
                            height={42}
                            alt='colaborator'
                            className="object-cover rounded-full" 
                            />
                            </div>

                          <p className='text-muted-foreground text-sm'>Chris</p>
                          <X className='size-4 cursor-pointer'/>
                      </div>
                  </div>                  
                </Field>
                </div>
                  
                   <div className='flex items-center gap-2'>
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-lg'>
                    Priority
                  </FieldLabel>

                    <div className='flex w-full flex-row justify-between'>
                         <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-red-600'/>
                          <p className='text-muted-foreground text-sm'>Urgent</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-blue-600'/>
                          <p className='text-muted-foreground text-sm'>Normal</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-yellow-600'/>
                          <p className='text-muted-foreground text-sm'>Low</p>
                        </div>

                         </div>


                          <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-gray-600'/>
                          <p className='text-muted-foreground text-sm'>To Do</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-primary'/>
                          <p className='text-muted-foreground text-sm'>In Progress</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-green-600 accent-green-500'/>
                          <p className='text-muted-foreground text-sm'>Completed</p>
                        </div>

                         </div>
                    </div>
                  </Field>
                  </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline">
            Reset
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>

    </div>
    </div>
    </div>
  )
}

export default CreateTask
