/**
 * Opciones de formato para la función formatDate
 */
type DateFormatOptions = {
	/** Formato de salida deseado */
	format?: 'dd/mm/yyyy' | 'mm/dd/yyyy' | 'yyyy-mm-dd';
	/** Texto a mostrar cuando la fecha es nula o inválida */
	fallback?: string;
};

/**
 * Formatea una fecha según el formato especificado
 *
 * @param {string | Date | null | undefined} dateString - La fecha a formatear
 * @param {DateFormatOptions} [options] - Opciones de formato
 * @param {string} [options.format='dd/mm/yyyy'] - Formato de salida deseado
 * @param {string} [options.fallback='-'] - Texto a mostrar cuando la fecha es nula o inválida
 *
 * @returns {string} La fecha formateada según el formato especificado
 *
 * @example
 * // Formato por defecto DD/MM/YYYY
 * formatDate("2025-12-01T00:00:00Z") // "01/12/2025"
 *
 * @example
 * // Formato MM/DD/YYYY
 * formatDate("2025-12-01T00:00:00Z", { format: 'mm/dd/yyyy' }) // "12/01/2025"
 *
 * @example
 * // Formato YYYY-MM-DD
 * formatDate("2025-12-01T00:00:00Z", { format: 'yyyy-mm-dd' }) // "2025-12-01"
 *
 * @example
 * // Con fallback personalizado
 * formatDate(null, { fallback: 'No disponible' }) // "No disponible"
 *
 * @example
 * // Con objeto Date
 * formatDate(new Date(2025, 11, 1)) // "01/12/2025"
 */
export function formatDate(
	dateString: string | Date | null | undefined,
	options: DateFormatOptions = {}
): string {
	const { format = 'dd/mm/yyyy', fallback = '-' } = options;

	if (!dateString) return fallback;

	const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

	if (isNaN(date.getTime())) return fallback;

	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const year = date.getFullYear();

	switch (format) {
		case 'mm/dd/yyyy':
			return `${month}/${day}/${year}`;
		case 'yyyy-mm-dd':
			return `${year}-${month}-${day}`;
		case 'dd/mm/yyyy':
		default:
			return `${day}/${month}/${year}`;
	}
}
