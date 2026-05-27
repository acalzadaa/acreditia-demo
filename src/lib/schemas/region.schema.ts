import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================
export const regionRefSchema = z.object({
  id: z.uuid(),
  code: z.string().min(1, 'El código es requerido'),
  name: z.string().min(1, 'El nombre es requerido')
});

export type RegionRef = z.infer<typeof regionRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const regionFormSchema = z.object({
  id: z.uuid().optional(),
  entidadLegalId: z.uuid('Debes seleccionar una entidad legal'),
  code: z.string().min(1, 'El código debe tener al menos 1 caracter').max(50, 'El código debe tener máximo 50 caracteres'),
  name: z.string().min(1, 'El nombre es obligatorio').max(255, 'El nombre debe tener máximo 255 caracteres'),
  description: z.string().default(''),
  createdBy: z.string().optional()
});

export type RegionForm = z.infer<typeof regionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const regionItemSchema = z.object({
  id: z.uuid(),
  entidadLegalId: z.uuid(),
  code: z.string(),
  name: z.string(),
  description: z.string().optional(),
  version: z.number().default(0),
  isCurrent: z.boolean().default(false),
  validFrom: z.date().optional(),
  validTo: z.date().optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.iso.datetime().optional(),
  createdBy: z.string()
});

export type RegionItem = z.infer<typeof regionItemSchema>;

// ============================================
// 4. CONFIG SCHEMA
// ============================================
export const regionConfigSchema = z.object({
  regionItems: z.array(regionItemSchema)
});

export type RegionConfig = z.infer<typeof regionConfigSchema>;