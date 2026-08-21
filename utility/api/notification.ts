'use server'
import { cookies } from "next/headers";

export async function getWorkspaceNotificationApi() {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
 
     const url = `${process.env.NEXT_PUBLIC_API_URL}/contacts/user/notification`;
 
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
           error: data?.message || "Failed to fetch notification",
         };
       }
 
      return {
       data,
       error: null,
     };
 
     } catch (error: any) {
        return {
       data: null,
       error: error?.message || "Network error, Failed to fetch notification.",
     }
     }
 }


 export async function markAllNotificationsAsReadApi() {
    const cookieStore = await cookies();
  
    const accessToken = cookieStore.get("accessToken")?.value;
  
    const url = `${process.env.NEXT_PUBLIC_API_URL}/contacts/user/notification/read-all`;
  
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(accessToken
            ? {
                Authorization: `Bearer ${accessToken}`,
              }
            : {}),
        },
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        return {
          data: null,
          error: data?.message || "Failed to mark notifications as read.",
        };
      }
  
      return {
        data,
        error: null,
      };
    } catch (error: any) {
      return {
        data: null,
        error: error?.message || "Network error.",
      };
    }
  }