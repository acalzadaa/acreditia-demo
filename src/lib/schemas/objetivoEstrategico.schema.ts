import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const planeacionEstrategicaRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
});

export type PlaneacionEstrategicaRef = z.infer<typeof planeacionEstrategicaRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const objetivoEstrategicoFormSchema = z.object({
    id: z.uuid().optional(),
    planeacionId: z.uuid("Debes seleccionar una planeacion estrategica"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().default(''),
    status: z.enum(ESTATUS).default('activo')
});

export type ObjetivoEstrategicoForm = z.infer<typeof objetivoEstrategicoFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const objetivoEstrategicoItemSchema = z.object({
    id: z.uuid(),
    planeacionId: z.uuid(),
    code: z.string(),
    name: z.string(),
    description: z.string().default(''),
    status: z.enum(ESTATUS),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional(),
    planeacion: planeacionEstrategicaRefSchema.optional()
});

export type ObjetivoEstrategicoItem = z.infer<typeof objetivoEstrategicoItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const objetivoEstrategicoConfigSchema = z.object({
    objetivoEstrategicoItems: z.array(objetivoEstrategicoItemSchema)
});

export type ObjetivoEstrategicoConfig = z.infer<typeof objetivoEstrategicoConfigSchema>;