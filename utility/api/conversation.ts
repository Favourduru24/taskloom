'use server'

import { cookies } from "next/headers"
import { createConversationSchemaType } from "../validation/conversation"

export async function createConversationApi(formData: createConversationSchemaType) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
    const {contactId, content, source} = formData
 
    if (!accessToken) {
       throw new Error('Invalid login response: tokens missing')
     }
 
     try {
         
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversation/${contactId}/create`, {
        method: 'POST',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({contactId, content, source}),
       }) 
       
       const data = await res.json()
 
       if(!res.ok) {
         throw new Error(data?.message || 'Failed to create conversation')
       }
 
       return data
     } catch (error) {
         console.error("Create Conversation error:", error);
         throw error;
     }
 }

 export async function updateConversationApi(conversationId: string, contactId: string, content: string, summary: string) {

  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
     throw new Error('Invalid login response: tokens missing')
   }

   try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/conversation/${contactId}/${conversationId}/update`;

     const res = await fetch(url, {
      method: 'PATCH',
      headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({content, summary}),
     }) 
     
     const data = await res.json()

     if(!res.ok) {
       throw new Error(data?.message || 'Failed to update conversation')
     }

     return data
   } catch (error) {
       console.error("Update Conversation error:", error);
       throw error;
   }
}

 export async function getWorkspaceConversationApi(contactId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
     const url = `${process.env.NEXT_PUBLIC_API_URL}/conversation/${contactId}/list`;
 
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
           error: data?.message || "Failed to fetch contact conversation",
         };
       }
 
      return {
       data,
       error: null,
     };
 
     } catch (error: any) {
        return {
       data: null,
       error: error?.message || "Network error, Failed to fetch conversation.",
     }
     }
 }

 export async function getConversationById(contactId: string, conversationId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
  
     try {
         
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversation/${contactId}/${conversationId}`, {
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
           error: data?.message || "Failed to conversation details",
         };
       }
  
      return {
       data,
       error: null,
     };
  
     } catch (error: any) {
        return {
       data: null,
       error: error?.message || "Network error, Failed to fetch conversation.",
     }
     }
  }


  export async function updateAiMemoryApi(contactId: string, recentConversation: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
    if (!accessToken) {
       throw new Error('Invalid login response: tokens missing')
     }
 
     try {
         
       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversation/${contactId}/ai-memory`, {
        method: 'PATCH',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
        },
        body: JSON.stringify({recentConversation}),
       }) 
       
       const data = await res.json()
 
       if(!res.ok) {
         throw new Error(data?.message || 'Failed to update ai memory')
       }
 
       return data
     } catch (error) {
         console.error("Update Ai memory error:", error);
         throw error;
     }
 }

 export async function getAiMemoryByContactId(contactId: string) {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

   try {
       
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/conversation/${contactId}/aimemory`, {
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
         error: data?.message || "Failed to ai memory details",
       };
     }

    return {
     data,
     error: null,
   };

   } catch (error: any) {
      return {
     data: null,
     error: error?.message || "Network error, Failed to fetch ai memory.",
   }
   }
}
