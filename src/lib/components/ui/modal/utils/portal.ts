/**
 * Acción de Svelte que mueve `node` a otro punto del DOM (por defecto
 * document.body) sin desmontarlo del árbol de componentes.
 *
 * Por qué existe:
 * - `position: fixed/absolute` NO escapa del `overflow: hidden/scroll/auto`
 *   de un ancestro. Solo mover el nodo en el DOM lo logra.
 * - Un <dialog> abierto con showModal() vive en el "top layer" del browser,
 *   por encima de TODO el documento normal — pero solo sus propios
 *   descendientes heredan ese privilegio. Si portamos a document.body
 *   estando dentro de un modal, el panel terminaría DETRÁS del modal.
 *   Por eso, si existe un <dialog open> ancestro, portamos ahí adentro
 *   (como último hijo, para ganar el empate de stacking dentro del
 *   top layer); si no hay modal, portamos a document.body como siempre.
 */
export function portal(node: HTMLElement, target?: HTMLElement | string) {
	function resolveTarget(t: HTMLElement | string | undefined): HTMLElement {
		if (t instanceof HTMLElement) return t;
		if (typeof t === 'string') return document.querySelector(t) ?? document.body;
		return document.body;
	}

	function mount(t: HTMLElement | string | undefined) {
		const targetEl = resolveTarget(t);
		if (node.parentNode !== targetEl) {
			targetEl.appendChild(node);
		}
	}

	mount(target);

	return {
		update(newTarget: HTMLElement | string | undefined) {
			mount(newTarget);
		},
		destroy() {
			node.parentNode?.removeChild(node);
		}
	};
}

/** Devuelve el <dialog open> ancestro más cercano, o document.body si no hay ninguno. */
export function getPortalTarget(anchorEl: HTMLElement | null): HTMLElement {
	const dialog = anchorEl?.closest('dialog[open]') as HTMLElement | null;
	return dialog ?? document.body;
}