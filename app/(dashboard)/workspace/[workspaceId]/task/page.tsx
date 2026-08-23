import Category from "@/components/shared/Category"
import TaskList from "@/components/shared/TaskList"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {getAvatar } from "@/lib/utils"
import { getWorkspaceTasksApi } from "@/utility/api/task"
import { getWorkspaceMemberApi } from "@/utility/api/workspace"
import { Copy,Plus, UserPlus } from "lucide-react"
import Image from "next/image"

type WorkspaceRole = 'MEMBER' | 'ADMIN' | 'OWNER'; 
type WorkspaceMemberStatus = 'ACTIVE' | 'INACTIVE' | 'PENDING';

type User = {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string | null;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceMember = {
  userId: string;
  workspaceId: string;
  role: WorkspaceRole;
  status: WorkspaceMemberStatus;
  user: User;
};

 
const Task = async ({params, searchParams}: {params: Promise<{ workspaceId: string }>, searchParams: Promise<{
  priority?: string
}>}) => {

  const { workspaceId } = await params
  const {priority} = await searchParams

  const [{data, error}, member] = await Promise.all([
    getWorkspaceTasksApi(workspaceId, priority),
    getWorkspaceMemberApi(workspaceId)]
  )

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-4">
         <div className="w-full">
             <p className="text-2xl leading-tight font-bold">Tasks</p>
              </div>
                 <div className="flex flex-col-reverse md:flex-row md:gap-2 gap-5 md:items-center justify-between ">

                <Category/>

                 <div className="flex gap-x-3">

                 <div className="flex items-center -space-x-2"> 
                                {member?.slice(0, 3).map((wsMember: WorkspaceMember) => (
                                  <div key={wsMember.userId} className="relative z-10">
                                    <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm"> 
                                      <Image
                                        src={getAvatar(wsMember.user.avatarUrl, wsMember.user.email)}
                                        width={32}
                                        height={32}
                                        alt={wsMember.user.fullName}
                                        className="object-cover size-8" 
                                      />
                                    </div>
                                  </div>
                                ))}
                
                                <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm flex items-center justify-center bg-primary z-20">
                                <Plus className="size-5 text-white"/>
                                </div>
                              </div>

                              <Dialog>
  <DialogTrigger asChild>
  <Button className='bg-primary md:w-24 w-fit sm:px-2 sm:py-1 rounded-sm flex items-center justify-center md:h-9 h-8 cursor-pointer '>
                    {/* <UserPlus className="size-5 text-white-100 cursor-pointer "/> */}
                    <p className='text-white-100 leading-tight  text-xl'>+</p>
                    <p className='text-white-100 leading-tight hidden md:block'>Invite</p>
                </Button>
                </DialogTrigger>
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
                   {member.map((m: WorkspaceMember) => (
                     <div className='flex w-full justify-between items-center bg-muted p-1 rounded-md' key={m.userId}>
                     <div className='flex gap-2 items-center'>
                     <div className="w-10 h-10 rounded-full shadow-sm "> 
                        <Image
                        src={getAvatar(m.user.avatarUrl, m.user.email)}
                        width={42}
                        height={42}
                        alt={m.user.fullName ?? 'collaborators'}
                        className="object-center rounded-full size-10" 
                        />
                         </div>
                         <div className='flex flex-col gap-1'>
                             <p className='leading-tight text-sm text-gray-800 font-semibold'>{m.user.fullName}</p>
                             <p className='leading-tight text-xs text-muted-foreground'>{m.role}</p>
                         </div>
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
                  </div>

                  

           <div className="grid gap-x-4 gap-y-6 grid-cols-[repeat(auto-fill,minmax(240px,1fr))] mt-6">
           <TaskList
            initialTasks={data}
            workspaceId={workspaceId}
            error={error}
          />
           </div>

       </div>
    </div>
  )
}

export default Task
