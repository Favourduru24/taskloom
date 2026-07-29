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
         
       const res = await fetch(`http://localhost:3000/conversation/create`, {
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

 export async function getWorkspaceContactsApi(contactId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
     const url = `http://localhost:3000/conversation/${contactId}/list`;
 
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