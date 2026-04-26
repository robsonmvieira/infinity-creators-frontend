import { z } from 'zod'

export const contentListItemApiSchema = z.object({
  id: z.string(),
  requestId: z.string(),
  brandId: z.string().nullable(),
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'FAILED']),
  imageStyle: z.string(),
  contentMeta: z.object({
    category: z.string(),
    language: z.string(),
    secondaryLanguage: z.string().nullable().optional(),
  }),
  platforms: z.array(z.enum(['instagram', 'threads', 'x', 'tiktok'])),
  errorMessage: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export const contentListApiSchema = z.object({
  items: z.array(contentListItemApiSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  has_more: z.boolean(),
})

export type ContentListItemApi = z.infer<typeof contentListItemApiSchema>
