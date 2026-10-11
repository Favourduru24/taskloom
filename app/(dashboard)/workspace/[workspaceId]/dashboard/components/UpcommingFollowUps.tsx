import { EmptyOutline } from '@/components/shared/NotFound';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate, formatUsername, getAvatar } from '@/lib/utils';
import { getDashboardUpcommingFollowupApi } from '@/utility/api/dashboard';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const UpcommingFollowUps = async ({
    workspaceId,
  }: {
    workspaceId: string;
  }) => {

    const upcommingFollowUp = await getDashboardUpcommingFollowupApi(workspaceId);
  return (
    <Card className="max-w-120 w-full p-0 h-fit">
                <CardHeader className="flex items-center justify-between gap-3 px-3 pt-3">
                     <CardTitle>Upcomming Follow-ups</CardTitle>
                     <Link href={`/workspace/${workspaceId}/contacts`} className="cursor-pointer">
                     <p className="text-primary text-sm font-semibold">View all</p>
                     </Link>
                </CardHeader>

                <CardContent className="border-t flex flex-col px-3 py-0">

                 {upcommingFollowUp?.length ? upcommingFollowUp.map((followUp: any) => (
                    <div className="flex items-center justify-between border-b py-1" key={followUp.id}>
                    <div className='flex flex-row gap-2 py-2'>
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
  
                                  <div className='flex flex-col gap-1'>
                                            <p className='text-[1rem] font-semibold'>{followUp?.contact.name}</p>
                                          <p className='text-sm font-semibold text-gray-600'>{followUp?.contact.status} @ {followUp?.contact.lacation || 'Unknown'}</p>
                                      </div>
                                      </div>
                                      <Button className="bg-amber-100 my-2 text-black border border-amber-500 rounded-sm text-xs">
                                             {formatDate(followUp?.contact.createdAt)}
                                      </Button>
  
                    </div>
                 )): <EmptyOutline title="No new Upcomming follow up" description="no follow up today hurray!!" buttonText="Create Conversation" className="m-2 border-none" navigateLink={`/workspace/${workspaceId}/contacts`}/>}

                </CardContent>
            </Card>  
  )
}

export default UpcommingFollowUps