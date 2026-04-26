'use server'
import { cookies } from "next/headers"

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