import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS
// ============================================
export const unidadAcademicaRefSchema = z.object({
  id: z.uuid(),
  code: z.string().min(1, 'El código es requerido'),
  name: z.string().min(1, 'El nombre es requerido')
});

export type UnidadAcademicaRef = z.infer<typeof unidadAcademicaRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// ============================================
export const unidadAcademicaFormSchema = z.object({
  id: z.uuid().optional(),
  campusId: z.uuid('Debes seleccionar un campus'),
  code: z.string().min(1, 'El código es requerido'),
  name: z.string().min(1, 'El nombre es requerido'),
  createdBy: z.string().optional()
});

export type UnidadAcademicaForm = z.infer<typeof unidadAcademicaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// ============================================
export const unidadAcademicaItemSchema = z.object({
  id: z.uuid(),
  campusId: z.uuid(),
  code: z.string(),
  name: z.string(),
  campus: z.object({
    id: z.uuid(),
    code: z.string(),
    name: z.string(),
    institucion: z.object({
      id: z.uuid(),
      code: z.string(),
      name: z.string(),
      region: z.object({
        id: z.uuid(),
        code: z.string(),
        name: z.string()
      }),
      entidadLegal: z.object({
        id: z.uuid(),
        code: z.string(),
        name: z.string()
      })
    })
  }).optional(),
  version: z.number().default(0),
  isCurrent: z.boolean().default(false),
  validFrom: z.date().optional(),
  validTo: z.date().optional(),
  isDeleted: z.boolean().default(false),
  createdAt: z.iso.datetime().optional(),
  createdBy: z.string()
});

export type UnidadAcademicaItem = z.infer<typeof unidadAcademicaItemSchema>;

// ============================================
// 4. CONFIG SCHEMA
// ============================================
export const unidadAcademicaConfigSchema = z.object({
  unidadAcademicaItems: z.array(unidadAcademicaItemSchema)
});

export type UnidadAcademicaConfig = z.infer<typeof unidadAcademicaConfigSchema>;

// ============================================
// 5. UTILITY TYPE: Para respuestas con jerarquía completa
// ============================================
export type UnidadAcademicaWithFullHierarchy = UnidadAcademicaItem & {
  campus: NonNullable<UnidadAcademicaItem['campus']>;
};