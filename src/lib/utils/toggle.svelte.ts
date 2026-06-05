/**
 * Crea un estado de toggle/interruptor reactivo para Svelte 5 (runes)
 * 
 * @param initialValue - Valor inicial del toggle (por defecto: false)
 * @returns {Object} Objeto con estado y manejadores para el toggle
 * 
 * @example
 * ```svelte
 * <script>
 *   const darkMode = createToggle(false);
 * </script>
 * 
 * <!-- Uso simple con bind -->
 * <input type="checkbox" bind:checked={darkMode.value} />
 * 
 * <!-- Uso con manejadores predefinidos para accesibilidad -->
 * <button {...darkMode}>
 *   {darkMode.value ? 'Dark' : 'Light'}
 * </button>
 * 
 * <!-- Uso manual -->
 * <button onclick={darkMode.toggle}>
 *   Toggle
 * </button>
 * ```
 */
export function createToggle(initialValue: boolean = false) {
	/** Estado reactivo del toggle */
	let value: boolean = $state(initialValue);

	/**
	 * Invierte el estado actual del toggle
	 * @example
	 * ```typescript
	 * toggle.value = false;
	 * toggle.toggle(); // ahora es true
	 * ```
	 */
	function toggle() {
		value = !value;
	}

	return {
		/** Getter reactivo del estado actual del toggle */
		get value() {
			return value;
		},
		
		/** Función para invertir manualmente el estado */
		toggle,
		
		/**
		 * Manejador click para usar directamente en elementos
		 * @example
		 * ```svelte
		 * <button onclick={toggle.onclick}>Click</button>
		 * ```
		 */
		onclick: () => toggle(),
		
		/**
		 * Manejador de teclado para accesibilidad (Enter/Espacio)
		 * Útil para elementos que no son botones nativos
		 * @param e - Evento de teclado
		 * @example
		 * ```svelte
		 * <div role="button" tabindex="0" {...toggle}>
		 *   Toggle
		 * </div>
		 * ```
		 */
		onkeydown: (e: KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				toggle();
			}
		}
	};
}