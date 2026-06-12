import { z } from 'zod';

// ============================================
// 2. FORM SCHEMA
// ============================================
export const regionCampusFormSchema = z.object({
	id: z.uuid(),
	regionId: z.uuid().optional(),
	createdBy: z.string().optional()
});

export type RegionCampusForm = z.infer<typeof regionCampusFormSchema>;
