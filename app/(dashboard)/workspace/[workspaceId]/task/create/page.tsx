'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { InputGroup, InputGroupTextarea } from '@/components/ui/input-group'
import { getAvatar } from '@/lib/utils'
import { createTaskSchema, createTaskSchemaType } from '@/utility/validation/task'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDown, Image as Media, Link2Icon, X, Plus, Rocket, Trash, Copy} from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Category, CategoryType } from '@/constants'
import { getWorkspaceMemberApi } from '@/utility/api/workspace'
import { WorkspaceMember } from '../page'
import { createTaskApi, getWorkspaceTasksApi } from '@/utility/api/task'




const CreateTask = () => {

   const params = useParams<{workspaceId: string}>()
  
   const {workspaceId} = params

  const [loading, setLoading] = useState(false)
  const [priority, setPriority] = useState<string>("");
  const router = useRouter()
  const [members, setMembers] = useState<WorkspaceMember[]>([])
  const [collaboratorIds, setCollaboratorIds] = useState<string[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (!workspaceId) return;
  
    async function fetchMember() {
      const data = await getWorkspaceMemberApi(workspaceId);
      setMembers(data);
    }
  
    fetchMember();
  }, [workspaceId]);

  function toggleUserId(userId: string) {
    setCollaboratorIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId) 
        : [...prev, userId] 
    );
  }

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      const newFiles: File[] = [];
      const newPreviews: string[] = [];

      Array.from(files).forEach((file) => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');

        if(!isImage || isVideo) toast('only image or video can be uploaded')
        
        const maxFiles = 5

        if (uploadedFiles.length + newFiles.length >= maxFiles) {
          toast(`File limit reached Maximum ${maxFiles}`);
          return;
        }

        newFiles.push(file);
        newPreviews.push(URL.createObjectURL(file));
      });

      setUploadedFiles((prev) => [...prev, ...newFiles]);
      setFilePreviews((prev) => [...prev, ...newPreviews]);
    },
    [toast, uploadedFiles]
  );

  const handleRemoveFile = useCallback(
    (index: number) => {
      const newFiles = uploadedFiles.filter((_, i) => i !== index);
      const newPreviews = filePreviews.filter((_, i) => i !== index);

      if (filePreviews[index]) {
        URL.revokeObjectURL(filePreviews[index]);
      }

      setUploadedFiles(newFiles);
      setFilePreviews(newPreviews);
    },
    [uploadedFiles, filePreviews]
  );

  const selectedMembers = members.filter((mem) =>
    collaboratorIds.includes(mem.userId)
  );

  const form = useForm<createTaskSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      endDate: "",
    }
  })


  async function onSubmit(data: createTaskSchemaType) {
    if (loading) return;
    setLoading(true);
  
    try {
        await createTaskApi(
        data,
        priority,
        workspaceId,
        collaboratorIds
      );
  
      toast.success(`Task "${data.title}" created successfully!`);
  
      router.push(`/workspace/${workspaceId}/task`);
    
    } catch (error: any) {
      toast.error(error.message || "Task creation failed");
    } finally {
      setLoading(false);
    }
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
                    className='h-10 px-2 outline-none focus:ring-0 rounded border'
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
                    <div className='flex items-center gap-2 border rounded-md px-2 relative'>
                      <input 
                      type='file'
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handleFileUpload}
                      maxLength={5} 
                      accept='image/*' 
                      // disabled={uploadedFiles.length >= maxFiles}
                      />
                     <div className='w-full h-10 flex items-center justify-center'>
                        <p className='text-muted-foreground text-sm'>Upload</p>
                     </div>
                    <Link2Icon className='size-5'/>
                    <Media className='size-5'/>
                    </div>
                </Field>
                </div>
                {filePreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-2">
                      {filePreviews.map((preview, index) => {
                        const file = uploadedFiles[index];
                        const isVideo = file?.type.startsWith('video/');
                        return (
                          <div key={preview} className="relative group">
                            {isVideo ? (
                              <video
                                src={preview}
                                className="w-full h-24 object-cover rounded border"
                                controls
                                // muted
                              />
                            ) : (
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-cover rounded border"
                              />
                            )}
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            >
                              <X name="X" className="h-3 w-3 text-white cursor-pointer" onClick={() => handleRemoveFile(index)}/>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  )}


                 <div className='flex items-center gap-2'>
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-lg'>
                    Add Collaboration
                  </FieldLabel>
                    
                    <div className='flex items-center justify-between w-full'>

                 <div className='flex items-center gap-2 '>
                  {selectedMembers.map((member: WorkspaceMember) => (
                       <div className='border border-gray-400 flex rounded-full items-center gap-x-2 p-1' key={member.userId}>
                       <div className="w-5 h-5 rounded-full shadow-sm "> 
                         <Image
                         src={getAvatar(member.user.avatarUrl, member.user.email)}
                          width={42}
                          height={42}
                          alt='colaborator'
                          className="object-cover rounded-full" 
                          />
                          </div>

                        <p className='text-muted-foreground text-sm'>{member.user.fullName}</p>
                        <X className='size-4 cursor-pointer' onClick={() => toggleUserId(member.user.id)}/>
                    </div>
                  ))}
                     
                      </div>
                      <Dialog>
  <DialogTrigger asChild>
    <div className='border border-gray-400 flex rounded-full items-center gap-x-2 p-1 cursor-pointer'>
            <Plus className='SIZE-5'/>
            </div></DialogTrigger>
            <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
             <Separator/>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1" className='text-muted-foreground text-xs font-semibold'>Member email</Label>
              <div className='flex items-center justify-between gap-3 w-full h-9'>

              <Input id="name-1" name="name" defaultValue="mail@gmail.com" className='h-full rounded-sm'/>
              <Button className='bg-primary h-full rounded-sm'>
                <p className='text-[0.7rem] font-medium'>Send Invite</p>
              </Button>
              </div>
            </Field>
          </FieldGroup>

          <div className='flex flex-col w-full'>
                <p className='leading-tight text-xs mt-2 mb-4 text-muted-foreground font-semibold'>Existing Member</p>

                <div className='flex flex-col gap-2 w-full'>
                   {members.map((member: WorkspaceMember) => (
                     <div className='flex w-full justify-between items-center' key={member.userId}>
                     <div className='flex gap-2 items-center'>
                     <div className="w-10 h-10 rounded-full shadow-sm "> 
                        <Image
                        src={getAvatar(member.user.avatarUrl, member.user.email)}
                        width={42}
                        height={42}
                        alt={member.user.fullName ?? 'collaborators'}
                        className="object-cover rounded-full" 
                        />
                         </div>
                         <div className='flex flex-col gap-1'>
                             <p className='leading-tight text-sm text-gray-800 font-semibold'>{member.user.fullName}</p>
                             <p className='leading-tight text-xs text-muted-foreground'>{member.role}</p>
                         </div>
                     </div>

                     <div className='flex items-center gap-2 rounded-sm cursor-pointer bg-muted border h-7 px-2' >
                          <p className='leading-tight text-xs text-muted-foreground'>{collaboratorIds.includes(member.user.id) ? "Selected" : "Select"}</p>
                          <Checkbox className='text-green-500 size-3 border border-muted-foreground accent-muted-foreground  data-[state=checked]:bg-muted-foreground
    data-[state=checked]:border-muted-foreground cursor-pointer' checked={collaboratorIds.includes(member.user.id)} onCheckedChange={() => toggleUserId(member.user.id)} onClick={(e) => e.stopPropagation()}/>    
                     </div>
                 </div>
                   ))}
                </div>
          </div>

          
              <Separator/>
              <p className='leading-tight text-xs text-muted-foreground'>Copy the link below</p>

              <div className='bg-muted w-full flex items-center py-2 px-2 border rounded-lg justify-between'>
                 <p className='leading-tight text-xs mt-2 mb-2 text-muted-foreground'>aklkfncsz84385ht34eih3gvnwa\sgn</p>
                 <Button className='flex items-center gap-2 rounded-sm cursor-pointer bg-green-200'>
                             <Copy className='text-green-400 size-3'/>    
                             <p className='leading-tight text-xs text-green-400 font-medium'>copy</p>
                        </Button>
              </div>
        </DialogContent>
</Dialog>

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
              <p className='text-[1rem] leading-tight font-semibold'>{loading ? 'Loading...' : 'Launch Task'}</p>
            </Button>

           
         </div>

        
    </div>
  )
}

export default CreateTask
