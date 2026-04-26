import * as z from "zod"

 export const createWorkSpaceSchema = z.object({
    name: z.string()
            .min(1, 'Name cannot be less than 1 char')
            .max(30, 'Name must be at least most 30 characters')
 })

 export type createWorkspaceType = z.infer<typeof createWorkSpaceSchema>