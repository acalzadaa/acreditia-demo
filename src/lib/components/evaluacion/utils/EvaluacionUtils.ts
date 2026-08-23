import { type EvaluacionItem, type EvaluacionStatus } from '$lib/schemas/evaluacion.schema';
import type { BadgeStatus } from '../../ui/Badge.svelte';

const STATUS_TO_BADGE_CONFIG: Record<
	EvaluacionStatus,
	{ evaluacionStatus: EvaluacionStatus; badgeStatus: BadgeStatus; label: string }
> = {
	planning: { evaluacionStatus: 'planning', badgeStatus: 'info', label: 'En planeación' },
	ready: { evaluacionStatus: 'ready', badgeStatus: 'success', label: 'Listo para iniciar ciclo' },
	running: { evaluacionStatus: 'running', badgeStatus: 'success', label: 'En ejecucion' },
	completed: { evaluacionStatus: 'completed', badgeStatus: 'warning', label: 'Completado' }
};

export function convertEvaluacionStatusToBadgeVariant(status: EvaluacionStatus): {
	evaluacionStatus: EvaluacionStatus;
	badgeStatus: BadgeStatus;
	label: string;
} {
	return STATUS_TO_BADGE_CONFIG[status];
}

export type EvaluacionAction = 'execute' | 'detail' | 'edit' | 'delete' | 'restore';

export function isActionDisabled(item: EvaluacionItem, action: EvaluacionAction) {
	switch (action) {
		/* DELETED debe estar desactivada si: 
		la evaluacion esta borrada: item.isDeleted === true
		la evaluacion esta o estuvo en ejecucion: item.startedAt !== null
		la evaluacion no tiene estatus PLANNING
		*/
		case 'delete': {
			return item.isDeleted || item.startedAt !== null || item.status !== 'planning';
		}

		/* DETAIL debe estar desactivada si: 
		la evaluacion esta borrada: item.isDeleted === true
		*/
		case 'detail': {
			return item.isDeleted;
		}

		/* EDIT debe estar desactivada si: 
		la evaluacion esta borrada: item.isDeleted === true
		la evaluacion no esta en ejecucion: item.startedAt !== null
		la evaluacion no tiene estatus PLANNING
		*/
		case 'edit': {
			return item.isDeleted || item.status !== 'planning' || item.startedAt !== null;
		}

		/* RESTORE debe estar desactivada si: 
		la evaluacion esta activa: item.isDeleted === false
		la evaluacion no esta en ejecucion: item.startedAt !== null
		la evaluacion no tiene estatus PLANNING
		*/
		case 'restore': {
			return !item.isDeleted || item.startedAt !== null || item.status !== 'planning';
		}

		/* EXECUTE debe estar desactivada si: 
		la evaluacion esta borrada: item.isDeleted === true
		la evaluacion no esta en ejecucion: item.startedAt !== null
		la evaluacion tiene estatus PLANNING
		*/
		case 'execute': {
			return item.isDeleted || item.startedAt !== null || item.status === 'planning';
		}

		default:
			return false;
	}
}

/**
 * Valida si un valor es válido para ser mostrado como texto.
 * 
 * Un valor se considera válido si:
 * - No es `null` ni `undefined`
 * - Si es `string`, no está vacío ni contiene solo espacios
 * - Si es `number`, no es `NaN`
 * 
 * Esta función es un type guard que estrecha el tipo a `string | number`.
 * 
 * @param item - El valor a validar (cualquier tipo)
 * @returns {item is string | number} - `true` si el valor es válido,
 *          `false` en caso contrario
 * 
 * @example
 * isValidValue("Hola") // true
 * isValidValue("") // false
 * isValidValue(42) // true
 * isValidValue(NaN) // false
 * isValidValue(null) // false
 * isValidValue(undefined) // false
 * 
 * @example
 * // Uso en una guardia de tipo
 * function procesarValor(valor: unknown) {
 *   if (isValidValue(valor)) {
 *     // Aquí TypeScript sabe que valor es string | number
 *     console.log(`Valor válido: ${String(valor)}`);
 *   } else {
 *     console.log('Valor inválido');
 *   }
 * }
 */
function isValidValue(item: unknown): item is string | number {
  if (item == null) return false;
  if (typeof item === 'string') return item.trim() !== '';
  if (typeof item === 'number') return !isNaN(item);
  return false;
}

/**
 * Obtiene una representación textual segura de un valor, con un texto alternativo
 * para valores inválidos o vacíos.
 * 
 * Esta función es útil para mostrar valores en la UI (como labels de botones,
 * textos de inputs, etc.) donde necesitas asegurarte de que siempre se muestre
 * algo significativo, incluso cuando el valor original es null, undefined,
 * string vacío, o un número inválido.
 * 
 * @param item - El valor a procesar. Puede ser:
 *   - `string`: se valida que no esté vacío o solo espacios
 *   - `number`: se valida que no sea `NaN`
 *   - `null` o `undefined`: se consideran inválidos
 * @param altText - Texto alternativo que se mostrará cuando `item` sea inválido
 * @returns {string} - El valor como string si es válido, o el `altText` si es inválido
 * 
 * @example
 * // Con números válidos
 * getSafeText(42, "Sin valor") // "42"
 * getSafeText(0, "Sin valor") // "0" (0 es considerado válido)
 * 
 * @example
 * // Con strings
 * getSafeText("Hola mundo", "Sin valor") // "Hola mundo"
 * getSafeText("  ", "Sin valor") // "Sin valor" (solo espacios)
 * getSafeText("", "Sin valor") // "Sin valor" (string vacío)
 * 
 * @example
 * // Con valores nulos/undefined
 * getSafeText(null, "Sin valor") // "Sin valor"
 * getSafeText(undefined, "Sin valor") // "Sin valor"
 * 
 * @example
 * // Con números inválidos
 * getSafeText(NaN, "Sin valor") // "Sin valor"
 * 
 * @example
 * // Uso común en formularios con Zod
 * const target = form.watch('target'); // number | null
 * <Button>
 *   {getSafeText(target, "Agrega la meta")}
 * </Button>
 * 
 * @example
 * // Uso en inputs controlados
 * <Input
 *   value={getSafeText(target, "")}
 *   placeholder="Ingresa un valor"
 * />
 * 
 * @see {@link isValidValue} - Función de validación subyacente
 */
export function getSafeText(
  item: string | number | null | undefined, 
  altText: string
): string {
  return isValidValue(item) ? String(item) : altText;
}