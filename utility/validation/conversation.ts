import * as z from 'zod'

export const createConversationSchema = z.object({
  contactId: z
    .string()
    .min(1, "contactId must be at least 1 char"),

    content: z
    .string()
    .min(1, "content must be at least 1 char"),

    source: z
        .string()
        .min(1, "source must be at least 1 char")
});

export type createConversationSchemaType = z.infer<typeof createConversationSchema>
// export type updateTaskSchemaType = z.infer<typeof updateTaskSchema>