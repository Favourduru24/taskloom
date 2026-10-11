import { EmptyOutline } from "@/components/shared/NotFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate, formatUsername, getAvatar } from "@/lib/utils";
import { getDashboardTodayFollowupApi } from "@/utility/api/dashboard";
import Image from "next/image";
import Link from "next/link";

export default async function TodayFollowUps({
    workspaceId,
  }: {
    workspaceId: string;
  }) {
    const todayFollowUp = await getDashboardTodayFollowupApi(workspaceId);
  
    return (
        <Card className="max-w-120 w-full p-1 flex items-cente justify-center">
        <CardHeader className="flex items-center justify-between gap-3 pt-2">
             <CardTitle>Today's follow-ups</CardTitle>
             <Link href={`/workspace/${workspaceId}/contacts`} className="cursor-pointer">
             <p className="text-primary text-sm font-semibold">View all</p>
             </Link>
        </CardHeader>

        <CardContent className="border flex flex-col py-1 px-0 ">
    


       {todayFollowUp?.length ? todayFollowUp.map((followUp: any) => (
        <div className='flex flex-row gap-2 border-t mt-2 px-2 pt-2' key={followUp.id}>
         <div className="w-10 h-10 overflow-hidden rounded-full shadow-sm flex items-center justify-center"> 
                                               {followUp?.contact?.contactUrl ? 
                                               <Image
                                               src={getAvatar('/images/user1.png', followUp?.contact.email as string)}
                                               width={32}
                                               height={32}
                                               alt={followUp.name}
                                               className="object-cover object-center size-8" 
                                             /> : 
                                           <p className="text-center text-[1rem]">{formatUsername(followUp?.contact.name)}</p> }
                                              </div>

                         <div className='flex flex-col gap-2 py-2'>
                                   <p className='text-[1rem] font-semibold'>{followUp?.contact.name}</p>
                                   <p className='text-sm font-semibold text-gray-600'>{followUp?.contact.status} @ {followUp?.contact.company || 'Unknown'}</p>
                                   <p className='text-sm text-gray-600 font-semibold'>Last Contact: {formatDate(followUp?.contact.createdAt)}</p>

                                    <div className="flex items-cente justify-betwen gap-3 my-2">
                          <Button className="py-4 rounded-sm w-full" size={'lg'}>
                          <Link href={`/workspace/${workspaceId}/contacts/${followUp?.contact?.id}`} className="cursor-pointer">
                          <p className="text-sm font-medium">View all follow up</p>
                          </Link>
                          </Button>
                       </div>
                             </div>
                             </div>

       )) : <EmptyOutline title="No new Upcomming follow up" description="no follow up today hurray!!" buttonText="Create Conversation" className="m-2 border-none" navigateLink={`/workspace/${workspaceId}/contacts`} />}
                     
        </CardContent>
    </Card>
    );
  }