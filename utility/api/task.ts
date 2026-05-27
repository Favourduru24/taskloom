'use server'
import { cookies } from "next/headers"
import { createTaskSchemaType, updateTaskSchemaType } from "../validation/task"
import { TaskProps } from "@/app/(dashboard)/workspace/[workspaceId]/task/[taskId]/page"

export async function createTaskApi(formData: createTaskSchemaType, priority: string, workspaceId: string, collaboratorIds: string[], imageUrl: string) {
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
       body: JSON.stringify({title, description, endDate, category, workspaceId, priority, collaboratorIds, imageUrl}),
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

export async function updateTaskApi(formData: updateTaskSchemaType, taskId: string, workspaceId: string, priority?: string,  collaboratorIds?: string[], imageUrl?: string) {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

  const {title, description, endDate, category} = formData

  if (!accessToken) {
     throw new Error('Invalid login response: tokens missing')
   }

   try {
       
     const res = await fetch(`http://localhost:3000/tasks/${workspaceId}/task/${taskId}`, {
      method: 'PATCH',
      headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({title, description, endDate, category, priority, collaboratorIds, imageUrl}),
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
        ...(accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
      },
      }) 
      
      const data = await res.json()

      if (!res.ok) {
        return {
          data: null,
          error: data?.message || "Failed to fetch workspace tasks",
        };
      }

     return {
      data,
      error: null,
    };

    } catch (error: any) {
       return {
      data: null,
      error: error?.message || "Network error, Failed to fetch task.",
    }
    }
}

export async function getWorkspaceTaskId(workspaceId: string, taskId: string) {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

   try {
       
     const res = await fetch(`http://localhost:3000/tasks/${workspaceId}/task/${taskId}`, {
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
         error: data?.message || "Failed to fetch workspace task details",
       };
     }

    return {
     data,
     error: null,
   };

   } catch (error: any) {
      return {
     data: null,
     error: error?.message || "Network error, Failed to fetch task.",
   }
   }
}