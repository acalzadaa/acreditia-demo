export function hasFormErrors(errors: Record<string, string[] | undefined>): boolean {
	return Object.values(errors).some((error) => error !== undefined && error.length > 0);
}
