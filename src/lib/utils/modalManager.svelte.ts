/**
 * Estado interno del administrador de modales
 * @template TItem - Tipo del elemento seleccionado en el modal
 */
type ModalState<TItem = unknown> = {
	/** Identificador del modal actualmente abierto, o null si ninguno está abierto */
	activeModal: string | null;
	/** Elemento seleccionado para operaciones como editar o eliminar */
	selectedItem: TItem | null;
};

/**
 * Crea un administrador de modales reactivo para Svelte 5 (runes)
 *
 * @template TItem - Tipo del elemento que manejarán los modales (ej: Usuario, Producto)
 * @returns {Object} Objeto con el estado y métodos para controlar modales
 *
 * @example
 * ```svelte
 * <script>
 *   const modal = createModalManager<Usuario>();
 * </script>
 *
 * <!-- Usar handlers para accesibilidad -->
 * <button {...modal.handlers('create').onclick}>
 *   Crear Usuario
 * </button>
 *
 * <!-- Verificar si un modal está abierto -->
 * {#if modal.isOpen('create')}
 *   <ModalCreate on:success={modal.onSuccess} />
 * {/if}
 * ```
 */
export function createModalManager<TItem = unknown>() {
	const state = $state<ModalState<TItem>>({
		activeModal: null,
		selectedItem: null
	});

	/**
	 * Abre un modal específico, opcionalmente con un elemento seleccionado
	 * @param modalId - Identificador del modal a abrir
	 * @param item - Elemento a asociar con el modal (útil para editar/eliminar)
	 */
	function open(modalId: string, item?: TItem) {
		state.activeModal = modalId;
		state.selectedItem = item ?? null;
	}

	/**
	 * Cierra el modal activo y limpia el elemento seleccionado
	 */
	function close() {
		state.activeModal = null;
		state.selectedItem = null;
	}

	/**
	 * Verifica si un modal específico está actualmente abierto
	 * @param modalId - Identificador del modal a verificar
	 * @returns {boolean} true si el modal está abierto
	 */
	function isOpen(modalId: string) {
		return state.activeModal === modalId;
	}

	/**
	 * Genera manejadores de eventos reutilizables para un modal
	 *
	 * @param modalId - Identificador del modal asociado
	 * @param item - Elemento opcional para precargar en el modal
	 * @returns Objeto con manejadores de eventos y estado reactivo
	 *
	 * @example
	 * ```svelte
	 * <!-- Para botón de creación (sin item) -->
	 * <button {...modal.handlers('create')}>
	 *   Nuevo
	 * </button>
	 *
	 * <!-- Para botón de edición (con item) -->
	 * <button {...modal.handlers('edit', usuario).onClickItem(usuario)}>
	 *   Editar
	 * </button>
	 * ```
	 */
	function handlers(modalId: string, item?: TItem) {
		return {
			/**
			 * Manejador click para elementos sin item (ej: botón crear)
			 */
			onclick: () => open(modalId, item),

			/**
			 * Manejador teclado para accesibilidad (Enter/Espacio)
			 */
			onkeydown: (e: KeyboardEvent) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					open(modalId, item);
				}
			},

			/**
			 * Manejador click que recibe el item dinámicamente
			 * @param item - El elemento a pasar al modal
			 */
			onClickItem: (item: TItem) => open(modalId, item),

			/**
			 * Manejador teclado que recibe el item dinámicamente
			 * @param e - Evento de teclado
			 * @param item - El elemento a pasar al modal
			 */
			onKeydownItem: (e: KeyboardEvent, item: TItem) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					open(modalId, item);
				}
			},

			/** Getter reactivo que indica si este modal está abierto */
			get isOpen() {
				return isOpen(modalId);
			}
		};
	}

	/**
	 * Callback para manejar operaciones exitosas del modal
	 * Cierra el modal y puede disparar notificaciones adicionales
	 *
	 * @example
	 * ```svelte
	 * <ModalEdit on:success={modal.onSuccess} />
	 * ```
	 */
	function onSuccess() {
		close();
		// TODO agregar toast o notificacion
	}

	return {
		/** Getter reactivo del modal activo actual */
		get activeModal() {
			return state.activeModal;
		},

		/** Getter reactivo del elemento seleccionado actual */
		get selectedItem() {
			return state.selectedItem;
		},

		open,
		close,
		isOpen,
		handlers,
		onSuccess
	};
}
