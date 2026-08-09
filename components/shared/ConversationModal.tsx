'use client'

import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import { Check, Copy, Mail } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { getConversationById } from '@/utility/api/conversation'

const ConversationModal = ({followUpModal, setFollowUpModal, id, contactId}: {followUpModal: boolean, setFollowUpModal: any, id: string | null, contactId: string}) => {

    const [conversation, setConversation] = useState<any[]>([]);

    useEffect(() => {
        if (!followUpModal || !id) return;
      
        const fetchConversation = async () => {
          const response = await getConversationById(contactId, id);
          setConversation(response.data);
        };
      
        fetchConversation();
      }, [followUpModal, id, contactId]);

    const [copy, setCopy] = useState(false)

    const handleCopy = () => {
    navigator.clipboard.writeText(conversation?.response)

        setCopy(true)

        setTimeout( () => {
    setCopy(false)
        },2000)
    }


  return (
    <Dialog open={followUpModal} onOpenChange={setFollowUpModal}>
               <DialogContent className="max-w-[80vw] w-full">

                 <div className="flex flex-col gap-6">
                     <div className='flex flex-row justify-between items-center'>

                     <div className='flex flex-row gap-3 items-start'>
                  <div className="w-10 h-10 overflow-hidden rounded-sm shadow-sm"> 
                                                       <Image
                                                         src={'/images/user1.png'}
                                                         width={100}
                                                         height={100}
                                                         alt={'user-img'}
                                                         className="object-center size-10" 
                                                       />
                                                     </div>
                                                     <div className='flex flex-col leading-0 gap-3'>
                                       <DialogTitle className='text-[0.80rem] font-semibold'>Follow up with</DialogTitle>

                                       <div className='flex items-center gap-2'>
                                             <p className='text-xl font-semibold'>Duru Pristine</p>
                                       </div>
   
                                       <p className='text-[0.85rem] font-semibold text-gray-500'>ABC Logistics</p>
   
                        </div>

                        </div>


                        <div className='rounded-full h-6 flex items-center justify-center max-w-20 w-full text-xs font-medium text-amber-600 bg-amber-100 lowercase text-center border-amber-600 border'>
                                              Due Date
                                             </div>
                     </div>

                     <div className='flex flex-col border rounded-md leading-0 p-2'>
                        <p className='text-[1rem] font-semibold leading-4'>Summary</p>

                        <p className='text-[0.85rem] text-muted-foreground leading-7'>{conversation?.summary}</p>
                        </div>

                     <div className='flex flex-col gap-2 border rounded-sm p-2 w-full'>
                        <p className='text-[1rem] font-semibold'>Ai Suggested Message</p>
                           
                          <div className='flex flex-col gap-1 '>

                        <p className='text-sm leading-7 text-muted-foregroun text-primary'>{conversation?.response}</p>

                         <div className="flex justify-end w-full">
                            {copy ? <Check className="text-green-500 size-4 cursor-pointer"/> : 
                            <Copy className="text-green-500 size-4 cursor-pointer" onClick={handleCopy}/>}
                         </div>
                          </div>

                        </div>

                        <div className='w-full flex items-center justify-between'>
                      <Button className='px-2 py-2 rounded-sm text-[0.85rem] font-medium cursor-pointer bg-purple-100 text-primary shadow outline-none' size={'lg'}>

                       Edit Message
                      </Button>

                      <Button className='px-2 py-2 rounded-sm text-[0.85rem] font-medium cursor-pointer ring-1 ring-gray-200' size={'lg'} variant={'ghost'}>
                      <Mail className='text-red-500 size-5 shadow'/>
                        Send Via Gmail
                      </Button>
                 </div>
                        
                 </div>
                  
                   
          </DialogContent>
          
               </Dialog>
  )
}

export default ConversationModal