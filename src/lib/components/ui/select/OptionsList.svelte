<script lang="ts">
	import { tick } from 'svelte';
	import type { OptionData } from './InputSelectCustom.svelte';
	import { getPortalTarget, portal } from '../modal/utils/portal';

	interface Props {
		/** id del panel — debe matchear el aria-controls del trigger */
		id: string;
		/** id del <label> del InputSelect, para aria-labelledby del listbox */
		labelledBy?: string;
		show: boolean;
		options: OptionData[];
		value: string;
		/**
		 * Elemento respecto al cual se posiciona y dimensiona el panel
		 * (normalmente el wrapper del select). Se usa con getBoundingClientRect
		 * porque el panel ya no vive en el DOM al lado del trigger — se
		 * portea afuera para no quedar recortado por el overflow del modal.
		 */
		anchorEl: HTMLElement | null;
		onSelect: (id: string) => void;
		onClose: () => void;
		emptyMessage?: string;
	}

	const {
		id,
		labelledBy,
		show,
		options,
		value,
		anchorEl,
		onSelect,
		onClose,
		emptyMessage = 'Sin opciones'
	}: Props = $props();

	// Roving tabindex: un solo <button role="option"> es tab-stop a la vez.
	let activeIndex = $state(0);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	let ready = false;
	let panelStyle = $state('');
	let optionEls: (HTMLButtonElement | null)[] = [];
	let typeaheadBuffer = '';
	let typeaheadTimeout: ReturnType<typeof setTimeout>;

	// Función pura para actualizar estado
	function updateState() {
		if (!show) {
			ready = false;
			return;
		}

		const selectedIdx = options.findIndex((o) => o.id === value);
		activeIndex = selectedIdx >= 0 ? selectedIdx : 0;
		updatePosition();
		ready = true;
	}

	function updatePosition() {
		if (!anchorEl || !show) return;
		const rect = anchorEl.getBoundingClientRect();
		const viewportMargin = 8;
		const spaceBelow = window.innerHeight - rect.bottom;
		const openUpwards = spaceBelow < 200 && rect.top > spaceBelow;

		panelStyle = openUpwards
			? `position: fixed; left: ${rect.left}px; width: ${rect.width}px; bottom: ${
					window.innerHeight - rect.top + 4
				}px; max-height: ${rect.top - viewportMargin}px;`
			: `position: fixed; left: ${rect.left}px; width: ${rect.width}px; top: ${
					rect.bottom + 4
				}px; max-height: ${window.innerHeight - rect.bottom - viewportMargin}px;`;
	}

	const portalTarget = $derived(show ? getPortalTarget(anchorEl) : undefined);

	// Al abrir: enfocar la opción seleccionada (o la primera), calcular
	// posición, y mantenerla al día mientras el panel esté abierto.
	//
	// La primera medición se hace dentro de un requestAnimationFrame, no
	// apenas `show` pasa a true. Motivo: en el instante exacto en que se
	// abre el select, el layout de alrededor (el modal recién animado,
	// la barra de direcciones del navegador en mobile que todavía no
	// terminó de colapsar y altera window.innerHeight, etc.) puede no
	// estar 100% asentado todavía. rAF espera a que el browser cierre su
	// ciclo de layout/paint actual antes de que midamos — así la primera
	// medición ya es la correcta y no hace falta esperar a un scroll
	// para que se "reajuste". tick() no sirve para esto: solo garantiza
	// que los cambios de estado propios de Svelte ya se aplicaron al
	// DOM, no que el layout externo (fuera del control de Svelte) esté
	// listo.
	$effect(() => {
		if (show) {
			const raf = requestAnimationFrame(() => {
				updateState();
				tick().then(() => optionEls[activeIndex]?.focus());
			});

			const handleReposition = () => {
				if (show && anchorEl) updatePosition();
			};

			window.addEventListener('scroll', handleReposition, true);
			window.addEventListener('resize', handleReposition);

			return () => {
				cancelAnimationFrame(raf);
				window.removeEventListener('scroll', handleReposition, true);
				window.removeEventListener('resize', handleReposition);
				ready = false;
			};
		} else {
			ready = false;
		}
	});

	function focusIndex(i: number) {
		if (options.length === 0) return;
		const next = (i + options.length) % options.length;
		activeIndex = next;
		optionEls[next]?.focus();
	}

	function handleTypeahead(e: KeyboardEvent) {
		if (e.key.length !== 1 || e.ctrlKey || e.metaKey || e.altKey) return;
		clearTimeout(typeaheadTimeout);
		typeaheadBuffer += e.key.toLowerCase();
		typeaheadTimeout = setTimeout(() => (typeaheadBuffer = ''), 500);

		const match = options.findIndex((o) => o.option.toLowerCase().startsWith(typeaheadBuffer));
		if (match >= 0) focusIndex(match);
	}

	function handleKeydown(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				focusIndex(activeIndex + 1);
				break;
			case 'ArrowUp':
				e.preventDefault();
				focusIndex(activeIndex - 1);
				break;
			case 'Home':
				e.preventDefault();
				focusIndex(0);
				break;
			case 'End':
				e.preventDefault();
				focusIndex(options.length - 1);
				break;
			case 'Escape':
				e.preventDefault();
				onClose();
				break;
			case 'Tab':
				// No preventDefault: dejamos que el foco siga su curso natural,
				// solo cerramos el panel.
				onClose();
				break;
			default:
				handleTypeahead(e);
		}
	}
</script>

{#if show}
	<!--
		div + role="listbox" (no ul/li) porque el contenido son <button>,
		y <button> no es un hijo válido de <ul>. Los roles ARIA reemplazan
		la semántica nativa igual, así que el resultado es equivalente
		para lectores de pantalla.

		use:portal — saca el panel del subárbol con overflow del modal
		(.modal-body / .form-fields--scrollable) para que no quede
		recortado, y lo reinserta dentro del <dialog> abierto más cercano
		para conservar el "top layer" nativo (o en document.body si no
		hay modal). position:fixed + panelStyle lo ubican en pantalla
		igual que antes lo hacía top:100% + position:absolute.
	-->
	<div
		{id}
		use:portal={portalTarget}
		class="select-options"
		style={panelStyle}
		role="listbox"
		aria-labelledby={labelledBy}
		tabindex="-1"
		onkeydown={handleKeydown}
	>
		{#if options.length === 0}
			<p class="select-options__empty text-body-small">{emptyMessage}</p>
		{:else}
			{#each options as opt, i (opt.id)}
				<button
					type="button"
					bind:this={optionEls[i]}
					class="select-option text-body"
					role="option"
					aria-selected={opt.id === value}
					tabindex={i === activeIndex ? 0 : -1}
					onclick={() => onSelect(opt.id)}
				>
					{opt.option || '\u00A0'}
				</button>
			{/each}
		{/if}
	</div>
{/if}
