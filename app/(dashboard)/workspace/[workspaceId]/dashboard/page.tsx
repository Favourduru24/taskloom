import { EmptyOutline } from "@/components/shared/NotFound"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {formatUsername, getAvatar, formatDate } from "@/lib/utils"
import { getWorkspaceContactsApi } from "@/utility/api/contact"
import {getDashboardTodayTaskApi} from "@/utility/api/dashboard"

import { BookCheck, Check, Link as NavLink} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"
import DashboardStatsSkeleton from "./components/DashboardStatsSkeleton"
import DashboardStatsSection from "./components/DashboardStatsSection"
import TodayFollowUps from "./components/TodayFollowUps"
import DashboardCardSkeleton from "./components/DashboardCardSkeleton"
import UpcommingFollowUps from "./components/UpcommingFollowUps"
import RecentlyAddedContact from "./components/RecentlyAddedContact"

const Home = async ({params}: {params: Promise<{ workspaceId: string }>
}) => {

   const {workspaceId} = await params


  const [contacts, todayTask] = await Promise.all([
    getWorkspaceContactsApi(workspaceId),
    getDashboardTodayTaskApi(workspaceId)
  ])


  return (
    <div className="w-full flex flex-1 relative bg-gray-50">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-10">
        
           <Suspense fallback={<DashboardStatsSkeleton/>}>
             <DashboardStatsSection workspaceId={workspaceId}/>
           </Suspense>

         <div className="flex gap-4 flex-col md:flex-row">
             
             <Suspense fallback={<DashboardCardSkeleton/>}>
            <TodayFollowUps workspaceId={workspaceId}/>
             </Suspense>

            <Card className="p-3 max-w-120 w-full h-full flex items-cente justify-center">
            <CardHeader className="flex items-center justify-between gap-3">
                     <CardTitle className="text-lg">AI Needs Your Review</CardTitle>
                     <Link href={`/workspace/${workspaceId}/contacts`} className="cursor-pointer">
                     <p className="text-primary text-sm font-semibold">View all</p>
                     </Link>
                </CardHeader>

                <CardContent className="border flex flex-col px-3 py-3 shadow rounded-md">
                <div className='flex flex-row gap-2'>
               <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm"> 
                                                    <Image
                                                       src={getAvatar(null, 'taskloomdummy@gmail.com')}
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

                          <Button  className="ring-1 ring-purple-300 py-4 rounded-sm my-5 bg-purple-100 hover:bg-primary group cursor-pointer" size={'lg'}>
                                 <p className="text-sm font-medium text-primary group-hover:text-white">Review Analysis</p>
                                 </Button>
                </CardContent>
            </Card>
         </div>

         <div className="flex gap-4 flex-col md:flex-row h-full">
                <Suspense fallback={<DashboardCardSkeleton/>}>
               <UpcommingFollowUps workspaceId={workspaceId}/>
                </Suspense>

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
                 )) : <EmptyOutline title="No new Task today" description="no task today hurray!!" buttonText="Create Task" className="border-none" navigateLink={`/workspace/${workspaceId}/task/create`}/>}
              </div>
            </Card> 
         </div>
           
           <Suspense fallback={<DashboardStatsSkeleton/>}>
           <RecentlyAddedContact workspaceId={workspaceId}/>
           </Suspense>
       </div>
    </div>
  )
}

export default Home



 