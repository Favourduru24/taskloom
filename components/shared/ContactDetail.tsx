'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { cn, formatDate } from '@/lib/utils'
import { MoreHorizontalIcon, BookCheck, Brain, Globe, LocationEdit, LogOut, Mail, MessageCircle, Phone, PhoneCallIcon, Plus, RefreshCcw, Sparkle, Sparkles, User, Copy, LucideIcon, Loader2, BellRing, CloudSync, Sun, CalendarHeart, CalendarCheck2, Clock, Calendar, Bell, Trash } from 'lucide-react'
import Image from 'next/image'
import {useState} from 'react'
import { Textarea } from '../ui/textarea'
import { createConversationSchemaType } from '@/utility/validation/conversation'
import { toast } from 'sonner'
import { createConversationApi } from '@/utility/api/conversation'
import { createReminderPreferenceType } from '@/utility/validation/contact'
import { createReminderPreferenceApi } from '@/utility/api/contact'

const ContactDetail = ({data, contactId, reminderPreference}: {data: any, contactId: string, reminderPreference: any}) => {

  const [modalOpen, setModalOpen] = useState(false)
  const [pasteModal, setPasteModal] = useState(false)
  const [followUpModal, setFollowUpModal] = useState(false)
  const [openPreferenceModal, setOpenPreferenceModal] = useState(false)
  const [reminderModal, setReminderModal] = useState(false)
  const [contactPreference, setContactPreference] = useState('DAILY')

  const [timezone, setTimezone] = useState('UTC')

  const [loading, setLoading] = useState(false)
  const [creatingPreference, setCreatingPreference] = useState(false)


  const [content, setContent] = useState('')
  const [source, setSource] = useState('EMAIL')

  
  const SOURCE: {label: string, icon: LucideIcon, id: number}[] = [
  {
    label: 'EMAIL',
    icon: Mail,
    id: 1
  },
  {
    label: 'LINKEDIN',
    icon: Mail,
    id: 2
  },
  {
    label: 'WHATAPP',
    icon: PhoneCallIcon ,
    id: 3
  }, {
    label: 'OTHER',
    icon: MoreHorizontalIcon,
    id: 4
  }
  ]

  const ContactPreference: {label: string, icon: LucideIcon, id: number}[] = [
    {
      label: 'DAILY',
      icon: Sun,
      id: 1
    },
    {
      label: 'WEEKLY',
      icon: CalendarHeart,
      id: 2
    },
    {
      label: 'BIWEEKLY',
      icon: CalendarCheck2,
      id: 3
    }, {
      label: 'MONTHLY',
      icon:  CalendarHeart,
      id: 5
    },
    {
      label: 'QUARTERLY',
      icon: Clock,
      id: 6
    },
    {
      label: 'CUSTOM',
      icon: MoreHorizontalIcon,
      id: 7
    }
    ]
  


  const handleCreateConversation = async (data: createConversationSchemaType) => {

    if (loading) return;

    setLoading(true);

    try {
      await createConversationApi(
         data
      );
  
      toast.success(`Conversation from "${data.source}" created successfully!`);
      setPasteModal(false)

    } catch(error: any) {
      console.error(error);
  
      toast.error(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false)
    }
  }

    console.log({contactPreference, timezone})

  const handleCreateContactPreference = async (data: createReminderPreferenceType) => {

    if (creatingPreference) return;

    setCreatingPreference(true);

    try {
      await createReminderPreferenceApi(
        contactId,
         data
      );
  
      toast.success(`Contact preference ${data.reminderCadence} " created successfully!`);
      setOpenPreferenceModal(false)

    } catch(error: any) {
      console.error(error);
  
      toast.error(
        error?.message || "Something went wrong. Please try again."
      );
    } finally {
      setCreatingPreference(false)
    }
  }

    return (
        <div className="w-full flex gap-6 flex-1 min-h-0">
        <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-10">
             <Card className='flex flex-col rounded-md'>
              
           <div className=" w-full min-h-40 h-fit rounded-t-md p-2 ">
                <div className='flex flex-row gap-6 '>
                  <div className="w-30 h-30 overflow-hidden rounded-full shadow-sm"> 
                                                       <Image
                                                         src={'/images/user1.png'}
                                                         width={200}
                                                         height={200}
                                                         alt={'user-img'}
                                                         className="object-center size-30" 
                                                       />
                                                     </div>
   
                                   <div className='flex flex-col gap-3'>
                                       <div className='flex items-center gap-4'>
                                             <p className='text-2xl font-semibold'>{data?.name}</p>
                                             <div className='rounded-full px-3 py-1 text-xs font-medium text-green-600 bg-green-200 lowercase'>
                                               {data?.priority ?? 'Active'}
                                             </div>
                                       </div>
   
                                       <p className='text-[1rem] font-semibold text-gray-500'>{data?.status} @ {data?.company ?? 'Unknown'}</p>
   
                                       <div className='flex flex-row items-center gap-8'>
                                         <div className='flex items-center gap-2'>
                                           <Mail className='text-gray-500 size-5'/>
                                           <p className="text-sm text-gray-500 font-medium">{data?.email}</p>
                                         </div>
   
                                         <div className='flex items-center gap-2'>
                                           <Phone className='text-gray-500 size-5'/>
                                           <p className="text-sm text-gray-500 font-medium">{data?.number}</p>
                                         </div>
   
                                         <div className='flex items-center gap-2'>
                                           <LocationEdit className='text-gray-500 size-5'/>
                                           <p className="text-sm text-gray-500 font-medium">{data?.location}</p>
                                         </div>
                                       </div>
   
                                         <div className='flex items-center gap-4'>
                                            <div className='flex gap-3 items-center'>
                                              <Mail className='text-gray-500 size-5'/>
                                              <p className="text-lg text-gray-700 font-semibold">Linkedin</p>
                                            </div>
   
                                            <div className='flex gap-3 items-center'>
                                              <Globe className='text-gray-500 size-5'/>
                                              <p className="text-lg text-gray-700 font-semibold">Website</p>
                                            </div>
                                         </div>
                                   </div>
                </div>
                </div>
   
                <div className='w-full min-h-10 h-fit rounded-b-md p-2 flex flex-col gap-3 border-t'>
                   <p className='text-xl font-semibold'>Quick Actions</p>
   
                   <div className='flex items-center gap-3'>
                           <div className=' flex items-center justify-center gap-2 border text-center px-2 py-2 rounded-md cursor-pointer'>
                           <Mail className='text-gray-500 size-4'/>
                           <p className="text-sm text-gray-700 font-medium">Send Email</p>
                           </div>
   
                           <div className=' flex items-center justify-center gap-2 border text-center px-2 py-2 rounded-md cursor-pointer' onClick={() => setModalOpen(true)}>
                           <Sparkles className='text-purple-500 size-4'/>
                           <p className="text-sm text-gray-700 font-medium">Paste Conversation</p>
                           </div>
   
                           <div className=' flex items-center justify-center gap-2 border text-center px-2 py-2 rounded-md cursor-pointer' onClick={() => !reminderPreference?.reminderPreference ? setOpenPreferenceModal(true) : setReminderModal(true)}>
                           <Plus className='text-gray-500 size-4'/>
                           <p className="text-sm text-gray-700 font-medium">Add Reminder</p>
                           </div>
   
                           <div className=' flex items-center justify-center gap-2 border text-center px-2 py-2 rounded-md cursor-pointer' 
                           >
                           <BookCheck className='text-gray-500 size-4'/>
                           <p className="text-sm text-gray-700 font-medium">Add Task</p>
                           </div>
                   </div>
               </div>
           </Card>
   
           <Card className='flex items-center gap-3 justify-between bg-muted p-2'>
   
              <div className='w-full flex flex-row tems-center justify-between'>
                     <div className='flex items-center gap-2'>
                       <Brain className='text-purple-500 size-5'/>
                         <p className='text-lg font-semibold'>Ai Memory</p>
                     </div>
   
                     <div className='flex items-center gap-2'>
                       <RefreshCcw className='text-purple-500 size-5'/>
                         <p className='text-sm font-medium'>Refresh</p>
                     </div>
              </div>
   
              <div className='w-full flex flex-row justify-between gap-2'>
   
              <div className='flex flex-col bg-white p-4 rounded-md break-all border max-w-120 w-full'>
                 <div className='flex flex-col gap-2'>
                   <p className='text-lg font-semibold'>Relationship Summary</p>
                   <p className='text-gray-500 font-medium text-sm'>John is a founder of ABC Logistics</p>
                   <p className='text-gray-500 text-sm font-medium'>We connected on linkedin after my post about web development</p>
                   <p className='text-gray-500 font-medium text-sm'>He prefer whatapp communication</p>
                 </div>
   
                 <div className="flex flex-col justify-center items-center p-2 bg-muted w-full min-h-10 rounded-md mt-5">
                       <div className="flex items-start flex-row gap-2">
                          <LogOut className='size-4 text-purple-500'/>
   
                          <div className='flex flex-col gap-1'>
                          <p className='text-sm font-bold'>Last Promise</p>
                          <p className='text-gray-500 text-sm font-medium'>"Sending pricing document after finishing the prototype"</p>
                          </div>
                       </div>       
                 </div>
              </div>
   
   
   
              <div className='flex flex-col bg-white rounded-md break-all border  max-w-120 w-full'>
                 <div className='flex flex-col gap-2 px-4 pt-4'>
                   <p className='text-lg font-semibold'>Recommended Next Step</p>
                   <p className='text-gray-500 font-medium text-sm'>Follow-Up this week with the pricing documents</p>
                 </div>
   
                 <div className="flex flex-col gap-4 w-full min-h-10 rounded-md mt-5 border-t py-2 px-4">
                       
                 <p className='text-sm font-semibold'>Suggested follow-up</p>
   
                  <Button className='max-w-60 py-5 rounded-md'>
                  <Sparkles className='size-4'/>
                   <p>Generate Message</p>
                 </Button>      
                 </div>
              </div>
              </div>
   
              <div>
   
              </div>
           </Card>
   
           <div className='flex items-center gap-4'>
   
               <Card className='max-w-[20rem] w-full flex flex-col py-2 px-4'>
                 <div className='flex items-center gap-2'>
                     <User className='text-purple-500 size-6'/>
                     <p className='text-lg font-semibold'>Relationship Details</p>
                 </div>
   
                 <div className='flex flex-col justify-center gap-2'>
                    <div className='flex items-center justify-between w-full'>
                    <p className='text-gray-500 font-medium text-sm'>Status</p>
                    <div className='rounded-md px-3 py-1 text-xs font-medium text-gray-600 bg-muted'>
                     {data?.status}
                     </div>
                    </div>
                    
                    <div className='flex items-center justify-between w-full'>
                    <p className='text-gray-500 font-medium text-sm'>First Contact</p>
                    <p className="text-sm text-gray-500 font-medium">{formatDate(data?.lastContact)}</p>
                    </div>
   
                    <div className='flex items-center justify-between w-full'>
                    <p className='text-gray-500 font-medium text-sm'>Last Contact</p>
                    <p className="text-sm text-gray-500 font-medium">18days ago</p>
                    </div>
   
                    <div className='flex items-center justify-between w-full'>
                    <p className='text-gray-500 font-medium text-sm'>Next Follow-up</p>
                    <p className="text-sm text-green-500 font-medium">Tommorrow</p>
                    </div>
   
                    <div className='flex items-center justify-between w-full'>
                    <p className='text-gray-500 font-medium text-sm'>Priority</p>
                    <div className='rounded-full px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100'>
                     Active
                     </div>
                    </div>
   
                    <div className='flex items-center justify-between w-full'>
                    <p className='text-gray-500 font-medium text-sm'>Source</p>
                    <p className="text-sm text-gray-500 font-medium">{data?.source}</p>
                    </div>
   
                 </div>
               </Card>
   
               <Card className='max-w-[20rem] w-full flex flex-col py-2 px-4 min-h-58'>
                 <div className='flex items-center gap-2'>
                     <BookCheck className='text-purple-500 size-6'/>
                     <p className='text-lg font-semibold'>Tasks</p>
                 </div>
   
                 <div className='flex flex-col justify-center gap-4'>
                    <div className='flex items-center justify-between w-full'>
                     <div className='flex items-center gap-2'>
                     <Checkbox/>
                    <p className='text-gray-500 font-medium text-sm'>Send Proposal</p>
                     </div>
                    <div className='rounded-md px-3 py-1 text-xs font-medium text-destructive bg-red-100'>
                     Due Date
                     </div>
                    </div>
                    
                    <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2'>
                     <Checkbox/>
                    <p className='text-gray-500 font-medium text-sm'>Discovery Call</p>
                     </div>
                    <div className='rounded-md px-3 py-1 text-xs font-medium text-green-600 bg-green-100'>
                     Completed
                     </div>
                    </div>
   
                    <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2'>
                     <Checkbox/>
                    <p className='text-gray-500 font-medium text-sm'>Portfolio Sent</p>
                     </div>
                    <div className='rounded-md px-3 py-1 text-xs font-medium text-green-600 bg-green-100'>
                     Completed
                     </div>
                    </div>
   
                    <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-2'>
                     <Checkbox/>
                    <p className='text-gray-500 font-medium text-sm'>Schedule Demo</p>
                     </div>
                    <div className='rounded-md px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100'>
                     Next Week
                     </div>
                    </div>
   
                 </div>
               </Card>
   
   
               <Card className='max-w-[20rem] w-full flex flex-col py-2 px-3 min-h-56'>
                 <div className='flex items-center justify-between gap-2'>
                 <div className='flex items-center gap-2'>
                     <MessageCircle className='text-purple-500 size-5'/>
                     <p className='text-lg font-semibold'>Conversation</p>
                 </div>
                     
                 <div className=' flex items-center justify-center gap-2 border p-1 text-center rounded-md cursor-pointer'>
                           <Plus className='text-purple-500 size-5'/>
                           </div>
                 </div>
   
                 <div className='flex flex-col justify-center rounded-md px-1'>
                   
                   <div className='py-4 border-b'>
                    <div className='flex items-center justify-between'>
                    <p className="text-sm text-gray-500 font-medium">Jun 12</p>
                    <p className="text-sm text-gray-500 font-medium">Linkedin</p>
   
                    <div className='flex items-center gap-2'>
                    <div className='rounded-md px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 '>
                     Update Ai Memory
                     </div>
   
                     <svg
                         className={`w-4 h-4 transition-transform duration-200 rotate-270 cursor-pointer text-muted-foreground`}
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                         onClick={() => setFollowUpModal(true)}
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M19 9l-7 7-7-7"
                         />
                       </svg>
                    </div>
                    </div>
                   </div>
   
   
                   <div className='py-4 border-b cursor-pointer'>
                    <div className='flex items-center justify-between'>
                    <p className="text-sm text-gray-500 font-medium">Jun 12</p>
                    <p className="text-sm text-gray-500 font-medium">Linkedin</p>
   
                    <div className='flex items-center gap-2'>
                    <div className='rounded-md px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 cursor-pointer'>
                     Update Ai Memory
                     </div>
   
                     <svg
                         className={`w-4 h-4 transition-transform duration-200 rotate-270 text-muted-foreground`}
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M19 9l-7 7-7-7"
                         />
                       </svg>
                    </div>
                    </div>
                   </div>
                   <div className='py-4 border-b cursor-pointer'>
                    <div className='flex items-center justify-between'>
                    <p className="text-sm text-gray-500 font-medium">Jun 12</p>
                    <p className="text-sm text-gray-500 font-medium">Linkedin</p>
   
                    <div className='flex items-center gap-2'>
                    <div className='rounded-md px-3 py-1 text-xs font-medium text-purple-600 bg-purple-100 '>
                     Update Ai Memory
                     </div>
   
                     <svg
                         className={`w-4 h-4 transition-transform duration-200 rotate-270 cursor-pointer text-muted-foreground`}
                         fill="none"
                         viewBox="0 0 24 24"
                         stroke="currentColor"
                       >
                         <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M19 9l-7 7-7-7"
                         />
                       </svg>
                    </div>
                    </div>
                   </div>
   
                 </div>
               </Card>
   
               <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="max-w-[80vw] w-full">
                <DialogHeader>
            <DialogTitle className='text-lg'>Paste Conversation</DialogTitle>
          </DialogHeader>

         <div className='flex flex-col gap-6'>

             <div className='flex flex-col gap-2'>
                 <p className="text-[1rem] font-semibold">Source</p>

                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(50px,1fr))]">

                     {SOURCE.map((item: {label: string, icon: LucideIcon, id: number}) => {
                      const Icons = item.icon

                      return (
                        <div className='flex flex-col gap-1 justify-center items-center w-full cursor-pointer' key={item.id}>
                        <div className='flex flex-col gap-3 items-center bg-muted rounded-sm py-3 w-full border' onClick={() => setSource(item.label)}>
                          <Icons className='text-primary size-5'/>
                           </div>
                                <p className="text-xs text-gray-700 font-semibold">{item.label}</p>
                        </div>
                      )
                     })}

                    </div>


             </div>
             <div className='flex flex-col gap-2'>
                 <p className="text-[1rem] font-semibold">Paste your conversation below</p>
                  <Textarea
                  id="conversation"
                  name="conversation"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  // label="Conversation"
                  placeholder="Write your content description or caption..."
                  className="pr-10 sm:h-auto"
                  />
             </div>

                 <div className='w-full flex items-center justify-end'>
                      <Button className='rounded-sm text-[0.85rem] font-medium cursor-pointer' size={'lg'} 
                      
                      onClick={() => handleCreateConversation({source, contactId, content})}
                      >
                        {loading ? 
                        <div className="flex items-center gap-2">
                         <Loader2 className="size-4 animate-spin" />
                         <p>Analyzing...</p>
                        </div>
                        : 'Analyze with Ai'}
                      </Button>
                 </div>
             </div>
                </DialogContent>
               </Dialog>


               <Dialog open={pasteModal} onOpenChange={setPasteModal}>
               <DialogContent className="max-w-[80vw] w-full">

                <DialogHeader className=''>
                <DialogTitle className='text-lg'>Ai Analyze Result</DialogTitle>
              </DialogHeader>
                  
                  <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2 p-2 border '>
                        <p className='text-sm font-semibold'>Conversation Summary</p>

                        <p className='text-sm leading-6 text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sed assumenda veniam ut! Est, quisquam atque placeat!</p>

                        <div className="flex justify-end w-full">
                             <Copy className="text-green-500 size-4 cursor-pointer"/>
                         </div>
                        </div>

                        <div className='flex flex-col gap-2 border rounded-md leading-0 p-2'>
                        <p className='text-sm font-semibold'>Recommended Next Action</p>

                        <p className='text-sm text-muted-foreground'>Send Pricing After Prototype</p>
                        </div>


                        <div className='flex flex-col gap-2 border rounded-sm p-2 w-full'>
                        <p className='text-sm font-semibold'>Ai Suggested Message</p>
                           
                          <div className='flex flex-col gap-1 '>

                        <p className='text-sm leading-6 text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sed assumenda veniam ut! Est, quisquam atque placeat!</p>

                         <div className="flex justify-end w-full">
                             <Copy className="text-green-500 size-4 cursor-pointer"/>
                         </div>
                          </div>

                        </div>

                        <div className='w-full flex items-center justify-between'>
                      <Button className='px-2 py-2 rounded-sm text-[0.85rem] font-medium cursor-pointer bg-purple-100 text-primary shadow' size={'lg'}>

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
                        <p className='text-[0.80rem] font-semibold leading-4'>Reason</p>

                        <p className='text-[0.85rem] text-muted-foreground leading-4'>Send Pricing After Prototype</p>
                        </div>

                     <div className='flex flex-col gap-2 border rounded-sm p-2 w-full'>
                        <p className='text-sm font-semibold'>Ai Suggested Message</p>
                           
                          <div className='flex flex-col gap-1 '>

                        <p className='text-sm leading-6 text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus neque sed assumenda veniam ut! Est, quisquam atque placeat!</p>

                         <div className="flex justify-end w-full">
                             <Copy className="text-green-500 size-4 cursor-pointer"/>
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

               {/* User Contact Preference */}
               <Dialog open={openPreferenceModal} onOpenChange={setOpenPreferenceModal}>
                <DialogContent className="max-w-[80vw] w-full">

            <DialogHeader>
              <div className='w-full flex flex-col justify-center items-center'>
                <BellRing className='size-12 text-primary'/>
                 <DialogTitle className='text-lg'>Set Reminder</DialogTitle>
                 <p className='text-muted-foreground text-sm'>Chose how often you want to be reminded</p>
              </div>
          </DialogHeader>

         <div className='flex flex-col gap-8'>

             <div className='flex flex-col gap-2'>
                 <p className="text-sm font-semibold">Frequency</p>

                    <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(50px,1fr))]">

                     {ContactPreference.map((item: {label: string, icon: LucideIcon, id: number}) => {
                      const Icons = item.icon

                      return (
                        <div className='flex flex-col gap-1 justify-center items-center w-full cursor-pointer' key={item.id}>
                        <div className={cn('flex flex-col gap-2 items-center rounded-sm py-2 w-full', item.label === contactPreference ? 'border-primary border-2 bg-purple-100' : 'border')} onClick={() => setContactPreference(item.label)}>
                          <Icons className='text-primary size-5'/>
                          <p className="text-[8px] text-gray-700 font-medium">{item.label}</p>
                           </div>
                        </div>
                      )
                     })}

                    </div>
             </div>

             <div className='flex flex-col gap-2'>
                 <div className='flex items-center justify-between gap-2'>

                <div className='flex flex-col gap-2'>
                <p className="text-sm font-semibold">Time</p>
                <div className='shadow w-20 h-8 rounded-sm border'>

                </div>
                </div>  

                <div className='flex flex-col gap-2'>
                <p className="text-sm font-semibold">Timezone</p>
                <input className='shadow w-32 h-8 rounded-sm border-2' type='text' value={timezone} onChange={(e) => setTimezone(e.target.value)}/>
                </div>  

                 </div>


                <div className='border w-full h-fit rounded-md flex items-center justify-between px-2 py-1 gap-3 my-2'>
                  <div className='w-8 h-8 rounded-sm flex items-center justify-center bg-purple-100 text-purple-500'>
                    <CloudSync className='text-primary size-5'/>
                  </div>

                  <div className='flex flex-col gap-1'>
                  <p className='text-black text-sm font-semibold'>Reapeat Automatically</p>
                  <p className='text-muted-foreground text-xs leading-5'>We'll send reminder base on the frequency you selected</p>
                  </div>

                  <div className='w-10 h-5 rounded-full justify-end bg-primary'>
                     <div className='w-5 h-full rounded-full bg-white'/>
                  </div>
                </div>


                <div className='flex items-center justify-between gap-2 '>

                <Button className='px-2 py-2 rounded-sm text-[0.85rem] font-medium cursor-pointer ring-1 ring-gray-200' size={'lg'} variant={'ghost'}>
               Cancel
                </Button>

                <Button className='px-2 py-2 rounded-sm text-[0.85rem] font-medium cursor-pointer bg-primary text-white shadow outline-none' size={'lg'} onClick={() => handleCreateContactPreference({reminderCadence: contactPreference, timezone})}>
                {creatingPreference ? 'Saving Reminder' : 'Save Reminder'} 
                </Button>
                </div>

            </div>
             </div>
                </DialogContent>
               </Dialog>



               <Dialog open={reminderModal} onOpenChange={setReminderModal}>
                <DialogContent className="max-w-[80vw] w-full bg-purple-100">

            <DialogHeader>
              <div className='w-full flex flex-col gap-2 justify-center items-center bg-white/50 p-2 rounded-md'>
                <Calendar className='size-10 text-primary'/>
                 <DialogTitle className='text-[1rem]'>{reminderPreference?.reminderCadence}</DialogTitle>
                 <p className='text-muted-foreground text-xs'>7:AM</p>
              </div>
          </DialogHeader>

         <div className='flex flex-col gap-5'>
             <div className='flex flex-col gap-2'>
                 
                <div className=' w-full h-fit rounded-md flex items-center justify-between px-2 py-1 gap-3 my-2'>

                <div className='flex flex-row items-start gap-3'>
                  <div className='w-8 h-8 rounded-sm flex items-center justify-center bg-purple-100 text-purple-500'>
                    <Calendar className='text-muted-foreground size-5'/>
                  </div>

                  <div className='flex flex-col gap-1'>
                  <p className='text-black text-sm font-semibold'>Next Reminder</p>
                  <p className='text-muted-foreground text-xs leading-5'>Mon, May 26, 2026 <br/> 09:00AM</p>
                  </div>
                  </div>
                </div>

                <div className=' w-full h-fit rounded-md flex items-center justify-between px-2 py-1 gap-3 my-2'>
                     <div className='flex flex-row items-start gap-3'>
                  <div className='w-8 h-8 rounded-sm flex items-center gap-2 justify-center bg-purple-100 text-purple-500'>
                    <CloudSync className='text-muted-foreground size-5'/>
                  </div>

                  <div className='flex flex-col gap-1'>
                  <p className='text-black text-sm font-semibold'>Repeat</p>
                  <p className='text-muted-foreground text-xs leading-5'>Every Week</p>
                  </div>
                     </div>
                </div>

                <div className=' w-full h-fit rounded-md flex items-center justify-between px-2 py-1 gap-3 my-2'>
                <div className='flex flex-row items-start gap-3'>
                <div className='w-8 h-8 rounded-sm flex items-center justify-center bg-purple-100 text-purple-500'>
                    <Bell className='text-muted-foreground size-5'/>
                  </div>
                     
                  <div className='flex flex-col gap-1'>
                  <p className='text-black text-sm font-semibold'>Status</p>
                  <p className='text-muted-foreground text-xs leading-5'>Every Week</p>
                  </div>
                </div>
                

                 

                  <div className='px-2 py-1 rounded-sm text-sm text-center justify-end bg-primary text-white'>
                    Active
                  </div>
                </div>


                <div className='flex items-center justify-between gap-2 w-full'>

                <Button className='px-2 py-1 rounded-sm text-[0.85rem] text-destructive font-medium cursor-pointer w-full ring-1 ring-destructive bg-red-100 hover:bg-destructive hover:text-white' size={'lg'} variant={'ghost'}>
                  <Trash className='text-destructive'/>
               Delete Reminder
                </Button>
                </div>

            </div>
             </div>
                </DialogContent>
               </Dialog>
   
           </div>
        </div>
       </div>
    )
}

export default ContactDetail