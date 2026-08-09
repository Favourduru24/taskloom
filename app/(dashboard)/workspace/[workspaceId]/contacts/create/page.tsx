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
import { ArrowDown, Image as Media, Link2Icon, X, Rocket} from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Category, CategoryType } from '@/constants'
import { getWorkspaceMemberApi } from '@/utility/api/workspace'
import { createTaskApi, getWorkspaceTasksApi } from '@/utility/api/task'
import { uploadAsset } from '@/utility/api/library'
import { useSocket } from '@/hooks/use-socket'
import { createContactSchema, createContactType } from '@/utility/validation/contact'
import { createContactApi } from '@/utility/api/contact'




const CreateContact = () => {

   const params = useParams<{workspaceId: string}>()
  
   const {workspaceId} = params

  const [loading, setLoading] = useState(false)
   
  const router = useRouter()
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [uploadingMedia, setIsUploadingMedia] = useState(false)

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

  const form = useForm<createContactType>({
    resolver: zodResolver(createContactSchema),
    defaultValues: {
      name: "",
      email: "",
      location: "",
      number: "",
      status: "",
      relationshipSummary: "",
      source: ""
    }
  })


  async function onSubmit(data: createContactType) {
    if (loading) return;
  
    setLoading(true);
    setIsUploadingMedia(false);
  
    try {
      let imageUrl: string[] = [];
  
      if (uploadedFiles.length > 0) {
        setIsUploadingMedia(true);
  
        const uploadPromises = uploadedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
  
          if (file.name) {
            formData.append('filename', file.name);
          }
  
          const res = await uploadAsset(formData, workspaceId);
          return res?.url;
        });
  
        const uploadedUrls = await Promise.all(uploadPromises);
  
        imageUrl = uploadedUrls.filter(Boolean);
        setIsUploadingMedia(false);
      }
  
      await createContactApi(
        data,
        workspaceId,
        imageUrl[0] ?? null
      );
  
      toast.success(`Contact "${data.name}" created successfully!`);
  
      router.push(`/workspace/${workspaceId}/contacts`);
    } catch (error: any) {
      console.error(error);
  
      toast.error(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
      setIsUploadingMedia(false);
    }
  }
  return (
   <div className="w-full flex md:flex-row flex-col gap-4 min-h-0 max-w-3xl py-4 px-8">

  <div className="w-full  flex flex-col gap-4">
    <p className="text-2xl leading-tight font-bold">New Contact</p>
    <div className="w-full flex flex-col gap-4">
      <Card className="w-full flex-1">
         
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
             name='name'
             control={form.control}
             render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-xl'>
                    Contact Name
                  </FieldLabel>
                  <Input
                   {...field}
                    id="form-rhf-demo-title"
                    placeholder="Enter name.."
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
             name='email'
             control={form.control}
             render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-xl'>
                    Contact Email
                  </FieldLabel>
                  <Input
                   {...field}
                    id="form-rhf-demo-title"
                    placeholder="email@gmail.com"
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
             name='number'
             control={form.control}
             render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-number" className='text-xl'>
                    Contact Number
                  </FieldLabel>
                  <Input
                   {...field}
                    id="form-rhf-demo-title"
                    placeholder="+12308034...."
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
              name='location'
              control={form.control}
              render={({field, fieldState}) => (
              <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-location" className='text-xl'>
                    Contact Location
                  </FieldLabel>
                  <Input
                   {...field}
                    id="form-rhf-demo-location"
                    placeholder="Lagos Nigeria"
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
                  name='status'
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-title" className='text-lg'>
                    Status
                  </FieldLabel>
                  <Input
                   {...field}
                    id="form-rhf-demo-title"
                    placeholder="eg (Recruiter, Client, Founder, Manager)"
                    autoComplete="off"
                    className='h-10 px-2 outline-none focus:ring-0 rounded border'
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                    )}
                </Field>)}
                />
            
                  <Controller
                  name='relationshipSummary'
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-description" className='text-xl'>
                    Relationship Summary
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

                <div className='flex md:flex-row flex-col items-center gap-2'>
                <Controller
                  name='source'
                  control={form.control}
                  render={({field, fieldState}) => (
                    <Field>
                  <FieldLabel htmlFor="form-rhf-demo-source" className='text-lg'>
                    Source
                  </FieldLabel>
                  <Input
                   {...field}
                    id="form-rhf-demo-source"
                    placeholder="LINKEDIN"
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
                   Contact Url
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
                                className="w-full h-24 object-center object-cover rounded border "
                                controls
                                // muted
                              />
                            ) : (
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-24 object-center object-cover rounded border"
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

          </FieldGroup>
        </form>
      </CardContent>
      
    </Card>

    </div>
    </div>

         <div className='md:w-56 w-full flex items-end'>
            <Button className="flex px-4 py-5 items-center justify-center gap-2 rounded-md bg-primary text-white cursor-pointer w-full" type="submit" onClick={form.handleSubmit(onSubmit)}>
            <Rocket className='text-white size-5'/>
              <p className='text-[1rem] leading-tight font-semibold'>{loading ? 'Loading...' : 'Build Contact'}</p>
            </Button>

           
         </div>

        
    </div>
  )
}

export default CreateContact