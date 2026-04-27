import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { formatDate, getAvatar } from "@/lib/utils"
import { getWorkspaceTasksApi } from "@/utility/api/task"
import { getWorkspaceMemberApi } from "@/utility/api/workspace"
import { Clock, Copy, EllipsisVertical, Plus, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

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

const Task = async ({params}: {params: Promise<{ workspaceId: string }>
}) => {

  const { workspaceId } = await params

  const [data, member] = await Promise.all([
    getWorkspaceTasksApi(workspaceId),
    getWorkspaceMemberApi(workspaceId)]
  )
   
  interface myTeamProps {
     id: number
     profilePics: string
     name: string;
     email: string,
     lastMessage: string
   }

  interface taskStatusProps {
    id: number;
    status: string;
   }

  type Collaborator = {
    taskId: string;
    userId: string;
    user: User;
  };

   interface TaskProps {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    category: string;
    endDate: string;
    timeline: number;
    collaborators: Collaborator[]
   }
   
  const myTeam: myTeamProps[] = [
    {
      id: 1,
     profilePics: '/images/user1.png',
     name: 'Christ Moris',
     email: 'durupristine@gmail.com',
     lastMessage: 'Hi Pristine, How are you'
    },
    {
     id: 2,
     profilePics: '/images/user1.png',
     name: 'Joseph Mandola',
     email: 'joseph@gmail.com',
     lastMessage: 'Do you need that design'
    },
    {
     id: 3,
     profilePics: '/images/user1.png',
     name: 'Charlie Chu',
     email: 'charliechu@gmail.com',
     lastMessage: 'Good Morning, what is our progess'
    },
    {
      id: 4,
     profilePics: '/images/user1.png',
     name: 'Micheal Jordan',
     email: 'michealjordan@gmail.com',
     lastMessage: 'Have you gotten the design'
    },
    {
      id: 5,
     profilePics: '/images/user1.png',
     name: 'Micheal Jordan',
     email: 'durupristine@gmail.com',
     lastMessage: 'Have you gotten the design'
    },

  ]

  const TaskStatus: taskStatusProps[] = [
    {
     id: 1,
     status: 'To Do-List'
    },
    {
     id: 2,
     status: 'In Progress'
    },
    {
     id: 3,
     status: 'In Review'
    },
    {
     id: 4,
     status: 'Done'
    },
    ]

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-4">
         <div className="flex items-center justify-between w-full">
            <p className="text-2xl leading-tight font-bold">Tasks</p>

            <div className="flex items-center gap-x-4">
            <Dialog>
  <DialogTrigger asChild>
  <Button className='bg-primary w-24 p-2 rounded-sm flex items-center justify-center h-9 cursor-pointer '>
                    <Plus className="size-5 text-white"/>
                    <p className='text-white-100 leading-tight'>Invite</p>
                </Button></DialogTrigger>
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
                        className="object-cover rounded-full" 
                        />
                         </div>
                         <div className='flex flex-col gap-1'>
                             <p className='leading-tight text-sm text-gray-800 font-semibold'>{m.user.fullName}</p>
                             <p className='leading-tight text-xs text-muted-foreground'>{m.role}</p>
                         </div>
                     </div>

                     {/* <div className='flex items-center gap-2 rounded-sm cursor-pointer bg-muted border h-7 px-2' >
                          <p className='leading-tight text-xs text-muted-foreground'>{collaboratorIds.includes(m.user.id) ? "Selected" : "Select"}</p>
                          <Checkbox className='text-green-500 size-3 border border-muted-foreground accent-muted-foreground  data-[state=checked]:bg-muted-foreground
    data-[state=checked]:border-muted-foreground cursor-pointer' checked={collaboratorIds.includes(member.user.id)} onCheckedChange={() => toggleUserId(member.user.id)} onClick={(e) => e.stopPropagation()}/>    
                     </div> */}
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
               

                

                 <div className="flex items-center -space-x-2"> 
                                {member?.slice(0, 3).map((wsMember: WorkspaceMember) => (
                                  <div key={wsMember.userId} className="relative z-10">
                                    <div className="w-8 h-8 overflow-hidden rounded-full ring-2 ring-white shadow-sm"> 
                                      <Image
                                        src={getAvatar(null, wsMember.user.email)}
                                        width={32}
                                        height={32}
                                        alt={wsMember.user.fullName}
                                        className="object-cover" 
                                      />
                                    </div>
                                  </div>
                                ))}
                
                                <div className="w-8 h-8 overflow-hidden rounded-full ring-2 ring-white shadow-sm flex items-center justify-center bg-primary z-20">
                                  <UserPlus className="size-5 text-white-100 cursor-pointer"/>
                                </div>
                              </div>
                  </div>
              </div>

            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] mt-6">
               {
                TaskStatus.map((task: taskStatusProps) => (
                  <Card className="shadow-sm border ring-0 rounded-sm leading-none h-10 flex justify-center" key={task.id}>
                   <div className="flex flex-row items-center justify-between px-2 ">
                   <p className="text-sm leading-tight font-semibold text-black/60">{task.status}</p>
                   <div className='bg-primary w-7 rounded-sm flex items-center justify-center h-7 cursor-pointer'>
                    <Checkbox/>
                </div>
                   </div>
               </Card>
                ))
               }
           </div>

           <div className="grid gap-x-4 gap-y-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] mt-6">
            {data.map((task: TaskProps) => (
              <Link href={`/task/${task.id}`} key={task.id}>              
              <Card className="shadow-sm border ring-0 rounded-xl leading-none h-fit flex flex-col" >
                  <div className="flex flex-row items-center justify-between px-2">
                     <Button className='bg-primary w-fit p-2 rounded-sm flex items-center justify-center h-9 cursor-pointer '>
                    <p className='text-white-100 leading-tight text-sm'>{task.category}</p>
                   </Button>
                   <EllipsisVertical className="size-5"/>
                  </div>

                 {task.imageUrl ?  <div className="w-full h-24 overflow-hidden rounded- ring-2 ring-white shadow-sm px-2 rounded-md"> 
                        <Image
                         src={task.imageUrl}
                         width={500}
                         height={500}
                         alt='task-img'
                         className="object-cover rounded-md" 
                          />
                      </div> : <div className="w-full h-24 overflow-hidden rounded- ring-2 ring-white shadow-sm px-2 rounded-md"> 
                        <Image
                         src={getAvatar(null, task.title)}
                         width={500}
                         height={500}
                         alt='task-img'
                         className="object-cover rounded-md" 
                          />
                      </div> }

                  <div className="px-3 flex flex-col gap-1">
                    <p className="text-lg leading-8 font-semibold capitalize">{task.title}</p>
                    <p className="text-[0.8rem] leading-6 break-all font-medium text-muted-foreground">{task.description}</p>

                    <Button className='w-24 p-2 rounded-sm flex items-center justify-center h-8 cursor-pointer border border-gray-200 mt-1' variant={'ghost'}>
                    <p className='text-destructive leading-tight font-medium text-[0.7rem]'>{formatDate(task.endDate)
                    }</p>
                   </Button>

                   <div className="flex justify-between items-center mt-2">
                     <div className="flex items-center -space-x-2"> 
                                {task.collaborators?.slice(0, 3).map((collab: Collaborator, index) => (
                                  <div key={index} className="relative">
                                    <div className="w-6 h-6 overflow-hidden rounded-full ring-2 ring-white shadow-sm"> 
                                      <Image
                                        src={getAvatar(collab.user.avatarUrl, collab.user.fullName)}
                                        width={32}
                                        height={32}
                                        alt={collab.user.fullName}
                                        className="object-cover" 
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>

                       <div className="flex items-center gap-x-2">
                          <Clock className="size-5 text-gray-500"/>
                          <p className="leading-6 break-all font-medium text-muted-foreground text-base">5/5</p>
                       </div>
                        </div>
                        </div>
                  </Card>
                </Link>
                  ))}
           </div>

       </div>
    </div>
  )
}

export default Task
