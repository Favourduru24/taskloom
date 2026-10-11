import { EmptyOutline } from '@/components/shared/NotFound';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { formatUsername, getAvatar } from '@/lib/utils';
import { getWorkspaceContactsApi } from '@/utility/api/contact';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const RecentlyAddedContact = async ({
    workspaceId,
  }: {
    workspaceId: string;
  }) => {

     const contacts = await getWorkspaceContactsApi(workspaceId)

     const {data} = contacts || {}

  return (
    <div className="flex flex-col gap-4">
         <Card className="w-full">
                <CardHeader className="flex items-center justify-between gap-3 border-b">
                     <CardTitle>Recently Added People</CardTitle>
                     <Link href={`/workspace/${workspaceId}/contacts`} className="cursor-pointer">
                     <p className="text-primary text-sm font-semibold">View all</p>
                     </Link>
                </CardHeader>
          
         <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] px-2">
            

                {data?.length ? data?.slice(0, 4).map((contact: any) => (
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
                                            <p className='text-sm font-semibold text-gray-600'>{contact?.status} @ {contact?.company || 'Unknown'}</p>
                                        </div>
                                        </div>
                )) : <div className="col-span-full flex justify-center w-full">
                <EmptyOutline
                 title="No contact found"
                 description={"You don’t have any contact yet. Create your first contact to get started."}
                 buttonText="Create Contact"
                 navigateLink={`/workspace/${workspaceId}/contacts/create`}
               />
               </div>}
         </div>
         </Card>
         </div>
  )
}

export default RecentlyAddedContact