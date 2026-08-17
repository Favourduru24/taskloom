import {cookies} from 'next/headers'

export async function getDashboardStatApi(workspaceId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
  
     try {
         
       const res = await fetch(`http://localhost:3000/dashboard/${workspaceId}/stats`, {
        method: 'GET',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
        }
       }) 
       
       const data = await res.json()
  
       if(!res.ok) {
         throw new Error(data?.message || 'Failed to fetch workspace stats')
       }
  
       return data
     } catch (error) {
         console.error("Fetch Workspace stats error:", error);
         throw error;
     }
  }

export async function getDashboardTodayTaskApi(workspaceId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
  
     try {
         
       const res = await fetch(`http://localhost:3000/dashboard/${workspaceId}/today/task`, {
        method: 'GET',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
        }
       }) 
       
       const data = await res.json()
  
       if(!res.ok) {
         throw new Error(data?.message || 'Failed to fetch workspace today task')
       }
  
       return data
     } catch (error) {
         console.error("Fetch Workspace task error:", error);
         throw error;
     }
  }

export async function getDashboardUpcommingFollowupApi(workspaceId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
  
     try {
         
       const res = await fetch(`http://localhost:3000/dashboard/${workspaceId}/upcomming/followup`, {
        method: 'GET',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
        }
       }) 
       
       const data = await res.json()
  
       if(!res.ok) {
         throw new Error(data?.message || 'Failed to fetch workspace upcomming followUp')
       }
  
       return data
     } catch (error) {
         console.error("Fetch Workspace task error:", error);
         throw error;
     }
  }

export async function getDashboardTodayFollowupApi(workspaceId: string) {
    const cookieStore = await cookies()
    
    const accessToken = cookieStore.get('accessToken')?.value
  
     try {
         
       const res = await fetch(`http://localhost:3000/dashboard/${workspaceId}/today/followup`, {
        method: 'GET',
        headers: {
         "Content-Type": "application/json",
         "Authorization": `Bearer ${accessToken}`
        }
       }) 
       
       const data = await res.json()
  
       if(!res.ok) {
         throw new Error(data?.message || 'Failed to fetch workspace today followUp')
       }
  
       return data
     } catch (error) {
         console.error("Fetch Workspace task error:", error);
         throw error;
     }
  }