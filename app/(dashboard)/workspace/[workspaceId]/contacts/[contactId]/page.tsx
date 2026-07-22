import ContactDetail from '@/components/shared/ContactDetail'
import { getWorkspaceContactId } from '@/utility/api/contact'

const ContactPage = async ({params}: {params: Promise<{contactId: string, workspaceId: string}>}) => {

  const {contactId, workspaceId} = await params

  const contactDetails = await getWorkspaceContactId(workspaceId, contactId)

  const {data} = contactDetails || {}


  return (
     <ContactDetail data={data}/>
  )
}

export default ContactPage