import { z } from 'zod';
import { institucionItemSchema } from './institucion.schema';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================
export const campusRefSchema = z.object({
  id: z.uuid(),
  code: z.string().min(1, 'El código es requerido'),
  name: z.string().min(1, 'El nombre es requerido')
});

export type CampusRef = z.infer<typeof campusRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const campusFormSchema = z.object({
  id: z.uuid().optional(),
  institucionId: z.uuid('Debes seleccionar una institución'),
  code: z.string().min(1, 'El código es requerido'),
  name: z.string().min(1, 'El nombre es requerido'),
  createdBy: z.string().optional()
});

export type CampusForm = z.infer<typeof campusFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const campusItemSchema = z.object({
  id: z.uuid(),
  institucionId: z.uuid(),
  code: z.string(),
  name: z.string(),
  institucion: institucionItemSchema.optional(),
  version: z.number().default(0),
  isCurrent: z.boolean().default(false),
  validFrom: z.date().optional(),
  validTo: z.date().optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.iso.datetime().optional(),
  createdBy: z.string()
});

export type CampusItem = z.infer<typeof campusItemSchema>;

// ============================================
// 4. CONFIG SCHEMA
// ============================================
export const campusConfigSchema = z.object({
  campusItems: z.array(campusItemSchema)
});

export type CampusConfig = z.infer<typeof campusConfigSchema>;