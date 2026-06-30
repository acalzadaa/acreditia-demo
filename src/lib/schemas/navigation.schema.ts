import { z } from 'zod';

export const navigationItemSchema = z.object({
	id: z.number(),
	label: z.string(),
	description: z.string().optional(),
	href: z.string().optional(),
	itemType: z.enum(['section', 'link']),
	status: z.enum(['active', 'inactive', 'development']).default('active'),
	icon: z.string().optional(),
	children: z.lazy(() => z.array(navigationItemSchema)).optional()
}) as z.ZodType<{
	id: number;
	label: string;
	description?: string;
	href?: string;
	itemType: 'section' | 'link';
	status: 'active' | 'deprecated' | 'development';
	icon?: string;
	children?: z.infer<typeof navigationItemSchema>[];
}>;

export type NavigationItem = z.infer<typeof navigationItemSchema>;

export const navigationConfigSchema = z.object({
	navigationItems: z.array(navigationItemSchema)
});

export type NavigationConfig = z.infer<typeof navigationConfigSchema>;
