'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from '@/components/ui/input-group'
import { getAvatar } from '@/lib/utils'
import { createTaskSchema, createTaskSchemaType } from '@/utility/validation/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDown, Edit, Image as Media, Link2Icon, X, Plus, Rocket } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const CreateTask = () => {

  interface CategoryType {
   value: string;
   label: string;
  }

  const Category: CategoryType[] = [
    { value: "DESIGN", label: "Design" },
    { value: "DEVELOPMENT", label: "Development" },
    { value: "MARKETING", label: "Marketing" },
    { value: "PRODUCT", label: "Product" },
    { value: "SALES", label: "Sales" },
    { value: "SUPPORT", label: "Support" },
  ];

  const [loading, setLoading] = useState(false)
  const [priority, setPriority] = useState<string>("");
  const router = useRouter()

  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      imageUrl: "",
      endDate: "",
      priority: "LOW",
      collaboratorIds: [],
      workspaceId: "",
    }
  })

  async function onSubmit(data: createTaskSchemaType) {
    // if (loading) return;
    //         setLoading(true);
    
            // try {
            //  const task =  await createWorspaceApi(data);

            console.log('data', data)
    
            //   toast.success(`Workspace ${data.title} Successfully!`);
            //   router.push(`/workspace/${data.workspaceId}/dashboard`)
            // } catch (error: any) {
            //   toast.error(error.message || "SignIn failed");
            // } finally {
            //   setLoading(false);
            // }
}

  return (
   <div className="w-full flex flex-co gap-4 min-h-0 max-w-3xl py-4">

  <div className="w-full px-8  flex flex-col gap-4">
    <p className="text-2xl leading-tight font-bold">New Task</p>
    <div className="w-full flex flex-col gap-4">
      <Card className="w-full flex-1">
         
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
             name='title'
             control={form.control}
             render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-xl'>
                    Task Title
                  </FieldLabel>
                  <Input
                   {...field}
                    id="form-rhf-demo-title"
                    placeholder="Type your awesome task..."
                    autoComplete="off"
                    className='h-10 px-2 outline-none focus:ring-0'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
             )}
            />
                

            <Controller
            name='category'
            control={form.control}
            render={({field, fieldState}) => (

              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-xl'>
                    Category
                  </FieldLabel>

                  <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant="outline">Open</Button> */}
                  <div className="flex items-center justify-between border h-10 px-2 rounded-sm">
                    <p className="text-[1rem] text-gray-500 leading-tight">{field.value || "Select Category"}</p>
                    <ArrowDown className="size-5 text-gray-500"/>
                   </div>
                   
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mt-4">
                  <DropdownMenuGroup>

                    <DropdownMenuRadioGroup  value={field.value}
                                      onValueChange={field.onChange}>
                                        {Category.map((item: CategoryType) => (
                                            <DropdownMenuRadioItem value={item.value} key={item.value}>
                                            {item.label}
                                          </DropdownMenuRadioItem>
                                        ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {fieldState.invalid && (
                <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
            )}
                  />
            
                  <Controller
                  name='description'
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-description" className='text-xl'>
                    Description
                  </FieldLabel>
                  <InputGroup>
                     <InputGroupTextarea
                     {...field}
                      id="form-rhf-demo-description"
                      placeholder="Describe what needs to be done..."
                      rows={6}
                      className="min-h-40 resize-none outline-none focus:ring-0"
                    />
                  </InputGroup>
                  <FieldDescription>
                    Provide all details needed for someone to understand and act on this task.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                </Field>
                    )}
                      />

                <div className='flex items-center gap-2'>
                <Controller
                  name='endDate'
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-lg'>
                    Due Date
                  </FieldLabel>
                  <Input
                   {...field}
                    id="form-rhf-demo-title"
                    placeholder="03/06/2026"
                    autoComplete="off"
                    className='h-10 px-2 outline-none focus:ring-0 rounded'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                </Field>)}
                />

                <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-lg'>
                    Attachment
                  </FieldLabel>
                    <div className='flex items-center gap-2 border rounded-md px-2'>

                     <div className='w-full h-10 flex items-center justify-center'>
                        <p className='text-muted-foreground text-sm'>Upload</p>
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
                          <Checkbox className='border rounded-full border-red-600'
                            checked={priority === "URGENT"}
                            onCheckedChange={() => setPriority("URGENT")}
                          />
                          <p className='text-muted-foreground text-sm'>Urgent</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-blue-600'
                          checked={priority === "NORMAL"}
                          onCheckedChange={() => setPriority("NORMAL")}
                          />
                          <p className='text-muted-foreground text-sm'>Normal</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-yellow-600'
                             checked={priority === "LOW"}
                             onCheckedChange={() => setPriority("LOW")}
                          />
                          <p className='text-muted-foreground text-sm'>Low</p>
                        </div>

                         </div>


                          <div className='flex flex-col gap-4'>
                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-gray-600'
                           checked={priority === "TODO"}
                           onCheckedChange={() => setPriority("TODO")}
                          />
                          <p className='text-muted-foreground text-sm'>To Do</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-primary'
                           checked={priority === "INPROGRESS"}
                           onCheckedChange={() => setPriority("INPROGRESS")}
                          />
                          <p className='text-muted-foreground text-sm'>In Progress</p>
                        </div>

                        <div className='flex items-center gap-x-1'>
                          <Checkbox className='border rounded-full border-green-600 accent-green-500'
                           checked={priority === "COMPLETED"}
                           onCheckedChange={() => setPriority("COMPLETED")}
                          />
                          <p className='text-muted-foreground text-sm'>Completed</p>
                        </div>

                         </div>
                    </div>
                  </Field>
                  </div>
          </FieldGroup>
        </form>
      </CardContent>
      
    </Card>

    </div>
    </div>

         <div className='w-56 flex items-end'>
            <Button className="flex px-4 py-5 items-center justify-center gap-2 rounded-md bg-primary text-white cursor-pointer w-full" type="submit" onClick={form.handleSubmit(onSubmit)}>
            <Rocket className='text-white size-5'/>
              <p className='text-[1rem] leading-tight font-semibold'>Launch Task</p>
            </Button>
         </div>
    </div>
  )
}

export default CreateTask
