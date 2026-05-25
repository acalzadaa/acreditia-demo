import { ESTATUS, FREQUENCY_UNIT } from '$lib/types/common.types';
import { z } from 'zod';


// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================
export const objetivoEstrategicoRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
});

export type ObjetivoEstrategicoRef = z.infer<typeof objetivoEstrategicoRefSchema>;

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const indicadorEstrategicoFormSchema = z.object({
    id: z.uuid().optional(),
    objetivoId: z.uuid("Debes seleccionar un objetivo estrategico"),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().default(''),
    dataOrigin: z.string().min(1, "La fuente de datos es requerido"),
    dataFormula: z.string().min(1, "La formula para obtener la informacion es requerido"),
    target: z.coerce.number().nonnegative().min(0, "La meta debe ser mayor o igual a cero"),
    frequencyValue: z.coerce.number().int("La frecuencia debe ser un numero entero")
        .positive("La frecuencia debe ser un numero mayor que cero"),
    frequencyUnit: z.enum(FREQUENCY_UNIT),
    responsible: z.string().default(''),
    status: z.enum(ESTATUS).default('activo')
});

export type IndicadorEstrategicoForm = z.infer<typeof indicadorEstrategicoFormSchema>;


// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const indicadorEstrategicoItemSchema = z.object({
    id: z.uuid(),
    objetivoId: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido"),
    description: z.string().default(''),
    dataOrigin: z.string().min(1, "La fuente de datos es requerido"),
    dataFormula: z.string().min(1, "La formula para obtener la informacion es requerido"),
    target: z.coerce.number().nonnegative().min(1, "La meta debe ser mayor o igual a cero"),
    frequencyValue: z.coerce.number().int("La frecuencia debe ser un numero entero")
        .positive("La frecuencia debe ser un numero mayor que cero"),
    frequencyUnit: z.enum(FREQUENCY_UNIT),
    responsible: z.string().default(''),
    status: z.enum(ESTATUS).default('activo'),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional(),
    objetivo: objetivoEstrategicoRefSchema.optional()
});

export type IndicadorEstrategicoItem = z.infer<typeof indicadorEstrategicoItemSchema>;

// Esquema para la configuración completa
export const indicadorEstrategicoConfigSchema = z.object({
    indicadorEstrategicoItems: z.array(indicadorEstrategicoItemSchema)
});


export type IndicadorEstrategicoConfig = z.infer<typeof indicadorEstrategicoConfigSchema>;

