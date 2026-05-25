import { ESTATUS } from '$lib/types/common.types';
import { z } from 'zod';


// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const userFormSchema = z.object({
    id: z.uuid().optional(),
    firstName: z.string().min(1, "El nombre es requerido"),
    lastName: z.string().min(1, "El apellido es requerido"),
    status: z.enum(ESTATUS).default('activo')
});

export type UserForm = z.infer<typeof userFormSchema>;


// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const userItemSchema = z.object({
    id: z.uuid().optional(),
    firstName: z.string().min(1, "El nombre es requerido"),
    lastName: z.string().min(1, "El apellido es requerido"),
    status: z.enum(ESTATUS).default('activo'),
    createdAt: z.iso.datetime().optional(),
    updatedAt: z.iso.datetime().optional(),
});

export type UserItem = z.infer<typeof userItemSchema>;

// Esquema para la configuración completa
export const userConfigSchema = z.object({
    userItems: z.array(userItemSchema)
});


export type UserConfig = z.infer<typeof userConfigSchema>;

