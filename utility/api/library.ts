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