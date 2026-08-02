import ContactDetail from '@/components/shared/ContactDetail'
import { getReminderPreferenceApi, getWorkspaceContactId } from '@/utility/api/contact'

const ContactPage = async ({params}: {params: Promise<{contactId: string, workspaceId: string}>}) => {

  const {contactId, workspaceId} = await params

  // const contactDetails = await getWorkspaceContactId(workspaceId, contactId)
  // const contactReminderPreference = await getReminderPreferenceApi(contactId)
  
  
  const [contactDetails, contactReminderPreference] = await Promise.all([
    getWorkspaceContactId(workspaceId, contactId),
    getReminderPreferenceApi(contactId)
    ])
    
    const {data} = contactDetails || {}
    const {data: reminderPreference} = contactReminderPreference || {}


  return (
     <ContactDetail data={data} contactId={contactId} reminderPreference={reminderPreference}/>
  )
}

export default ContactPage