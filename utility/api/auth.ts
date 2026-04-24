import { signUpSchemaType } from "../validation/auth";

 export async function signUpApi(formData: signUpSchemaType) {
   
   try {
      const res = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({formData})
    })

    const data = res.json()

    if(!res.ok){
        // throw new Error(data?.message || 'Sign up failed')
        console.log('Data Error', data)
    }

    console.log({data})
    return data
   } catch (error) {
    console.error("Signup error:", error);
    throw error;
   }
 }

 