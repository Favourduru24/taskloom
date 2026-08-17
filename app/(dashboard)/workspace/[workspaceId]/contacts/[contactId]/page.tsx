import ContactDetail from '@/components/shared/ContactDetail'
import { getReminderPreferenceApi, getWorkspaceContactId } from '@/utility/api/contact'
import {getAiMemoryByContactId, getWorkspaceConversationApi } from '@/utility/api/conversation'

const ContactPage = async ({params}: {params: Promise<{contactId: string, workspaceId: string}>}) => {

  const {contactId, workspaceId} = await params
  
  
  const [contactDetails, contactReminderPreference, conversations, aiMemorys] = await Promise.all([
    getWorkspaceContactId(workspaceId, contactId),
    getReminderPreferenceApi(contactId),
    getWorkspaceConversationApi(contactId),
    getAiMemoryByContactId(contactId)
    ])
    
    const {data} = contactDetails || {}
    const {data: reminderPreference} = contactReminderPreference || {}
    const {data: conversation} = conversations || {}
    const {data: aiMemory} = aiMemorys || {}

  return (
     <ContactDetail data={data} contactId={contactId} reminderPreference={reminderPreference} conversation={conversation} aiMemory={aiMemory}/>
  )
}

export default ContactPage