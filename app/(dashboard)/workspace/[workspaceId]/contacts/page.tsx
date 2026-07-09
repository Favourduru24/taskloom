import { ContactTable } from '@/components/shared/ContactTable'

const Contacts = async ({params}: {params: Promise<{ workspaceId: string }>
}) => {

  const {workspaceId} = await params

  return (
    <div className="w-full flex gap-4 flex-1 min-h-0">
       <div className="w-full max-w-6xl px-8 py-4 flex flex-1 flex-col gap-4">
      <ContactTable workspaceId={workspaceId}/>
    </div>
    </div>
  )
}

export default Contacts