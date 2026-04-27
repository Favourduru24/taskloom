import * as z from 'zod'

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "title must be at least 1 char"),

  category: z
    .string()
    .min(1, "category must be at least 1 char"),

  description: z
    .string()
    .min(1, "description must be at least 1 char")
    .optional(),

  endDate: z
    .string()
    .datetime("must be a valid ISO date")
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>