'use server'

import { signInSchemaType, signUpSchemaType } from "../validation/auth";
import { cookies } from "next/headers";
 export async function signUpApi(formData: signUpSchemaType) {

  const {email, fullName, password} = formData
   
   try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signup`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password, fullName})
    })

    const data = await res.json()

    if(!res.ok){
      throw new Error(data?.message || 'Sign up failed')

    }
    return data

   } catch (error) {
    console.error("Signup error:", error);
    throw error;
   }
 }



 export async function signInApi(formData: signInSchemaType) {

  const {email, password} = formData
   
   try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })

    const data = await res.json()

    
    if(!res.ok){
      throw new Error(data?.message || 'Sign up failed')
    }
    
    const cookieStore = await cookies()

    const accessToken = data?.accessToken
    const refreshToken = data?.refreshToken
    
    if (!accessToken || !refreshToken) {
      throw new Error('Invalid login response: tokens missing')
    }
        
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })
    
    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
    })

    return data

   } catch (error) {
    console.error("Signup error:", error);
    throw error;
   }
 }

 export async function uploadProfilePics(formData: FormData) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    throw new Error('Invalid login response: tokens missing')
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/upload`, {
      method: 'PATCH',
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

export async function getProfile() {
  const cookieStore = await cookies()
  
  const accessToken = cookieStore.get('accessToken')?.value

   try {
       
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/profile`, {
      method: 'GET',
      headers: {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${accessToken}`
      }
     }) 
     
     const data = await res.json()

     if(!res.ok) {
       throw new Error(data?.message || 'Failed to profile.')
     }

     return data
   } catch (error) {
       console.error("Create Workspace error:", error);
       throw error;
   }
}