import * as z from 'zod'


export const createContactSchema = z.object({
  name: z
    .string()
    .min(1, "name must be at least 1 char"),

  email: z
    .string()
    .min(1, "email must be at least 1 char"),

  number: z
    .string()
    .min(1, "description must be at least 1 char")
    .optional(),

  location: z
    .string()
    .min(1, "location must be at least 1 char"),

  company: z
    .string()
    .min(1, "company must be at least 1 char")
    .optional(),

  status: z
    .string()
    .min(1, "status must be at least 1 char"),

 linkedinUrl: z
     .url()
    .min(1, "linkedinUrl must be at least 1 char")
    .optional(),

 website: z
    .url()
    .min(1, "linkedinUrl must be at least 1 char")
    .optional(),

 relationshipSummary: z
    .string()
    .min(20, "relationshipSummary must be at least 20 char")
    .optional(),
 source: z
    .string()
    .min(1, "source must be at least 1 char")
});


export type createContactType = z.infer<typeof createContactSchema>