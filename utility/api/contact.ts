'use server'

import { cookies } from "next/headers"
import { createContactType, createReminderPreferenceType } from "../validation/contact"

export async function createContactApi(formData: createContactType, workspaceId: string, contactUrl?: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
    const {name, email, number, location, source, status, relationshipSummary} = formData
 
    if (!accessToken) {
       throw new Error('Invalid login response: tokens missing')
     }
 
     try {
         
       const res = await fetch(`http://localhost:3000/contacts/${workspaceId}/create`, {
        method: 'POST',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({name, email, number, location, status, source, relationshipSummary, contactUrl}),
       }) 
       
       const data = await res.json()
 
       if(!res.ok) {
         throw new Error(data?.message || 'Failed to create contact')
       }
 
       return data
     } catch (error) {
         console.error("Create Contact error:", error);
         throw error;
     }
 }

 export async function getWorkspaceContactsApi(workspaceId: string, priority?: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
     const url = `http://localhost:3000/contacts/${workspaceId}/list`;
 
     try {
         
       const res = await fetch(url, { 
        method: 'GET',
        headers: {
         "Content-Type": "application/json",
         ...(accessToken
           ? { Authorization: `Bearer ${accessToken}` }
           : {}),
       },
       }) 
       
       const data = await res.json()
 
       if (!res.ok) {
         return {
           data: null,
           error: data?.message || "Failed to fetch workspace contacts",
         };
       }
 
      return {
       data,
       error: null,
     };
 
     } catch (error: any) {
        return {
       data: null,
       error: error?.message || "Network error, Failed to fetch contact.",
     }
     }
 }
 


 export async function getWorkspaceContactId(workspaceId: string, contactId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
  
     try {
         
       const res = await fetch(`http://localhost:3000/contacts/${workspaceId}/list/${contactId}`, {
        method: 'GET',
        headers: {
         "Content-Type": "application/json",
         ...(accessToken
           ? { Authorization: `Bearer ${accessToken}` }
           : {}),
       },
       }) 
       
       const data = await res.json()
  
       if (!res.ok) {
         return {
           data: null,
           error: data?.message || "Failed to fetch workspace contact details",
         };
       }
  
      return {
       data,
       error: null,
     };
  
     } catch (error: any) {
        return {
       data: null,
       error: error?.message || "Network error, Failed to fetch contact.",
     }
     }
  }

  export async function createReminderPreferenceApi(contactId: string, workspaceId: string, formData: createReminderPreferenceType) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
    const {timezone, reminderCadence} = formData
 
    if (!accessToken) {
       throw new Error('Invalid login response: tokens missing')
     }
 
     try {
         
       const res = await fetch(`http://localhost:3000/contacts/${workspaceId}/${contactId}/reminder/preference`, {
        method: 'POST',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({timezone, reminderCadence}),
       }) 
       
       const data = await res.json()
 
       if(!res.ok) {
         throw new Error(data?.message || 'Failed to create reminder preference')
       }
 
       return data
     } catch (error) {
         console.error("Create Reminder preference error:", error);
         throw error;
     }
 }


 export async function getReminderPreferenceApi(contactId: string) {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

   try {
       
     const res = await fetch(`http://localhost:3000/contacts/${contactId}/preference/list`, {
      method: 'GET',
      headers: {
       "Content-Type": "application/json",
       ...(accessToken
         ? { Authorization: `Bearer ${accessToken}` }
         : {}),
     },
     }) 
     
     const data = await res.json()

     if (!res.ok) {
       return {
         data: null,
         error: data?.message || "Failed to fetch workspace contact preference details",
       };
     }

    return {
     data,
     error: null,
   };

   } catch (error: any) {
      return {
     data: null,
     error: error?.message || "Network error, Failed to fetch contact.",
   }
   }
}
  
export async function deleteReminderPreferenceApi(preferenceId: string, contactId: string, workspaceId: string) {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

   try {
       
     const res = await fetch(`http://localhost:3000/contacts/${workspaceId}/${contactId}/${preferenceId}/delete`, {
      method: 'DELETE',
      headers: {
       "Content-Type": "application/json",
       ...(accessToken
         ? { Authorization: `Bearer ${accessToken}` }
         : {}),
     },
     }) 
     
     const data = await res.json()

     if (!res.ok) {
       return {
         data: null,
         error: data?.message || "Failed to delete workspace contact preference details",
       };
     }

    return {
     data: data.message || "Contact preference deleted successfully",
   };

   } catch (error: any) {
      return {
     data: null,
     error: error?.message || "Network error, Failed to delete contact preference",
   }
   }
}
  