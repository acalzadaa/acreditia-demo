/**
 * Opciones de configuración del administrador de toggles
 */
type ToggleManagerOptions = {
	/** Valor por defecto de un toggle cuando no ha sido tocado aún (default: false) */
	defaultOpen?: boolean;
	/** Si es true, abrir un toggle cierra automáticamente los demás (modo acordeón clásico) */
	exclusive?: boolean;
};

/**
 * Crea un administrador de toggles reactivo para Svelte 5 (runes), pensado
 * para grupos de elementos colapsables (AccordionContent, panels, etc.)
 * identificados por un id.
 *
 * A diferencia de `createToggleManager`... (singular), este permite manejar
 * N toggles independientes a la vez, cada uno con su propio estado abierto/cerrado.
 *
 * @param options - Configuración opcional del administrador
 * @returns {Object} Objeto con estado y métodos para controlar el grupo de toggles
 *
 * @example
 * ```svelte
 * <script>
 *   const accordions = createToggleManager();
 * </script>
 *
 * {#each items as item (item.id)}
 *   <AccordionHeaderButton
 *     isVisible={accordions.isOpen(item.id)}
 *     onToggle={() => accordions.toggle(item.id)}
 *   />
 *   <AccordionContent isVisible={accordions.isOpen(item.id)}>
 *     ...
 *   </AccordionContent>
 * {/each}
 * ```
 */
export function createToggleManager(options: ToggleManagerOptions = {}) {
	const { defaultOpen = false, exclusive = false } = options;

	const state = $state<{ open: Record<string, boolean> }>({ open: {} });

	/**
	 * Verifica si un toggle específico está abierto
	 * @param id - Identificador del toggle a verificar
	 */
	function isOpen(id: string): boolean {
		return state.open[id] ?? defaultOpen;
	}

	/**
	 * Abre un toggle específico
	 * Si el manager es `exclusive`, cierra el resto automáticamente
	 * @param id - Identificador del toggle a abrir
	 */
	function open(id: string) {
		if (exclusive) {
			state.open = { [id]: true };
		} else {
			state.open[id] = true;
		}
	}

	/**
	 * Cierra un toggle específico
	 * @param id - Identificador del toggle a cerrar
	 */
	function close(id: string) {
		state.open[id] = false;
	}

	/**
	 * Invierte el estado de un toggle específico
	 * @param id - Identificador del toggle a invertir
	 */
	function toggle(id: string) {
		if (isOpen(id)) {
			close(id);
		} else {
			open(id);
		}
	}

	/**
	 * Abre todos los toggles indicados
	 * @param ids - Lista de identificadores a abrir
	 */
	function openAll(ids: string[]) {
		for (const id of ids) {
			state.open[id] = true;
		}
	}

	/**
	 * Cierra todos los toggles indicados, o todos los que existan si no se pasa lista
	 * @param ids - Lista opcional de identificadores a cerrar
	 */
	function closeAll(ids?: string[]) {
		if (ids) {
			for (const id of ids) {
				state.open[id] = false;
			}
		} else {
			state.open = {};
		}
	}

	/**
	 * Genera manejadores de eventos reutilizables para un toggle específico
	 *
	 * @param id - Identificador del toggle asociado
	 * @returns Objeto con manejadores de eventos y estado reactivo
	 *
	 * @example
	 * ```svelte
	 * <AccordionHeaderButton {...accordions.handlers(item.id)}>
	 *   Título
	 * </AccordionHeaderButton>
	 * ```
	 */
	function handlers(id: string) {
		return {
			/** Manejador click: invierte el estado del toggle */
			onClick: () => toggle(id),

			/** Manejador teclado para accesibilidad (Enter/Espacio) */
			onKeydown: (e: KeyboardEvent) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					toggle(id);
				}
			},

			/** Getter reactivo que indica si este toggle está abierto */
			get isOpen() {
				return isOpen(id);
			}
		};
	}

	return {
		isOpen,
		open,
		close,
		toggle,
		openAll,
		closeAll,
		handlers
	};
}