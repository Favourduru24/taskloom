import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

import { Calendar, Clock, EllipsisVertical, FilePlus, Layers, Link, LucideIcon, Menu, MessageCircleMore, Play, Plus, Star, TrendingDown, TrendingUp, UserPlus } from "lucide-react"
import Image from "next/image"

const Home = () => {

   interface chartItemProps {
     id: number
    chartLabel: string
    chartScore: number
    chartDescription: string
    chartIcon: LucideIcon
    trendType: string
   }

   interface taskChartProps {
     id: number
     timeline: string
     isOn: boolean
   }

   interface myTeamProps {
     id: number
     profilePics: string
     name: string
     lastMessage: string
   }

   interface myTaskProps {
     id: number
     startTime: string
     task: string
     link: string,
     commentCount: number,
     progress: number
   }
   
  const chartItems: chartItemProps[] = [
    {
      id: 1,
      chartLabel: "Task Completed",
      chartScore: 10,
      chartDescription: "10+",
      chartIcon: Star,
      trendType: 'up'
    },
    {
      id: 2,
      chartLabel: "New Task",
      chartScore: 10,
      chartDescription: "10+",
      chartIcon: FilePlus,
      trendType: 'down'
    },
    {
      id: 3,
      chartLabel: "Project Done",
      chartScore: 10,
      chartDescription: "08+",
      chartIcon: Layers,
      trendType: 'up'
    },
  ]

  const taskChartItem: taskChartProps[] = [
    {
      id: 1,
      timeline: 'Daily',
      isOn: true
    },
    {
      id: 2,
      timeline: 'Weekly',
      isOn: false
    },
    {
      id: 3,
      timeline: 'Monthly',
      isOn: false
    }
  ]

   const myTeam: myTeamProps[] = [
    {
      id: 1,
     profilePics: '/images/user1.png',
     name: 'Christ Moris',
     lastMessage: 'Hi Pristine, How are you'
    },
    {
     id: 2,
     profilePics: '/images/user1.png',
     name: 'Joseph Mandola',
     lastMessage: 'Do you need that design'
    },
    {
     id: 3,
     profilePics: '/images/user1.png',
     name: 'Charlie Chu',
     lastMessage: 'Good Morning, what is our progess'
    },
    {
      id: 4,
     profilePics: '/images/user1.png',
     name: 'Micheal Jordan',
     lastMessage: 'Have you gotten the design'
    },
    {
      id: 5,
     profilePics: '/images/user1.png',
     name: 'Micheal Jordan',
     lastMessage: 'Have you gotten the design'
    },

  ]

  const myTasks: myTaskProps[] = [
  {
    id: 2,
    startTime: '11:30 am',
    task: 'Define project color palette',
    link: 'www.coolors.co',
    commentCount: 3,
    progress: 54,
  },
  {
    id: 3,
    startTime: '1:45 pm',
    task: 'Create high-fidelity wireframes',
    link: '://figma.com',
    commentCount: 12,
    progress: 10,
  },
  {
    id: 4,
    startTime: '4:00 pm',
    task: 'Review feedback from client',
    link: 'www.notion.so',
    commentCount: 8,
    progress: 90,
  },
  {
    id: 5,
    startTime: '6:15 pm',
    task: 'Setup NestJS backend boilerplate',
    link: '://github.com',
    commentCount: 2,
    progress: 45,
  }
  ]

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-4 overflow-y-auto custom-scrollbar">
           <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            {
                chartItems.map((item: chartItemProps) => {
                  const Icons = item.chartIcon
                  
                  return (
                    <Card className="shadow-sm border-none ring-0 " key={item.id}>
                    <CardHeader className="border-b border-gray-200">
                       <div className="flex items-center justify-between">
                        <Icons className="size-5 text-primary"/>
                      <CardTitle className="text-[1rem] leading-tight font-medium">{item.chartLabel}</CardTitle>
                          <p className="text-[0.9rem] leading-tight font-medium">{item.chartScore}</p>
                       </div>
                      {/* <CardDescription>Card Description</CardDescription>
                      <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent className="flex gap-x-2 items-center justify-between w-full leading-none">
                    <div>
                    {item.trendType === 'up' ? (
                      <TrendingUp size={100} strokeWidth={1} className="text-primary"/>
                    ) : (
                      <TrendingDown size={100} strokeWidth={1} className="text-red-500" />
                    )}
                  </div>

                     <div>
                        <p className="text-[1rem] leading-7 font-semibold text-gray-500"><span className={cn(item.trendType === 'up' ? 'text-green-500' : 'text-red-500')}>{item.chartDescription}</span> More <br/> from last week</p>
                     </div>
                    </CardContent>
                     
                  </Card>
                  )
                })
              }
              </div>

              <div className="bg-white-100 w-full h-64 rounded-lg">
                 <Card className="shadow-sm border-none ring-0 h-64">
                    <CardHeader className="border-b border-gray-200">
                       <div className="flex items-center justify-between">
                      <CardTitle className="text-[1rem] leading-tight font-medium">Task Done</CardTitle>
                          

                          <ul className="flex items-center gap-4">
                              {taskChartItem.map((task) => (
                                <li key={task.id} className={cn(task.isOn ? 'border-b-2 border-primary' : '', "text-[1rem] leading-tight font-semibold")}>
                                   {task.timeline}
                                </li>
                              ))}
                          </ul>
                       </div>
                      {/* <CardDescription>Card Description</CardDescription>
                      <CardAction>Card Action</CardAction> */}
                    </CardHeader>
                    <CardContent className="flex gap-x-2 items-center justify-between w-full h-ful leading-none">
                    
                    </CardContent>
                     
                  </Card>
              </div>
                      <div className="flex flex-col gap-4">
                 <p className="text-xl leading-tight font-bold">Tasks</p>
                    
                    {myTasks.map((task: myTaskProps) => (
                         <Card className="shadow-sm border-none ring-0 flex flex-row items-center justify-between px-2 w-full" key={task.id}>
                    <div className="flex gap-3 items-center">
                          <div className="w-12 h-12 overflow-hidden rounded-full bg-primary flex items-center justify-center">
                              <Play className="text-5 text-white"/>
                           </div>
                          
                          <div className="flex flex-col gap-y-2">
                          <p className="text-[1.1rem] leading-tight font-semibold">Start from</p>
                          <span className="flex flex-row items-center gap-2 text-xs leading-tight font-medium text-gray-400 truncate">
                          <Clock className="size-5"/> <p>{task.startTime} am</p></span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-y-2 ">
                        <p className="text-[1.1rem] leading-tight font-semibold">{task.task}</p>
                        <div className="flex items-center gap-3">
                       <span className="flex flex-row items-center gap-2 text-sm leading-tight font-medium text-gray-400 truncate">
                          <Link className="size-5"/> <p className="text-primary">{task.link}</p></span>

                          <span className="flex flex-row items-center gap-2 text-sm leading-tight font-medium text-gray-400 truncate">
                          <MessageCircleMore className="size-5"/> <p >{task.commentCount} comments</p></span>
                        </div>
                        </div>

                        <div className="flex flex-col gap-y-4 ">
                        <p className="text-[1.1rem] leading-tight font-semibold">{task.commentCount} Completed</p>

                        <div className="flex items-center">
                       <span className="h-1 w-14 bg-primary rounded-l-full"></span>
                       <span className="h-1 w-14 bg-secondary rounded-r-full"></span>
                        </div>
                        </div>

                  <Button className='bg-primary/70 w-28 p-2 rounded-sm flex items-center justify-center h-9 cursor-pointer '>
                      <Clock className="size-5 text-white"/>
                     <p className='text-white-100 leading-tight'>Reminder</p>
                   </Button>
                </Card>
                    ))}
                
            </div>
       </div>

        <div className="max-w-72 h-full bg-white-100 flex flex-col px-2 py-4 gap-2 sticky border-l-2 border-gray-200">
              <div className="flex items-center justify-between">
                <p className="text-[1.2rem] leading-tight font-semibold">Today Schedule's</p>
                <Calendar className="size-5 text-gray-500" strokeWidth={1.5}/>
              </div>

              <div className="flex items-center justify-between text-blue-500 mt-2">
                  <p className="text-xs leading-tight font-medium">10+ Member's active</p>
                  <Button className="flex items-center text-blue-500" variant={'ghost'}>
                      <Plus className="size-4 cursor-pointer" strokeWidth={1.5}/>
                      <p className="text-xs leading-tight font-medium">Invite</p>
                  </Button>
              </div>
                <p className="text-[1.2rem] leading-tight font-medium">Project Discovery</p>
                 
                <div className="w-full mt-2 bg-primary h-11 rounded-md flex justify-between items-center p-2 shadow-sm">
                     <div className="flex items-center -space-x-2"> 
                {myTeam.slice(0, 3).map((team: myTeamProps) => (
                  <div key={team.id} className="relative">
                    <div className="w-8 h-8 overflow-hidden rounded-full ring-2 ring-white shadow-sm"> 
                      <Image
                        src={team.profilePics}
                        width={32}
                        height={32}
                        alt={team.name}
                        className="object-cover" 
                      />
                    </div>
                  </div>
                ))}

                <div className="w-8 h-8 overflow-hidden rounded-full ring-2 ring-white shadow-sm flex items-center justify-center">
                  <UserPlus className="size-5 text-white-100"/>
                </div>
              </div>

                     <p className="text-sm leading-tight font-medium text-white-100 text-center">1:30</p>
                      <EllipsisVertical
                       className="size-5 text-white-100"/>
                </div>
                
                 <div className="w-full flex flex-col mt-2">
                   <p className="text-[1.2rem] leading-tight font-medium mb-2">Messages</p>

                   <div className="flex flex-col w-full pt-2 border-t-2 border-gray-100">
                     <div className="w-full flex flex-col gap-3 rounded-md cursor-pointer">
                     {myTeam.map((team: myTeamProps) => (
                        <div className="flex gap-3 items-center hover:bg-background rounded-md px-2 py-1" key={team.id}>
                          <div className="w-12 h-12 overflow-hidden rounded-full">
                              <Image
                              src={team.profilePics}
                              width={62}
                              height={62}
                              alt={team.name}
                              className="object-contain ring-2 ring-gray-400 shadow-sm rounded-full"
                              />
                            </div>

                          <div className="flex flex-col gap-y-2">
                  <p className="text-sm leading-tight font-semibold">{team.name}</p>
                  <p className="text-xs leading-tight font-medium text-gray-400 truncate">{team.lastMessage}</p>
                          </div>
                        </div>
                     ))}
                     </div>
                   </div>
                 </div>
        </div>

    </div>
  )
}

export default Home

{/* <div className="w-8 h-8 overflow-hidden rounded-full">
                                           <Image
                                             src="/images/user1.png"
                                             width={32}
                                             height={32}
                                             alt="user1"
                                             className="object-contain ring-2 ring-gray-400 shadow-sm rounded-full"
                                           />
                                         </div> */}
