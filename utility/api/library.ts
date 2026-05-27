'use server'
import { cookies } from "next/headers"
export async function uploadAsset(formData: FormData, workspaceId: string) {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value
  
    if (!accessToken) {
      throw new Error('Invalid login response: tokens missing')
    }
  
    try {
      const res = await fetch(`http://localhost:3000/library/${workspaceId}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      })
  
      const data = await res.json()
  
      if (!res.ok) {
        throw new Error(data?.message || 'Failed to upload asset')
      }
  
      return data
    } catch (error) {
      console.error("Upload Asset error:", error)
      throw error
    }
  }

  export async function getLibaryAssetApi(workspaceId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
     try {
       const res = await fetch(`http://localhost:3000/library/${workspaceId}/list`, {
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
           error: data?.message || "Failed to fetch library assets.",
         };
       }
 
      return {
       data,
       error: null,
     };
 
     } catch (error: any) {
        return {
       data: null,
       error: error?.message || "Network error, Failed to fetch library asset.",
     }
     }
 }