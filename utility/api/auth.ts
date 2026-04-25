'use server'

import { signInSchemaType, signUpSchemaType } from "../validation/auth";
import { cookies } from "next/headers";
 export async function signUpApi(formData: signUpSchemaType) {

  const {email, fullName, password} = formData
   
   try {
      const res = await fetch('http://localhost:3000/auth/signup', {
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
      const res = await fetch('http://localhost:3000/auth/login', {
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

    console.log({data})
    return data

   } catch (error) {
    console.error("Signup error:", error);
    throw error;
   }
 }

 