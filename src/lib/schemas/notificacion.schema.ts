import { z } from 'zod';
import { usuarioRefSchema } from './shared.schema';

// ============================================
// 1. REFERENCE SCHEMAS (Para relaciones)
// ============================================

// ============================================
// 2. FORM SCHEMA (Cliente ↔ Servidor)
// Para operaciones CRUD: crear y actualizar
// ============================================

export const NOTIFICATION_USER_TYPE = ['system', 'user', 'global'] as const;

export const notificationUser = z.object({
	type: z.enum(NOTIFICATION_USER_TYPE).default('user'),
	user: z.array(usuarioRefSchema).optional()
});

export const notificacionFormSchema = z.object({
	id: z.uuid().optional(),
	from: notificationUser,
	to: notificationUser,
	header: z.string(),
	message: z.string().default(''),
	link: z.string().optional(),
	createdBy: z.string().default('')
});

export type NotificationForm = z.infer<typeof notificacionFormSchema>;

// ============================================
// 3. ITEM SCHEMA (Servidor → Cliente)
// Datos completos desde la base de datos, incluyendo timestamps y relaciones
// ============================================

export const notificationItemSchema = z.object({
	id: z.uuid(),
	from: notificationUser,
	to: notificationUser,
	header: z.string(),
	message: z.string().default(''),
	link: z.string().optional(),
	readAt: z.coerce.date().optional(),
	createdAt: z.iso.datetime().optional(),
	createdBy: z.string().optional()
});
export type NotificationItem = z.infer<typeof notificationItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Servidor → Cliente)
// Para listas o configuraciones completas
// ============================================

export const notificationConfigSchema = z.object({
	notificaciones: z.array(notificationItemSchema)
});

export type NotificacionConfig = z.infer<typeof notificationConfigSchema>;
