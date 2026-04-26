import { z } from 'zod'

/* ── Nested JSONB schemas (camelCase — stored as-is) ── */

const personaSchema = z.object({
  name: z.string(),
  displayName: z.string().optional().default(''),
  handle: z.string().optional().default(''),
  avatarUrl: z.string().optional().default(''),
  bio: z.string().optional().default(''),
  styleReferences: z.array(z.string()).optional().default([]),
})

const tonalitySliderSchema = z.object({
  id: z.string(),
  labelLeft: z.string(),
  labelRight: z.string(),
  value: z.number(),
})

const writingRulesSchema = z.object({
  alwaysUse: z.array(z.string()),
  neverUse: z.array(z.string()),
})

const tagSchema = z.object({
  label: z.string(),
  variant: z.enum(['primary', 'neutral', 'danger']),
})

const referenceItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().optional().default(''),
  sourceType: z.enum(['notion', 'x', 'manual', 'url']),
  sourceUrl: z.string().optional(),
  annotation: z.string().optional().default(''),
  tags: z.array(tagSchema).optional().default([]),
})

const learnedPatternSchema = z.object({
  id: z.string(),
  text: z.string(),
  edits: z.number(),
  status: z.enum(['suggested', 'applied', 'dismissed']),
  appliedRuleId: z.string().nullable(),
})

const referencesSchema = z.object({
  anchors: z.array(referenceItemSchema).optional().default([]),
  antiPatterns: z.array(referenceItemSchema).optional().default([]),
  learnedPatterns: z.array(learnedPatternSchema).optional().default([]),
})

const logoSchema = z.object({
  url: z.string().optional().default(''),
  variants: z.object({
    dark: z.string().optional(),
    light: z.string().optional(),
  }).optional().default({}),
})

const colorsSchema = z.object({
  brand: z.string(),
  background: z.string(),
  text: z.string(),
})

const fontSelectionSchema = z.object({
  role: z.enum(['headline', 'body']),
  fontName: z.string(),
  source: z.enum(['google', 'custom']),
})

const visualIdentitySchema = z.object({
  logo: logoSchema.optional().default({ url: '', variants: {} }),
  colors: colorsSchema,
  fonts: z.array(fontSelectionSchema).optional().default([]),
  defaultImageStyle: z.enum(['photographic', 'illustration', '3d-isometric']).optional().default('photographic'),
})

/* ── Brand (API response — snake_case DB fields) ───── */

export const brandApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  product_id: z.string().optional().default(''),
  language: z.string().optional().default('pt-BR'),
  secondary_language: z.string().nullable().optional().default(null),
  persona: personaSchema.nullable().optional().default(null),
  audience: z.string().nullable().optional().default(null),
  tonality: z.array(tonalitySliderSchema).nullable().optional().default(null),
  writing_rules: writingRulesSchema.nullable().optional().default(null),
  references: referencesSchema.nullable().optional().default(null),
  visual_identity: visualIdentitySchema.nullable().optional().default(null),
  is_active: z.boolean().optional().default(false),
  created_at: z.string(),
  updated_at: z.string(),
})

export type BrandApiResponse = z.infer<typeof brandApiSchema>

/* ── Brand list item ─────────────────────────────────── */

export const brandListItemApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  language: z.string().optional().default('pt-BR'),
  is_active: z.boolean().optional().default(false),
  created_at: z.string(),
})

export const brandListApiSchema = z.object({
  items: z.array(brandListItemApiSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
  has_more: z.boolean(),
})

export type BrandListApiResponse = z.infer<typeof brandListApiSchema>

/* ── Prompt response ─────────────────────────────────── */

export const brandPromptApiSchema = z.object({
  prompt: z.string(),
})
