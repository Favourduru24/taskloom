import ContactDetail from '@/components/shared/ContactDetail'
import { getReminderPreferenceApi, getWorkspaceContactId } from '@/utility/api/contact'
import { getWorkspaceConversationApi } from '@/utility/api/conversation'

const ContactPage = async ({params}: {params: Promise<{contactId: string, workspaceId: string}>}) => {

  const {contactId, workspaceId} = await params
  
  
  const [contactDetails, contactReminderPreference, conversations] = await Promise.all([
    getWorkspaceContactId(workspaceId, contactId),
    getReminderPreferenceApi(contactId),
    getWorkspaceConversationApi(contactId)
    ])
    
    const {data} = contactDetails || {}
    const {data: reminderPreference} = contactReminderPreference || {}
    const {data: conversation} = conversations || {}

   console.log({conversation})

  return (
     <ContactDetail data={data} contactId={contactId} reminderPreference={reminderPreference} conversation={conversation}/>
  )
}

export default ContactPage