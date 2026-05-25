import { z } from 'zod';
import { userRefSchema } from './ref.schema';

// ============================================
// Enums
// ============================================

export const ORIGEN = ['interno', 'externo'] as const;
export const NORMATIVA_STATUS = ['activo', 'inactivo', 'archivado'] as const;
export const VERSION_STATUS = ['activo', 'archivado', 'eliminado'] as const;


// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

export const normativaRefSchema = z.object({
    id: z.uuid(),
    code: z.string().min(1, "El código es requerido"),
    name: z.string().min(1, "El nombre es requerido")
});

export type NormativaRef = z.infer<typeof normativaRefSchema>;


// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const versionFormSchema = z.object({
    id: z.string().min(1).optional(),
    versionNumber: z.number().int().positive().optional(),
    filename: z.string().min(1, "El nombre del archivo es requerido"),
    originalFilename: z.string().optional(),
    s3Key: z.string().min(1, "La clave S3 es requerida"),
    fileSize: z.number().int().positive("El tamaño del archivo debe ser positivo"),
    mimeType: z.string().min(1, "El tipo MIME es requerido"),
    fileHash: z.string().optional(),
    uploadedBy: z.string().optional(),
    isActive: z.boolean().default(false)
});

export type VersionForm = z.infer<typeof versionFormSchema>;

export const normativaFormSchema = z.object({
    id: z.uuid().optional(),
    code: z.string()
        .min(1, "El código es requerido")
        .max(50, "El código no puede exceder 50 caracteres")
        .regex(/^[A-Z0-9_]+$/, "El código solo puede contener letras mayúsculas, números y guiones bajos"),
    name: z.string()
        .min(1, "El nombre es requerido")
        .max(255, "El nombre no puede exceder 255 caracteres"),
    description: z.string()
        .min(1, "La descripción es requerida")
        .max(1000, "La descripción no puede exceder 1000 caracteres"),
    origen: z.enum(ORIGEN),
    status: z.enum(NORMATIVA_STATUS).default('activo'),
    activeVersionId: z.string().optional()
});

export type NormativaForm = z.infer<typeof normativaFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const versionItemSchema = z.object({
    id: z.string().min(1),
    versionNumber: z.number().int().positive(),
    isActive: z.boolean(),
    filename: z.string().min(1),
    originalFilename: z.string().optional(),
    s3Key: z.string().min(1),
    fileSize: z.number().int().positive(),
    mimeType: z.string(),
    fileHash: z.string().optional(),
    uploadedBy: z.string().optional(),
    uploadedAt: z.iso.datetime({ offset: true }),
    status: z.enum(VERSION_STATUS).default('activo'),
    changes: z.string().optional(),
});

export type VersionItem = z.infer<typeof versionItemSchema>;

export const normativaItemSchema = z.object({
    id: z.uuid(),
    code: z.string(),
    name: z.string(),
    description: z.string(),
    origen: z.enum(ORIGEN),
    status: z.enum(NORMATIVA_STATUS).default('activo'),
    activeVersionId: z.string().nullable().optional(),
    createdAt: z.iso.datetime({ offset: true }),
    createdBy: z.string().optional(),
    updatedAt: z.iso.datetime({ offset: true }),
    updatedBy: z.string().optional(),
    versions: z.array(versionItemSchema).optional(),
    activeVersion: versionItemSchema.optional(),
    createdByUser: userRefSchema.optional(),
    updatedByUser: userRefSchema.optional()
});

export type NormativaItem = z.infer<typeof normativaItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const normativaConfigSchema = z.object({
    normativas: z.array(normativaItemSchema)
});

export type NormativaConfig = z.infer<typeof normativaConfigSchema>;
