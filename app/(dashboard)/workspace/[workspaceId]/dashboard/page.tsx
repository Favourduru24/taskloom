import {ChartLineMultiple} from "@/components/shared/ChartLineMultiple"
import DashboardStats from "@/components/shared/DashboardStats"
import { EmptyOutline } from "@/components/shared/NotFound"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { cn, formatUsername, getAvatar } from "@/lib/utils"
import { getWorkspaceContactsApi } from "@/utility/api/contact"
import { getDashboardStatApi, getDashboardTodayFollowupApi, getDashboardTodayTaskApi, getDashboardUpcommingFollowupApi } from "@/utility/api/dashboard"
import { getWorkspaceApi } from "@/utility/api/workspace"

import { BookCheck, Calendar, Check, Clock, FilePlus, Layers, Link, MessageCircleMore, Play, Star} from "lucide-react"
import Image from "next/image"

const Home = async ({params}: {params: Promise<{ workspaceId: string }>
}) => {

   const {workspaceId} = await params


  const [data, dashboardStats, contacts, todayTask, upcommingFollowUp, todayFollowUp] = await Promise.all([
    await getWorkspaceApi(),
    getDashboardStatApi(workspaceId),
    getWorkspaceContactsApi(workspaceId),
    getDashboardTodayTaskApi(workspaceId),
    getDashboardUpcommingFollowupApi(workspaceId),
    getDashboardTodayFollowupApi(workspaceId)

  ])

  const {todayFollowUpCount,
    upcomingFollowUpCount,
    newTodoTaskCount,
    totalContactCount} = dashboardStats

    console.log({upcommingFollowUp, todayFollowUp})
  return (
    <div className="w-full flex flex-1 relative bg-gray-50">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-10">
           <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]">
            
               <DashboardStats 
                statsLabel="Today's Follow-ups"
                statsScore={todayFollowUpCount}
                statsDescription={`2 from yesterday`}
                statsIcon={<Star className="size-5 text-primary"/>}
                trendType='up'
               />

               <DashboardStats 
                statsLabel="Upcoming Follow-ups"
                statsScore={upcomingFollowUpCount}
                statsDescription={`Next: Tommorrow`}
                statsIcon={<FilePlus className="size-5 text-primary"/>}
                trendType='down'
               />

               <DashboardStats 
                statsLabel="Todo's Task"
                statsScore={newTodoTaskCount}
                statsDescription={`2 Overdue`}
                statsIcon={<Layers className="size-5 text-primary"/>}
                trendType='up'
               />
               <DashboardStats 
                statsLabel={totalContactCount > 1 ? "Contacts" : 'Contact'}
                statsScore={totalContactCount}
                statsDescription={`${totalContactCount} new this week`}
                statsIcon={<Layers className="size-5 text-primary"/>}
                trendType='up'
               />
              </div>


         <div className="flex gap-4 flex-col md:flex-row">
            <Card className="max-w-120 w-full p-0 ">
                <CardHeader className="flex items-center justify-between gap-3 px-3 pt-2">
                     <CardTitle>Today's follow-ups</CardTitle>
                     <p className="text-primary text-sm font-semibold">View all</p>
                </CardHeader>

                <CardContent className="border flex flex-col py-1">
                <div className='flex flex-row gap-2 py-2'>
               <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm"> 
                                                    <Image
                                                      src={'/images/user1.png'}
                                                      width={50}
                                                      height={50}
                                                      alt={'user-img'}
                                                      className="object-center size-10" 
                                                    />
                                                  </div>

                                <div className='flex flex-col gap-2'>
                                          <p className='text-[1rem] font-semibold'>John Doe</p>
                                          <p className='text-sm font-semibold text-gray-600'>Founder @ ABC Logistics</p>
                                          <p className='text-sm text-gray-600 font-semibold'>Last Contact: 18days ago</p>
                                           
                                           <Button className="bg-amber-100 my-2 text-black border border-amber-500 rounded-sm">
                                            AI: Send pricing proposal today
                                           </Button>

                                           <div className="flex items-center justify-between gap-3 my-2">
                                 <Button className="py-4 rounded-sm" size={'lg'}>
                                 <p className="text-sm font-medium ">Generate Follow Up</p>
                                 </Button>

                                 <Button variant={'ghost'} className="ring-1 ring-gray-300 py-4 rounded-sm  " size={'lg'}>
                                 <p className="text-sm font-medium">Mark Done</p>
                                 </Button>
                              </div>
                                    </div>
                                    </div>

                             

                              <div className='flex flex-row gap-2 border-t pt-2 mt-2'>
               <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm"> 
                                                    <Image
                                                      src={'/images/user1.png'}
                                                      width={50}
                                                      height={50}
                                                      alt={'user-img'}
                                                      className="object-center size-10" 
                                                    />
                                                  </div>

                                <div className='flex flex-col gap-2 py-2'>
                                          <p className='text-[1rem] font-semibold'>John Doe</p>
                                          <p className='text-sm font-semibold text-gray-600'>Founder @ ABC Logistics</p>
                                          <p className='text-sm text-gray-600 font-semibold'>Last Contact: 18days ago</p>
                                           
                                           <Button className="bg-amber-100 my-2 text-black border border-amber-500 rounded-sm">
                                            AI: Send pricing proposal today
                                           </Button>

                                           <div className="flex items-center justify-between gap-3 my-2">
                                 <Button className="py-4 rounded-sm" size={'lg'}>
                                 <p className="text-sm font-medium">Generate Follow Up</p>
                                 </Button>

                                 <Button variant={'ghost'} className="ring-1 ring-gray-300 py-4 rounded-sm  " size={'lg'}>
                                 <p className="text-sm font-medium">Mark Done</p>
                                 </Button>
                              </div>
                                    </div>
                                    </div>

                             
                </CardContent>
            </Card>

            <Card className="p-3 max-w-120 w-full h-full flex items-cente justify-center">
            <CardHeader className="flex items-center justify-between gap-3">
                     <CardTitle className="text-lg">AI Needs Your Review</CardTitle>
                     <p className="text-primary text-sm font-semibold">View all</p>
                </CardHeader>

                <CardContent className="border flex flex-col px-3 py-3 shadow rounded-md">
                <div className='flex flex-row gap-2'>
               <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm"> 
                                                    <Image
                                                      src={'/images/user1.png'}
                                                      width={50}
                                                      height={50}
                                                      alt={'user-img'}
                                                      className="object-center size-10" 
                                                    />
                                                  </div>

                                <div className='flex flex-col gap-2'>
                                          <p className='text-lg font-semibold'>Linkedin Conversation</p>
                                          <p className='text-sm font-semibold text-gray-600'>Founder @ ABC Logistics</p>
                          </div>
                          </div>
                          <div className="w-full flex justify-end">
                          <Button className="bg-green-100 my-2 text-green-700 border border-green-500 rounded-sm max-w-32 w-full">
                                            Confident: 94%
                                  </Button>
                          </div>

                          <div className="flex flex-col gap-2 justify-center">
                             <p className="text-lg font-semibold my-1">Ai extracted:</p>
                            <div className="flex items-center gap-1">
                              <Check className="size-5 text-green-500"/>
                              <p className="text-sm font-medium text-gray-500">Promise found</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="size-5 text-green-500"/>
                              <p className="text-sm font-medium text-gray-500">Goal identify</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="size-5 text-green-500"/>
                              <p className="text-sm font-medium text-gray-500">Budget Mentioned</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Check className="size-5 text-green-500"/>
                              <p className="text-sm font-medium text-gray-500">Follow-up created</p>
                            </div>
                          </div>

                          <Button variant={'ghost'} className="ring-1 ring-purple-300 py-4 rounded-sm my-5 bg-purple-100 hover:bg-primary hover:text-white" size={'lg'}>
                                 <p className="text-sm font-medium text-primary">Review Analysis</p>
                                 </Button>
                </CardContent>
            </Card>
         </div>

         <div className="flex gap-4 flex-col md:flex-row h-full">
         <Card className="max-w-120 w-full p-0 h-fit">
                <CardHeader className="flex items-center justify-between gap-3 px-3 pt-3">
                     <CardTitle>Upcomming Follow-ups</CardTitle>
                     <p className="text-primary text-sm font-semibold">View all</p>
                </CardHeader>

                <CardContent className="border-t flex flex-col px-3 py-0">
                  <div className="flex items-center justify-between border-b py-1">
                <div className='flex flex-row gap-2 py-2'>
               <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm"> 
                                                    <Image
                                                      src={'/images/user1.png'}
                                                      width={50}
                                                      height={50}
                                                      alt={'user-img'}
                                                      className="object-center size-10" 
                                                    />
                                                  </div>

                                <div className='flex flex-col gap-1'>
                                          <p className='text-[1rem] font-semibold'>John Doe</p>
                                        <p className='text-sm font-semibold text-gray-600'>Co-founder @ WavePay</p>
                                    </div>
                                    </div>
                                    <Button className="bg-amber-100 my-2 text-black border border-amber-500 rounded-sm text-xs">
                                            Jun 22 2026
                                    </Button>

                  </div>

                  <div className="flex items-center justify-between border-b py-1">
                  <div className='flex flex-row gap-2 py-2'>
               <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm"> 
                                                    <Image
                                                      src={'/images/user1.png'}
                                                      width={50}
                                                      height={50}
                                                      alt={'user-img'}
                                                      className="object-center size-10" 
                                                    />
                                                  </div>

                                <div className='flex flex-col gap-1'>
                                          <p className='text-[1rem] font-semibold'>John Doe</p>
                                        <p className='text-sm font-semibold text-gray-600'>Co-founder @ WavePay</p>
                                    </div>
                                    </div>
                                    <Button className="bg-amber-100 my-2 text-black border border-amber-500 rounded-sm text-xs">
                                            Jun 22 2026
                                    </Button>

                  </div>


                </CardContent>
            </Card>    

             <Card className='max-w-120 w-full flex flex-col py-2 px-4 h-fit'>
              <div className='flex items-center gap-2'>
                  <BookCheck className='text-purple-500 size-6'/>
                  <p className='text-lg font-semibold'>Today's Tasks</p>
              </div>

              <div className='flex flex-col justify-center gap-4 pb-2'>
                 {todayTask?.length ? todayTask.map((task: any) => (
                  <div className='flex items-center justify-between w-full' key={task.id}>
                  <div className='flex items-center gap-2'>
                  <Checkbox/>
                 <p className='text-gray-500 font-medium text-sm trauncate'>{task?.title}</p>
                  </div>
                 <div className='rounded-md px-3 py-1 text-xs font-medium text-destructive bg-red-100'>
                   {task?.priority}
                  </div>
                 </div>
                 )) : <EmptyOutline title="No new Task today" description="no task today hurray!!" buttonText="Create Task" className=""/>}
              </div>
            </Card> 
         </div>

         <div className="flex flex-col gap-4">
         <Card className="w-full">
                <CardHeader className="flex items-center justify-between gap-3 border-b">
                     <CardTitle>Recently Added People</CardTitle>
                     <p className="text-primary text-sm font-semibold">View all</p>
                </CardHeader>
          
         <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] px-2">
            

                {contacts.data?.length ? contacts.data?.slice(0, 4).map((contact: any) => (
                   <div className='flex flex-row gap-2 py-2' key={contact?.id}>
                   <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm flex items-center justify-center"> 
                                                       {contact?.contactUrl ? 
                                                       <Image
                                                       src={getAvatar('/images/user1.png', contact.email as string)}
                                                       width={32}
                                                       height={32}
                                                       alt={contact.name}
                                                       className="object-cover object-center size-8" 
                                                     /> : 
                                                   <p className="text-center text-[1rem]">{formatUsername(contact.name)}</p> }
                                                      </div>
    
                                    <div className='flex flex-col gap-1'>
                                              <p className='text-[1rem] font-semibold'>{contact?.name}</p>
                                            <p className='text-sm font-semibold text-gray-600'>{contact?.status} @ {contact?.company ?? 'Unknown'}</p>
                                        </div>
                                        </div>
                )) : <div className="col-span-full flex justify-center w-full">
                <EmptyOutline
                 title="No contact found"
                 description={"You don’t have any contact yet. Create your first contact to get started."}
                 buttonText="Create Contact"
               />
               </div>}
         </div>
         </Card>
         </div>



       </div>
    </div>
  )
}

export default Home



 