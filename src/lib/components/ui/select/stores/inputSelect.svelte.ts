/**
 * Estado compartido por InputSelectCustom e InputSelectSearch: abrir/cerrar,
 * refs del wrapper/trigger, navegación de teclado en el trigger, y cierre al
 * hacer click/tap afuera. Antes esto estaba duplicado línea por línea en
 * los dos componentes — moverlo acá es lo único que hay que tocar si mañana
 * cambia el comportamiento de apertura/cierre para ambos.
 *
 * `disabled` y `onOpenChange` se reciben como funciones (no valores) porque
 * el estado se crea una sola vez al montar el componente, pero `disabled`
 * puede cambiar en cualquier render — pasándolo como getter, siempre leemos
 * el valor actual en vez de cerrar sobre el valor del momento de creación.
 */
export function createSelectState(params: { name: string; disabled: () => boolean }) {
	let open = $state(false);
	let wrapperEl: HTMLDivElement | undefined = $state();
	let triggerEl: HTMLButtonElement | undefined = $state();

	const listboxId = `${params.name}-listbox`;
	const labelId = `${params.name}-label`;

	function toggleOpen() {
		if (params.disabled()) return;
		open = !open;
	}

	function openList() {
		if (params.disabled() || open) return;
		open = true;
	}

	function closeList(refocus = false) {
		open = false;
		if (refocus) triggerEl?.focus();
	}

	// El trigger es un <button role="combobox">, no un <select>: hay que
	// replicar a mano lo que el navegador da gratis en el nativo (abrir con
	// flecha/enter/espacio).
	function handleTriggerKeydown(e: KeyboardEvent) {
		if (params.disabled()) return;
		if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			openList();
		}
	}

	// pointerdown en vez de mousedown: cubre mouse, touch y pen con un solo
	// listener, sin tener que agregar un handler de touchstart aparte.
	//
	// El panel ya NO es hijo DOM de wrapperEl: se portea afuera (ver
	// use:portal en OptionsList) para escapar del overflow del modal, así
	// que hay que chequearlo aparte por su id.
	function handleWindowPointerdown(e: PointerEvent) {
		if (!open) return;
		const target = e.target as Node;
		const panelEl = document.getElementById(listboxId);
		const insideTrigger = wrapperEl?.contains(target);
		const insidePanel = panelEl?.contains(target);
		if (!insideTrigger && !insidePanel) {
			closeList();
		}
	}

	return {
		get open() {
			return open;
		},
		get wrapperEl() {
			return wrapperEl;
		},
		set wrapperEl(v: HTMLDivElement | undefined) {
			wrapperEl = v;
		},
		get triggerEl() {
			return triggerEl;
		},
		set triggerEl(v: HTMLButtonElement | undefined) {
			triggerEl = v;
		},
		listboxId,
		labelId,
		toggleOpen,
		openList,
		closeList,
		handleTriggerKeydown,
		handleWindowPointerdown
	};
}