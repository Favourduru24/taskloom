'use server'
import { cookies } from "next/headers"
import { createTaskSchemaType } from "../validation/task"

export async function createTaskApi(formData: createTaskSchemaType, priority: string, workspaceId: string, collaboratorIds: string[]) {
   const cookieStore = await cookies()
   
   const accessToken = cookieStore.get('accessToken')?.value

   const {title, description, endDate, category} = formData

   if (!accessToken) {
      throw new Error('Invalid login response: tokens missing')
    }

    try {
        
      const res = await fetch('http://localhost:3000/tasks', {
       method: 'POST',
       headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
       },
       body: JSON.stringify({title, description, endDate, category, workspaceId, priority, collaboratorIds}),
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

export async function getWorkspaceTasksApi(workspaceId: string) {
   const cookieStore = await cookies()
   
   const accessToken = cookieStore.get('accessToken')?.value

    try {
        
      const res = await fetch(`http://localhost:3000/tasks/${workspaceId}`, {
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