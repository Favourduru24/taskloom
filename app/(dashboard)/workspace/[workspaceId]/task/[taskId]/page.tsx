"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { AlertTriangle, Check, Edit, X, Trash2, UserPlus, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useParams, useRouter} from "next/navigation"
import { deleteWorkspaceTask, getWorkspaceTaskId, updateTaskApi } from "@/utility/api/task"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Controller, useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateTaskSchema, updateTaskSchemaType } from "@/utility/validation/task"
import { Textarea } from "@/components/ui/textarea"
import { Category, CategoryType } from "@/constants"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { getAvatar } from "@/lib/utils"
import Link from "next/link"

 type User = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  password: string;
  createdAt: string;
  updatedAt: string;
};

type Collaborator = {
  taskId: string;
  userId: string;
  user: User[];
};

 export interface TaskProps {
  id: number;
  title: string;
  description: string;
  priority: string;
  imageUrl?: string;
  category: string;
  endDate: string;
  timeline: number;
  collaborators: Collaborator
 }
const TaskDetails = () => {
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [priority, setPriority] = useState<string>("");
  const [taskDetails, setTaskDetails] = useState<TaskProps>()

  const params: {workspaceId: string, taskId: string} = useParams()
  
    const {workspaceId, taskId} = params
    const router = useRouter()

    useEffect(() => {
     async function fetchTask () {
       setLoading(true)
       try{
         const {data, error} = await getWorkspaceTaskId(workspaceId, taskId)
         
         setTaskDetails(data)

       }catch(error: any) {
        console.log(error, "Workspace error");
       } finally {
        setLoading(false)
       }
     }

      fetchTask()
    }, [])
    
    const form = useForm<updateTaskSchemaType>({
        resolver: zodResolver(updateTaskSchema),
        defaultValues: {
          title: taskDetails?.title ? taskDetails?.title : '',
          category: "",
          description: "",
          endDate: "",
        }
      })

      useEffect(() => {
        if (taskDetails) {
          form.reset({
            title: taskDetails.title ?? "",
            category: taskDetails.category ?? "",
            description: taskDetails.description ?? "",
            endDate: taskDetails.endDate ?? "",
          })
        }
      }, [taskDetails])


      async function onSubmit(data: updateTaskSchemaType) {
        if (editing) return;
      
        setEditing(true);
      
        try {
        //   let imageUrl: string[] = [];
      
        //   if (uploadedFiles.length > 0) {
        //     setIsUploadingMedia(true);
      
        //     const uploadPromises = uploadedFiles.map(async (file) => {
        //       const formData = new FormData();
        //       formData.append('file', file);
      
        //       if (file.name) {
        //         formData.append('filename', file.name);
        //       }
      
        //       const res = await uploadAsset(formData, workspaceId);
        //       return res?.url;
        //     });
      
        //     const uploadedUrls = await Promise.all(uploadPromises);
      
        //     imageUrl = uploadedUrls.filter(Boolean);
        //     setIsUploadingMedia(false);
        //   }
      
          await updateTaskApi(
            data,
            taskId,
            workspaceId,
            priority,
          );
      
          toast.success(`Task "${data.title}" saved successfully!`);
      
        } catch (error: any) {
          toast.error(
            error?.message || "Something went wrong. Please try again."
          );
        } finally {
          setEditing(false);
        }
      }

  async function handleDelete() {
    if (deleting) return; // Prevent multiple clicks while loading

    setDeleting(true);

    try {
      await deleteWorkspaceTask(workspaceId, taskId)
      router.push(`/workspace/${workspaceId}/tasks`);
    } catch (error: any) {
      toast.error(
        error?.message || "An unexpected error occurred. Please try again"
      );
    } finally {
      setDeleting(false);
    }
  }
      
  if(loading) {
    return (
      <div>
        loading
      </div>
    )
  }

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0">
       <form className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
           
        <Link href={`/workspace/${workspaceId}/task`} className='border border-gray-400 flex rounded-full items-center  gap-x-3 px-2 py-1 w-fit max-w-28 cursor-pointer'>
                                            <ArrowLeft className='size-4 cursor-pointer text-muted-foreground'/>
                                            <p className='text-muted-foreground text-sm'>Back</p>
                                        </Link>
               
          <div className="flex md:flex-row flex-col w-full h-full md:gap-10 gap-5 ">
         <div className="max-w-md w-full h-full flex flex-col gap-2">
         <Controller
             name='title'
             control={form.control}
             render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-xl'>
                    Task View
                  </FieldLabel>

                  <div className="flex items-center justify-between gap-2 max-w-md border p-1 rounded-md">
                  <Input
                   {...field}
                    id="form-rhf-demo-title"
                    placeholder="Type your awesome task..."
                    autoComplete="off"
                    className='h-10 px-2 outline-none focus:ring-0 w-full border-0'
                    />
                    <Edit className="size-6 text-gray-500"/>
                    </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
             )}
            />

           <Card className="rounded-lg ring-0">
              <div className="flex flex-col px-2">
                <p className="text-xl leading-tight font-semibold">Description</p>
                 <Controller
                  name="description"
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Textarea className="h-36 w-full mt-4 outline-none border p-2 rounded-lg placeholder:leading-tight placeholder:text-gray-500 placeholder:text-[0.9rem] leading-6" 
                    {...field}
                    placeholder="Describe your task here."
                     autoComplete="off"
                    id="form-rhf-demo-description"
                    >
   
                    </Textarea>
                  )}
                 />
                
              </div>
           </Card>

           
              <div className="flex flex-col px-2">
                <p className="text-xl leading-tight font-semibold">Attachment</p>
              </div>

           {taskDetails?.imageUrl && (
                    <div className="grid grid-cols-4 gap-2 my-1">
                      <div className="relative group">
                      <Image
                                src={taskDetails?.imageUrl
                                  }
                                width={500}
                                height={500}
                                alt={'image'}
                                className="w-full h-24 object-cover rounded border"
                              />
                      </div>
                    </div>
                  )} 

           
           <Card className="rounded-lg ring-0 border">
              <div className="flex flex-col px-2 gap-2">
                <p className="text-xl leading-tight font-semibold">Collaborators</p>

                 <div className="flex items-center justify-between w-full"> 
                     <div className="flex items-center gap-2">
                    {taskDetails?.collaborators?.user?.map((member: User) => (
                                           <div className='border border-gray-400 flex rounded-full items-center gap-x-2 p-1' key={member.id}>
                                           <div className="w-5 h-5 rounded-full shadow-sm "> 
                                             <Image
                                             src={getAvatar(member?.avatarUrl, member.email)}
                                              width={42}
                                              height={42}
                                              alt='colaborator'
                                              className="object-center object-cover rounded-full size-5" 
                                              />
                                              </div>
                    
                                            <p className='text-muted-foreground text-sm'>{member.fullName}</p>
                                            <X className='size-4 cursor-pointer'/>
                                        </div>
                                      ))}
                        </div>
                                
                        <div className="w-10 h-10 rounded-full  shadow-sm flex items-center justify-center bg-primary">
                     <UserPlus className="size-5 text-white-100 cursor-pointer z-20"/>
                     </div>
                  </div>
              </div>
           </Card>
        </div>  

         <div className="w-full md:max-w-sm h-full flex flex-col gap-4 mt-3">

         
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
                    className='h-10 px-2 outline-none focus:ring-0 rounded border'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                </Field>)}
                />
                </div>
                                 
                <Card className="rounded-lg ring-0">
              <Controller
                          name='category'
                          control={form.control}
                          render={({field, fieldState}) => (
              
                            <Field data-invalid={fieldState.invalid}>
              
                                <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <div className="flex items-center justify-between border h-10 px-2 rounded-sm cursor-pointer">
                                  <p className="text-[1rem] text-gray-500 leading-tight">{field.value || "Select Category"}</p>
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
              
           </Card> 
              
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


               <div className="w-full flex flex-col gap-4 mt-4">
           <Button className="w-full flex items-center h-12 cursor-pointer" type="submit" onClick={form.handleSubmit(onSubmit)}>
             <Check className="text-white-100 size-5"/>
            <p className="text-[1rem] leading-tight text-white-100">{loading ? 'Saving...' : 'Mark as Done'}</p>  
           </Button>

           <Button className="w-full flex items-center h-12 bg-amber-500" variant={'default'}>
             <AlertTriangle className="text-white-100 size-5"/>
            <p className="text-[1rem] leading-tight text-white-100">Raise Ticket</p>  
           </Button>
              {/* Delete Here */}
           <Button className="w-full flex items-center h-12 ring-2 ring-red-500 cursor-pointer"
           variant={'ghost'} 
           type="button" 
           onClick={handleDelete} 
           disabled={deleting}>
             <Trash2 className="text-destructive size-5"/>
            <p className="text-[1rem] leading-tight text-red-500">{deleting ? "Deleting..." : "Delete Task"}</p>  
           </Button>
               </div>
        </div>  
          </div>
           </FieldGroup>
       </form>
    </div>
  )
}

export default TaskDetails
