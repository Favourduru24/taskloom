import * as z from "zod"


export const signInSchema = z.object({
    email:    z.email('Please enter a valid email address'),
    password: z.string()
                .min(6, 'password must be at least 6 characters')
                .max(15, 'password must be less than 20 chars')
            
  })

export const signUpSchema = z.object({
    fullName: z.string()
                .min(3, 'fullName must be at least 3 characters')
                .max(50, 'fullName must be at less 50 characters'),
    email:    z.email('Please enter a valid email address'),
    password: z.string()
                .min(6, 'password must be at least 6 characters')
                .max(15, 'password must be less than 20 chars')
            
  })


  export type signUpSchemaType = z.infer<typeof signUpSchema>
  export type signInSchemaType = z.infer<typeof signInSchema>