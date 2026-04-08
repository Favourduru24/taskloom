import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getAvatar } from "@/lib/utils"
import { Clock, EllipsisVertical, Plus, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Task = () => {

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

   interface TaskProps {
    id: number;
    topic: string;
    description: string;
    imageUrl?: string;
    status: string;
    date: string;
    timeline: number
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

   const Tasks: TaskProps[] = [
    {
      id: 1,
      topic: 'Design System Creation',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      imageUrl: '/images/image1.png',
      status: 'Design',
      date: 'Aug 13 2026',
      timeline: 4
    },
    {
      id: 2,
      topic: 'Responsive Design',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      imageUrl: '/images/image1.png',
      status: 'Software',
      date: 'May 1 2026',
      timeline: 2
    },
    {
      id: 3,
      topic: 'Competitor Analysis',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      status: 'Research',
      date: 'April 12 2026',
      timeline: 3
    },
    {
      id: 4,
      topic: 'Content Plan & Billing',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      imageUrl: '/images/image1.png',
      status: 'Design',
      date: 'May 24 2026',
      timeline: 5
    },
    {
      id: 5,
      topic: 'Payment Integration',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      imageUrl: '/images/image1.png',
      status: 'Design',
      date: 'Jan 20 2026',
      timeline: 5
    },
    {
      id: 6,
      topic: 'Content Plan & Billing',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      imageUrl: '/images/image1.png',
      status: 'Design',
      date: 'May 24 2026',
      timeline: 5
    },
    {
      id: 7,
      topic: 'Content Plan & Billing',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
      imageUrl: '/images/image1.png',
      status: 'Design',
      date: 'Aug 15 2026',
      timeline: 5
    },
   ]

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-4">
         <div className="flex items-center justify-between w-full">
            <p className="text-2xl leading-tight font-bold">Tasks</p>

            <div className="flex items-center gap-x-2">
               <Button className='bg-primary/70 w-24 p-2 rounded-sm flex items-center justify-center h-9 cursor-pointer '>
                    <Plus className="size-5 text-white"/>
                    <p className='text-white-100 leading-tight'>Invite</p>
                </Button>

                 <div className="flex items-center -space-x-2"> 
                                {myTeam.slice(0, 3).map((team: myTeamProps) => (
                                  <div key={team.id} className="relative z-10">
                                    <div className="w-8 h-8 overflow-hidden rounded-full ring-2 ring-white shadow-sm"> 
                                      <Image
                                        src={getAvatar(null, team.email)}
                                        width={32}
                                        height={32}
                                        alt={team.name}
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
                  <Card className="shadow-sm border-none ring-0 rounded-sm leading-none h-12 flex justify-center" key={task.id}>
                   <div className="flex flex-ro items-center justify-between px-2">
                   <p className="text-lg leading-tight font-semibold text-black/60">{task.status}</p>
                   <Button className='bg-primary/70 w-8 rounded-sm flex items-center justify-center h-8 cursor-pointer'>
                    <Plus className="size-5 text-white"/>
                </Button>
                   </div>
               </Card>
                ))
               }
           </div>

           <div className="grid gap-x-4 gap-y-6 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] mt-6">
            {Tasks.map((task: TaskProps) => (
              <Link href={`/task/${task.id}`} key={task.id}>              
              <Card className="shadow-sm border-none ring-0 rounded-xl leading-none h-fit flex flex-col" >
                  <div className="flex flex-row items-center justify-between px-2">
                     <Button className='bg-primary w-24 p-2 rounded-sm flex items-center justify-center h-9 cursor-pointer '>
                    <p className='text-white-100 leading-tight'>{task.status}</p>
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
                         src={getAvatar(null, task.status)}
                         width={500}
                         height={500}
                         alt='task-img'
                         className="object-cover rounded-md" 
                          />
                      </div> }

                  <div className="px-2 flex flex-col gap-2">
                    <p className="text-xl leading-tight font-semibold">{task.topic}</p>
                    <p className="text-[0.9rem] leading-6 break-all font-medium text-gray-400 text-base">{task.description}</p>

                    <Button className='w-24 p-2 rounded-sm flex items-center justify-center h-8 cursor-pointer border border-gray-200' variant={'ghost'}>
                    <p className='text-destructive leading-tight text-[0.9rem]'>{task.date}</p>
                   </Button>

                   <div className="flex justify-between items-center mt-2">
                     <div className="flex items-center -space-x-2"> 
                                {myTeam.slice(0, 3).map((team: myTeamProps) => (
                                  <div key={team.id} className="relative">
                                    <div className="w-6 h-6 overflow-hidden rounded-full ring-2 ring-white shadow-sm"> 
                                      <Image
                                        src={getAvatar(null, team.email)}
                                        width={32}
                                        height={32}
                                        alt={team.name}
                                        className="object-cover" 
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>

                       <div className="flex items-center gap-x-2">
                          <Clock className="size-5 text-gray-500"/>
                          <p className="text-[0.9rem] leading-6 break-all font-medium text-gray-400 text-base">{task.timeline}/5</p>
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
