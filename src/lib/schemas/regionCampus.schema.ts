// regionCampus.schema.ts (CORREGIDO)
import { z } from 'zod';
import { campusWithRelationsItemSchema } from './campus.schema';
import { regionWithDirectorSchema } from './region.schema';

// ============================================
// 1. ITEM SCHEMA (Cada registro = una relación Región-Campus)
// ============================================
export const regionCampusItemSchema = z.object({
    id: z.uuid(),
    regionId: z.uuid(),
    campusId: z.uuid(),
    version: z.number().default(0),
    isCurrent: z.boolean().default(false),
    validFrom: z.coerce.date().optional(),
    validTo: z.coerce.date().optional(),
    isDeleted: z.boolean().default(false),
    createdAt: z.iso.datetime().optional(),
    createdBy: z.string()
});

export type RegionCampusItem = z.infer<typeof regionCampusItemSchema>;

// ============================================
// 2. ITEM WITH RELATIONS (Con datos completos de región y campus)
// ============================================
export const regionCampusWithRelationsItemSchema = z.object({
    id: z.uuid(),
    regionId: z.uuid(),
    campusId: z.uuid(),
    region: regionWithDirectorSchema,
    campus: campusWithRelationsItemSchema,
    version: z.number().default(0),
    isCurrent: z.boolean().default(false),
    validFrom: z.coerce.date().optional(),
    validTo: z.coerce.date().optional(),
    isDeleted: z.boolean().default(false),
    createdAt: z.iso.datetime().optional(),
    createdBy: z.string()
});

export type RegionCampusWithRelationItem = z.infer<typeof regionCampusWithRelationsItemSchema>;

// ============================================
// 3. ESTRUCTURA PARA UNA REGIÓN CON SUS CAMPUS
// ============================================
export const regionWithCampusItemSchema = regionWithDirectorSchema.extend({
    campus: z.array(campusWithRelationsItemSchema)
});

export type RegionWithCampusItem = z.infer<typeof regionWithCampusItemSchema>;

// ============================================
// 4. CONFIG SCHEMA (Para múltiples relaciones)
// ============================================
export const regionCampusConfigSchema = z.object({
    regionCampusItems: z.array(regionCampusWithRelationsItemSchema)
});

export type RegionCampusConfig = z.infer<typeof regionCampusConfigSchema>;