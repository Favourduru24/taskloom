'use client'

import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import Image from 'next/image'
import { Check, Copy, Mail } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { getConversationById, updateConversationApi } from '@/utility/api/conversation'
import { buildReminderUrl, formatUsername, getAvatar } from '@/lib/utils'
import { toast } from 'sonner'
import Link from 'next/link'


interface ConversationAIResponse {
  summary: string;
  response: string;
  }
const ConversationModal = ({followUpModal, setFollowUpModal, conversationId, contactId, contactName, contactStatus, contactNumber}: {followUpModal: boolean, setFollowUpModal: any, conversationId: string, contactId: string, contactName: string, contactStatus:string, contactNumber: string}) => {

    const [conversation, setConversation] = useState<any>([]);
    const [updating, setUpdating] = useState(false)

   

    useEffect(() => {
        if (!followUpModal || !conversationId) return;
      
        const fetchConversation = async () => {
          const response = await getConversationById(contactId, conversationId);
          setConversation(response.data);
        };
      
        fetchConversation();
      }, [followUpModal, conversationId, contactId]);


      useEffect(() => {
        setContent(conversation?.response)
        setSummary(conversation?.summary)
      }, [conversation])

    const [copy, setCopy] = useState(false)
    const [content, setContent] = useState(conversation?.response)
    const [summary, setSummary] = useState(conversation?.summary)

    const handleCopy = () => {
    navigator.clipboard.writeText(conversation?.response)

        setCopy(true)

        setTimeout( () => {
    setCopy(false)
        },2000)
    }
    
    const reminderUrl = buildReminderUrl(content ?? '', contactNumber);

    if(!reminderUrl) {
      toast.error("Contact number is required to build reminder URL."); return null;
    }


  const handleUpdateConversation = async () => {
    if (updating) return;

    setUpdating(true);

    try {
      await updateConversationApi(conversationId, contactId, content, summary);
  
      toast.success(`Ai memory updated successfully!`);

    } catch(error: any) {
      console.error(error);
  
      toast.error(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setUpdating(false)
    }
  }

  return (
    <Dialog open={followUpModal} onOpenChange={setFollowUpModal}>
               <DialogContent className="max-w-[95vw] w-full overflow-y-scroll h-120 rounded-md">

                 <div className="flex flex-col gap-6">
                     <div className='flex flex-row justify-between items-center'>

                     <div className='flex flex-row gap-3 items-start'>
                  <div className="w-8 h-8 overflow-hidden rounded-full shadow-sm flex items-center justify-center border"> 
                                                        {contactId === '123' ? 
                                                          <Image
                                                          src={getAvatar('/images/user1.png', contactName as string)}
                                                          width={32}
                                                          height={32}
                                                          alt={contactName}
                                                          className="object-cover object-center size-8" 
                                                        /> : 
                                                      <p className="text-center">{formatUsername(contactName)}</p> }
                                                        
                                                    </div>
                                                     <div className='flex flex-col leading-0 gap-3'>
                                       <DialogTitle className='text-[0.80rem] font-semibold'>Follow up with</DialogTitle>

                                       <div className='flex items-center gap-2'>
                                             <p className='text-xl font-semibold'>{contactName}</p>
                                       </div>
   
                                       <p className='text-[0.85rem] font-semibold text-gray-500'>{contactStatus}</p>
   
                        </div>

                        </div>


                        <div className='rounded-full h-6 flex items-center justify-center max-w-20 w-full text-xs font-medium text-amber-600 bg-amber-100 lowercase text-center border-amber-600 border'>
                                              Due Date
                                             </div>
                     </div>

                     <div className='flex flex-col gap-2'>
                        <p className='text-[1rem] font-semibold leading-4'>Summary</p>

                        <textarea value={summary} onChange={(e) => setSummary(e.target.value)} className='h-36 rounded-md overflow-y-scroll p-2 leading-8 bg-muted focus:border'>
                               
                        </textarea>
                        </div>

                     <div className='flex flex-col gap-2  p-2 w-full  '>
                        <p className='text-[1rem] font-semibold'>Ai Suggested Message</p>
                           
                          <div className='flex flex-col gap-2 max-h-40'>

                            <textarea value={content} onChange={(e) => setContent(e.target.value)} className='h-36 rounded-md overflow-y-scroll border p-2 leading-6 bg-muted focus:border'>
                               
                            </textarea>
                         <div className="flex justify-end w-full">
                            {copy ? <Check className="text-green-500 size-4 cursor-pointer"/> : 
                            <Copy className="text-green-500 size-4 cursor-pointer" onClick={handleCopy}/>}
                         </div>
                          </div>

                        </div>

                        <div className='w-full flex items-center justify-between'>
                      <button className='px-2 py-2 rounded-sm text-[0.85rem] font-medium cursor-pointer bg-purple-100 text-primary shadow outline-none' onClick={() => handleUpdateConversation()}>

                       {updating ? 'Updating...' : 'Edit Message'}
                      </button>

                      <Link
                      href={reminderUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-[0.85rem] font-medium text-white shadow-sm transition-all duration-200 hover:bg-primary/90 hover:shadow-md active:scale-[0.98]"
                    >
                      <Mail className="size-4" />
                      <span>Send Message</span>
                    </Link>
                 </div>
                        
                 </div>
                  
                   
          </DialogContent>
          
               </Dialog>
  )
}

export default ConversationModal