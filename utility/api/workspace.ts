'use server'

import {cookies} from 'next/headers'
import { createWorkspaceType } from '../validation/workspace'

export async function createWorspaceApi(formData: createWorkspaceType) {
   const cookieStore = await cookies()
   
   const accessToken = cookieStore.get('accessToken')?.value

   const {name} = formData

   if (!accessToken) {
      throw new Error('Invalid login response: tokens missing')
    }

    try {
        
      const res = await fetch('http://localhost:3000/workspace', {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
       },
       body: JSON.stringify({name}),
      }) 
      
      const data = await res.json()

      if(!res.ok) {
        throw new Error(data?.message || 'Failed to fetch workspace')
      }

      return data
    } catch (error) {
        console.error("Create Workspace error:", error);
        throw error;
    }
}

 export async function getWorkspaceApi() {
   const cookieStore = await cookies()
   
   const accessToken = cookieStore.get('accessToken')?.value

    try {
        
      const res = await fetch('http://localhost:3000/workspace', {
       method: 'GET',
       headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
       }
      }) 
      
      const data = await res.json()

      if(!res.ok) {
        throw new Error(data?.message || 'Failed to fetch workspace')
      }

      return data
    } catch (error) {
        console.error("Create Workspace error:", error);
        throw error;
    }
}

export async function getWorkspaceMemberApi(workspaceId: string) {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

   try {
       
     const res = await fetch(`http://localhost:3000/workspace/${workspaceId}/member`, {
      method: 'GET',
      headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${accessToken}`
      }
     }) 
     
     const data = await res.json()

     if(!res.ok) {
       throw new Error(data?.message || 'Failed to fetch workspace')
     }

     return data
   } catch (error) {
       console.error("Create Workspace error:", error);
       throw error;
   }
}