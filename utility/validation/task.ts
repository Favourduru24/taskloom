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

  imageUrl: z
    .string()
    .url("must be a valid url")
    .optional(),

  endDate: z
    .string()
    .datetime("must be a valid ISO date"),

  priority: z.enum(["URGENT", "NORMAL" , "LOW" , "TODO" , "INPROGRESS" , "COMPLETED"]),

  collaboratorIds: z
    .array(z.string())
    .nonempty("must have at least one collaborator")
    .refine((arr) => new Set(arr).size === arr.length, {
      message: "collaboratorIds must be unique",
    }),

  workspaceId: z
    .string()
    .min(1, "workspaceId is required"),
});

export type createTaskSchemaType = z.infer<typeof createTaskSchema>